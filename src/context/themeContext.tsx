import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, CssBaseline, createTheme } from "@mui/material";
import Cookies from "js-cookie";
import { getDesignTokens } from "../components/theme";

type Mode = "light" | "dark";

interface ColorModeContextProps {
  toggleColorMode: () => void;
  mode: Mode;
}

const ColorModeContext = createContext<ColorModeContextProps>({
  toggleColorMode: () => {},
  mode: "light",
});

// eslint-disable-next-line react-refresh/only-export-components
export const useColorMode = () => useContext(ColorModeContext);

export const ColorModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<Mode>(
    (Cookies.get("themeMode") as Mode) || "light"
  );

  useEffect(() => {
    Cookies.set("themeMode", mode, { expires: 30 });
  }, [mode]);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};
