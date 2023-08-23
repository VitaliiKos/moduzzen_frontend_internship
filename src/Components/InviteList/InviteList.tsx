import {FC} from 'react';
import {useSearchParams} from 'react-router-dom';

import {IMYInvites} from '../../interfaces';
import {useAppDispatch} from '../../hooks';
import {mainAction} from '../../Store/slice';
import {Invite, PaginationItem} from '..';
import css from './inviteList.module.css'


interface IProps {
    invites: IMYInvites[] ,
    total_item: number,
    total_page: number,
    current_company_id: number|null,
}

const InviteList: FC<IProps> = ({invites, total_item, total_page, current_company_id}) => {
    const dispatch = useAppDispatch();

    const [query] = useSearchParams({page: '1'});
    const pageQueryParam = query.get('page');
    const current_page = pageQueryParam !== null ? parseInt(pageQueryParam, 10) : 1;


    const selectedPage = (page: string | number) => {
        dispatch(mainAction.setSkip(page))
    }

    return (
        <div>
            <PaginationItem total_page={total_page} total_item={total_item} current_page={current_page}
                            selectedPage={selectedPage}
            />
            <div className={css.inviteWrapper}>
                {
                    invites.map(invite => <Invite key={invite.id} invite={invite} current_company_id={current_company_id}/>)
                }
            </div>
        </div>
    );
};

export {InviteList};