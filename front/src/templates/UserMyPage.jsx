import React from 'react';
import { push } from 'connected-react-router';
import { useSelector, useDispatch } from "react-redux";
import { SecondaryButton, TextDetail } from "components/UIkit";
import { getCurrentUser } from "reducks/currentUser/selectors";

const UserMyPage = () => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const currentUser = getCurrentUser(selector);
    
//    const currentUserPosts = userPosts.filter(userPost => {
//        return userPost.uid === userId
//    })

//   画像の有無に応じた表示切り替えをreturn先頭に挿入する
//   <div class="my-auto">
//    <% if @user.image? %>
//      <%= image_tag @user.image.url, class: "large-icon" %>
//    <% else %>
//      <%= image_tag asset_path('default_user.png'), class: "large-icon" %>
//    <% end %>
//    <p class="text-lg text-black my-2"><%= @user.name %></p>
//    <p class="text-xs my-2">職種：<%= @user.occupation %></p>
//   </div>

    return (
        <div>
            <div>

            </div>
            <section className="c-section-container">
                <h2 className="u-text__headline u-text-center">マイページ</h2>
                <div className="module-spacer--medium" />
                <TextDetail label="ユーザー名" value={currentUser.username} />
                <TextDetail label="プロフィール" value={currentUser.profile} />
                <div className="module-spacer--small" />
            </section>
            <div className="center">
                <SecondaryButton
                    label={"編集する"}
                    onClick={() => dispatch(push('/users/edit/' + String(currentUser.uid)))}
                />
            </div>
            <div className="module-spacer--medium" />
            <div className="my-5 bg-white rounded-md text-xs hover:shadow-2xl transition duration-500 ease-in-out">
                <ul className="tab-group">
                    <li className="tab is-active rounded-md">投稿一覧</li>
                    <li className="tab rounded-md">いいねした投稿</li>
                    <li className="tab rounded-md">お気に入り</li>
                </ul>
            </div>
        </div>
    );
};

export default UserMyPage;