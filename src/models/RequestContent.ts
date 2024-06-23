export type RequestContent = {
  img_name: string;
  format: string | "png";
  width: number;
  height: number;
  quality: number;
  original_size: number;
  rotate: number;
  blur: number;
  hue: number;
  saturation: number;
  grayscale: boolean;
  text: string;
  red: number;
  green: number;
  blue: number;
};
