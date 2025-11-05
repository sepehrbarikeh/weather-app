
import { createTheme } from "@mui/material/styles";
import type { ThemeOptions } from "@mui/material/styles";
import i18n from "../i18n";


export const getDesignTokens = (mode: "light" | "dark"): ThemeOptions => {
  const isLight = mode === "light";

  return {
    palette: {
      mode,
      custom: {
        mainBg: isLight ? "#F3FAFE" : "#151D32",
        loginBg: isLight ? "#FFFFFF" : "#292F45",
        cardBg: isLight ? "#E1E9EE" : "#292F45",
        forecasteBg: isLight ? "#CDD9E0" : "#3F4861",
        text: isLight ? "#003464" : "#F3F4F7",
        footerBgGradient: isLight
          ? ["#F3FAFE", "#CCDDDD9E", "#F3FAFE"]
          : ["#292F45", "#3F4861", "#151D32"],
      },
      background: {
        default: isLight ? "#F3FAFE" : "#151D32",
        paper: isLight ? "#FFFFFF" : "#292F45",
      },
      text: {
        primary: isLight ? "#003464" : "#F3F4F7",
        secondary: isLight ? "#315B7B" : "#C8D0E0",
      },
      primary: {
        main: isLight ? "#315B7B" : "#90CAF9",
      },
      secondary: {
        main: isLight ? "#688CA9" : "#B4C5DD",
      },
    },
    typography: {
      fontFamily:
        i18n.language === "fa"
          ? 'vazir, IRANSans, sans-serif'
          : 'Roboto, sans-serif',
      h1: { fontSize: "2.5rem", fontWeight: 700 },
      h2: { fontSize: "2rem", fontWeight: 600 },
      body1: { fontSize: "1rem", lineHeight: 1.8 },
    },
    shape: {
      borderRadius: 12,
    },
    spacing: 8,
  };
};


export const theme = createTheme(getDesignTokens("light"));


declare module "@mui/material/styles" {
  interface Palette {
    custom: {
      mainBg: string;
      loginBg: string;
      cardBg: string;
      forecasteBg: string;
      text: string;
      footerBgGradient: string[];
    };
  }
  interface PaletteOptions {
    custom?: {
      mainBg: string;
      loginBg: string;
      cardBg: string;
      forecasteBg: string;
      text: string;
      footerBgGradient: string[];
    };
  }
}
