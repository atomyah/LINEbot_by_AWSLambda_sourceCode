const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();

const line = require('@line/bot-sdk');
const client = new line.Client({
    channelAccessToken: process.env.ACCESS_TOKEN
});


exports.handler = async event => {
    console.log('◆EVENT:', event);

    try {
        /*------------------------------------------------------------------
        DynamoDBのtipsテーブルをdocClient.scanでスキャンしItem総数を得て総数の内の
        ランダムな整数を獲得。それをcallTipAndTalk()に渡してTip文章を取得.
        -------------------------------------------------------------------*/
        const scan_params = {
            TableName: 'tips',
            Select: "COUNT"     // アイテム総数を返すパラメーター. `aws dynamodb scan --table-name tips --select COUNT`
        };

        const scanItem = await docClient.scan(scan_params).promise();
        const length = scanItem["Count"];
        console.log('◆length:', length);
        const randomNum = Math.floor(Math.random() * length);
        console.log('◆randomNum:', randomNum);

        /*------------------------------------------------------------------
        DynamoDBのtipsテーブルからdocClient.getでひとつTip文章を取得. SQLに例えれ
        ば、select Tip from tips where ID = randomNum と同じことをしている.
        -------------------------------------------------------------------*/        
        const queryItem = await docClient.get({
            TableName: 'tips',
            Key: {'ID': randomNum}  // SQLのwhere条件文にあたるパラメーター
        }).promise();

        console.log('◆queryItem:', queryItem);
        const TipText = queryItem.Item.Tip
        console.log('◆TipText:', TipText);

        /*------------------------------------------------------------------
        DynamoDBのfollowersテーブルからdocClient.scanで全件取得. SQLに例えれ
        ば、select * from followers. 取得したuserIdをuserID_list配列にpushで格納
        -------------------------------------------------------------------*/         
        let userID_list = [process.env.USER_ID] // userID_list配列に初期値としてとりあえず自分のuserIdを代入.
        await docClient.scan({
            TableName: 'followers',
        }, function(err, data) {
            if(err){
                console.log(err)
            }else{
                data.Items.forEach(function(Follower, index) {
                    console.log('■Follower：', Follower);
                    console.log('■FollowerUID：', Follower.Follower);
                    userID_list.push(Follower.Follower);
                    console.log('■userID_list', userID_list);
                })
            }
        });


        if(TipText){
            const postData =  {
                "type": "text",
                "text": TipText
            }
            try {
                //await client.replyMessage(messageData.replyToken, postData);
                //await client.pushMessage(process.env.USER_ID, postData);
                await client.multicast(userID_list, postData) // マルチキャスト送信
            } catch (error) {
                console.log(error)
            }
        } 

    } catch (err) {
        console.error(`[Error]: ${JSON.stringify(err)}`);
        return err;
    }    

}
