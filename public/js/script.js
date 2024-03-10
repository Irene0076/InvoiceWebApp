document.addEventListener('DOMContentLoaded', function() {
    // バックエンドから請求書データを取得する
    fetch('/api/invoice')
        .then(response => response.json()) // レスポンスをJSON形式で解析
        .then(data => {
            // 請求書データをHTMLに挿入する処理

            // HTML要素を選択
            const invoiceElement = document.getElementById('invoice');

            // 基本情報を挿入
            invoiceElement.innerHTML = `
                <h2>請求書</h2>
                <p><strong>取引先：</strong>${data.customerName}</p>
                <p><strong>請求書番号：</strong>${data.invoiceNumber}</p>
                <p><strong>自社名：</strong>${data.companyName}</p>
                <p><strong>請求日：</strong>${data.invoiceDate}</p>
                <p><strong>お支払い期限：</strong>${data.dueDate}</p>
            `;

            // 請求項目のテーブルを生成
            let itemsTable = '<table><tr><th>品番</th><th>品名</th><th>数量</th><th>単位</th><th>単価</th><th>税率</th><th>金額</th></tr>';
            data.items.forEach(item => {
                // Amountの計算式を定義する
                // ToFixedで指定した小数点以下の桁数に数値を丸めた文字列を返す
                // toLocaleStringで数値を文字列に変換し、コンマ区切りの形式で表示します
                const amount = item.quantity * item.unitPrice * (1 + item.taxRate / 100);
                itemsTable += `
                    <tr>
                        <td>${item.itemCode}</td>
                        <td>${item.itemName}</td>
                        <td>${item.quantity.toLocaleString()}</td>
                        <td>${item.unit}</td>
                        <td>${item.unitPrice.toLocaleString()}</td>
                        <td>${item.taxRate}%</td>
                        <td>${amount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</td>
                    </tr>
                `;
            });
            itemsTable += '</table>';
            invoiceElement.innerHTML += itemsTable; // テーブルをHTMLに追加

            // 税込合計金額とうち消費税の計算
            let totalAmount = 0;
            let totalTax = 0;
            data.items.forEach(item => {
                totalAmount += item.quantity * item.unitPrice * (1 + item.taxRate / 100);
                totalTax += item.quantity * item.unitPrice * (item.taxRate / 100);
            });

            // 合計金額と消費税をHTMLに追加
            invoiceElement.innerHTML += `
            <p><strong>税込合計金額：</strong>${totalAmount.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            <p><strong>うち消費税：</strong>${totalTax.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
            `;
        })
        .catch(error => console.error('Error fetching invoice data:', error));
});
