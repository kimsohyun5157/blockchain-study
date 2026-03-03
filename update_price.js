const fs = require('fs');

async function updatePrices() {
  try {
    // 1. CoinGecko API 호출 (Backend 실행이므로 CORS 에러 방지) [cite: 89]
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true");
    const data = await response.json();

    const btcPrice = data.bitcoin.usd.toLocaleString();
    const btcChange = data.bitcoin.usd_24h_change.toFixed(2);
    const ethPrice = data.ethereum.usd.toLocaleString();
    const ethChange = data.ethereum.usd_24h_change.toFixed(2);
    const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

    // 2. README.md (마크다운) 내용 생성 [cite: 86, 87]
    const mdContent = `# ⛓️ Blockchain Lab #1: 실시간 시세 (Auto-update)
| 코인명 | 심볼 | 현재 가격 (USD) | 24시간 변동률 |
| :--- | :--- | :--- | :--- |
| 비트코인 | BTC | $${btcPrice} | ${btcChange}% |
| 이더리움 | ETH | $${ethPrice} | ${ethChange}% |

*마지막 업데이트: ${now} (KST)*`;

    // 3. index.html (HTML) 내용 생성 [cite: 88]
    const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Crypto Dashboard</title>
    <style>
        body { font-family: sans-serif; background: #0f172a; color: white; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; }
        .card { background: #1e293b; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); width: 350px; text-align: center; }
        h1 { color: #38bdf8; font-size: 1.5rem; margin-bottom: 20px; border-bottom: 1px solid #334155; padding-bottom: 15px; }
        .coin { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #334155; }
        .price { font-weight: bold; }
        .up { color: #4ade80; } .down { color: #f87171; }
        .footer { font-size: 11px; color: #64748b; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="card">
        <h1>🚀 Crypto Prices</h1>
        <div class="coin"><span>Bitcoin</span><span class="price">$${btcPrice}</span><span class="${btcChange >= 0 ? 'up' : 'down'}">${btcChange}%</span></div>
        <div class="coin"><span>Ethereum</span><span class="price">$${ethPrice}</span><span class="${ethChange >= 0 ? 'up' : 'down'}">${ethChange}%</span></div>
        <p class="footer">최근 업데이트: ${now}</p>
    </div>
</body>
</html>`;

    // 4. 파일들 저장
    fs.writeFileSync('README.md', mdContent);
    fs.writeFileSync('index.html', htmlContent);
    console.log("모든 파일 업데이트 성공!");

  } catch (err) {
    console.error("업데이트 실패:", err);
  }
}

updatePrices();
