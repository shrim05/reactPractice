import React, { useEffect, useState } from 'react';

const HistorySample = ({history}) => {
    const handleGoBack = () =>{
        history.goBack();
    }
    
    const handleGoHome = () =>{
        history.push('/');
    }
    
    //componentDidMount
    useEffect( ()=>{
       const unblock = history.block('정말 떠나시나요?');
       //componentWillUnmount
       return () => {
           unblock();
       };
        },[history]
    );

    return (
        <div>
            <button onClick={handleGoBack}>뒤로</button>
            <button onClick={handleGoHome}>홈으로</button>
        </div>
    );
};

export default HistorySample;