const line = require('@line/bot-sdk');

//LINEアクセストークン設定
const client = new line.Client({
    channelAccessToken: process.env.ACCESS_TOKEN
});

exports.handler = async event => {
    console.log('◆EVENT:', event);
    const event_data = JSON.parse(event.body);
    console.log('◆EVENT.BODY:', JSON.stringify(event_data));
    const messageData = event_data.events && event_data.events[0];
    console.log("◆USERID:" + JSON.stringify(messageData.source.userId));
    console.log ("◆TYPE:" + messageData.type);

    if (messageData.type == 'follow') {
        console.log("◆USERID:" + JSON.stringify(messageData.source.userId + 'が友達追加'));
    } else if (messageData.type == 'unfollow') {
        console.log("◆USERID:" + JSON.stringify(messageData.source.userId + 'が友達削除'));
    } else if (messageData.type == 'message') {

        const postData =  {
            "type": "text",
            "text": 'このボットは応答に対応していませんm(__)m'
        }
        try {
            await client.replyMessage(messageData.replyToken, postData);
        } catch (error) {
            console.log(error)
        }
    } else {
        return;
    }
};