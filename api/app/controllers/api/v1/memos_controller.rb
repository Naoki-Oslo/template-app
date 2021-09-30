class Api::V1::MemosController < ApplicationController
  def create
    @memo = Memo.create(memo_params)
    if @memo.save
      render json: { status: 'SUCCESS', data: @memo }
    else
      render json: { status: 'ERROR', data: @memo.errors }
    end
  end

  def update
    @memo = Memo.find(params[:id])
    @memo.update!(memo_params)
    render json: { status: 'SUCCESS', message: 'Loaded posts', data: @memo }
  end

  def index
    @memos = Memo.all.where(params[:user_id])
    render json: { status: 'SUCCESS', message: 'Loaded posts', data: @memos }
  end

  def destroy
    memo = Memo.find(params[:id])
    memo.destroy!
    render json: { status: 'SUCCESS' }
  end

  private

  def memo_params
    params.require(:memo).permit(:id, :user_id, :title, :subject, :category, :content_en, :content_ja, :tips)
  end
end
