var FMIMapping = {
    lookupMapLoc: function(address) {
        var deferred = $.Deferred();
        var geocoder = new google.maps.Geocoder();

        geocoder.geocode({'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                deferred.resolve(results[0].geometry.location);
            }
            else {
                deferred.reject(status);
            }
        });

        return deferred.promise();
    }
};
