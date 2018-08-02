"use strict";

// onhashchange
// ............................................................................
window.onhashchange = () => {
	const names = getHashArr();

	if ( names.length < 2 ) {
		location.hash = "earth,moon";
	} else {
		sel0.value = names[ 0 ];
		sel1.value = names[ 1 ];
		setPageObject( pages[ 0 ], sel0.value );
		setPageObject( pages[ 1 ], sel1.value );
		calcDiameters();
	}
};

function getHashArr() {
	return location.hash.substr( 1 ).split( "," );
}

// <select>
// ............................................................................
const selects = document.querySelectorAll( "select" ),
	pages = document.querySelectorAll( ".page" ),
	sel0 = selects[ 0 ],
	sel1 = selects[ 1 ],
	options = [];

Object.values( Space ).forEach( obj => {
	const optgroup = document.createElement( "optgroup" );

	optgroup.label = obj.name;
	options.push( optgroup );
	Object.entries( obj.objects ).forEach( ( [ objId, obj ] ) => {
		const opt = document.createElement( "option" );

		opt.value = objId;
		opt.textContent = obj.name;
		optgroup.append( opt );
	} );
} );

function selectOnchange( i, e ) {
	const arr = getHashArr();

	arr[ i ] = e.target.value;
	location.hash = arr.join( "," );
};

sel0.append.apply( sel0, options );
sel1.append.apply( sel1, options.map( opt => opt.cloneNode( true ) ) );
sel0.onchange = selectOnchange.bind( null, 0 );
sel1.onchange = selectOnchange.bind( null, 1 );


// onload
// ............................................................................
document.body.onload = () => {
	document.body.onresize();
	window.onhashchange();
};

// onresize
// ............................................................................
const elMain = document.querySelector( "#main" ),
	milkyway = document.querySelector( "#milkyway" ),
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
	resizeObjects();
};

function getDiameter( obj ) {
	return obj ? obj.diameter : 0;
}

function calcDiameters() {
	const a = getDiameter( ObjectByName[ sel0.value ] ),
		b = getDiameter( ObjectByName[ sel1.value ] );

	diameter0 = a < 1 ? 0 : a > b ? 1 : a / b;
	diameter1 = b < 1 ? 0 : a < b ? 1 : b / a;
	resizeObjects();
}

function setPageObject( el, objectPath ) {
	const obj = ObjectByName[ objectPath ],
		aka = el.querySelector( ".object-aka" ),
		size = el.querySelector( ".object-size" );

	if ( obj ) {
		aka.textContent = obj.aka;
		size.textContent = obj.diameter.toLocaleString();
		setObjectBg( el.querySelector( ".object" ), obj );
	} else {
		aka.textContent =
		size.textContent = "";
	}
}

function resizeObjects() {
	const a = getDiameter( ObjectByName[ sel0.value ] ),
		b = getDiameter( ObjectByName[ sel1.value ] ),
		max = Math.max( a, b ),
		bgSize = 1.1 - .0015 * max / ( 1000 * 1000 * 1000 );

	milkyway.style.transform = `scale(${ bgSize })`;
	setObjectSize( objA.style, pageSize * diameter0 );
	setObjectSize( objB.style, pageSize * diameter1 );
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
	st.backgroundImage = obj.hasImg
		? `url("low/${ obj.id }.jpg")`
		: "none";
	st.boxShadow = obj.type.indexOf( "star" ) >= 0
		? `0px 0px 100px ${ obj.color }`
		: "none";
}
