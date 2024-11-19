import { ReactElement } from 'react';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import Image from '../../../components/base/Image';

type HumidInfoProps = {
    image?: string;
    title: string;
    value: number;
    date?: string;
};

const HumidInfo = ({ image, title, value, date }: HumidInfoProps): ReactElement => {
    return (
        <Card
            sx={(theme) => ({
                boxShadow: theme.shadows[4],
                width: 1,
                height: 'auto',
            })}
        >
            <CardMedia
                sx={{
                    maxWidth: 70,
                    maxHeight: 50,
                }}
            >
                <Image src={`${image}`} width={1} height={1} />
            </CardMedia>
            <CardContent
                sx={{
                    flex: '1 1 auto',
                    padding: 0,
                    ':last-child': {
                        paddingBottom: 0,
                    },
                }}
            >
                <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap">
                    <Typography variant="subtitle1" component="p" minWidth={100} color="text.primary">
                        {title}
                    </Typography>
                    
                    <Typography variant="body2" component="p" color="text.secondary">
                        {date}
                    </Typography>
                </Stack>
                <Typography variant="body1" component="p" color="text.secondary">
                    {value}
                </Typography>
                
            </CardContent>
        </Card>
    );
};

export default HumidInfo;
