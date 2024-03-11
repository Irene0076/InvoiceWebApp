const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// 静的ファイルの配信設定（CSSなど）
app.use(express.static('public'));

// 仮の請求書データ
const invoiceData = {
  customerName: "株式会社ブラック企業",
  invoiceNumber: "IV00000001",
  companyName: "株式会社社畜",
  invoiceDate: "2024年02月25日",
  dueDate: "2024年03月25日",
  items: [
    {
      itemCode: "AA001",
      itemName: "処刑費",
      quantity: 5,
      unit: "通",
      unitPrice: 10000,
      taxRate: 10
    },
    {
      itemCode: "ZZ999",
      itemName: "精神損害補償",
      quantity: 1,
      unit: "通",
      unitPrice: 50,
      taxRate: 10
    }
  ]
};

// 請求書データを返すエンドポイント
app.get('/api/invoice', (req, res) => {
  res.json(invoiceData);
});

// ルートURLへのGETリクエストに対するレスポンスを追加
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'invoice.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
