class Api::V1::PostsController < ApplicationController
  def create
    post = Post.create(post_params)
    if post.save
      render json: { status: 'SUCCESS', data: post }
    else
      render json: { status: 'ERROR', data: post.errors }
    end
  end

  def update
    post = Post.find(params[:id])
    post.update!(post_params)
    posts = Post.all
    render json: { status: 'SUCCESS', message: 'updated the post', data: post }
  end

  def index
    posts = Post.all.where(params[:category])
    comments = Comment.all.includes(:user).order(created_at: :desc)
    likes = Like.all
    render json: { status: 'SUCCESS', message: 'Loaded the posts', data: posts }
  end

  def destroy
    post = Post.find(params[:id])
    post.destroy!
    render json: { status: 'SUCCESS', message: 'deleted the post' }
  end

  private

  def post_params
    params.require(:post).permit(:id, :user_id, :title, :subject, :category, :content_en, :content_ja, :tips)
  end
end
