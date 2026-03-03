const fs = require('fs');

async function updatePrices() {
  try {
    // 1. API 호출 (Backend에서 실행되므로 CORS 에러가 없습니다!)
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    const btcPrice = data.bitcoin.usd.toLocaleString();
    const btcChange = data.bitcoin.usd_24h_change.toFixed(2);
    const ethPrice = data.ethereum.usd.toLocaleString();
    const ethChange = data.ethereum.usd_24h_change.toFixed(2);
    const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

    // 2. HTML 파일 내용 생성 (디자인 포함)
    const htmlContent = `
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Crypto Dashboard</title>
    <style>
        body { font-family: sans-serif; background: #0f172a; color: white; display: flex; justify-content: center; padding: 50px; }
        .card { background: #1e293b; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); width: 400px; }
        h1 { color: #38bdf8; text-align: center; border-bottom: 1px solid #334155; padding-bottom: 15px; }
        .coin { display: flex; justify-content: space-between; padding: 15px 0; border-bottom: 1px solid #334155; }
        .price { font-weight: bold; color: #f8fafc; }
        .up { color: #4ade80; } .down { color: #f87171; }
        .footer { text-align: center; font-size: 12px; color: #64748b; margin-top: 20px; }
    </style>
</head>
<body>
    <div class="card">
        <h1>🚀 실시간 시세</h1>
        <div class="coin"><span>Bitcoin (BTC)</span><span class="price">$${btcPrice}</span><span class="${btcChange >= 0 ? 'up' : 'down'}">${btcChange}%</span></div>
        <div class="coin"><span>Ethereum (ETH)</span><span class="price">$${ethPrice}</span><span class="${ethChange >= 0 ? 'up' : 'down'}">${ethChange}%</span></div>
        <div class="footer">최근 자동 업데이트: ${now} (KST)</div>
    </div>
</body>
</html>`;

    // 3. index.html 파일 저장
    fs.writeFileSync('index.html', htmlContent);
    console.log("홈페이지 업데이트 완료!");
  } catch (err) {
    console.error("데이터 로드 실패:", err);
  }
}
updatePrices();
