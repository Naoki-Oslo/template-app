FactoryBot.define do
  factory :user do
    name { 'NS' }
    sequence(:email) { |n| "TEST#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
    occupation { 'Web Engineer' }
    profile { 'Nice to meet you.' }
  end
end
