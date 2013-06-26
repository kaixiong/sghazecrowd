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
    };

    this.map = L.map(elementID)
                   .setView(SGHazeCrowd.settings.mapCenter, SGHazeCrowd.settings.mapZoom)
                   .addLayer(new L.Google('ROADMAP'));

    return this;
}

SGHazeCrowd.Map.prototype = {
    // Adds a marker to the map
    addMarker: function(entry) {
        var self = this;

        function renderMarkup(entry) {
            var escape = SGHazeCrowd.Utils.escapeHTMLString;

            var markup = '<h2>' + escape(entry['shop']) + '</h2>';

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

            return markup;
        }

        var marker = null;

        if (entry.hasOwnProperty('longitude') && entry.hasOwnProperty('latitude')) {
            // Create marker
            marker = L.marker([entry.latitude, entry.longitude], { title:entry.shop })
                         .addTo(this.map)
                         .bindPopup(renderMarkup(entry));

            // Open info window when marker is clicked
            marker.on('click', function(event) {
                marker.openPopup();
            });
        }

        return marker;
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

        $.when(dbLoad).done(function(entries) {
            console.log('Database loaded successfully');

            function populateEntryList(entries) {
                var escape = SGHazeCrowd.Utils.escapeHTMLString;

                var entryList = $('<ul class="entries" />');

                // Create entry list, sorted by latest
                $.each(entries, function(index, entry) {
                    $('<li />').attr({ 'data-id': index })
                               .html('<span class="shop-name">' + escape(entry.shop) + '</span>')
                               .prependTo(entryList);
                });
                entryList.appendTo('#latest-entries');

                // Jump to marker and open popup whenever entry is clicked
                $('#latest-entries > .entries > li')
                    .hover(
                        function() {
                            $(this).addClass('hover');
                        },
                        function() {
                            $(this).removeClass('hover');
                        })
                    .click(function() {
                        var ID = $(this).attr('data-id');
                        var marker = entries[ID].marker;

                        if (marker) {
                            marker.openPopup();
                        }
                    });
            }

            function addMarkers(entries) {
                $.each(entries, function(index, entry) {
                    entry.marker = map.addMarker(entry);
                });
            }

            addMarkers(entries);
            populateEntryList(entries);
        }).fail(function() {
            console.log('Failed to load database!');
        });
    });
})(jQuery);
