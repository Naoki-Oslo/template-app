class Api::V1::FavoritesController < ApplicationController
    def create
        @post = Post.find(params[:post_id])
        if @post.user_id != current_user.id
          @favorite = current_user.favorites.build(post_id: params[:post_id])
          @favorite.save
          redirect_to post_path(@post)
        end
    end
    
    def destroy
        @post = Post.find(params[:post_id])
        @favorite = Favorite.find_by(user_id: current_user.id, post_id: params[:post_id]).destroy
        redirect_to post_path(@post)
    end
end
