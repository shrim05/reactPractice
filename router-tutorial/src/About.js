import React from 'react';
import qs from 'qs';

const About = ({location}) => {
    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true
    });
    const showDetail = query.detail === 'true';
    return (
        <div>
            <h1>소개페이지</h1>
            <p>리액트 라우터 기초 실습 예제 프로젝트</p>
            {showDetail && <p>detail값 = true</p>}
            {showDetail ? <p>true</p>:<p>detail값 = false</p>}
        </div>
    );
};

export default About;