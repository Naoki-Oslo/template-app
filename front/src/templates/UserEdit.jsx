import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextInput, PrimaryButton } from 'components/UIkit/index';
import { getUser } from 'reducks/currentUser/selectors';
import { updateUserProfile } from 'reducks/currentUser/operations';
import { ImageUpload } from 'components/Users/index';
import { getUserId } from 'reducks/currentUser/selectors';
import { ImagePreview } from 'components/Users/index';
 
const UserEdit = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const currentUser = getUser(selector);
    const uid = getUserId(selector);

    const [name, setName] = useState(""),
          [occupation, setOccupation] = useState(""),
          [organization, setOrganization] = useState(""),
          [preview, setPreview] = useState(),
          [image, setImage] = useState(),
          [profile, setProfile] = useState(""),
          [email, setEmail] = useState(""),
          [password, setPassword] = useState(""),
          [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        setName(currentUser.name)
        setOccupation(currentUser.occupation)
        setOrganization(currentUser.organization)
        setImage(currentUser.image)
        setProfile(currentUser.profile)
    },[]);

    const deleteImage = useCallback(() => {
        const ret = window.confirm('画像を削除しますか？');
        if (!ret) {
            return false
        } else {
            const newImage = ""
            setImage(newImage)
        }
      }, []);

    // 子コンポーネントに渡すときはuseCallback関数(メモ化)を使うとパフォーマンスが上がる。
    const inputName = useCallback((event) => {
        setName(event.target.value)
    }, [setName]);

    const inputOccupation = useCallback((event) => {
        setOccupation(event.target.value)
    }, [setOccupation]);

    const inputOrganization = useCallback((event) => {
        setOrganization(event.target.value)
    }, [setOrganization]);

    const inputProfile = useCallback((event) => {
        setProfile(event.target.value)
    }, [setProfile]);

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    }, [setEmail]);
    
    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    }, [setPassword]);
    
    const inputConfirmPassword = useCallback((event) => {
        setConfirmPassword(event.target.value)
    }, [setConfirmPassword]);

    const inputImage = useCallback((event) => {
        const file = event.target.files[0]
        setImage(file)
        setPreview(window.URL.createObjectURL(file))
    }, [setImage]);
  
    // FormData形式でデータを作成
    const createFormData = () => {
      const formData = new FormData()
      if (image) formData.append("image", image)  
      return formData
    }


    return (
        <section>
            <h2 className="u-text__headline u-text-center">アカウント編集</h2>
            <div className="c-section-container">
                <ImagePreview preview={preview} onChange={inputImage} delete={deleteImage}/>
                <div className="module-spacer--medium" />
                <ImageUpload image={image} setImage={setImage} onChange={inputImage}/>
                <TextInput
                    fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
                    rows={1} value={name} type={"text"} onChange={inputName}
                />
                <TextInput
                    fullWidth={true} label={"職種"} multiline={false} required={false}
                    rows={1} value={occupation} type={"text"} onChange={inputOccupation}
                />
                <TextInput
                    fullWidth={true} label={"組織名"} multiline={false} required={false}
                    rows={1} value={organization} type={"text"} onChange={inputOrganization}
                />
                <TextInput
                    fullWidth={true} label={"プロフィール"} multiline={true} required={false}
                    rows={5} value={profile} type={"text"} onChange={inputProfile}
                />
                <TextInput
                    fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                    rows={1} value={email} type={"email"} onChange={inputEmail}
                />
                <TextInput
                    fullWidth={true} label={"パスワード"} multiline={false} required={true}
                    rows={1} value={password} type={"password"} onChange={inputPassword}
                />
                <TextInput
                    fullWidth={true} label={"パスワード(再確認)"} multiline={false} required={true}
                    rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
                />
                <div className="module-spacer--medium" />
                <div className="center">
                    <PrimaryButton
                        label={"更新する"}
                        onClick={() => dispatch(updateUserProfile( uid, name, occupation, organization, profile, email, password, confirmPassword, createFormData() ))}
                    />
                </div>
            </div>
        </section>
    )
};

export default UserEdit;