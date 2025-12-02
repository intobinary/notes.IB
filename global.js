var vLa, vLo, vA, vTest = true;
doA();
function doA() {
	if(!localStorage.getItem("vA")) {
		var vULa = localStorage.getItem("vULa");
		if(vULa) { doD(); }
		else {
			if(navigator.geolocation) { navigator.geolocation.getCurrentPosition(doB); }
		}
	}
}
function doB(position) {
	vLa = position.coords.latitude;
	vLo = position.coords.longitude;
	localStorage.setItem("vULa", JSON.stringify(vLa));
	localStorage.setItem("vULo", JSON.stringify(vLo));

	doD();
}

/*
function doA() {
	if (!localStorage.getItem("vA")) {
		var vULa = localStorage.getItem("vULa");
		if (vULa) {
			doD();
		} else {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					doB,
					function(error) {
					//	console.error("Geolocation error:", error);
					},
					{
						enableHighAccuracy: true,
						timeout: 10000,
						maximumAge: 0
					}
				);
			}
		}
	}
}

// this function now can start a watch for more accurate position
function doB(position) {
	// if the accuracy is already good, just save and continue
	if (position.coords.accuracy <= 10) {
		saveCoords(pos);
		doD();
		navigator.geolocation.clearWatch(watchId);
	} else {
		console.log("Accuracy too low, waiting for better fix:", position.coords.accuracy);
	}

	// otherwise, start watchPosition for better accuracy
	var watchId = navigator.geolocation.watchPosition(
		function(pos) {
			console.log("Tracking position:", position.coords.latitude, position.coords.longitude, "accuracy:", position.coords.accuracy);

			// only save and stop watch when accuracy is acceptable
			if (position.coords.accuracy <= 10) {
				saveCoords(pos);
				doD();
				navigator.geolocation.clearWatch(watchId);
			} else {
				console.log("Accuracy too low, waiting for better fix:", position.coords.accuracy);
			}
		},
		function(error) {
			console.error("Geolocation watch error:", error);
		},
		{
			enableHighAccuracy: true,
			timeout: 10000,
			maximumAge: 0
		}
	);
}

// helper function to save coords
function saveCoords(pos) {
	vLa = position.coords.latitude;
	vLo = position.coords.longitude;
	localStorage.setItem("vULa", JSON.stringify(vLa));
	localStorage.setItem("vULo", JSON.stringify(vLo));
}
*/

//doMap(-26.1614, 27.8654);
//doMap(-26.2014, 28.0454);
function doMap(vLa, vLo) {
	var vU = "https://nominatim.openstreetmap.org/reverse?lat="+vLa+"&lon="+vLo+"&format=json";

	fetch(vU)
		.then(response => response.json())
		.then(data => {
			if(data || data.display_name) { vA = data.display_name; localStorage.setItem("vA", vA); }
		})
		.catch(err => console.error("Trash:", err));
}
function doD() {
	vLa = localStorage.getItem("vULa");
	vLo = localStorage.getItem("vULo");

	doMap(vLa, vLo);
}