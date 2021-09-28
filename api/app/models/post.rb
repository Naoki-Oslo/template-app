class Post < ApplicationRecord
    default_scope -> { order(created_at: :desc) }
    belongs_to :user, optional: true
      
    validates :title, presence: true
    validates :subject, presence: true
    validates :user_id, presence: true
    validates :content_ja, presence: true, length: { maximum: 400 }
    validates :content_en, presence: true, length: { maximum: 400 }
    validates :tips, length: { maximum: 400 }

    has_many :comments, dependent: :destroy
    has_many :likes, dependent: :destroy
    has_many :liked_users, through: :likes, source: :user
    has_many :favorites, dependent: :destroy
    has_many :favorited_users, through: :favorites, source: :user
end
