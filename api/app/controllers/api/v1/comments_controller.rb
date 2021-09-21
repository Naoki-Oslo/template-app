class Api::V1::CommentsController < ApplicationController

  def index
    @post = Post.find_by(params[:post_id])
    @comments = @post.comments.all.includes(:user).order(created_at: :desc)
    if @comments.length >= 0
      render json: { status: 'SUCCESS', message: 'Loaded comments', data: @comments}
    end
  end

  def create
    @post = Post.find_by(params[:post_id])
    @comment = @post.comments.new(comment: params[:comment], post_id: params[:post_id], user_id: params[:user_id])
    if @comment.save
      render json: { status: 'SUCCESS', message: 'A comment was created', data: @comment }
    end
  end

  def destroy
    @comment = Comment.find_by(id: params[:id], post_id: params[:post_id])
    @comment.destroy!
    render json: {}, status: ok
  end

end
