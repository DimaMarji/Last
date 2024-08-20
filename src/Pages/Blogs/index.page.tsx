import React from 'react';
import "./style.scss"
import BlogListContainer from './BlogList';
import BlogHeaderContainer from './BlogHeader';

const BlogsContainer = () => {

    return (

        <div className={"blogs-container"}>
            <BlogHeaderContainer/>
            <BlogListContainer/>
        </div>
    );
};

export default BlogsContainer;