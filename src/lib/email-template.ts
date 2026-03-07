export const generateOrderEmailHtml = (orderData: any) => {
  const { name, phone, address, requirements, items, totalAmount, orderId, orderDate } = orderData;

  const itemsHtml = items.map((item: any) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.option || '-'}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.quantity}개</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.price.toLocaleString()}원</td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .header { background-color: #004d40; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { padding: 20px; }
        .section { margin-bottom: 25px; }
        .section-title { font-size: 16px; font-weight: bold; color: #004d40; border-bottom: 2px solid #004d40; padding-bottom: 5px; margin-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; }
        .total { background-color: #f9f9f9; padding: 15px; text-align: right; font-size: 18px; font-weight: bold; border-radius: 4px; }
        .footer { text-align: center; font-size: 12px; color: #888; margin-top: 20px; border-top: 1px solid #eee; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0; font-size: 24px;">신규 주문 알림</h1>
          <p style="margin:5px 0 0;">진양건재 스마트견적</p>
        </div>
        
        <div class="content">
          <div class="section">
            <h2 class="section-title">주문 정보</h2>
            <p><strong>주문번호:</strong> ${orderId}</p>
            <p><strong>주문일시:</strong> ${orderDate}</p>
            <p><strong>고객명:</strong> ${name}</p>
            <p><strong>연락처:</strong> ${phone}</p>
            <p><strong>배송지:</strong> ${address}</p>
          </div>

          <div class="section">
            <h2 class="section-title">주문 상품</h2>
            <table>
              <thead>
                <tr style="background-color: #f0f0f0;">
                  <th style="text-align: left; padding: 10px;">상품명</th>
                  <th style="text-align: left; padding: 10px;">옵션</th>
                  <th style="text-align: left; padding: 10px;">수량</th>
                  <th style="text-align: right; padding: 10px;">가격</th>
                </tr>
              </thead>
              <tbody>
                ${itemsHtml}
              </tbody>
            </table>
          </div>

          <div class="total">
            총 견적가: <span style="color: #d32f2f;">${totalAmount.toLocaleString()}원</span>
          </div>

          <div class="section">
            <h2 class="section-title">요청 사항</h2>
            <div style="background-color: #fffde7; padding: 15px; border-radius: 4px; border: 1px solid #fff59d;">
              ${requirements || '없음'}
            </div>
          </div>
        </div>

        <div class="footer">
          <p>이 메일은 진양건재 웹사이트에서 자동으로 발송되었습니다.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};
