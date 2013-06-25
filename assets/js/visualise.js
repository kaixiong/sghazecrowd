var SGHazeCrowd = {
    settings: {
        mapCenter: [1.357371, 103.819313],
        mapZoom  : 11,
        dbURL    : '/assets/data.json'
    }
};

SGHazeCrowd.Utils = {
    escapeHTMLString: function(string) {
        return $("<div />").text(string).html();
    }
};

SGHazeCrowd.Map = function(elementID) {
    console.log('Loading map');

    var self = this;

    var options = {
        center: new google.maps.LatLng(SGHazeCrowd.settings.mapCenter[0], SGHazeCrowd.settings.mapCenter[1]),
        zoom: SGHazeCrowd.settings.mapZoom,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(document.getElementById(elementID), options);

    // Resize map when page dimensions are changed
    google.maps.event.addDomListener(window, "resize", function() {
        var center = map.getCenter();
        google.maps.event.trigger(map, "resize");
        map.setCenter(center);
    });

    // Close the info window (if open) whenever user clicks on the map
    this.infoWindow = null;
    google.maps.event.addListener(this.map, 'click', function() {
        if (self.infoWindow !== null) {
            self.infoWindow.close();
            self.infoWindow = null;
        }
    });

    return this;
}

SGHazeCrowd.Map.prototype = {
    // Adds a marker to the map
    addMarker: function(entry) {
        var self = this;

        function renderMarkup(entry) {
            var escape = SGHazeCrowd.Utils.escapeHTMLString;

            var markup = '<div id="info-window"><h2>' + escape(entry['shop']) + '</h2>';

            markup +=
                '<p>' +
                '  <span class="label">Selling:</span> '  + escape(entry.item) + '<br />' +
                '  <span class="label">Address:</span> '  + escape(entry.address) + '<br />' +
                '  <span class="label">Price:</span> '    + escape(entry.price) + '<br />' +
                '  <span class="label">Quantity:</span> ' + escape(entry.quantity) +
                '</p>';

            if (entry.comment) {
                markup += '<p><span class="label">Comment:</span> '  + escape(entry.comment) + '</p>';
            }

            markup += '<p><span class="label">Last updated:</span> ' + escape(entry.timestamp) + '</p>';

            markup += '</div>';

            return markup;
        }

        var marker;

        if (entry.hasOwnProperty('longitude') && entry.hasOwnProperty('latitude')) {
            // Create marker
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(entry.latitude, entry.longitude),
                map: this.map,
                title: entry['shop'] // FIXME: Does this need to be escaped?
            });

            // Open info window when marker is clicked
            google.maps.event.addListener(marker, 'click', function() {
                if (self.infoWindow !== null) {
                    self.infoWindow.close();
                }

                self.infoWindow = new google.maps.InfoWindow({
                    content: renderMarkup(entry)
                });

                self.infoWindow.open(self.map, marker);
            });
        }
    }
};

(function($) {
    $(document).ready(function() {
        console.log('Generating map...');

        var map, dbLoad;

        // Load database
        console.log('Loading database');
        dbLoad = $.getJSON(SGHazeCrowd.settings.dbURL);

        // Create map
        map = new SGHazeCrowd.Map('map-canvas');

        $.when(dbLoad).done(function(results) {
            console.log('Database loaded successfully');

            // Process data
            $.each(results, function(index, entry) {
                // Add marker
                map.addMarker(entry);
            });
        }).fail(function() {
            console.log('Failed to load database!');
        });
    });
})(jQuery);
