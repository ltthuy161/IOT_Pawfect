import Grid from '@mui/material/Unstable_Grid2';
import { Stack } from '@mui/material';
import { ReactElement } from 'react';

import Camera from '../../components/dashboard/pages/Camera';
import { drawerWidth } from '../../layouts/main-layout';
import LaserInfoCards from '../../components/dashboard/pages/LaserMonitorCards';

const LiveFeed = (): ReactElement => {
  return (
    <Grid
      container
      component="main"
      columns={12}
      spacing={3.75}
      flexGrow={1}
      pt={4.375}
      pr={1.875}
      pb={0}
      sx={{
        width: { md: `calc(100% - ${drawerWidth}px)` },
        pl: { xs: 3.75, lg: 0},
      }}
    >
        <Stack
        direction={{ xs: 'column', sm: 'row', lg: 'column' , md: 'column'}}
        gap={0}
        height={1}
        width={1}
        >
        <Grid xs={12}>
        <LaserInfoCards />
        </Grid>
        <Camera />
        </Stack>
      </Grid>
  );
};

export default LiveFeed;
