import proj4 from "proj4";
// noinspection NpmUsedModulesInstalled
import { register } from "ol/proj/proj4";
import { createProj, addProj } from "vuelayers/lib/ol-ext";

proj4.defs("EPSG:3395", "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +datum=WGS84 +units=m +no_defs");

register(proj4);

const EPSG_3395 = createProj({
  code: "EPSG:3395",
  extent: [-20037508.342789244, -20037508.342789244, 20037508.342789244, 20037508.342789244]
});

addProj(EPSG_3395);
