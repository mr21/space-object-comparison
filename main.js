"use strict";

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
