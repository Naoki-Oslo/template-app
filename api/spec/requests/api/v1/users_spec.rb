require 'rails_helper'

RSpec.describe 'Users', type: :request do
  describe '#index' do
    it '全てのユーザーを取得する' do
      FactoryBot.create_list(:user, 10)

      get '/api/v1/users'
      json = JSON.parse(response.body)

      # リクエスト成功を表す200が返ってきたか確認する。
      expect(response.status).to eq(200)

      # 正しい数のデータが返されたか確認する。
      expect(json['data'].length).to eq(10)
    end
  end

  describe '#update' do
    it 'userの編集を行う' do
      user = create(:user, occupation: 'System Engineer')

      put "/api/v1/users/#{user.id}", params: { user: { occupation: 'System Engineer' } }
      json = JSON.parse(response.body)

      # リクエスト成功を表す200が返ってきたか確認する。
      expect(response.status).to eq(200)

      # データが更新されている事を確認
      expect(json['data']['occupation']).to eq('System Engineer')
    end
  end

  describe '#delete' do
    it 'userを削除する' do
      user = create(:user)

      # データが削除されている事を確認
      expect { delete "/api/v1/users/#{user.id}" }.to change(User, :count).by(-1)

      # リクエスト成功を表す200が返ってきたか確認する。
      expect(response.status).to eq(200)
    end
  end
end
