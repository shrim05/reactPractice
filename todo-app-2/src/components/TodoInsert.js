import React, { useState, useCallback, useRef } from 'react';
import './TodoInsert.scss';
import {MdAdd} from 'react-icons/md';

const TodoInsert = ({onInsert}) => {
    const [value, setValue] = useState('');

    const onChange = useCallback(e => {
        setValue(e.target.value);
    },[]);

    const onSubmit = useCallback(
        e => {
            onInsert(value);
            setValue('');
            e.preventDefault();
            input.current.focus();
        },
        [onInsert,value]
    );
    const input = useRef();

    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input placeholder="할 일 입력하세요"
                value={value}
                onChange={onChange}
                ref={input}
            />
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    );
};

export default TodoInsert;