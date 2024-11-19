import ReactPlayer from 'react-player';
import { Box, useTheme, Typography, Stack } from '@mui/material';

const Camera = () => {
    const theme = useTheme();
    return (
        <Box
            sx={{
                borderRadius: 5,
                position: 'relative',
                boxShadow: theme.shadows[4],
                backgroundColor: theme.palette.common.white,
                height: 'min-content',
            }}
        >
            <Typography variant="subtitle1" color="text.primary" p={2.5}>
                Live 
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row', md: 'column' }}>
                <Stack direction="row" justifyContent="center" flex={'1 1 0%'}>
                    <ReactPlayer justifySelf="center"
                        url="https://www.youtube.com/watch?v=6RU2SQITBH8"
                        width="854px"
                        height="480px"
                        controls
                        playing
                        light
                    />
                </Stack>
            </Stack>
            
        </Box>
    );
};

export default Camera;
