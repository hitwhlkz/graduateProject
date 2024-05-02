const express = require('express');
const axios = require('axios');
const https = require('https');
const cors = require('cors');
const fs = require('fs');
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;

// 使用 CORS 中间件
app.use(cors());
app.use(express.json()); // 解析 JSON 请求体

const username = 'bGt6X2hpdEBvdXRsb29rLmNvbQ';
const password = '4JKGibuw7b5faPUGpo1xn';
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

const upload = multer({ dest: 'uploads/' });

// 上传图像并生成视频
app.post('/uploadImageAndGenerateVideo', upload.single('image'), async (req, res) => {
  try {
    console.log('Received image upload request');

    // 检查是否有文件上传
    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // 发送请求到 API 并获取图像 URL
    const imageUrl = await createImage(req.file.path);

    // 创建 Talk 并获取 Talk ID
    const talkId = await createTalk(imageUrl);

    // 获取生成视频的 URL
    const videoUrl = await getTalkStatus(talkId);

    // 返回视频 URL
    res.json({ videoUrl });
  } catch (error) {
    console.error('Upload and Generate Video Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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

// 创建 Talk
async function createTalk(imageUrl) {
  return new Promise((resolve, reject) => {
    const req = https.request(createOptions, function (res) {
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

    const postData = JSON.stringify({
      source_url: imageUrl,
      script: {
        type: 'text',
        input: 'Text for the video script',
        provider: {
          type: 'elevenlabs',
          voice_id: '21m00Tcm4TlvDq8ikWAM'
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

// 获取 Talk 状态
async function getTalkStatus(talkId) {
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

// 创建图像
async function createImage(imagePath) {
  return new Promise((resolve, reject) => {
    console.log('Sending create image request');

    const req = https.request(createOptions, function (res) {
      let chunks = '';

      res.on('data', function (chunk) {
        chunks += chunk;
      });

      res.on('end', function () {
        const body = JSON.parse(chunks);
        console.log('Received response from create image request:', body);
        if (body.url) {
          resolve(body.url);
        } else {
          reject(new Error('Image URL not found'));
        }
      });
    });

    req.on('error', function (error) {
      console.error('Request error:', error);
      reject(error);
    });

    // 读取文件并发送图像数据
    const fileStream = fs.createReadStream(imagePath);
    fileStream.pipe(req);

    // 结束请求
    fileStream.on('end', () => {
      req.end();
    });
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
