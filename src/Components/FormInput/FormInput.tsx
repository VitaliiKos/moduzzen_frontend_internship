import {FC} from 'react';
import {FieldValues, UseFormRegister} from 'react-hook-form';
import {ICompany, ILoginUser, IUser} from '../../interfaces';
import {
    IQuizAnswerForUpdate,
    IQuizCreateRequest,
    IQuizForUpdate,
    IQuizFullResponse,
    IQuizQuestionForUpdate
} from '../../interfaces/quiz.interface';


interface IProps {
    name: string,
    type?: string,
    placeholder?: string,
    checked?: boolean,
    register: UseFormRegister<ILoginUser & FieldValues> | UseFormRegister<IUser & FieldValues> | UseFormRegister<ICompany & FieldValues> | UseFormRegister<IQuizFullResponse & FieldValues> | UseFormRegister<IQuizCreateRequest & FieldValues> | UseFormRegister<IQuizForUpdate & FieldValues> | UseFormRegister<IQuizQuestionForUpdate & FieldValues> | UseFormRegister<IQuizAnswerForUpdate & FieldValues>,
}

const FormInput: FC<IProps> = ({name = '', type = 'text', register, placeholder = '', checked}) => {
    return (
        <div>
            <label>
                <input type={type} placeholder={placeholder ? placeholder : name} {...register(name)}
                       checked={checked}/>
            </label>
        </div>
    );
};

export {FormInput};

