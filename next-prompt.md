---
page: estimate-widget
---
A "Quick Estimate (빠른 견적산출)" floating widget or inline component for a Korean water tank B2B/B2C e-commerce system.

**Main Goal:** Allow field workers and contractors to quickly input their requirements (Shape, Capacity, Location) and instantly get an estimated price plus shipping cost without navigating away from their current page. 

**DESIGN SYSTEM (REQUIRED):**
- **Visual Style**: Clean, robust, and professional Korean B2B/B2C construction and plumbing supplies. 
- **Colors**: Use deep navy (`#0c4a6e`) for headers and primary trust elements. Use bright sky blue (`#0ea5e9`) for primary call-to-action buttons. Use white/light gray backgrounds to maximize contrast. Add sparingly orange (`#f97316`) for highlights.
- **Typography**: Big, bold, legible sans-serif fonts. Headings should be prominent. Avoid thin or delicate fonts.
- **Layout**: Compact and card-based. Efficient use of space but with enough padding to avoid misclicks on mobile devices.
- **Components**: 
  - Input fields with thick borders (`1.5px`) when focused.
  - Large, highly visible "Calculate" or "진양스마트견적" buttons.
- **Vibe**: Trustworthy, fast, no-nonsense. "1분 만에 견적 받기" (Get a quote in 1 minute). 

**Structure:**
1. **Header**: Title "진양스마트견적" with a small water or lightning bolt icon.
2. **Form Area**:
   - **용도 (Usage)**: Select buttons (농업/조경, 산업/공업, 생활용수)
   - **형태 (Shape)**: Select buttons (원형, 사각)
   - **용량 (Capacity)**: Input field with "톤(ton)" affix.
   - **배송지 (Location)**: Input field for city/district.
3. **Footer/Action**: 
   - A bold button: "예상 견적 확인하기" (Check Estimated Quote)
