class Api::V1::CategoriesController < ApplicationController
    def index
        @categories = Category.all
        render json: { status: 'SUCCESS', message: 'Loaded categories', data: @categories}
    end
end
