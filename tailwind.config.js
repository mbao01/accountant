/** @type {import('tailwindcss').Config} */


const colors = {
  /*
    format - HSL(Hdeg S% L%)
    Levels: 100 <<-500->> 900
         100  200  300  400  500  600  700  800  900
    H -  +12  +9   +5   +2   -    -2   -5   -9   -12
    S -  +10  +6   +3   +1   -    +1   +3   +6   +10
    L -  +35  +25  +15  +5   -    -5   -15  -25  -35
  */
  black: "hsl(0deg 0% 0%)",
  white: "hsl(360deg 100% 100%)",
  gray: {
    100: "hsl(193deg 18% 95%)",
    200: "hsl(196deg 18% 85%)",
    300: "hsl(200deg 18% 80%)",
    400: "hsl(203deg 18% 70%)",
    500: "hsl(205deg 18% 65%)",
    600: "hsl(207deg 18% 55%)",
    700: "hsl(210deg 18% 45%)",
    800: "hsl(214deg 18% 30%)",
    900: "hsl(217deg 18% 25%)",
  },
  red: {
    100: "hsl(348deg 60% 95%)",
    200: "hsl(351deg 56% 85%)",
    300: "hsl(355deg 53% 75%)",
    400: "hsl(358deg 51% 65%)",
    500: "hsl(0deg 50% 60%)",
    600: "hsl(2deg 51% 55%)",
    700: "hsl(5deg 53% 45%)",
    800: "hsl(9deg 56% 35%)",
    900: "hsl(12deg 60% 25%)",
  },
  blue: {
    100: "hsl(198deg 60% 95%)",
    200: "hsl(201deg 56% 85%)",
    300: "hsl(205deg 53% 75%)",
    400: "hsl(208deg 51% 65%)",
    500: "hsl(210deg 50% 60%)",
    600: "hsl(212deg 51% 55%)",
    700: "hsl(215deg 53% 45%)",
    800: "hsl(219deg 56% 35%)",
    900: "hsl(222deg 60% 25%)",
  },
  green: {
    100: "hsl(147deg 60% 95%)",
    200: "hsl(144deg 56% 85%)",
    300: "hsl(140deg 53% 75%)",
    400: "hsl(137deg 51% 65%)",
    500: "hsl(135deg 50% 60%)",
    600: "hsl(133deg 51% 55%)",
    700: "hsl(130deg 53% 45%)",
    800: "hsl(126deg 56% 35%)",
    900: "hsl(123deg 60% 25%)",
  },
  purple: {
    100: "hsl(268deg 60% 95%)",
    200: "hsl(265deg 56% 85%)",
    300: "hsl(261deg 53% 75%)",
    400: "hsl(258deg 51% 65%)",
    500: "hsl(256deg 50% 60%)",
    600: "hsl(254deg 51% 55%)",
    700: "hsl(251deg 53% 45%)",
    800: "hsl(247deg 56% 35%)",
    900: "hsl(244deg 60% 25%)",
  },
  yellow: {
    100: "hsl(55deg 90% 95%)",
    200: "hsl(52deg 86% 85%)",
    300: "hsl(48deg 83% 75%)",
    400: "hsl(45deg 81% 65%)",
    500: "hsl(43deg 80% 60%)",
    600: "hsl(41deg 81% 55%)",
    700: "hsl(38deg 83% 45%)",
    800: "hsl(34deg 86% 35%)",
    900: "hsl(31deg 90% 25%)",
  },
};

const fontFamily = {
  sans: ["Nunito", "sans-serif"],
  serif: ["IBM Plex Serif", "serif"],
  mono: ["ui-monospace", "SFMono-Regular"],
};

module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    colors,
    fontFamily,
    extend: {},
  },
  plugins: [],
  safelist: [
    {
      pattern: /^(bg-|border-|text-|h-|w-|m-|mx-|my-|p-|px-|py-|)/,
      variants: ["hover", "active"],
    },
  ],
};
