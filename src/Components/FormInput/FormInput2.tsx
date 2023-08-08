import {FC, ChangeEvent} from 'react';

interface IProps {
    name: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
}

const FormInput2: FC<IProps> = ({name = '', value = '', onChange, type = 'text', placeholder = ''}) => {
    return (
        <div>
            <label>
                <input type={type} name={name} value={value} onChange={onChange} placeholder={name}/>
            </label>

        </div>
    );
};

export {FormInput2};