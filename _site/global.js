// alert("There!");

var vLa, vLo;
var vU = "https://nominatim.openstreetmap.org/reverse?lat="+vLa+"&lon="+vLo+"&format=json";
doA();

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
function doMap(vLa, vLo) {
	fetch(vU)
		.then(response => response.json())
		.then(data => { alert("Here!");
			if(data && data.display_name) { console.log(data.display_name); alert(data.display_name); }
		});
}
function doD() {
	vLa = localStorage.getItem("vULa");
	vLo = localStorage.getItem("vULo");
	
	doMap(vLa, vLo);
}