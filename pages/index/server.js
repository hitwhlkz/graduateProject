const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 添加 CORS 中间件，允许所有来源的请求访问
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// POST /pipeline
app.post('/pipeline', async (req, res) => {
  const { words } = req.body;

  try {
    // 调用您提供的 API，传入文本内容
    const response = await axios.post('http://localhost:10364/pipeline', {
      words: words
    });

    // 假设返回的 response.data 是视频文件的 URL
    const videoUrl = response.data;

    // 返回视频文件的 URL
    res.json({ video_url: videoUrl });
  } catch (error) {
    console.error('Error generating video:', error.message);
    res.status(500).json({ error: 'Failed to generate video' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
