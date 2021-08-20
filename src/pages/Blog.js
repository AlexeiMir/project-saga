import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

const Blog = () => {
    const dispatch = useDispatch()
    const blogData = useSelector(store => store.app.blog)

    console.log('blogData', blogData)
    /*useEffect(() => {
        dispatch({type:'LOAD_BLOG_DATA'})
    }, [])*/

    return (
        <div>
            Blog
            <div>
                <button onClick={() => {dispatch({type:'LOAD_SOME_DATA'})}}>Load some data</button>
            </div>

        </div>
    );
};

export default Blog;
