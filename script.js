document.getElementById("getLocationBtn").addEventListener("click", () => {
    const statusMessage = document.getElementById("statusMessage");
    const latitudeDisplay = document.getElementById("latitude");
    const longitudeDisplay = document.getElementById("longitude");

    if (navigator.geolocation) {
        statusMessage.textContent = "Locating...";

        // Request high accuracy for GPS-based location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                statusMessage.textContent = "Location found!";
                latitudeDisplay.textContent = lat;
                longitudeDisplay.textContent = lon;
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        statusMessage.textContent = "User denied the request for Geolocation.";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        statusMessage.textContent = "Location information is unavailable.";
                        break;
                    case error.TIMEOUT:
                        statusMessage.textContent = "The request to get user location timed out.";
                        break;
                    default:
                        statusMessage.textContent = "An unknown error occurred.";
                        break;
                }
            },
            {
                enableHighAccuracy: true, // Request GPS-level accuracy
                timeout: 10000,           // Set a timeout for the request
                maximumAge: 0             // Prevent using old cached location data
            }
        );
    } else {
        statusMessage.textContent = "Geolocation is not supported by this browser.";
    }
});
