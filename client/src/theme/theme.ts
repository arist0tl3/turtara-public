import { Theme } from '@mui/joy/styles';

const white = 'rgba(252, 252, 252, 1)'; // White / Neutral 50/100/200
const gray = 'rgba(154, 155, 150, 1)'; // Neutral 300/400/500
const jet = 'rgba(40, 42, 38, 1)'; // Neutral 700/800/900
const eerie = 'rgba(22, 24, 23, 1)'; // Neutral 900
// const black = 'rgba(3, 3, 3, 1)'; // // Black

// const slate = 'rgba(99, 118, 141, 1)'; // Primary 400/500
const yinminBlue = 'rgba(73, 80, 112, 1)'; // Primary 600/700
// const spaceCadet = 'rgba(22, 24, 23, 1)'; // Primary 800/900

const fireBrick = 'rgba(191, 33, 33, 1)'; // Error 500/600
const pigmentGreen = 'rgba(74, 160, 59, 1)'; // Success 500/600

const transparentWhite = 'rgba(255, 255, 255, 0.1)'; // Transparent White 10%
// const transparentGray = 'rgba(154, 155, 150, 0.1)'; // Transparent Gray 10%
// const transparentJet = 'rgba(40, 42, 38, 0.1)'; // Transparent Jet 10%
// const transparentEerie = 'rgba(22, 24, 23, 0.1)'; // Transparent Eerie 10%
const transparentBlack = 'rgba(0, 0, 0, 0.1)'; // Transparent Black 10%

// const transparentSlate = 'rgba(99, 118, 141, 0.1)'; // Transparent Slate 10%
const transparentYinminBlue = 'rgba(73, 80, 112, 0.1)'; // Transparent Yinmin Blue 10%
// const transparentSpaceCadet = 'rgba(22, 24, 23, 0.1)'; // Transparent Space Cadet 10%

const transparentFireBrick = 'rgba(191, 33, 33, 0.1)'; // Transparent Fire Brick 10%
const transparentPigmentGreen = 'rgba(74, 160, 59, 0.1)'; // Transparent Pigment Green 10%

export interface CustomTheme {
  sidebar: {
    background: string;
    itemColor: string;
    hoverBackground: string;
    dividerColor: string;
    activeItemBackground: string;
  };
  header: {
    background: string;
    itemColor: string;
    searchBackground: string;
    searchHoverBackground: string;
    searchTextColor: string;
    searchPlaceholderColor: string;
  };
  text: {
    primary: string;
    secondary: string;
    disabled: string;
  };
  dashboard: {
    background: string;
    itemBackground: string;
    cardBackground: string;
  };
  person: {
    headerBackground: string;
    cardBackground: string;
  };
  colors: {
    buttonText: string;
    softBackground: {
      default: string;
      hover: string;
    };
    border: {
      subtle: string;
      medium: string;
    };
    divider: string;
    buttonPrimary: {
      hover: string;
    };
    states: {
      disabled: {
        color: string;
        background: string;
      };
    };
    success: string;
    danger: string;
    actionButton: {
      background: string;
      text: string;
      hover: string;
    };
    inputBackground: string;
    formCard: {
      background: string;
      border: string;
    };
    notification: {
      success: {
        background: string;
        text: string;
      };
      error: {
        background: string;
        text: string;
      };
    };
  };
  mode: 'dark' | 'light';
  charts: {
    colors: {
      points: string;
      pointBorder: string;
    };
  };
}

// Extended theme with our custom properties
export type ExtendedTheme = Theme & CustomTheme;

export const darkTheme: CustomTheme = {
  sidebar: {
    background: jet,
    itemColor: gray,
    hoverBackground: jet,
    dividerColor: jet,
    activeItemBackground: jet,
  },
  header: {
    background: jet,
    itemColor: gray,
    searchBackground: jet,
    searchHoverBackground: jet,
    searchTextColor: white,
    searchPlaceholderColor: gray,
  },
  text: {
    primary: white,
    secondary: gray,
    disabled: gray,
  },
  dashboard: {
    background: jet,
    itemBackground: eerie,
    cardBackground: eerie,
  },
  person: {
    headerBackground: yinminBlue,
    cardBackground: jet,
  },
  colors: {
    buttonText: white,
    softBackground: {
      default: transparentWhite,
      hover: transparentWhite,
    },
    border: {
      subtle: transparentWhite,
      medium: transparentWhite,
    },
    divider: transparentWhite,
    buttonPrimary: {
      hover: yinminBlue,
    },
    states: {
      disabled: {
        color: transparentWhite,
        background: transparentYinminBlue,
      },
    },
    success: pigmentGreen,
    danger: fireBrick,
    actionButton: {
      background: yinminBlue,
      text: white,
      hover: jet,
    },
    inputBackground: transparentWhite,
    formCard: {
      background: jet,
      border: transparentWhite,
    },
    notification: {
      success: {
        background: pigmentGreen,
        text: white,
      },
      error: {
        background: fireBrick,
        text: white,
      },
    },
  },
  mode: 'dark',
  charts: {
    colors: {
      points: white,
      pointBorder: white,
    },
  },
};

export const lightTheme: CustomTheme = {
  sidebar: {
    background: white,
    itemColor: gray,
    hoverBackground: white,
    dividerColor: white,
    activeItemBackground: white,
  },
  header: {
    background: white,
    itemColor: gray,
    searchBackground: white,
    searchHoverBackground: white,
    searchTextColor: jet,
    searchPlaceholderColor: gray,
  },
  text: {
    primary: jet,
    secondary: gray,
    disabled: gray,
  },
  dashboard: {
    background: white,
    itemBackground: white,
    cardBackground: white,
  },
  person: {
    headerBackground: yinminBlue,
    cardBackground: jet,
  },
  colors: {
    buttonText: jet,
    softBackground: {
      default: transparentBlack,
      hover: transparentBlack,
    },
    border: {
      subtle: transparentBlack,
      medium: transparentBlack,
    },
    divider: transparentBlack,
    buttonPrimary: {
      hover: yinminBlue,
    },
    states: {
      disabled: {
        color: transparentBlack,
        background: transparentYinminBlue,
      },
    },
    success: pigmentGreen,
    danger: fireBrick,
    actionButton: {
      background: yinminBlue,
      text: white,
      hover: jet,
    },
    inputBackground: transparentBlack,
    formCard: {
      background: white,
      border: transparentBlack,
    },
    notification: {
      success: {
        background: transparentPigmentGreen,
        text: pigmentGreen,
      },
      error: {
        background: transparentFireBrick,
        text: fireBrick,
      },
    },
  },
  mode: 'light',
  charts: {
    colors: {
      points: jet,
      pointBorder: jet,
    },
  },
};
