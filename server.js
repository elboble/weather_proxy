const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();  // 加载 .env 文件

const app = express();
const port = process.env.PORT || 3000;

// 和风天气API配置
const QWEATHER_API = {
  key: process.env.QWEATHER_API_KEY,
  geoUrl: process.env.QWEATHER_GEO_URL,
  weatherUrl: process.env.QWEATHER_WEATHER_URL
};

// 启用CORS
app.use(cors());

// 地理位置查询接口
app.get('/api/geo/lookup', async (req, res) => {
  try {
    const response = await axios.get(QWEATHER_API.geoUrl, {
      params: {
        location: req.query.location || '114.344247,30.56125'
      },
      headers: {
        'X-QW-Api-Key': QWEATHER_API.key
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('地理位置查询失败:', error);
    res.status(500).json({ error: '地理位置查询失败' });
  }
});

// 天气查询接口
app.get('/api/weather/now', async (req, res) => {
  try {
    const response = await axios.get(QWEATHER_API.weatherUrl, {
      params: {
        location: req.query.location || '101200111'
      },
      headers: {
        'X-QW-Api-Key': QWEATHER_API.key
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('天气查询失败:', error);
    res.status(500).json({ error: '天气查询失败' });
  }
});

app.listen(port, () => {
  console.log(`Weather proxy server running at http://localhost:${port}`);
});