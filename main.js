"use strict";

// Data
// ............................................................................
const Objects = {
	    uy_scuti:          { name: "UY Scuty",                        diameter: 1189352136, color: "#ffe2c8", type: "red-supergiant-star" },
		sagittarius_astar: { name: "Sagittarius A*",                  diameter:   88000000, color: "#000000", type: "black-hole" },
		alpha_centauri_a:  { name: "α Centauri A",                    diameter:    1704918, color: "#fff5f1", type: "yellow-dwarf-star" },
		sun:               { name: "Sun",                             diameter:    1391016, color: "#fff5f1", type: "yellow-dwarf-star" },
		alpha_centauri_b:  { name: "α Centauri B",                    diameter:    1206368, color: "#ffe0bb", type: "yellow-dwarf-star" },
		alpha_centauri_c:  { name: "α Centauri C (Proxima Centauri)", diameter:     203113, color: "#ffbf68", type: "red-dwarf-star" },
		jupiter:    { name: "Jupiter",    diameter: 139822, color: "#a4906f", type: "gaz-planet" },
		saturn:     { name: "Saturn",     diameter: 116464, color: "#e2cb84", type: "gaz-planet" },
		uranus:     { name: "Uranus",     diameter:  50724, color: "#c1e7ea", type: "gaz-planet" },
		neptune:    { name: "Neptune",    diameter:  49244, color: "#3d66fa", type: "gaz-planet" },
		kepler_10c: { name: "Kepler-10c", diameter:  29944, color: "#2c3789", type: "rocky-planet" },
		earth:      { name: "Earth",      diameter:  12742, color: "#2c3789", type: "rocky-planet" },
		venus:      { name: "Venus",      diameter:  12104, color: "#d79f3c", type: "rocky-planet" },
		mars:       { name: "Mars",       diameter:   6779, color: "#ee7f5a", type: "rocky-planet" },
		mercury:    { name: "Mercury",    diameter:   4879, color: "#828086", type: "iron-planet" },
		moon:       { name: "Moon",       diameter:   3474, color: "#7f7978", type: "satellite" },
		pluto:      { name: "Pluto",      diameter:   2377, color: "#866143", type: "dwarf-planet" },
	},
	defaultA = "earth",
	defaultB = "moon";

// <select>
// ............................................................................
const selects = document.querySelectorAll( "select" ),
	sel0 = selects[ 0 ],
	sel1 = selects[ 1 ],
	options = Object.entries( Objects ).map( ( [ key, obj ] ) => {
		const opt = document.createElement( "option" );

		opt.value = key;
		opt.textContent = `${ obj.type } : ${ obj.name } - (${ obj.diameter.toLocaleString() } km)`;
		return opt;
	} );

sel0.append.apply( sel0, options );
sel1.append.apply( sel1, options.map( opt => opt.cloneNode( true ) ) );
sel0.onchange =
sel1.onchange = () => {
	setPair( sel0.value, sel1.value );
};

sel0.value = "earth";
sel1.value = "moon";

// onload
// ............................................................................
document.body.onload = () => {
	document.body.onresize();
	sel0.onchange();
};

// onresize
// ............................................................................
const elMain = document.querySelector( "#main" ),
	page0 = document.querySelector( ".page" ),
	spaceObjects = document.querySelectorAll( "#main .object" ),
	objA = spaceObjects[ 0 ],
	objB = spaceObjects[ 1 ];
let diameter0,
	diameter1,
	pageSize = 0;

document.body.onresize = () => {
	const dir = window.innerWidth > window.innerHeight ? "row" : "column";

	elMain.classList.remove( "row", "column" );
	elMain.classList.add( dir );
	pageSize = page0.getBoundingClientRect()[ dir === "row" ? "width" : "height" ];
	if ( diameter0 ) {
		resizeObjects();
	}
};

function setPair( aName, bName ) {
	const
		a = Objects[ aName ],
		b = Objects[ bName ],
		max = Math.max( a.diameter, b.diameter ),
		aBigger = a.diameter > b.diameter,
		bgSize = 120 - 20 * max / ( 1000 * 1000 * 1000 );

	document.body.style.backgroundSize = bgSize + "%";
	diameter0 = aBigger ? 1 : a.diameter / b.diameter;
	diameter1 = !aBigger ? 1 : b.diameter / a.diameter;
	setBackground( objA, a );
	setBackground( objB, b );
	resizeObjects();
}

function resizeObjects() {
	setSize( objA.style, pageSize * diameter0 );
	setSize( objB.style, pageSize * diameter1 );
}

function setSize( st, px ) {
	st.width = st.height = px + "px";
	st.margin = px / -2 + "px";
}

function setBackground( el, obj ) {
	const st = el.style;

	el.dataset.type = obj.type;
	st.backgroundColor = obj.color;
	if ( obj.img ) {
		st.backgroundImage = `url("${ obj.img }")`;
		st.backgroundSize = obj.imgSize + "%";
	}
}

/*
	img: "http://imgsrc.hubblesite.org/hvi/uploads/image_file/image_attachment/25853/large_web.jpg",
	imgSize: 128,
	img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/767px-The_Earth_seen_from_Apollo_17.jpg",
	imgSize: 114,
	img: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/808px-FullMoon2010.jpg",
	imgSize: 124,
*/
