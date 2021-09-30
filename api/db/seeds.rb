# メインのサンプルユーザーを1人作成する
User.create!(
    name:  "Admin",
    email: "example@yourtemplate.com",
    occupation: "Web Engineer",
    organization: "YourTemplate",
    profile: "Nice to meet you. Happy to join this service.",
    password:              "password",
    password_confirmation: "password",
admin: true
)

# 追加のユーザーをまとめて生成する
99.times do |n|
    name  = Faker::Name.name
    email = "example-#{n+1}@yourtemplate.com"
    occupation = "Web Engineer"
    organization = "YourTemplate"
    profile = "I just joined this service."
    password = "password"
    User.create!( 
                  name:  name,
                  email: email,
                  occupation: occupation,
                  organization: organization,
                  profile: profile,
                  password:              password,
                  password_confirmation: password)
end

Category.create!(name: "問合せ・見積り")
Category.create!(name: "注文・受領")
Category.create!(name: "支払い")
Category.create!(name: "契約")
Category.create!(name: "依頼・申請")
Category.create!(name: "会議・イベント")
Category.create!(name: "アポイントメント")
Category.create!(name: "出張")
Category.create!(name: "クレーム")
Category.create!(name: "案内・通知")
Category.create!(name: "社外の挨拶")
Category.create!(name: "その他")


require "csv"

CSV.foreach('db/csv/templates.csv', headers: true) do |row|
  Post.create(
    title: row['title'],
    subject: row['subject'],
    category: row['category'],
    user_id: row['user_id'],
    content_ja: row['content_ja'],
    content_en: row['content_en'],
    tips: row['tips']
  )
end