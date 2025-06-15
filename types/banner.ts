export type bannerType = {
  id: string;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  position: string; // If it's always a string like "1", keep it as string. Use `number` if it's numeric.
  displayImage: string;
  displayNumber: string; // Keep as string if you expect leading zeroes or non-numeric usage
  displayText: string;
};
