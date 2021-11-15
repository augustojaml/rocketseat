import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { theme } from './theme';

interface ICustomThemeProvider {
  children: ReactNode;
}

interface ICustomThemeContext {
  customTheme: typeof theme.dark | typeof theme.light;
  isActive: boolean;
  toggleTheme: () => void;
}

const CustomThemeContext = createContext({} as ICustomThemeContext);

const keyStorage = '@appGoBarber:theme';

function CustomThemeProvider({ children }: ICustomThemeProvider) {
  const [customTheme, setCustomTheme] = useState<
    typeof theme.dark | typeof theme.light
  >(theme.dark);
  const [isActive, setIsActive] = useState(false);

  function toggleTheme() {
    setIsActive(!isActive);
    if (customTheme === theme.dark) {
      setCustomTheme(theme.light);
      localStorage.setItem(keyStorage, 'light');
    } else {
      setCustomTheme(theme.dark);
      localStorage.setItem(keyStorage, 'dark');
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storage = localStorage.getItem(keyStorage);
      if (storage === null || storage === 'dark') {
        setCustomTheme(theme.dark);
        setIsActive(false);
      } else {
        setCustomTheme(theme.light);
        setIsActive(true);
      }
    }
  }, []);

  return (
    <>
      <CustomThemeContext.Provider
        value={{ customTheme, isActive, toggleTheme }}
      >
        {children}
      </CustomThemeContext.Provider>
    </>
  );
}

function useCustomTheme() {
  return useContext(CustomThemeContext);
}

export { CustomThemeProvider, useCustomTheme };
