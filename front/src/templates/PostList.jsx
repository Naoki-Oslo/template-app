import React, { useEffect, useState } from 'react';
import { PostCard } from "components/Posts/index";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "reducks/posts/selectors";
import { fetchPosts } from 'reducks/posts/operations';
import { PaginationButtons } from 'components/UIkit/index';
import { getCategories } from 'reducks/categories/selectors';
import { fetchCategories } from 'reducks/categories/operations';

const PostList = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state)
    const posts = getPosts(selector)
    const categories = getCategories(selector)

    const query = window.location.search
    const category_id = /^\?category=/.test(query) ? query.split('?category=')[1] : ""
    const category = (category_id !== "") ? categories.find((element) => element.id === Number(category_id)) : ""


    const [page, setPage] = useState(1);
    const [start, setStart] = useState(0);
    const perPage = 12;

    const calculatePageCount = () => {
        return Math.ceil((posts.length / perPage) - 1)
       };

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchPosts(category))
    },[query])

    useEffect(() => {
        let pageNumber = page; //選択されたページ番号
        const position = pageNumber * perPage;
        setStart(position);  //スタート位置をページ番号 * 1ページあたりの数、とする(例えば2番を選ぶと12 * 1で12番が先頭になる、つまり13番目以降の書籍が表示される)
    },[page])

    return (
        <div>
            <section>
                <div className="c-section-container"></div>
                <h2 className="u-text__headline u-text-center">テンプレート一覧</h2>
                <div className="module-spacer--medium" />
            </section>
            <section className="c-section-wrapin">
                <div className="p-grid__row">
                    {posts.length > 0 && (
                        posts.slice(start, start + perPage).map(post => (
                            <PostCard
                                id={post.id} key={post.id} title={post.title} category={post.category} subject={post.subject} 
                                contentEnglish={post.content_en} contentJapanese={post.content_ja}
                                tips={post.tips}
                            />
                        ))
                    )}
                </div>
            </section>
            <div className="module-spacer--medium" />
            <PaginationButtons
                pageCount={calculatePageCount()}
                page={page}
                setPage={setPage}
            />
        </div>
    );
};

export default PostList;