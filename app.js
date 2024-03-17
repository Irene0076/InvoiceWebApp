const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// 静的ファイルの配信設定（CSS、JSファイルなど）
app.use(express.static(path.join(__dirname, 'public')));

// 仮の請求書データの配列
const invoicesData = [
  // 請求書1
  {
  invoiceId: "1", // 請求書IDを追加
  customerName: "株式会社ブラック企業1",
  invoiceNumber: "IV00000001",
  companyName: "株式会社社畜",
  invoiceDate: "2024年02月25日",
  dueDate: "2024年03月24日",
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
},
  // 請求書2
  {
    invoiceId: "2", 
    customerName: "株式会社ブラック企業2",
    invoiceNumber: "IV00000002",
    companyName: "株式会社社畜2",
    invoiceDate: "2024年03月17日",
    dueDate: "2024年04月16日",
    items: [
      {
        itemCode: "AA002",
        itemName: "苦痛費",
        quantity: 10000,
        unit: "通",
        unitPrice: 250,
        taxRate: 10
      }
    ],
  },
  // 請求書3
  {
    invoiceId: "3", 
    customerName: "株式会社日本企業",
    invoiceNumber: "IV00000003",
    companyName: "株式会社新卒",
    invoiceDate: "2024年03月01日",
    dueDate: "2024年03月31日",
    items: [
      {
        itemCode: "AA000",
        itemName: "給料",
        quantity: 1,
        unit: "ヶ月",
        unitPrice: 180000,
        taxRate: 30
      }
    ],
  }
];

// 全請求書データを返すエンドポイント
app.get('/api/invoices', (req, res) => {
  res.json(invoicesData);
});

// 特定の請求書データを返すエンドポイント
app.get('/api/invoice', (req, res) => {
  const invoiceId = req.query.invoiceId; // クエリパラメータからinvoiceIdを取得
  const invoice = invoicesData.find(inv => inv.invoiceId === invoiceId);
  if (invoice) {
    res.json(invoice); // 請求書データを返す
  } else {
    res.status(404).send('Invoice not found'); // 請求書が見つからない場合は404エラーを返す
  }
});

// ルートURLへのGETリクエストに対するレスポンス
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'invoice.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
