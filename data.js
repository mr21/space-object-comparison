"use strict";

const Space = {
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
		name: "Kepler-10 System",
		objects: {
			kepler_10:  { name: "Kepler-10",  diameter: 1481841, color: "#fff5f1", type: "yellow-dwarf-star" },
			kepler_10c: { name: "Kepler-10c", diameter:   29944, color: "#f7f7f7", type: "rocky-planet" },
			kepler_10b: { name: "Kepler-10b", diameter:   18731, color: "#f7f7f7", type: "rocky-planet" },
		}
	},
	others: {
		name: "Others",
		objects: {
			uy_scuti:          { name: "UY Scuty",       diameter: 1189352136, color: "#ffe2c8", type: "red-supergiant-star" },
			sagittarius_astar: { name: "Sagittarius A*", diameter:   88000000, color: "#000000", type: "black-hole" },
		}
	},
};
