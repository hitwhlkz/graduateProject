const express = require('express');
const axios = require('axios');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// 使用 CORS 中间件
app.use(cors());
app.use(express.json()); // 解析 JSON 请求体

const username = 'bGt6X2hpdEBvdXRsb29rLmNvbQ';
const password = '4JKGibuw7b5faPUGpo1xn';
const encodedCredentials = Buffer.from(`${username}:${password}`).toString('base64');

const createOptions = {
  method: 'POST',
  url: 'https://api.d-id.com/images',
  headers: {
    accept: 'application/json',
    'content-type': 'multipart/form-data', // 这里不需要指定 boundary
    authorization: `Basic ${encodedCredentials}`
  }
};

// 处理图像上传
app.post('/uploadImage', async (req, res) => {
  try {
    console.log('Received image upload request');

    // 解析 base64 图片数据
    const base64Image = req.body.image;
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    const buffer = Buffer.from(base64Data, 'base64');

    // 将图像数据写入临时文件
    const tempFilePath = `uploads/image_${Date.now()}.jpg`;
    fs.writeFileSync(tempFilePath, buffer);

    // 发送请求到 API
    const response = await axios.post(createOptions.url, {
      image: fs.createReadStream(tempFilePath) // 注意这里传递了文件流
    }, {
      headers: createOptions.headers
    });

    // 返回 API 的响应
    console.log('API response:', response.data);
    res.json(response.data);

    // 删除临时文件
    fs.unlinkSync(tempFilePath);
  } catch (error) {
    console.error('Upload Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
