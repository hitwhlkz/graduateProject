const express = require('express');
const axios = require('axios');
const cors = require('cors'); // 引入 CORS 中间件

const app = express();
const PORT = process.env.PORT || 3000;

// 使用 CORS 中间件
app.use(cors());
app.use(express.json()); // 解析 JSON 请求体

// 获取 access_token
app.get('/getAccessToken', async (req, res) => {
  try {
    const apiKey = req.query.apiKey;
    const secretKey = req.query.secretKey;
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
    const response = await axios.post(`https://aip.baidubce.com/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/completions?access_token=${accessToken}`, { messages: [message] });
    res.json(response.data);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
