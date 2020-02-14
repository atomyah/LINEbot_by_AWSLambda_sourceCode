![表紙forAWSLambdaでLINEbot_small](https://user-images.githubusercontent.com/31606808/74501496-b199f100-4f2d-11ea-9b95-b1f821bf7790.jpg)

<br>

#### アーキテクチャ図

![アーキテクチャ図forGitHub](https://user-images.githubusercontent.com/31606808/74501826-b0b58f00-4f2e-11ea-8631-db20bd4d068e.png)

<br>

- 3.4.index.js 　3.4 LINEボットをプログラミングしてLambdaにアップロード
- 3.5.index.js 　3.5 CloudWatch Eventsでauto_talkを定期的に実行
- 3.6.index.js 　3.5 CloudWatch Eventsでauto_talkを定期的に実行（3.5.index.jsにtipsArrayを追加したもの）
- 4.2.index.js 　4.2 DynamoDBを利用したLambdaへ！
- 5.1.index.js 　Section5.1 FollowerのIDを取得するLambdaを作成
- 5.2.index.js 　Section5.2 FollowerのUserIDをDynamoDBに保存
- 5.3.index.js 　Section5.3 友達全員へトーク文をマルチキャスト
