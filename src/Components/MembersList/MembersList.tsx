import {FC} from 'react';
import {useSearchParams} from 'react-router-dom';

import {Member} from '..';
import {IMembers} from '../../interfaces/members.interface';
import {useAppDispatch} from '../../hooks';
import {mainAction} from '../../Store/slice';
import {PaginationItem} from '../PaginationItem/PaginationItem';
import css from './memberList.module.css';

interface IProps {
    members: IMembers[],
    total_item: number,
    total_page: number,
    company_id: number,
}

const MembersList: FC<IProps> = ({members, total_page, total_item, company_id}) => {

    const dispatch = useAppDispatch();

    const [query] = useSearchParams({page: '1'});
    const pageQueryParam = query.get('page');
    const current_page = pageQueryParam !== null ? parseInt(pageQueryParam, 10) : 1;


    const selectedPage = (page: string | number) => {
        dispatch(mainAction.setSkip(page))
    }

    return (
        <>
            <PaginationItem total_page={total_page} total_item={total_item} current_page={current_page}
                            selectedPage={selectedPage}
            />
            <div className={css.memberListWrapper}>
                {
                    members.map(member => <Member key={member.id} member={member} company_id={company_id}/>)
                }
            </div>
        </>
    );
};

export {MembersList};
