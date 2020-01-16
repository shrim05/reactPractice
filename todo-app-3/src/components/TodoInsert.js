import React, { useState, useCallback, useRef } from "react";
import { MdAdd } from "react-icons/md";
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {

  const [value, setValue] = useState('');
  const insertInput = useRef(null);

  const onChange = useCallback(e => {
    setValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
      e => {
          onInsert(value);
          setValue('');
          e.preventDefault();
          insertInput.current.focus();
      },[onInsert,value]
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        className="inputForAdd"
        placeholder="추가할 항목을 입력하세요"
        value={value}
        onChange={onChange}
        ref={insertInput}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};

export default TodoInsert;
