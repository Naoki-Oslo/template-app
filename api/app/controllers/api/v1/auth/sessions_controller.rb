class Api::V1::Auth::SessionsController < ApplicationController
  def index
    user = current_api_v1_user
    render json: { status: 'SUCCESS', message: 'Loaded the user', data: user }
  end

  def sign_in_params
    params.require(:session).permit(:id, :email, :password)
  end
end
