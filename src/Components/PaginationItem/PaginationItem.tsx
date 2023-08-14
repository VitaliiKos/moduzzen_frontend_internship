import {ChangeEvent, FC, useEffect} from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import {useSearchParams} from 'react-router-dom';

import {useAppDispatch} from '../../hooks';
import {mainAction} from '../../Store/slice';


interface IProps {
    total_page: number;
    total_item: number;
    current_page: number;
    selectedPage: (page: number) => void;
}

const PaginationItem: FC<IProps> = ({total_page, current_page, selectedPage}) => {
    const dispatch = useAppDispatch();
    const [, setQuery] = useSearchParams({page: '1'});

    const handleChange = (event: ChangeEvent<unknown>, page: number) => {
        event.preventDefault()
        dispatch(mainAction.setSkip(page))
        setQuery({page: page.toString()})
        selectedPage(page)
    }
    useEffect(() => {
        selectedPage(current_page)

    }, [current_page, selectedPage]);

    return (
        <div>
            <Stack spacing={1}>
                <Pagination
                    color={'primary'}
                    count={total_page < 10 ? total_page : 10}
                    variant="outlined"
                    shape="circular"
                    boundaryCount={2}
                    onChange={handleChange}
                    page={current_page > total_page ? 1 : current_page}
                />
            </Stack>
        </div>
    );
};

export {PaginationItem};