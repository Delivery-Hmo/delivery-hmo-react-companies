import { useMemo } from 'react';
import { Grid } from "antd";

const { useBreakpoint } = Grid;

const useIsSmallScreen = () => {
  const { xs, sm, md, lg, xl, xxl } = useBreakpoint();

  const isSmallScreen = useMemo(() => {
    return (xs || sm) && (!md && !lg && !xl && !xxl);
  }, [xs, sm, md, lg, xl, xxl]);

  return isSmallScreen;
}

export default useIsSmallScreen;