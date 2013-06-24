(function($) {
    $(document).ready(function() {
        console.log('Generating map...');

        var mapCenter = new google.maps.LatLng(1.357371, 103.819313); // Singapore
        var map, mapOptions, mapLoad;
        var infoWindow = null;

        function escapeHTMLString(string) {
            return $("<div />").text(string).html();
        }

        function addMarker(entry) {
            function renderMarkup(entry) {
                var markup = '<div id="info-window"><h2>' + escapeHTMLString(entry['shop']) + '</h2>';

                markup +=
                    '<p>' +
                    '  <span class="label">Selling:</span> '  + escapeHTMLString(entry['item']) + '<br />' +
                    '  <span class="label">Address:</span> '  + escapeHTMLString(entry['address']) + '<br />' +
                    '  <span class="label">Price:</span> '    + escapeHTMLString(entry['price']) + '<br />' +
                    '  <span class="label">Quantity:</span> ' + escapeHTMLString(entry['quantity']) +
                    '</p>';

                if (entry['comment']) {
                    markup += '<p><span class="label">Comment:</span> '  + escapeHTMLString(entry['comment']) + '</p>';
                }

                markup += '<p><span class="label">Last updated:</span> ' + escapeHTMLString(entry['timestamp']) + '</p>';

                markup += '</div>';

                return markup;
            }

            if (entry.hasOwnProperty('longitude') && entry.hasOwnProperty('latitude')) {
                console.log(entry);

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(entry.latitude, entry.longitude),
                    map: map,
                    title: entry['shop'] // FIXME: Does this need to be escaped?
                });

                google.maps.event.addListener(marker, 'click', function() {
                    if (infoWindow !== null) {
                        infoWindow.close();
                    }

                    infoWindow = new google.maps.InfoWindow({
                        content: renderMarkup(entry)
                    });

                    infoWindow.open(map, marker);
                });
            }
        }

        // Load database
        console.log('Loading database');
        mapLoad = $.getJSON('/assets/data.json');

        // Load map

        mapOptions = {
            zoom: 11,
            center: mapCenter,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        console.log('Loading map');
        map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
        google.maps.event.addListener(map, 'click', function() {
            if (infoWindow !== null) {
                infoWindow.close();
                infoWindow = null;
            }
        });

        $.when(mapLoad).done(function(results) {
            console.log('Database loaded successfully');

            $.each(results, function(index, entry) {
                addMarker(entry);
            });
        }).fail(function() {
            console.log('Failed to load database!');
        });
    });
})(jQuery);
