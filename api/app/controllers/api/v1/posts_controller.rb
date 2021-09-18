class Api::V1::PostsController < ApplicationController
    #before_action :authenticate_api_v1_user!, only: [:index, :show, :edit, :create, :update, :destroy]

    def create
        @post = Post.create(post_params)
        if @post.save
          render json: { status: 'SUCCESS', data: @post}
        else
          render json: { status: 'ERROR', data: @post.errors }
        end
    end

    def update
        @post = Post.find(params[:id])
        @post.update!(post_params)
        @posts = Post.all
        render json: { status: 'SUCCESS', message: 'Loaded posts', data: @posts}
    end

    def index
        @posts = Post.all
        render json: { status: 'SUCCESS', message: 'Loaded posts', data: @posts}
    end

    def destroy
        post = Post.find(params[:id])
        post.destroy!
        render json: {}, status: ok
    end

    private

    def post_params
        params.require(:post).permit( :id, :user_id, :title, :subject, :category, :content_en, :content_ja, :tips )
    end
end