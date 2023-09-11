import {FC} from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

interface IProps {
    ratingScore: number
    precision: number
    countOfstars: number
}

const RatingStars: FC<IProps> = ({ratingScore, precision, countOfstars}) => {
    return (
        <Stack spacing={2}>
            <Rating name="half-rating-read" value={ratingScore / 10} precision={precision} readOnly
                    max={countOfstars} size='large'/>
        </Stack>);
};

export {RatingStars};