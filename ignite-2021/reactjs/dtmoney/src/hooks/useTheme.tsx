import { createContext, useContext, ReactNode, useState } from 'react';
import { themeDark, themeLight } from '../global/styles/theme';

interface CustomThemeProviderProps {
  children: ReactNode;
}

interface ThemeProps {
  mode?: 'light' | 'dark';
  toggleMode: () => void;
  theme: typeof themeDark | typeof themeLight;
}

const ThemeContext = createContext({} as ThemeProps);

function CustomThemeProvider({ children }: CustomThemeProviderProps) {
  const [mode, setMode] = useState<'light' | 'dark'>();
  const [theme, setTheme] = useState<typeof themeDark | typeof themeLight>(
    () => {
      const storageTheme = localStorage.getItem('@dtmoney:theme');
      if (storageTheme) {
        setMode('light');
        return themeDark;
      }

      setMode('dark');
      return themeLight;
    }
  );

  function toggleMode() {
    if (mode === 'light') {
      setTheme(themeLight);
      setMode('dark');
      localStorage.removeItem('@dtmoney:theme');
    } else {
      setTheme(themeDark);
      setMode('light');
      localStorage.setItem('@dtmoney:theme', 'themeDark');
    }
  }

  return (
    <>
      <ThemeContext.Provider value={{ mode, toggleMode, theme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}

function useTheme() {
  return useContext(ThemeContext);
}

export { CustomThemeProvider, useTheme };
