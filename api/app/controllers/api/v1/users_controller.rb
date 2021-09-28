class Api::V1::UsersController < ApplicationController
    #before_action :authenticate_api_v1_user!

      def index
        users = User.all.select('id', 'name', 'occupation', 'profile', 'image')
        render json: { status: 'SUCCESS', message: 'Loaded the post', data: users}
      end
    
      def show
        user = User.find(params[:id])
        render json: user
      end

      def destroy
        User.find(params[:id]).destroy
        render json: {}, status: ok
      end

      def update
        user = User.find(params[:id])
        if user.update(user_params)
            render json: { status: 'SUCCESS', data: user}
        else
            render json: { status: 'ERROR', data: user.errors }
        end
      end

    private
        
    def current_api_v1_user
      @user = current_api_v1_user
      render json: { status: 'SUCCESS', message: 'Loaded the user', data: @user }
    end

  
    def user_params
      params.require(:user).permit(:id, :name, :email, :occupation, :organization,
                                    :password, :password_confirmation, :image, :profile)
    end
end
