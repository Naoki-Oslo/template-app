class ApplicationController < ActionController::API
    include DeviseTokenAuth::Concerns::SetUserByToken
    #skip_before_action :verify_authenticity_token, if: :devise_controller?  # APIではCSRFチェックをしない
    before_action :skip_session
    #helper_method :current_user, :user_signed_in?

    protected
        def skip_session
            request.session_options[:skip] = true
        end
end
