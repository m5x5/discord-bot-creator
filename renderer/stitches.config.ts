import { createStitches } from '@stitches/react';

export const adjustBrightness = (color = '', percent = 1) => {
  if (color.startsWith('$')) {
    color = config.theme.colors[color.slice(1)] || color;
  }

  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const B = ((num >> 8) & 0x00ff) + amt;
  const G = (num & 0x0000ff) + amt;
  const darkenedColor =
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
      (G < 255 ? (G < 1 ? 0 : G) : 255)
    )
      .toString(16)
      .slice(1);

  return {
    backgroundColor: darkenedColor,
  };
};

export const { styled, getCssText, config, css, globalCss } = createStitches({
  theme: {
    fonts: {
      system: 'system-ui',
      sans: 'Outfit',
    },
    colors: {
      primary: '#5865f2',
      secondary: '#4e545c',
      success: '#57f287',
      info: '#5865f2',
      warning: '#fee75c',
      danger: '#ed4245',
      dark: '#36393f',
      light: '#dddddd',
      darker: '#2e3136',
      link: '#2d81ff',
      black: '#000000',
      white: '#ffffff',

      // Dark
      primaryDark: '#5259d7',

      // Grays
      gray100: '#fafafa',
      gray200: '#f5f5f5',
      gray300: '#eeeeee',
      gray400: '#e0e0e0',
      gray500: '#bdbdbd',
      gray600: '#9e9e9e',
      gray700: '#757575',
      gray800: '#2f3136',
      gray900: '#212529',
    },
    fontSizes: {
      1: '0.8rem',
      2: '0.9rem',
      3: '1rem',
      4: '1.1rem',
    },
    radii: {
      1: '0.3rem',
      2: '0.5rem',
      3: '0.7rem',
    },
    space: {
      1: '0.25rem',
      2: '0.5rem',
      3: '0.75rem',
      4: '1rem',
      5: '1.25rem',
      6: '1.5rem',
      7: '1.75rem',
      8: '2rem',
      9: '2.25rem',
    },
    shadows: {
      1: '0 4px 12px 0 rgba(0, 0, 0, 0.1), 0 4px 8px 0 rgba(0, 0, 0, 0.06)',
      inset1: 'inset 0 0 0 1px rgba($colors$black, 0.3)',
    },
  },
  media: {
    bp1: '(min-width: 640px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1024px)',
  },
  utils: {
    darkenedColor1: (color: string) => adjustBrightness(color, -1),
    darkenedColor2: (color: string) => adjustBrightness(color, -2),
    darkenedColor3: (color: string) => adjustBrightness(color, -3),
    darkenedColor4: (color: string) => adjustBrightness(color, -4),
    darkenedColor5: (color: string) => adjustBrightness(color, -5),

    lightenedColor1: (color: string) => adjustBrightness(color, 1),
    lightenedColor2: (color: string) => adjustBrightness(color, 2),
    lightenedColor3: (color: string) => adjustBrightness(color, 3),
    lightenedColor4: (color: string) => adjustBrightness(color, 4),
    lightenedColor5: (color: string) => adjustBrightness(color, 5),
  },
});

export const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'Outfit',
      fontWeight: '100',
      src: 'url("/fonts/Outfit-Thin.ttf") format("ttf")',
    },
    {
      fontFamily: 'Outfit',
      fontWeight: '200',
      src: 'url("/fonts/Outfit-ExtraLight.ttf") format("ttf")',
    },
    {
      fontFamily: 'Outfit',
      fontWeight: '300',
      src: 'url("/fonts/Outfit-Light.ttf") format("ttf")',
    },
    {
      fontFamily: 'Outfit',
      fontWeight: '400',
      src: 'url("fonts/Outfit-Regular.ttf") format("truetype")',
    },
    {
      fontFamily: 'Outfit',
      fontWeight: '500',
      src: 'url("fonts/Outfit-Medium.ttf") format("truetype")',
    },
    {
      fontFamily: 'Outfit',
      fontWeight: '600',
      src: 'url("fonts/Outfit-SemiBold.ttf") format("truetype")',
    },
    {
      fontFamily: 'Outfit',
      fontWeight: '700',
      src: 'url("fonts/Outfit-Bold.ttf") format("truetype")',
    },
    {
      fontFamily: 'Outfit',
      fontWeight: '800',
      src: 'url("fonts/Outfit-ExtraBold.ttf") format("truetype")',
    },
    {
      fontFamily: 'Outfit',
      fontWeight: '900',
      src: 'url("fonts/Outfit-Black.ttf") format("truetype")',
    },
  ],
  body: {
    backgroundColor: '$gray800 !important',
    fontFamily: 'Outfit !important',
    margin: '0',
    color: '$white !important',
  },
  'h1, h2, h3, h4, h5, h6': {
    fontFamily: '$sans',
  },

  input: {
    boxSizing: 'border-box',
  },

  '::-webkit-scrollbar ': {
    width: '8px',
  },

  '::-webkit-scrollbar-track': {
    borderRadius: '10px',
    backgroundColor: '#34373a',
  },

  '::-webkit-scrollbar-thumb': {
    borderRadius: '10px',
    backgroundColor: '$gray900',
  },
});

// // Bot Controls
// .bot-controls {
//   svg {
//     height: 2rem;
//     // color: $primary;
//     // filter: grayscale(100%) opacity(0.5);
//     transition: 0.2s;

//     // &.danger {
//     // color: $danger;
//     // }

//     // &.success {
//     // color: $success;
//     // filter: grayscale(100%) opacity(0.2);
//     // }
//   }

//   // svg:hover {
//   // filter: grayscale(0) opacity(1);
//   // }
// }

// .card:hover .x-icon {
//   // color: $secondary;
//   visibility: visible;
// }

// .x-icon:hover {
//   background-color: rgba(0, 0, 0, 0.1);
// }

// .x-icon:active {
//   background-color: rgba(0, 0, 0, 0.2);
// }
