const express = require('express');
const app = express();
const PORT = 3000;

// 静的ファイルへのパスを設定
app.use(express.static('public'));

// ルートURLへのGETリクエストに対するレスポンス
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/invoice.html');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
