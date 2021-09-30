require 'rails_helper'

RSpec.describe 'Posts', type: :request do
  let(:user) { create(:user) }

  describe '#index' do
    it '全てのポストを取得する' do
      FactoryBot.create_list(:post, 10)

      get '/api/v1/posts'
      json = JSON.parse(response.body)

      # リクエスト成功を表す200が返ってきたか確認する。
      expect(response.status).to eq(200)

      # 正しい数のデータが返されたか確認する。
      expect(json['data'].length).to eq(10)
    end
  end

  describe '#create' do
    it '新しいpostを作成する' do
      valid_params = { title: 'aaa', subject: 'aaa', category: '問合せ・見積り', content_en: 'aaaaaa',
                       content_ja: 'aaaaaa', tips: 'aaaaaa', user_id: user.id }

      # データが作成されている事を確認
      expect { post '/api/v1/posts', params: { post: valid_params } }.to change(Post, :count).by(+1)

      # リクエスト成功を表す200が返ってきたか確認する。
      expect(response.status).to eq(200)
    end
  end

  describe '#update' do
    it 'postの編集を行う' do
      post = create(:post, title: 'aaa', subject: 'aaa', category: '問合せ・見積り', content_en: 'aaaaaa',
                           content_ja: 'aaaaaa', tips: 'aaaaaa')

      put "/api/v1/posts/#{post.id}", params: { post: { title: 'bbb' } }
      json = JSON.parse(response.body)

      # リクエスト成功を表す200が返ってきたか確認する。
      expect(response.status).to eq(200)

      # データが更新されている事を確認
      expect(json['data']['title']).to eq('bbb')
    end
  end

  describe 'delete' do
    it 'postを削除する' do
      post = create(:post)

      # データが削除されている事を確認
      expect { delete "/api/v1/posts/#{post.id}" }.to change(Post, :count).by(-1)

      # リクエスト成功を表す200が返ってきたか確認する。
      expect(response.status).to eq(200)
    end
  end
end
