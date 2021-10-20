# YourTemplate

「YourTemplate」は英語定型文をシェア、管理できる無料アプリです！基本機能はログイン無しで閲覧可能ですので、お気軽にご利用ください。（ゲストログインも用意してあります！）

リンク：https://your-template.net

![スクリーンショット 2021-10-20 21 48 22](https://user-images.githubusercontent.com/67878526/138095935-85f58c11-4992-4082-8a94-6b6251e5620b.png)


## 特に見ていただきたい点
### インフラ
- Dockerを使い、ECS(FARGATE)/ECRで本番環境をサーバーレスで運用している点
- AWSを使い、ALBを通すことで常時SSL通信を行っている点
- CircleCIを使い、CD/CDパイプラインを構築している点
### バックエンド面
- Ruby on RailsのAPIモードを利用し、APIサーバーとしてフロントエンドからのリクエストに対してJSONデータを返している点
- セッション認証を利用したログインを実装してる点
### フロントエンド面
- React.jsを採用し、SPA（シングルページアプリケーション）で配信している点
- UIフレームワークにMaterial-UIを使用し、整ったUIを意識している点
### その他
- フロント側ではESLint/Prettier、バック側でrubcopといったコード解析ツールを採用し読みやすいコードを意識している点
- チーム開発を意識し、issueやブランチを活用した開発手法を取り入れている点


## 使用した技術
### フロントエンド
- HTML/CSS
- Javascript
- React.js（SPAモード）
- Material-UI（UIフレームワーク）
- ESLint/Prettier（コード解析ツール）
### バックエンド
- Ruby 2.7.2
- Ruby on Rails 6.0.3 （APIモード）
- Rubocop（コード解析ツール）
- RSpec（テスト）
### インフラ・開発環境
- Docker/Docker-compose
- AWS（ECR,ECS,VPC,S3,Route53,ALB,RDS,ACM,SSM）
- CircleCI（CI/CD）


## ER図

![portfolio drawio](https://user-images.githubusercontent.com/67878526/138094535-cc5e5629-28d7-49a5-ac1e-006c2d8f8229.png)


## AWS構成図

![template-app](https://user-images.githubusercontent.com/67878526/138094985-547295f8-cfbe-45ff-81ed-f30f24646621.png)


## 機能一覧
- 新規登録・ログイン機能
- 投稿全体の閲覧
- 投稿詳細情報閲覧
- 新規投稿機能
- メモ機能
- 編集機能
- ユーザーマイページ表示（投稿・お気に入り・いいね・メモの表示）
- ソート機能（投稿をカテゴリから絞り込み）
- 検索機能(英単語による絞り込み)
- いいね機能（いいね後はハートに変わる）
- お気に入り機能（お気に入り後はスターに変わる）
- コメント投稿・編集・削除
- ユーザー登録情報変更（サムネ画像・プロフィール・メールアドレス・パスワード）
- ユーザー削除
- 管理者機能

