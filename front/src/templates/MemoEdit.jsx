import React, { useCallback, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { PrimaryButton, SelectBox, TextInput } from "components/UIkit";
import { useDispatch, useSelector } from "react-redux";
import { updateMemo } from "reducks/memos/operations";
import { deleteMemo } from 'reducks/memos/operations';
import { createPost } from 'reducks/posts/operations';
import { getCategories } from 'reducks/categories/selectors';
import { getMemos } from 'reducks/memos/selectors';
import { getUserId } from 'reducks/currentUser/selectors';

const useStyles = makeStyles({
    row: {
        display: 'flex',
        justifyContent: 'space-around',
    },
})
const PostEdit = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const id = window.location.pathname.split('/memos/edit/')[1];
    const selector = useSelector((state) => state);
    const categoriesData = getCategories(selector);
    const memos = getMemos(selector);
    const uid = getUserId(selector);
    const memo = memos.find((element) => element.id === Number(id))

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
        setTitle(memo.title)
        setSubject(memo.subject)
        setCategory(memo.category)
        setContentEnglish(memo.content_en)
        setContentJapanese(memo.content_ja)
        setTips(memo.tips)
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
        <section>
            <h2 className="u-text__headline u-text-center">メモの編集・更新</h2>
            <div className="c-section-container">
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
                    onChange={inputContentEnglish} rows={5} value={contentEnglish} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={"Japanese(和訳)"} multiline={true} required={true}
                    onChange={inputContentJapanese} rows={5} value={contentJapanese} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={"説明/補足"} multiline={true} required={false}
                    onChange={inputTips} rows={5} value={tips} type={"text"}
                />
                <div className="module-spacer--small"/>
                <div className={classes.row}>
                    <PrimaryButton
                        label={"更新する"}
                        onClick={() => dispatch(updateMemo( uid, id, title, subject, category, contentEnglish, contentJapanese, tips ))}
                    />
                    <PrimaryButton
                        label={"投稿する"}
                        onClick={() => {dispatch(createPost( uid, id, title, subject, category, contentEnglish, contentJapanese, tips )), dispatch(deleteMemo(id))}}
                    />
                </div>
            </div>
        </section>
    );
};

export default PostEdit;