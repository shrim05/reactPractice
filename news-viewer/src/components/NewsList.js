import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 700px;
    margin: 0 auto;
    marign-top: 2rem;

    
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
    }
`;

const NewsList = ({category}) => {
    const [loading, response, error] = usePromise(()=>{
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(
            'https://newsapi.org/v2/top-headlines?' +
            'country=kr'+query+
            '&apiKey=54b4bab30bff4e14a4a215758ab56b89',
        )
    },[category])
    
    if(loading) {
        return <NewsListBlock>로딩중...</NewsListBlock>
    }
    if(!response){
        return null;
    }
    if(error){
        return <NewsListBlock>에러발생</NewsListBlock>
    }
    const {articles} = response.data;
    return (
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
};

export default NewsList;