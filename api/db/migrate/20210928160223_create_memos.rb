class CreateMemos < ActiveRecord::Migration[6.1]
  def change
    create_table :memos do |t|
      t.text :content_ja, null: false
      t.text :content_en, null: false
      t.string :category, null: false
      t.string :title, null: false
      t.text :tips, null: false
      t.string :subject, null: false

      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
    add_index :memos, %i[user_id created_at]
  end
end
