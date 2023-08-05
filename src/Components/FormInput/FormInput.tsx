import {FC} from 'react';


interface IProps {
    name: string;
    type?: string;
    register?: any;
}

const FormInput: FC<IProps> = ({name = '', type = 'text', register}) => {
    return (
        <div>
                <label>
                    <input type={type} name={name} placeholder={name} {...register(name)}/>
                </label>
        </div>
    );
};

export {FormInput};