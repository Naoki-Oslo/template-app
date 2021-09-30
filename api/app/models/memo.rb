class Memo < ApplicationRecord
  default_scope -> { order(created_at: :desc) }
  belongs_to :user, optional: true

  validates :title, presence: true
  validates :subject, presence: true
  validates :user_id, presence: true
  validates :content_ja, presence: true, length: { maximum: 400 }
  validates :content_en, presence: true, length: { maximum: 400 }
  validates :tips, length: { maximum: 400 }
end
