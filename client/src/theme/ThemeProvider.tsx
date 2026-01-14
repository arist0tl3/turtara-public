import { useState, createContext, useContext, ReactNode } from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import { CustomTheme, darkTheme, lightTheme } from './theme';

interface ThemeContextType {
  theme: CustomTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: darkTheme,
  toggleTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<CustomTheme>(localStorage.getItem('theme') === 'light' ? lightTheme : darkTheme);

  const toggleTheme = () => {
    const newTheme = theme.mode === 'dark' ? lightTheme : darkTheme;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme.mode);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <CssVarsProvider defaultMode={theme.mode}>{children}</CssVarsProvider>
    </ThemeContext.Provider>
  );
}
