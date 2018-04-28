"use strict";

// <select>
// ............................................................................
const selects = document.querySelectorAll( "select" ),
	pages = document.querySelectorAll( ".page" ),
	sel0 = selects[ 0 ],
	sel1 = selects[ 1 ],
	options = [];

Object.entries( Space ).forEach( ( [ groupId, obj ] ) => {
	const optgroup = document.createElement( "optgroup" );

	optgroup.label = obj.name;
	options.push( optgroup );
	Object.entries( obj.objects ).forEach( ( [ objId, obj ] ) => {
		const opt = document.createElement( "option" );

		opt.value = `${ groupId }.${ objId }`;
		opt.textContent = obj.name;
		optgroup.append( opt );
	} );
} );

sel0.append.apply( sel0, options );
sel1.append.apply( sel1, options.map( opt => opt.cloneNode( true ) ) );
sel0.onchange = () => {
	setPageObject( pages[ 0 ], sel0.value );
	calcDiameters();
};
sel1.onchange = () => {
	setPageObject( pages[ 1 ], sel1.value );
	calcDiameters();
};

// onload
// ............................................................................
document.body.onload = () => {
	sel0.value = "solarSystem.earth";
	sel1.value = "solarSystem.moon";
	document.body.onresize();
	setPageObject( pages[ 0 ], sel0.value );
	setPageObject( pages[ 1 ], sel1.value );
	calcDiameters();
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

function calcDiameters() {
	const a = getObjectFromPath( sel0.value ),
		b = getObjectFromPath( sel1.value ),
		aBigger = a.diameter > b.diameter;

	diameter0 = aBigger ? 1 : a.diameter / b.diameter;
	diameter1 = !aBigger ? 1 : b.diameter / a.diameter;
	resizeObjects();
}

function setPageObject( el, objectPath ) {
	const obj = getObjectFromPath( objectPath );

	el.querySelector( ".object-aka" ).textContent = obj.aka;
	el.querySelector( ".object-size" ).textContent = obj.diameter.toLocaleString();
	setObjectBg( el.querySelector( ".object" ), obj );
}

function resizeObjects() {
	const
		a = getObjectFromPath( sel0.value ),
		b = getObjectFromPath( sel1.value ),
		max = Math.max( a.diameter, b.diameter ),
		bgSize = 130 - 20 * max / ( 1000 * 1000 * 1000 );

	document.body.style.backgroundSize = bgSize + "%";
	setObjectSize( objA.style, pageSize * diameter0 );
	setObjectSize( objB.style, pageSize * diameter1 );
}

function getObjectFromPath( path ) {
	const arr = path.split( "." );

	return Space[ arr[ 0 ] ].objects[ arr[ 1 ] ];
}

function setObjectSize( st, px ) {
	st.width =
	st.height = px + "px";
	st.margin = px / -2 + "px";
}

function setObjectBg( el, obj ) {
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
