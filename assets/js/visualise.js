(function($) {
    $(document).ready(function() {
        console.log('Generating map...');

        var mapCenter = new google.maps.LatLng(1.357371, 103.819313); // Singapore
        var map, mapOptions, mapLoad;

        function escapeHTMLString(string) {
            return $("<div />").text(string).html();
        }

        function addMarker(entry) {
            if (entry.hasOwnProperty('longitude') && entry.hasOwnProperty('latitude')) {
                console.log(entry);
                var infoWindowContents =
                    '<div id="content">' +
                    '  <h2>' + escapeHTMLString(entry['shop']) + '</h2>' +
		            '  <p>Time reported: '  + escapeHTMLString(entry['timestamp']) + '<br />' +
		            '     Selling: '        + escapeHTMLString(entry['item']) + '<br />' +
		            '     Address: '        + escapeHTMLString(entry['address']) + '<br />' +
                    '     Price: ' 			+ escapeHTMLString(entry['price']) + '<br />' +
                    '     Quantity: ' 		+ escapeHTMLString(entry['quantity']) + '<br />' +
                    '     Comment: ' 		+ escapeHTMLString(entry['comment']) +
                    '</div>';

                var infoWindow = new google.maps.InfoWindow({
                    content: infoWindowContents
                });

                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(entry.latitude, entry.longitude),
                    map: map,
                    title: entry['shop']
                });

                google.maps.event.addListener(marker, 'click', function() {
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
