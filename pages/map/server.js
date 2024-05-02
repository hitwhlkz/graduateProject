const express = require('express');
const axios = require('axios');
const https = require('https');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 使用 CORS 中间件
app.use(cors());
app.use(express.json()); // 解析 JSON 请求体

const username = 'aGl0d2hsa3pAZ21haWwuY29t';
const password = 'AkciCr1RMw9FQdEpzAWlZ';
const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

const createOptions = {
  method: 'POST',
  hostname: 'api.d-id.com',
  path: '/talks',
  headers: {
    accept: 'application/json',
    'content-type': 'application/json',
    authorization: `Basic ${encodedCredentials}`
  }
};

const getStatusOptions = (talkId) => ({
  method: 'GET',
  hostname: 'api.d-id.com',
  path: `/talks/${talkId}`,
  headers: {
    accept: 'application/json',
    authorization: `Basic ${encodedCredentials}`
  }
});

async function createTalk(imageUrl,text) {
	console.log('creatTalk imgurl',imageUrl);
  return new Promise((resolve, reject) => {
    const req = https.request(createOptions, function (res) {
		console.log(res);
      let chunks = '';
      res.on('data', function (chunk) {
        chunks += chunk;
      });

      res.on('end', function () {
        const body = JSON.parse(chunks);
        if (body.id) {
          resolve(body.id);
        } else {
          reject(new Error('Talk ID not found'));
        }
      });
    });

    req.on('error', function (error) {
      reject(error);
    });

    // Updated request body format with valid image URL and script content
    const postData = JSON.stringify({
      source_url: imageUrl,
      script: {
        type: 'text',
        input: text,
        "provider": {
              "type": "elevenlabs",
              "voice_id": "g5CIjZEefAph4nQFvHAz"
            }
      },
      config: {
        fluent: false,
        pad_audio: 0.0
      }
    });

    req.write(postData);
    req.end();
  });
}

async function getTalkStatus(imageUrl,talkId) {
  return new Promise((resolve, reject) => {
    const req = https.request(getStatusOptions(talkId), function (res) {
      let chunks = '';

      res.on('data', function (chunk) {
        chunks += chunk;
      });

      res.on('end', function () {
        const body = JSON.parse(chunks);
        if (body.status === 'done' && body.result_url) {
          resolve(body.result_url);
        } else {
          reject(new Error(`Video URL not ready yet. Status: ${body.status}`));
        }
      });
    });

    req.on('error', function (error) {
      reject(error);
    });

    req.end();
  });
}

// 获取 access_token
app.get('/getAccessToken', async (req, res) => {
  try {
    const apiKey = req.query.apiKey;
    const secretKey = req.query.secretKey;
    console.log('Request for access token with API key:', apiKey);
    const response = await axios.get(`https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=${apiKey}&client_secret=${secretKey}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching access token:', error);
    res.status(500).json({ error: 'Failed to obtain access token' });
  }
});

// 发送消息
app.post('/sendMessage', async (req, res) => {
  try {
    const accessToken = req.query.accessToken;
    const message = req.body.messages[0]; // 获取消息对象
    console.log('Sending message:', message.content);
    const response = await axios.post(`https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${accessToken}`, { messages: [message] });
    res.json(response.data);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// 生成视频
app.post('/generateVideo', async (req, res) => {
  try {
    const text = req.body.text;
	const imageUrl = req.body.imageUrl
	console.log('imgurl:',imageUrl)
    console.log('Creating talk with text:', text);
    const talkId = await createTalk(imageUrl,text);
	console.log('talkid:',talkId);
    let retries = 0;
    const maxRetries = 10;
    while (retries < maxRetries) {
      retries++;
      try {
        const videoUrl = await getTalkStatus(imageUrl,talkId);
        console.log('Video URL:', videoUrl);
        res.json({ videoUrl });
        return; // Exit the function if video URL is successfully obtained
      } catch (error) {
        console.log(`Retry ${retries}/${maxRetries}: Video is not ready yet.`);
        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
      }
    }

    console.error('Max retries reached. Video URL not available.');
    res.status(500).json({ error: 'Max retries reached. Video URL not available.' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
