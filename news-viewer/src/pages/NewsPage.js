import React from 'react';
import NewsList from '../components/NewsList';
import Categories from '../Categories';

const NewsPage = ({match}) => {
    const category = match.params.category || 'all';
    return (
        <div>
            <Categories />
            <NewsList category={category} />
        </div>
    );
};

export default NewsPage;