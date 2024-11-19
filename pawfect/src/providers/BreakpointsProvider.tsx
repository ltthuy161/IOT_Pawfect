import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Breakpoint } from '@mui/material';
import { useMediaQuery } from '@mui/material';

interface BreakpointContextInterface {
  currentBreakpoint: Breakpoint;
  up: (key: boolean) => string;
  down: (key: boolean) => string;
  only: (key: boolean) => string;
  between: (start: boolean, end: boolean) => string;
}

export const BreakpointContext = createContext({} as BreakpointContextInterface);

const BreakpointsProvider = ({ children }: PropsWithChildren) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('xs');
  const theme = useTheme();

  const up = (key: boolean) =>
    theme.breakpoints.up(key ? 'sm' : 'xs');

  const down = (key: boolean) =>
    theme.breakpoints.down(key ? 'sm' : 'xs');

  const only = (key: boolean) =>
    theme.breakpoints.only(key ? 'sm' : 'xs');

  const between = (start: boolean, end: boolean) =>
    theme.breakpoints.between(start ? 'sm' : 'xs', end ? 'md' : 'xs');

  const isXs = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));

  useEffect(() => {
    if (isXs) {
      setCurrentBreakpoint('xs');
    }
    if (isSm) {
      setCurrentBreakpoint('sm');
    }
    if (isMd) {
      setCurrentBreakpoint('md');
    }
    if (isLg) {
      setCurrentBreakpoint('lg');
    }
    if (isXl) {
      setCurrentBreakpoint('xl');
    }
  }, [isXs, isSm, isMd, isLg, isXl]);

  return (
    <BreakpointContext.Provider value={{ currentBreakpoint, up, down, only, between }}>
      {children}
    </BreakpointContext.Provider>
  );
};

export const useBreakpoints = () => useContext(BreakpointContext);

export default BreakpointsProvider;
