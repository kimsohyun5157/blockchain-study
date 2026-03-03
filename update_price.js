const fs = require('fs');

async function updatePrices() {
  try {
    // 1. CoinGecko API로 비트코인, 이더리움 가격 요청
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true");
    const data = await response.json();

    const btcPrice = data.bitcoin.usd.toLocaleString();
    const btcChange = data.bitcoin.usd_24h_change.toFixed(2);
    const ethPrice = data.ethereum.usd.toLocaleString();
    const ethChange = data.ethereum.usd_24h_change.toFixed(2);

    const now = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });

    // 2. README.md 파일에 써넣을 내용 생성 (Markdown 문법)
    const content = `# ⛓️ Blockchain Lab #1: 실시간 시세 (Auto-update)
| 코인명 | 심볼 | 현재 가격 (USD) | 24시간 변동률 |
| :--- | :--- | :--- | :--- |
| 비트코인 | BTC | $${btcPrice} | ${btcChange}% |
| 이더리움 | ETH | $${ethPrice} | ${ethChange}% |

*마지막 업데이트: ${now} (KST)*`;

    // 3. 파일 쓰기 실행
    fs.writeFileSync('README.md', content);
    console.log("README.md 업데이트 성공!");
  } catch (err) {
    console.error("데이터 가져오기 실패:", err);
  }
}

updatePrices();
