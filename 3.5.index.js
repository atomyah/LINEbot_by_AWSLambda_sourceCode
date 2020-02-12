const line = require('@line/bot-sdk');

//LINEアクセストークン設定
const client = new line.Client({
    channelAccessToken: process.env.ACCESS_TOKEN
});

exports.handler = async event => {
    console.log('◆EVENT:', event);

    const postData =  {
            "type": "text",
            "text": "CloudWatch Eventテスト"
    }

    try {
        //    await client.replyMessage(messageData.replyToken, postData);
            await client.pushMessage(process.env.USER_ID, postData);
    } catch (error) {
        console.log(error)
    }
};