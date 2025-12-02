 alert("There!");

var vLa, vLo;
//doA();

function doA() {
	var vULa = localStorage.getItem("vULa");
	if(vULa) { doD(); }
	else { if(navigator.geolocation) { navigator.geolocation.getCurrentPosition(doB); } }
}
function doB(position) {
	vLa = position.coords.latitude;
	vLo = position.coords.longitude;
	localStorage.setItem("vULa", JSON.stringify(vLa));
	localStorage.setItem("vULo", JSON.stringify(vLo));

//	doC(vLa, vLo);
}

doMap(-26.1614, 27.8654);
function doMap(vLa, vLo) {
	var vU = "https://nominatim.openstreetmap.org/reverse?lat="+vLa+"&lon="+vLo+"&format=json";
	fetch(vU)
		.then(response => response.json())
		.then(data => {
			console.log("DATA RECEIVED:", data);

			if (data && data.display_name) {
				alert(data.display_name);
			} else {
				alert("display_name not found");
			}
		})
		.catch(err => console.error("Fetch error:", err));
	
	/*
	fetch(vU)
		.then(response => response.json())
		.then(data => { alert("Here!");
			if(data || data.display_name) { console.log(data[0].display_name); alert(data[0].display_name); }
		});
		*/
}
function doD() {
	vLa = localStorage.getItem("vULa");
	vLo = localStorage.getItem("vULo");

	doMap(vLa, vLo);
}