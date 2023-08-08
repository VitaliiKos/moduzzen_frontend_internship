import {FC} from 'react';
import {FieldValues, UseFormRegister } from 'react-hook-form';
import { ILoginUser } from '../../interfaces';


interface IProps {
    name: string;
    type?: string;
    register: UseFormRegister<ILoginUser & FieldValues>;
}

const FormInput: FC<IProps> = ({name = '', type = 'text', register}) => {
    return (
        <div>
                <label>
                    <input type={type}  placeholder={name} {...register(name)}/>
                </label>
        </div>
    );
};

export {FormInput};