import React, { useCallback } from 'react';
import Counter from '../components/Counter';
import { useSelector, useDispatch } from 'react-redux';
import {increaseAsync, decreaseAsync} from '../modules/counter';

// const CounterContainer = ({increase, decrease, number}) => {
//     return (
//         <Counter number={number} onIncrease={increase} onDecrease={decrease} />
//     );
// };

// export default connect(
//     state => ({
//         number: state.counter
//     }),
//     {
//         increase,
//         decrease,
//     }
// )
// (CounterContainer);

const CounterContainer = () => {
    const number = useSelector(state => state.counter);
    const dispatch = useDispatch();
    const onIncrease = useCallback(()=> dispatch(increaseAsync()),[dispatch])
    const onDecrease = useCallback(()=> dispatch(decreaseAsync()),[dispatch])
    return (
        <Counter 
            number = {number}
            onIncrease={onIncrease}
            onDecrease={onDecrease}
        />
    );
};

export default CounterContainer;
