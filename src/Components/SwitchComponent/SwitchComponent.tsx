import {FC, useEffect, useState} from 'react';
import Switch from '@mui/material/Switch';
import {useAppDispatch} from '../../hooks';
import {companyActions} from '../../Store/slice';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


interface IProps {
    company_status: boolean
    company_id: number
}

const SwitchComponent: FC<IProps> = ({company_status, company_id}) => {
    const dispatch = useAppDispatch();
    const [checked, setChecked] = useState(company_status);

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
        await dispatch(companyActions.updateCompanyStatus({company_id}))
        dispatch(companyActions.getById({id: Number(company_id)}))

    };


    return (
        <Stack direction="row" spacing={1} alignItems="center">

            <Typography>Off</Typography>
            <Switch
                checked={checked}
                defaultChecked={company_status}
                onChange={handleChange}
                inputProps={{'aria-label': 'controlled'}}
            />
            <Typography>On</Typography>
        </Stack>

    );
};

export {SwitchComponent};