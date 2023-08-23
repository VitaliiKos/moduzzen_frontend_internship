import {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useNavigate} from 'react-router-dom';
import {SubmitHandler, useForm} from 'react-hook-form';
import {ICompany} from '../../interfaces';
import {joiResolver} from '@hookform/resolvers/joi';
import {companyValidator} from '../../validators';
import {companyActions} from '../../Store/slice';
import {RouterEndpoints} from '../../routes';
import {FormInput} from '../FormInput/FormInput';

interface IProps {
    onClose: () => void;
}

const CompanyCreateForm: FC<IProps> = ({onClose}) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {error, companyForUpdate} = useAppSelector(state => state.companyReducer);

    const {handleSubmit, setValue, formState: {errors, isValid}, register, reset} = useForm<ICompany>({
        mode: 'onChange',
        resolver: joiResolver(companyValidator)
    });

    useEffect(() => {
        if (companyForUpdate) {
            setValue('email', companyForUpdate.email)
            setValue('name', companyForUpdate.name)
            setValue('phone', companyForUpdate.phone)
            setValue('status', companyForUpdate.status)
        }
    }, [companyForUpdate, setValue])
    const createCompany: SubmitHandler<ICompany> = async (company) => {
        const {meta: {requestStatus}} = await dispatch(companyActions.creteCompany(company));

        if (requestStatus === 'fulfilled') {
            onClose()

            navigate(`/${RouterEndpoints.profile}/${RouterEndpoints.myCompanies}`);
            dispatch(companyActions.getMyCompanies({query: {skip: 0}}));
        }
        reset()
    };

    const update: SubmitHandler<ICompany> = async (company) => {
        const {meta: {requestStatus}} = await dispatch(companyActions.updateCompany({id: Number(companyForUpdate!.id), company}))
        if (requestStatus === 'fulfilled') {
            onClose()

            navigate(`/${RouterEndpoints.profile}/${RouterEndpoints.myCompanies}/${companyForUpdate!.id}`);
            dispatch(companyActions.getById({id:Number(companyForUpdate!.id)}));
        }
        reset()

    };

    return (
        <>
            <h2>Create</h2>
            <form onSubmit={handleSubmit(companyForUpdate ? update : createCompany)}>
                <div>
                    <FormInput name={'email'} register={register}/>
                    <FormInput name={'name'} register={register}/>
                    <FormInput name={'phone'} register={register}/>
                    <FormInput name={'status'} register={register}/>
                </div>
                <button disabled={!isValid}>{companyForUpdate ? 'Update' : 'Save'}</button>

                {Object.keys(errors).length > 0 && <div>{Object.values(errors)[0].message}</div>}
                {error && <div>{error.detail}</div>}

            </form>
        </>
    );
};

export {CompanyCreateForm};