var exports = module.exports = {}

exports.distance = function(firstLocation, secondLocation) {
    return distance(
        firstLocation.latitude,
        firstLocation.longitude,
        secondLocation.latitude,
        secondLocation.longitude
    )
}


function distance(firstLatitude, firstLongitude, secondLatitude, secondLongitude) {
    var R = 6371;
    var latDistance = toRadians(secondLatitude - firstLatitude);
    var lonDistance = toRadians(secondLongitude - firstLongitude);
    var a = Math.sin(latDistance / 2) * Math.sin(latDistance / 2) +
        Math.cos(toRadians(firstLatitude)) * Math.cos(toRadians(secondLatitude)) *
        Math.sin(lonDistance / 2) * Math.sin(lonDistance / 2);

    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distanceInKm = R * c
    return distanceInKm;
}

function toRadians(deg) {
    return deg * (Math.PI/180)
}