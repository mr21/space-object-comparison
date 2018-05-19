"use strict";

const lightSpeed = 299792458; // meter (per second)
const solarMass = 1.98855 * Math.pow( 10, 30 ); // kilograms
const gravity = 6.67408 * Math.pow( 10, -11 );

function calcSchwarzschildRadius( nbSolarMass ) {
	return ( 2 * gravity * nbSolarMass * solarMass ) / ( lightSpeed * lightSpeed );
}

const Space = {
	blackholes: {
		name: "Black holes",
		objects: {
			ton_618:           { name: "TON 618",         nbSolarMass: 66000000000, color: "#000000", type: "black-hole" },
			h1821_643:         { name: "H1821+643",       nbSolarMass: 30000000000, color: "#000000", type: "black-hole" },
			hercules_a:        { name: "Hercules A",      nbSolarMass:  4000000000, color: "#000000", type: "black-hole" },
			ngc_3115:          { name: "NGC 3115",        nbSolarMass:  2000000000, color: "#000000", type: "black-hole" },
			messier_84:        { name: "Messier 84",      nbSolarMass:  1500000000, color: "#000000", type: "black-hole" },
			sombrero_galaxy:   { name: "Sombrero Galaxy", nbSolarMass:  1000000000, color: "#000000", type: "black-hole" },
			messier_49:        { name: "Messier 49",      nbSolarMass:   560000000, color: "#000000", type: "black-hole" },
			messier_59:        { name: "Messier 59",      nbSolarMass:   270000000, color: "#000000", type: "black-hole" },
			messier_81:        { name: "Messier 81",      nbSolarMass:    70000000, color: "#000000", type: "black-hole", aka: "Bode's Galaxy" },
			sagittarius_astar: { name: "Sagittarius A*",  nbSolarMass:     4300000, color: "#000000", type: "black-hole", aka: "Sgr A*" },
		}
	},
	solarSystem: {
		name: "Solar system",
		objects: {
			sun:     { name: "\u2609 Sun",     diameter: 1391016, color: "#fff5f1", type: "yellow-dwarf-star" },
			jupiter: { name: "\u2643 Jupiter", diameter:  139822, color: "#a4906f", type: "gaz-planet" },
			saturn:  { name: "\u2644 Saturn",  diameter:  116464, color: "#e2cb84", type: "gaz-planet" },
			uranus:  { name: "\u2645 Uranus",  diameter:   50724, color: "#c1e7ea", type: "gaz-planet" },
			neptune: { name: "\u2646 Neptune", diameter:   49244, color: "#3d66fa", type: "gaz-planet" },
			earth:   { name: "\u2295 Earth",   diameter:   12742, color: "#2c3789", type: "rocky-planet" },
			venus:   { name: "\u2640 Venus",   diameter:   12104, color: "#d79f3c", type: "rocky-planet" },
			mars:    { name: "\u2643 Mars",    diameter:    6779, color: "#ee7f5a", type: "rocky-planet" },
			mercury: { name: "\u263F Mercury", diameter:    4879, color: "#828086", type: "iron-planet" },
			moon:    { name: "\u263E Moon",    diameter:    3474, color: "#7f7978", type: "satellite" },
			pluto:   { name: "\u2647 Pluto",   diameter:    2377, color: "#866143", type: "dwarf-planet" },
		}
	},
	alphaCentauri: {
		name: "Alpha Centauri",
		objects: {
			alpha_centauri_a: { name: "α Centauri A", diameter: 1701769, color: "#fff5f1", type: "yellow-dwarf-star" },
			alpha_centauri_b: { name: "α Centauri B", diameter: 1200725, color: "#ffe0bb", type: "yellow-dwarf-star" },
			alpha_centauri_c: { name: "α Centauri C", diameter:  214495, color: "#ffbf68", type: "red-dwarf-star", aka: "Proxima Centauri" },
		}
	},
	kepler10System: {
		name: "Kepler-10 system",
		objects: {
			kepler_10:  { name: "Kepler-10",  diameter: 1481841, color: "#fff5f1", type: "yellow-dwarf-star" },
			kepler_10c: { name: "Kepler-10c", diameter:   29944, color: "#f7f7f7", type: "rocky-planet" },
			kepler_10b: { name: "Kepler-10b", diameter:   18731, color: "#f7f7f7", type: "rocky-planet" },
		}
	},
	siriusSystem: {
		name: "Sirius system",
		objects: {
			sirius_a: { name: "Sirius A", diameter: 2380685, color: "#eeeefa", type: "am-star", aka: "Dog Star" },
			sirius_b: { name: "Sirius B", diameter:   11688, color: "#d5dff5", type: "white-dwarf-star" },
		}
	},
	others: {
		name: "Others",
		objects: {
			uy_scuti:   { name: "UY Scuti",   diameter: 2376511200, color: "#ffe2c8", type: "red-supergiant-star" },
			betelgeuse: { name: "Betelgeuse", diameter: 1234171800, color: "#fca653", type: "red-supergiant-star", aka: "α Orionis" },
			antares:    { name: "Antares",    diameter:  946152000, color: "#fcaf29", type: "red-supergiant-star", aka: "α Scorpii" },
			rigel_a:    { name: "Rigel A",    diameter:  109781460, color: "#bbf1ff", type: "blue-white-supergiant-star", aka: "β Orionis" },
			aldebaran:  { name: "Aldebaran",  diameter:   61402482, color: "#fc8d2e", type: "orange-giant-star", aka: "α Tauri" },
			arcturus:   { name: "Arcturus",   diameter:   35341560, color: "#df822d", type: "red-giant-star", aka: "α Boötis" },
			pollux:     { name: "Pollux",     diameter:   12244320, color: "#eabf80", type: "orange-giant-star", aka: "β Geminorum" },
		}
	},
};

Object.values( Space.blackholes.objects ).forEach( bh => {
	bh.diameter = Math.round( 2 * calcSchwarzschildRadius( bh.nbSolarMass ) / 1000 );
} );
