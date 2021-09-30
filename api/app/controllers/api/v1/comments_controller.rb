class Api::V1::CommentsController < ApplicationController
  def index
    @comments = Comment.all.includes(:user).order(created_at: :desc)
    render json: { status: 'SUCCESS', message: 'Loaded comments', data: @comments }
  end

  def create
    @post = Post.find_by(params[:post_id])
    @comment = @post.comments.new(comment: params[:comment], post_id: params[:post_id], user_id: params[:user_id])
    render json: { status: 'SUCCESS', message: 'A comment was created', data: @comment } if @comment.save
  end

  def destroy
    @comment = Comment.find_by(id: params[:id], post_id: params[:post_id])
    @comment.destroy!
    render json: {}, status: ok
  end
end
