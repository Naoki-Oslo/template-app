import React, { useCallback, useEffect, useState } from 'react';
import { PrimaryButton, SelectBox, TextInput } from "components/UIkit";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "reducks/posts/operations";
import { getCategories } from 'reducks/categories/selectors';
import { fetchCategories } from 'reducks/categories/operations';
import { getUserId } from 'reducks/currentUser/selectors';

const PostNew = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const uid = getUserId(selector);
    const data = getCategories(selector);

    const [title, setTitle] = useState(""),
          [subject, setSubject] = useState(""),
          [category, setCategory] = useState(""),
          [categories, setCategories] = useState([]),
          [contentEnglish, setContentEnglish] = useState(""),
          [contentJapanese, setContentJapanese] = useState(""),
          [tips, setTips] = useState("");
    
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

    useEffect(() => {
        dispatch(fetchCategories())
        setCategories(data)
    },[])

    return (
        <section>
            <h2 className="u-text__headline u-text-center">テンプレートの作成</h2>
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
                    fullWidth={true} label={"English(英訳)"} multiline={false} required={true}
                    onChange={inputContentEnglish} rows={5} value={contentEnglish} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={"Japanese(和訳)"} multiline={false} required={true}
                    onChange={inputContentJapanese} rows={5} value={contentJapanese} type={"text"}
                />
                <TextInput
                    fullWidth={true} label={"説明/補足"} multiline={false} required={false}
                    onChange={inputTips} rows={5} value={tips} type={"text"}
                />
                <div className="module-spacer--small"/>
                <div className="center">
                    <PrimaryButton
                        label={"投稿する"}
                        onClick={() => dispatch(createPost( uid, title, subject, category, contentEnglish, contentJapanese, tips ))}
                    />
                </div>
            </div>
        </section>
    );
};

export default PostNew;