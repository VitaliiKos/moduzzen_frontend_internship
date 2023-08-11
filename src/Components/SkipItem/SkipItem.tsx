import {FC, useEffect, useState} from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import {useAppDispatch} from '../../hooks';
import {mainAction} from '../../Store/slice';
import {useSearchParams} from 'react-router-dom';


const SkipItem: FC = () => {

    const [items, setItems] = useState('');
    const dispatch = useAppDispatch();
    const [, setQuery] = useSearchParams({page: '1'});

    const handleChange = (event: SelectChangeEvent) => {
        event.preventDefault()
        setItems(event.target.value);
        setQuery({page: '1'})
    };

    useEffect(() => {
        dispatch(mainAction.setLimit(items))
    }, [items, dispatch, setQuery]);

    return (
        <FormControl sx={{m: 1, minWidth: 180}} size="small">
            <InputLabel id="demo-select-small-label">Rows per page:
            </InputLabel>
            <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={items}
                label="Rows per page:"
                onChange={handleChange}
            >
                <MenuItem value="">
                </MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={5}>5</MenuItem>
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={20}>20</MenuItem>
                <MenuItem value={50}>50</MenuItem>
            </Select>
        </FormControl>
    );
}

export {SkipItem};