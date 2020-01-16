import React, { useState } from 'react';

const IterationPractice = () => {
    const [names, setNames] = useState([
        {id:1, text:'1번'},
        {id:2, text:'2번'},
        {id:3, text:'3번'}
    ]);
    const [inputText, setInputText] = useState('');
    const [nextId, setNextId]  = useState('4');
    const onChange = e => setInputText(e.target.value);
    const onClick = () => {
        const nextNames = names.concat({
            id: nextId,
            text : inputText
        });
        setNextId(nextId+1);
        setNames(nextNames);
        setInputText('');
    };
    const onRemove = id => {
        const nextNames = names.filter(name => name.id !== id);
        setNames(nextNames);
    }
    const nameList = names.map(name => (
        <li key={name.id} onDoubleClick= {() => onRemove(name.id)}>
            {name.text}
        </li>
    ));
    return (
        <div>
            <input value={inputText} onChange={onChange} />
            <button onClick={onClick}>add</button> 
            <ul>{nameList}</ul>
        </div>
    );
};

export default IterationPractice;