import { RequestContent } from "../models/RequestContent";

function naming(name: string, r: RequestContent): string {
  if (r.width && r.height) name += `_w${r.width}_h${r.height}`;
  if (r.quality) name += `_q${r.quality}`;
  if (r.rotate) name += `_d${r.rotate}`;
  if (r.blur) name += `_b${r.blur}`;
  if (r.red || r.green || r.blue) {
    name += `_RGB(${r.red || 0}-${r.green || 0}-${r.blue || 0})`;
  }
  if (r.grayscale) name += "_grayscale";
  if (r.hue) name += `_h${r.hue}`;
  if (r.saturation) name += `_s${r.saturation}`;
  if (r.text) name += "_T";
  return name;
}

export default naming;
