import {FC} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useSearchParams} from 'react-router-dom';


interface IProps {
    total_page: number;
    total_item: number;
}

const PaginationItem: FC<IProps> = ({total_item, total_page}) => {
    const [query, setQuery] = useSearchParams({skip: '0'});
    const currentSkip = Number(query.get('skip')) || 0;

    const handlePrevPage = () => {
        if (currentSkip - 5 >= 0) {
            setQuery({skip: (currentSkip - 5).toString()});
        }
    };

    const handleNextPage = () => {
        if (currentSkip + 5 <= total_item) {
            setQuery({skip: (currentSkip + 5).toString()});
        }
    };
    return (
        <div>
            <button disabled={currentSkip < 5} onClick={handlePrevPage}>
                PrevPage
            </button>
            <button disabled={currentSkip > total_item - 5} onClick={handleNextPage}>
                NextPage
            </button>


            <Stack spacing={1}>
                <Pagination count={total_item} variant="outlined" shape="rounded"/>
            </Stack>

        </div>
    );
};

export {PaginationItem};