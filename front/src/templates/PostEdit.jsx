import React, { useCallback, useEffect, useState } from 'react';
import { PrimaryButton, SelectBox, TextInput } from "components/UIkit";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "reducks/posts/operations";
import { getCategories } from 'reducks/categories/selectors';
import { getPosts } from 'reducks/posts/selectors';
import { getUserId } from 'reducks/currentUser/selectors';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
    postTime: {
        textAlign: 'right',
        fontSize: 12,
    }
});

const PostEdit = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const id = window.location.pathname.split('/posts/edit/')[1];
    const selector = useSelector((state) => state);
    const categoriesData = getCategories(selector);
    const posts = getPosts(selector);
    const uid = getUserId(selector);
    const post = posts.find((element) => element.id === Number(id))
    const postTime = post.updated_at.split('T')[0];

    const [title, setTitle] = useState(""),
          [subject, setSubject] = useState(""),
          [category, setCategory] = useState(""),
          [categories, setCategories] = useState([]),
          [contentEnglish, setContentEnglish] = useState(""),
          [contentJapanese, setContentJapanese] = useState(""),
          [tips, setTips] = useState("");
    
    useEffect(() => {
        setCategories(categoriesData)
    },[])

    useEffect(() => {
        setTitle(post.title)
        setSubject(post.subject)
        setCategory(post.category)
        setContentEnglish(post.content_en)
        setContentJapanese(post.content_ja)
        setTips(post.tips)
    },[])
          
    const inputTitle = useCallback((event) => {
        setTitle(event.target.value)
    }, [setTitle])

    const inputSubject = useCallback((event) => {
        setSubject(event.target.value)
    }, [setSubject])

    const inputContentEnglish = useCallback((event) => {
        setContentEnglish(event.target.value)
    }, [setContentEnglish])

    const inputContentJapanese = useCallback((event) => {
        setContentJapanese(event.target.value)
    }, [setContentJapanese])

    const inputTips = useCallback((event) => {
        setTips(event.target.value)
    }, [setTips])


    return (
        <>
            <h2 className="u-text__headline u-text-center">テンプレートの編集・更新</h2>
            <div className="c-section-container">
                <div className={classes.postTime}>
                     投稿日 : {postTime}
                </div>
                <TextInput
                    fullWidth={true} label={"タイトル"} multiline={false} required={true}
                    onChange={inputTitle} rows={1} value={title} type={"text"}
                />
                <SelectBox
                    label={"カテゴリー"} options={categories} required={true} select={setCategory} value={category}
                />
                <TextInput
                    fullWidth={true} label={"件名"} multiline={true} required={true}
                    onChange={inputSubject} rows={1} value={subject} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={"English(英訳)"} multiline={true} required={true}
                    onChange={inputContentEnglish} rows={8} value={contentEnglish} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={"Japanese(和訳)"} multiline={true} required={true}
                    onChange={inputContentJapanese} rows={8} value={contentJapanese} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={"説明/補足"} multiline={true} required={false}
                    onChange={inputTips} rows={8} value={tips} type={"text"}
                />
                <div className="module-spacer--small"/>
                <div className="center">
                    <PrimaryButton
                        label={"更新する"}
                        onClick={() => dispatch(updatePost( uid, id, title, subject, category, contentEnglish, contentJapanese, tips ))}
                    />
                </div>
            </div>
        </>
    );
};

export default PostEdit;