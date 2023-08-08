import {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {ITestString} from '../../interfaces';
import {mainAction} from '../../Store/slice';
import {handleChange} from '../../utils';
import { FormInput2 } from '../FormInput/FormInput2';

const initialValue: ITestString = {
    result: '',
}
const ChangeString: FC = () => {
    const dispatch = useAppDispatch();
    const {test_string} = useAppSelector(state => state.mainReducer);
    const [data, setData] = useState<ITestString>(initialValue);

    const handleInputChange = (
        event: React.ChangeEvent<HTMLInputElement>) =>
        handleChange<ITestString>(event, setData);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(mainAction.change_string(data.result))
    };

    return (
        <div>
            <h3>ChangeString</h3>
            <h3>Test string: {test_string}</h3>
            <form onSubmit={handleSubmit}>
                <FormInput2 name="result" value={data.result} onChange={handleInputChange}/>
                <button type="submit">Change string</button>
            </form>

        </div>
    );
};

export {ChangeString};