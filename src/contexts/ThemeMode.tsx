import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Grommet, ThemeType } from 'grommet';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'themeMode';
const DARK_QUERY = '(prefers-color-scheme: dark)';

// Storage can be missing or throw, for example in a private window.
const readOverride = (): ThemeMode | null => {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'light' || value === 'dark' ? value : null;
  } catch (error) {
    return null;
  }
};

const writeOverride = (mode: ThemeMode) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, mode);
  } catch (error) {
    // The choice then lasts only until the page reloads.
  }
};

const systemMode = (): ThemeMode =>
  window.matchMedia && window.matchMedia(DARK_QUERY).matches ? 'dark' : 'light';

type ThemeModeValue = { mode: ThemeMode; toggle: () => void };

const ThemeModeContext = createContext<ThemeModeValue | undefined>(undefined);

export const useThemeMode = (): ThemeModeValue => {
  const value = useContext(ThemeModeContext);
  if (value === undefined) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return value;
};

type Props = { children: ReactNode; theme: ThemeType };

// The server always renders light, because it cannot know the visitor's
// choice. The browser switches in an effect, so hydration matches.
export const ThemeModeProvider = ({ children, theme }: Props): JSX.Element => {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    setMode(readOverride() || systemMode());

    if (!window.matchMedia) return;
    const query = window.matchMedia(DARK_QUERY);
    const onChange = () => {
      if (!readOverride()) setMode(systemMode());
    };
    // Safari before 14 has only addListener.
    query.addListener(onChange);
    return () => query.removeListener(onChange);
  }, []);

  const toggle = useCallback(() => {
    setMode(current => {
      const next = current === 'dark' ? 'light' : 'dark';
      writeOverride(next);
      return next;
    });
  }, []);

  return (
    <ThemeModeContext.Provider value={{ mode, toggle }}>
      <Grommet full theme={theme} themeMode={mode}>
        {children}
      </Grommet>
    </ThemeModeContext.Provider>
  );
};
