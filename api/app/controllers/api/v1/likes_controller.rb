class Api::V1::LikesController < ApplicationController

    def index
        @likes = Like.all
        render json: { status: 'SUCCESS', data: @likes}
    end

    def create
        @like = Like.create(like_params)
        @like.save
        render json: { status: 'SUCCESS', data: @like}
    end
    
    def destroy
        @like = Like.find(params[:id])
        @like.destroy
        render json: { status: 'SUCCESS', data: @like}
    end

    private
    def like_params
        params.require(:like).permit(:id, :user_id, :post_id)
    end
end
