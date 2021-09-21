class Api::V1::LikesController < ApplicationController
    def create
        @post = Post.find(params[:post_id])
        if @post.user_id != current_user.id
          @like = current_user.likes.build(post_id: params[:post_id])
          @like.save
          redirect_to post_path(@post)
        end
        @post.create_nortification_like(current_user)
    end
    
    def destroy
        @post = Post.find(params[:post_id])
        @like = Like.find_by(user_id: current_user.id, post_id: params[:post_id]).destroy
        redirect_to post_path(@post)
    end
end
