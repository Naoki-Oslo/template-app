FactoryBot.define do
  factory :post do
    title { 'a' * 30 }
    subject { 'a' * 30 }
    category { '問合せ・見積り' }
    content_en { 'a' * 199 }
    content_ja { 'あ' * 199 }
    tips { 'あ' * 199 }
    association :user
  end
end
