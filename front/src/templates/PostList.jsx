import React, { useEffect, useState } from 'react';
import { PostCard, SearchTextField } from "components/Posts/index";
import { useSelector, useDispatch } from "react-redux";
import { getPosts } from "reducks/posts/selectors";
import { fetchPosts } from 'reducks/posts/operations';
import { fetchPostsAction } from 'reducks/posts/actions';
import { ImageSwiper, PaginationButtons } from 'components/UIkit/index';
import { getCategories } from 'reducks/categories/selectors';
import { fetchCategories } from 'reducks/categories/operations';
import sample1 from 'assets/img/src/sample1.jpg';
import sample2 from 'assets/img/src/sample2.jpg';
import sample3 from 'assets/img/src/sample3.jpg';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    error: {
        color: "#000",
    }
});

const PostList = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const selector = useSelector(state => state)
    let posts = getPosts(selector)
    const categories = getCategories(selector)
    console.log(posts)

    const query = window.location.search
    const category_id = /^\?category=/.test(query) ? query.split('?category=')[1] : ""
    const category = (category_id !== "") ? categories.find((element) => element.id === Number(category_id)) : ""

    const images = [{id: 1, src: sample1}, {id: 2, src: sample2}, {id: 3, src: sample3}];
    const [page, setPage] = useState(1);
    const [start, setStart] = useState(0);
    const perPage = 12;

    const calculatePageCount = () => {
        return Math.ceil((posts.length / perPage) - 1)
    };

    useEffect(() => {
        let pageNumber = page; //選択されたページ番号
        const position = (pageNumber - 1) * perPage;
        setStart(position);  //スタート位置をページ番号 * 1ページあたりの数、とする(例えば2番を選ぶと12 * 1で12番が先頭になる、つまり13番目以降の書籍が表示される)
    },[page])

    useEffect(() => {
        dispatch(fetchCategories())
        dispatch(fetchPosts(category))
    },[query]);

    return (
        <div>
            <div className="c-section-swiper">
                <ImageSwiper images={images}/>
            </div>
            <section>
                <h2 className="u-text__headline u-text-center">テンプレート一覧</h2>
                <div className="module-spacer--medium" />
                <SearchTextField posts={posts} onClick={(filteredPosts) => dispatch(fetchPostsAction(filteredPosts))}/>
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
                    {posts.length === 0 && (
                        <h2 className={classes.error}>該当するテンプレートがありませんでした</h2>
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