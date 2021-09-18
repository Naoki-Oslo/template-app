import React, { useEffect } from 'react';
import { PostCard } from "components/Posts/index";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "reducks/posts/selectors";
import { fetchPosts } from 'reducks/posts/operations';

const PostList = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state)
    const posts = getPosts(selector)

    useEffect(() => {
        dispatch(fetchPosts())
    },[])

    return (
        <section className="c-section-wrapin">
            <div className="p-grid__row">
                {posts.length > 0 && (
                    posts.map(post => (
                        <PostCard
                            id={post.id} key={post.id} title={post.title} category={post.category} subject={post.subject} 
                            contentEnglish={post.contentEnglish} contentJapanese={post.contentJapanese}
                            tips={post.tips}
                        />
                    ))
                )}
            </div>
        </section>
    );
};

export default PostList;