require "test_helper"

class Api::V1::CommentsControllerTest < ActionDispatch::IntegrationTest
  test "should get comment:text" do
    get api_v1_comments_comment:text_url
    assert_response :success
  end
end
