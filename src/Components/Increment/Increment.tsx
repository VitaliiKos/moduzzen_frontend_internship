import {FC} from 'react';
import {useAppDispatch, useAppSelector } from '../../hooks';
import { mainAction } from '../../Store/slice';

const Increment: FC = () => {
    const {count} = useAppSelector(state => state.mainReducer);
    const dispatch = useAppDispatch();

    return (
        <div>
            <h3>Increment</h3>
            <div>
                <button onClick={() => dispatch(mainAction.inc())}>inc</button>
                <button onClick={() => dispatch(mainAction.dec())}>dec</button>
                <button onClick={() => dispatch(mainAction.reset())}>reset</button>
            </div>
            <h3>Count: {count}</h3>
        </div>
    );
};

export {Increment};