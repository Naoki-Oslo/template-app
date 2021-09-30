require 'rails_helper'

RSpec.describe Post, type: :model do
  describe '#create' do
    let(:post) { build(:post) }

    context '投稿を保存会できる場合' do
      it '正しく保存できること' do
        example_post = FactoryBot.create(:post)
        expect(example_post).to be_valid
      end
    end

    context '投稿を保存できない場合' do
      it 'タイトルが空欄だと保存できないこと' do
        post.title = ''
        expect(post).to be_invalid
      end

      it 'タイトルが30文字以上だと保存できないこと' do
        post.title = 'a' * 31
        expect(post).to be_invalid
      end

      it 'カテゴリーが空欄だと保存できないこと' do
        post.category = ''
        expect(post).to be_invalid
      end

      it 'テンプレ(英語)が空欄だと保存できないこと' do
        post.content_en = ''
        expect(post).to be_invalid
      end

      it 'テンプレ(英語)が200文字以上だと保存できないこと' do
        post.content_en = 'a' * 200
        expect(post).to be_invalid
      end

      it 'テンプレ(日本語)が空欄だと保存できないこと' do
        post.content_ja = ''
        expect(post).to be_invalid
      end

      it 'テンプレ(日本語)が200文字以上だと保存できないこと' do
        post.content_ja = 'あ' * 200
        expect(post).to be_invalid
      end

      it '補足が空欄だと保存できないこと' do
        post.tips = ''
        expect(post).to be_invalid
      end

      it '補足が200文字以上だと保存できないこと' do
        post.tips = 'あ' * 200
        expect(post).to be_invalid
      end
    end
  end
end
