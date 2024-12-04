// Selecting elements
const getLocationButton = document.getElementById('getLocation');
const latitudeElement = document.getElementById('latitude');
const longitudeElement = document.getElementById('longitude');
const altitudeElement = document.getElementById('altitude');
const mapElement = document.getElementById('map');

// Function to get the user's location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Function to display the location information
function showPosition(position) {
    const { latitude, longitude, altitude } = position.coords;

    latitudeElement.textContent = `Latitude: ${latitude.toFixed(6)}`;
    longitudeElement.textContent = `Longitude: ${longitude.toFixed(6)}`;
    altitudeElement.textContent = `Altitude: ${altitude ? altitude.toFixed(2) + ' meters' : 'Not available'}`;

    // Display the map using OpenStreetMap
    const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;
    mapElement.innerHTML = `<iframe width="100%" height="100%" frameborder="0" src="${mapUrl}"></iframe>`;
}

// Function to handle errors
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred.');
            break;
    }
}

// Add event listener to the button
getLocationButton.addEventListener('click', getLocation);
