# Đặc tả Website Jastech

**Phiên bản:** 1.0 (MVP Draft)  
**Ngày cập nhật:** 12/10/2026  
**Trạng thái:** Đã thống nhất phạm vi sơ bộ, còn một số dữ liệu cần bổ sung trước khi ra mắt

> **Phạm vi triển khai hiện tại:** Local development only. Chưa triển khai production, chưa tạo tài khoản dịch vụ ngoài, chưa cấu hình domain và chưa gửi email thật. Agent triển khai phải đọc thêm `AGENTS.md` và `LOCAL_IMPLEMENTATION_PLAYBOOK.md` trước khi thay đổi mã nguồn.

## 1. Tổng quan sản phẩm

Website Jastech là website doanh nghiệp B2B phục vụ các doanh nghiệp Nhật Bản đang tìm kiếm đối tác phát triển phần mềm tại Việt Nam.

### 1.1. Mục tiêu

- Giới thiệu năng lực và dịch vụ của Jastech.
- Xây dựng niềm tin với doanh nghiệp Nhật Bản.
- Trình bày các dự án và case study tiêu biểu.
- Thu thập khách hàng tiềm năng thông qua form liên hệ.
- Hỗ trợ đội ngũ Jastech chủ động quản trị nội dung mà không cần chỉnh sửa mã nguồn.

### 1.2. Đối tượng người dùng

- Doanh nghiệp Nhật Bản cần thuê ngoài hoạt động phát triển phần mềm.
- Product Owner, IT Manager, CTO và người phụ trách tìm kiếm nhà cung cấp.
- Doanh nghiệp thiếu nguồn lực kỹ thuật hoặc cần mở rộng đội ngũ phát triển.
- Doanh nghiệp cần đối tác có khả năng giao tiếp bằng tiếng Nhật hoặc tiếng Anh.

### 1.3. Ngôn ngữ

- Tiếng Nhật là ngôn ngữ mặc định.
- Tiếng Anh là ngôn ngữ thứ hai.
- Nội dung hai ngôn ngữ tương ứng 1:1.
- URL sử dụng cấu trúc `/ja/...` và `/en/...`.

### 1.4. Phạm vi dịch vụ MVP

1. Web Development.
2. Application Development.
3. Maintenance & Support.

Admin có thể tạo thêm dịch vụ sau này mà không cần chỉnh sửa mã nguồn.

## 2. Định vị và thông điệp

Thông điệp trung tâm dự kiến:

> Jastech là đối tác phát triển phần mềm tại Việt Nam dành cho doanh nghiệp Nhật Bản, kết hợp năng lực kỹ thuật, chất lượng, giao tiếp minh bạch và khả năng đồng hành lâu dài.

Website cần giúp khách hàng trả lời nhanh bốn câu hỏi:

1. Jastech giải quyết vấn đề gì?
2. Vì sao doanh nghiệp có thể tin tưởng Jastech?
3. Jastech đã thực hiện những dự án nào?
4. Làm thế nào để trao đổi hoặc nhận tư vấn?

CTA chính trên toàn website:

- Tiếng Nhật: `お問い合わせ` hoặc `ご相談はこちら`.
- Tiếng Anh: `Contact us` hoặc `Request a consultation`.

Website không công khai bảng giá và không hỗ trợ bán hàng hoặc thanh toán trực tuyến.

## 3. Sitemap MVP

```text
/ja và /en
│
├── Home
├── About
│   ├── Company
│   ├── Vision & Mission
│   ├── Team
│   └── Development Process
├── Services
│   ├── Web Development
│   ├── Application Development
│   └── Maintenance & Support
├── Case Studies
│   └── Case Study Detail
├── Insights
│   └── Article Detail
├── Why Jastech
├── Contact
├── Privacy Policy
└── 404
```

Không bao gồm careers, pricing, customer portal hoặc tài khoản người dùng trong MVP.

## 4. Hành trình người dùng chính

```text
Google / quảng cáo / giới thiệu
              ↓
           Trang chủ
              ↓
 Dịch vụ → Case study → Why Jastech
              ↓
        CTA nhận tư vấn
              ↓
          Form liên hệ
              ↓
  Lưu admin + gửi email thông báo
```

Người dùng công khai chỉ có thể:

- Đọc nội dung.
- Chuyển đổi ngôn ngữ.
- Xem dịch vụ, dự án và bài viết.
- Gửi thông tin liên hệ.

## 5. Cấu trúc trang chủ

1. **Hero ảnh hoặc video toàn màn hình**
   - Tiêu đề giá trị cốt lõi.
   - Mô tả ngắn.
   - CTA liên hệ và xem dự án.
   - Cho phép chọn media riêng cho desktop và mobile.

2. **Trust indicators**
   - Số năm kinh nghiệm.
   - Số dự án.
   - Quy mô đội ngũ.
   - Số khách hàng Nhật Bản.
   - Chứng nhận nếu có.

3. **Challenges we solve**
   - Thiếu kỹ sư.
   - Chi phí phát triển cao.
   - Khó mở rộng đội ngũ.
   - Thiếu năng lực công nghệ chuyên môn.
   - Lo ngại về giao tiếp và chất lượng offshore.

4. **Services**
   - Web Development.
   - Application Development.
   - Maintenance & Support.

5. **Why Jastech**
   - Chất lượng.
   - Giao tiếp bằng tiếng Nhật và tiếng Anh.
   - Quy trình minh bạch.
   - Đội ngũ linh hoạt.
   - Bảo mật.
   - Hiểu văn hóa kinh doanh Nhật Bản.

6. **Featured case studies**
   - Hiển thị từ ba đến sáu dự án nổi bật.
   - Tóm tắt bài toán, giải pháp, công nghệ và kết quả.

7. **Development process**
   - Inquiry.
   - Discovery.
   - Proposal.
   - Development.
   - Quality Assurance.
   - Delivery & Maintenance.

8. **Japanese–Vietnamese delivery capability**
   - Năng lực BrSE/PM.
   - Khả năng giao tiếp bằng tiếng Nhật.
   - Khả năng phối hợp giữa đội ngũ Việt Nam và Nhật Bản.

9. **Technology stack**
   - Backend.
   - Frontend.
   - Mobile.
   - Cloud.
   - Các năng lực kỹ thuật thực tế khác.

10. **Insights**
    - Các bài viết và tin tức mới nhất.

11. **Contact CTA**
    - Khuyến khích khách hàng gửi yêu cầu tư vấn.

12. **Footer**
    - Điều hướng phụ.
    - Thông tin công ty.
    - Thông tin liên hệ.
    - Privacy Policy.

Các số liệu chưa được cung cấp phải sử dụng placeholder có nhãn:

```text
[DRAFT — Replace before launch]
```

Placeholder không được xuất bản lên môi trường production nếu chưa được duyệt.

## 6. Quản lý nội dung song ngữ

### 6.1. Nguyên tắc

- Nội dung tiếng Nhật và tiếng Anh tương ứng 1:1.
- Có thể lưu nháp khi mới nhập một ngôn ngữ.
- Chỉ cho phép xuất bản khi cả hai ngôn ngữ đã có đủ các trường bắt buộc.
- Slug, SEO title, description và Open Graph metadata được quản lý riêng theo ngôn ngữ.
- Khi đổi ngôn ngữ, người dùng vẫn ở trang tương ứng.
- Website sử dụng `hreflang` để biểu thị quan hệ giữa hai phiên bản.

### 6.2. Trạng thái bản dịch

- `Missing`: chưa có nội dung.
- `Draft`: đang soạn thảo.
- `Ready`: đã hoàn tất nội dung nhưng chưa xuất bản.
- `Published`: đã xuất bản.

Khi cập nhật một ngôn ngữ, hệ thống cần cảnh báo rằng bản dịch còn lại có thể đã lỗi thời.

### 6.3. Mô hình dữ liệu tham khảo

```text
Page
├── status
├── template
├── page sections
└── PageTranslation
    ├── locale: ja | en
    ├── title
    ├── slug
    ├── content
    └── SEO metadata
```

## 7. CMS và Page Builder

### 7.1. Chức năng quản lý

- Dashboard.
- Quản lý trang.
- Quản lý dịch vụ.
- Quản lý case study.
- Quản lý bài viết.
- Quản lý danh mục và thẻ.
- Quản lý menu và footer.
- Quản lý thông tin công ty.
- Media library.
- Quản lý form liên hệ.
- SEO settings.
- Preview trước khi xuất bản.
- Workflow `Draft → Published`.
- Đổi mật khẩu và đăng xuất.

### 7.2. Section dựng sẵn

- Hero image.
- Hero video.
- Text.
- Text + image.
- Full-width media.
- Services grid.
- Case studies grid hoặc slider.
- Article list.
- Statistics.
- Timeline hoặc process.
- Team members.
- Testimonials.
- Technology logos.
- Client/partner logo wall.
- FAQ.
- Contact CTA.
- Spacer/divider.

### 7.3. Tùy chỉnh section

Admin có thể tùy chỉnh:

- Theme màu.
- Background.
- Chiều rộng nội dung.
- Số cột.
- Vị trí ảnh.
- Tỷ lệ ảnh.
- Căn lề nội dung.
- Khoảng cách trên/dưới.
- Overlay.
- Animation preset.
- Hiển thị trên desktop/mobile.
- CTA.
- Nguồn dữ liệu tự động hoặc thủ công.

Không hỗ trợ nhập HTML, CSS hoặc JavaScript tùy ý trong MVP.

### 7.4. Template trang

- Landing page.
- Standard content page.
- Service detail.
- Case study detail.
- Article detail.
- About/company page.
- Contact page.

Admin có thể tạo trang từ template, sau đó thêm, xóa, tùy chỉnh và sắp xếp section bằng kéo-thả.

## 8. Quản lý case study

Mỗi case study bao gồm:

- Tên dự án.
- Khách hàng.
- Logo khách hàng.
- Ngành nghề.
- Hình ảnh hoặc video.
- Bài toán.
- Giải pháp.
- Công nghệ sử dụng.
- Quy mô đội ngũ.
- Thời gian thực hiện.
- Kết quả.
- Testimonial.
- Dịch vụ liên quan.
- Trạng thái công khai danh tính khách hàng.
- Trạng thái featured.
- Nội dung tiếng Nhật và tiếng Anh.

Nếu dự án không được phép công khai, admin có thể bật chế độ ẩn danh, ví dụ:

> Japanese retail company / 日本の小売企業

## 9. Form liên hệ

### 9.1. Trường dữ liệu

- Họ tên.
- Tên công ty.
- Chức vụ, không bắt buộc.
- Email công việc.
- Điện thoại, không bắt buộc.
- Dịch vụ quan tâm.
- Thời gian dự kiến bắt đầu.
- Nội dung yêu cầu.
- Đồng ý với chính sách bảo mật.
- Ngôn ngữ form.
- UTM và referrer.

Không hỗ trợ đính kèm file trong MVP.

### 9.2. Trạng thái xử lý

```text
New → Contacted → Closed
```

### 9.3. Chức năng quản trị

- Xem chi tiết liên hệ.
- Thêm ghi chú nội bộ.
- Thay đổi trạng thái.
- Tìm kiếm và lọc.
- Xuất CSV.
- Xóa dữ liệu khi cần.

### 9.4. Quy trình khi gửi form

1. Kiểm tra và xác thực dữ liệu.
2. Kiểm tra CAPTCHA/Turnstile.
3. Lưu liên hệ vào database.
4. Gửi email thông báo cho Jastech.
5. Tùy chọn gửi email xác nhận tự động cho khách hàng.

Form cần có CAPTCHA hoặc Cloudflare Turnstile, rate limiting và thông báo về chính sách quyền riêng tư.

## 10. Tài khoản quản trị

MVP sử dụng một tài khoản có quyền `Admin`.

Các yêu cầu bảo mật:

- Mật khẩu được hash an toàn.
- Session bảo mật.
- Giới hạn số lần thử đăng nhập.
- Chức năng đổi mật khẩu.
- Chức năng đăng xuất khỏi tất cả thiết bị.
- Khôi phục mật khẩu qua email.
- Nhật ký chỉnh sửa cơ bản.

Nhiều thành viên có thể dùng chung tài khoản theo yêu cầu hiện tại. Tuy nhiên, cách này không cho phép xác định chính xác người đã thực hiện từng thay đổi và làm tăng rủi ro lộ thông tin đăng nhập. Khi nhu cầu quản trị tăng, nên chuyển sang nhiều tài khoản riêng nhưng cùng quyền `Admin`.

## 11. Định hướng giao diện

Website lấy cảm hứng từ phong cách của Netcompany nhưng không sao chép thiết kế.

### 11.1. Đặc điểm hình ảnh

- Hero ảnh hoặc video toàn màn hình.
- Header trong suốt đặt trên media.
- Typography lớn, rõ ràng.
- Bố cục dạng lưới.
- Khoảng trắng rộng.
- Các khối dịch vụ và case study dựa nhiều vào hình ảnh.
- Animation tinh tế khi cuộn và hover.
- Ưu tiên nội dung, hiệu năng và khả năng đọc trên mobile.

### 11.2. Màu sắc sơ bộ

- Primary blue: lấy từ logo. #3c6ca7
- Light blue: background và section nhấn. #EFF6FF
- Navy: chữ, footer và các khu vực cần tạo cảm giác tin cậy. #0F172A
- White/off-white: nền chính. #FFFFFF/ #F8FAFC
- Accent cyan: trạng thái tương tác hoặc CTA phụ. #06B6D4

### 11.3. Font đề xuất

- Tiếng Nhật: `Noto Sans JP`.
- Tiếng Anh: `Inter` hoặc `Manrope`.

Phương án mặc định đề xuất là `Noto Sans JP + Inter`.

### 11.4. Yêu cầu tài sản logo

- SVG hoặc file vector.
- PNG nền trong suốt.
- Phiên bản màu.
- Phiên bản trắng.
- Icon/favicon.
- Quy định khoảng trống quanh logo.

Logo được cung cấp hiện có dạng ngang, nền trắng và biểu tượng có thể được đọc giống chữ `JNS`. Cần xác nhận đây có phải logo chính thức cuối cùng của Jastech hay không.

## 12. Quản lý hình ảnh và video

### 12.1. Dịch vụ đề xuất

Sử dụng Cloudinary trong giai đoạn MVP vì:

- Upload trực tiếp từ admin.
- Tự động chuyển đổi WebP/AVIF.
- Resize theo thiết bị.
- Crop theo focal point.
- Có CDN.
- Quản lý được cả ảnh và video.
- Dễ vận hành hơn giải pháp object storage tự quản lý.

### 12.2. Dữ liệu media lưu trong database

- URL.
- Cloudinary public ID.
- Loại media.
- Chiều rộng và chiều cao.
- Alt text theo ngôn ngữ.
- Focal point.
- Caption.
- Metadata cần thiết.

## 13. Kiến trúc kỹ thuật

### 13.1. Tech stack

```text
Next.js
React
TypeScript
Tailwind CSS
PostgreSQL
Prisma ORM
next-intl
TipTap
dnd-kit
Cloudinary
Auth.js hoặc session authentication riêng
React Hook Form
Zod
Cloudflare Turnstile
Resend hoặc SMTP
Sentry
```

### 13.2. Kiến trúc MVP

```text
Next.js
├── Website công khai
├── Admin CMS
├── Server API
├── Authentication
├── Prisma ORM
└── PostgreSQL
```

Chưa cần tách NestJS trong MVP. Backend có thể được tách thành dịch vụ riêng nếu sau này có mobile app, client portal hoặc nhiều hệ thống cùng sử dụng API.

### 13.3. Hosting đề xuất

- Website và API: Vercel.
- Database: Neon hoặc Supabase.
- Ảnh và video: Cloudinary.
- Email: Resend hoặc SMTP của công ty.
- Domain và DNS: Cloudflare.

## 14. Thông tin công ty

Thông tin do Jastech cung cấp:

| Trường                   | Giá trị                                                                |
| ------------------------ | ---------------------------------------------------------------------- |
| Tên pháp nhân            | CÔNG TY TNHH JASTECH                                                   |
| Tên quốc tế              | JASTECH                                                                |
| Tên viết tắt             | JASTECH                                                                |
| Mã số thuế               | 0317141031                                                             |
| Ngày cấp                 | 25/01/2022                                                             |
| Người đại diện pháp luật | NGUYỄN ĐỨC THUẬN                                                       |
| Điện thoại               | 0969000063                                                             |
| Địa chỉ                  | 39 Hậu Giang, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh, Việt Nam |

Thông tin trên cần được kiểm tra lại trước khi ra mắt, đặc biệt là:

- Cách ghi địa chỉ hành chính hiện hành.
- Bản dịch tiếng Nhật và tiếng Anh.
- Thông tin nào được phép công khai.

Mã số thuế, người đại diện và ngày cấp có thể được đặt tại trang Company Profile thay vì hiển thị toàn bộ trong footer.

## 15. Yêu cầu phi chức năng

### 15.1. Responsive và tương thích

- Responsive từ chiều rộng 360px trở lên.
- Hỗ trợ Chrome, Safari, Edge và Firefox phiên bản hiện đại.
- Thiết kế và nội dung được kiểm tra riêng trên desktop, tablet và mobile.

### 15.2. SEO

- SEO riêng cho tiếng Nhật và tiếng Anh.
- Sitemap XML.
- `robots.txt`.
- Canonical URL.
- `hreflang`.
- Open Graph metadata.
- Structured data cho Organization, Article và Breadcrumb.
- URL thân thiện với công cụ tìm kiếm.

### 15.3. Hiệu năng

- Sử dụng WebP/AVIF khi phù hợp.
- Responsive image.
- Lazy loading cho media ngoài màn hình đầu tiên.
- Video hero có poster và fallback.
- Video tự động chạy phải tắt âm.
- Có nút pause video.
- Hạn chế JavaScript không cần thiết.
- Ưu tiên Core Web Vitals.

### 15.4. Accessibility

- Mục tiêu WCAG 2.1 AA cho các luồng chính.
- Điều hướng bằng bàn phím.
- Focus state rõ ràng.
- Độ tương phản phù hợp.
- Alt text cho hình ảnh nội dung.
- Tôn trọng `prefers-reduced-motion`.

### 15.5. Bảo mật và vận hành

- Không lưu secret trong source code.
- Validation ở cả client và server.
- CAPTCHA/Turnstile và rate limiting cho form.
- Bảo vệ route admin.
- Backup database.
- Theo dõi lỗi bằng Sentry.
- Cookie banner chỉ cần khi sử dụng analytics hoặc cookie không thiết yếu.

## 16. Mô hình dữ liệu sơ bộ

- `users`
- `pages`
- `page_translations`
- `page_sections`
- `services`
- `service_translations`
- `case_studies`
- `case_study_translations`
- `posts`
- `post_translations`
- `categories`
- `tags`
- `media_assets`
- `menus`
- `menu_items`
- `site_settings`
- `contact_submissions`
- `redirects`
- `revisions`
- `audit_logs`

Ví dụ cấu trúc section:

```text
type: "hero" | "services-grid" | "case-slider" | "stats" | ...
order: 1, 2, 3, ...
enabled: true | false
theme: light | dark | brand
data: JSON
```

## 17. Lộ trình triển khai

### Milestone 1 — Đặc tả và nội dung

- Chốt khách hàng mục tiêu.
- Chốt danh sách dịch vụ.
- Chốt sitemap.
- Chuẩn bị nội dung và proof points.
- Chốt danh sách section.
- Thiết kế data model.
- Hoàn thiện user flow và acceptance criteria.

### Milestone 2 — Branding và UX/UI

- Xây dựng bảng màu từ logo.
- Chọn font Nhật và Latin.
- Xây dựng design system.
- Wireframe desktop/mobile.
- Thiết kế trang chủ, service, case study và contact.
- Prototype animation.

### Milestone 3 — Foundation

- Khởi tạo dự án Next.js, TypeScript và Tailwind CSS.
- Thiết lập database và Prisma.
- Authentication.
- Localisation.
- Media upload.
- SEO foundation.

### Milestone 4 — CMS

- Quản lý trang và nội dung song ngữ.
- Page builder.
- Template trang.
- Preview.
- Draft/publish.
- Contact inbox.

### Milestone 5 — Public website

- Xây dựng các trang công khai.
- Responsive.
- Animation.
- Form liên hệ.
- SEO và structured data.

### Milestone 6 — QA và launch

- Kiểm thử chức năng.
- Kiểm thử hai ngôn ngữ.
- Kiểm thử responsive và trình duyệt.
- Accessibility.
- Core Web Vitals.
- Security review.
- Backup và monitoring.
- Hướng dẫn sử dụng admin.

## 18. Điều kiện nghiệm thu MVP

MVP được xem là hoàn thành khi:

- Admin có thể tạo trang mới từ template.
- Admin có thể thêm, xóa, sắp xếp và tùy chỉnh section.
- Admin có thể nhập nội dung tiếng Nhật và tiếng Anh.
- Nội dung nháp không xuất hiện trên website công khai.
- Preview hiển thị đúng trước khi xuất bản.
- Website chuyển ngôn ngữ nhưng vẫn giữ đúng trang tương ứng.
- Admin tạo được dịch vụ, case study và bài viết.
- Admin có thể công khai hoặc ẩn danh khách hàng trong case study.
- Ảnh và video được upload lên Cloudinary.
- Form liên hệ lưu thành công vào database.
- Jastech nhận được email thông báo khi có liên hệ mới.
- Website hiển thị tốt trên desktop, tablet và mobile.
- Metadata, sitemap, canonical và `hreflang` hoạt động đúng.
- Các trang chính đạt tiêu chuẩn hiệu năng hợp lý dù sử dụng nhiều media.
- Các luồng chính không có lỗi accessibility nghiêm trọng.

## 19. Dữ liệu còn thiếu

Các dữ liệu sau không chặn việc bắt đầu thiết kế nhưng phải được bổ sung trước khi ra mắt:

1. Xác nhận logo hiện tại có phải logo chính thức cuối cùng hay không.
2. File logo vector hoặc PNG nền trong suốt.
3. Email nhận thông báo liên hệ.
4. Domain dự kiến.
5. Mô tả chi tiết ba dịch vụ.
6. Thông tin về BrSE/PM hoặc đội ngũ giao tiếp tiếng Nhật.
7. Số liệu năng lực thực tế.
8. Danh sách dự án công khai đầu tiên.
9. Ảnh công ty, đội ngũ và dự án.
10. Nội dung Privacy Policy.
11. Quyết định có gửi email xác nhận tự động cho khách hay không.
12. Bản dịch chính thức tiếng Nhật và tiếng Anh của thông tin công ty.

## 20. Các quyết định đã chốt

| Hạng mục              | Quyết định                                          |
| --------------------- | --------------------------------------------------- |
| Mô hình kinh doanh    | B2B                                                 |
| Thị trường chính      | Nhật Bản                                            |
| Mục tiêu              | Giới thiệu năng lực và tìm kiếm khách hàng          |
| Ngôn ngữ              | Nhật và Anh, nội dung tương ứng 1:1                 |
| Dịch vụ MVP           | Web, application và maintenance                     |
| Người dùng công khai  | Chỉ đọc nội dung và gửi liên hệ                     |
| Tài khoản admin       | Một tài khoản Admin                                 |
| Workflow nội dung     | Draft → Published                                   |
| Page builder          | Section dựng sẵn, hỗ trợ tùy chỉnh sâu có kiểm soát |
| Tạo trang mới         | Có                                                  |
| Form liên hệ          | Lưu trong admin và gửi email thông báo              |
| File đính kèm         | Không                                               |
| Bảng giá              | Không công khai                                     |
| Hero                  | Hỗ trợ ảnh và video, bao gồm mobile                 |
| Media hosting         | Cloudinary trong MVP                                |
| CRM và tích hợp ngoài | Chưa cần trong MVP                                  |
