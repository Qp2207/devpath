'use strict';

const courses = [
  {
    id: 'html', title: 'HTML cơ bản', mark: 'HTML', level: 'Nhập môn',
    description: 'Xây dựng cấu trúc trang web với thẻ HTML có ngữ nghĩa.',
    lessons: [
      {
        id: 'trang-dau-tien', title: 'Trang HTML đầu tiên', minutes: 8,
        summary: 'Tạo tiêu đề và đoạn văn để hiển thị trong trình duyệt.',
        points: [
          'Một tài liệu HTML thường bắt đầu bằng <!DOCTYPE html>. Phần tử <html lang="vi"> khai báo ngôn ngữ chính của trang.',
          '<head> chứa thông tin như mã hóa UTF-8 và tiêu đề tab. Nội dung hiển thị thuộc về <body>.',
          'Trình soạn thảo bên dưới đã chuẩn bị sẵn phần khung. Mã trong tab HTML sẽ được đặt trong <body>.',
        ],
        challenge: 'Thay tiêu đề bằng tên của bạn, rồi thêm một đoạn văn giới thiệu sở thích. Bấm Chạy mã để xem kết quả.',
        html: '<h1>Xin chào, thế giới!</h1>\n<p>Đây là trang web đầu tiên của mình.</p>',
      },
      {
        id: 'lien-ket-danh-sach', title: 'Liên kết và danh sách', minutes: 9,
        summary: 'Tạo danh sách có thứ tự và liên kết đến các phần trong trang.',
        points: [
          'Dùng <ol> khi thứ tự các bước quan trọng, hoặc <ul> cho danh sách không có thứ tự. Mỗi mục đặt trong một thẻ <li>.',
          'Thẻ <a> tạo liên kết. Khi href bắt đầu bằng #, trình duyệt cuộn đến phần tử có id tương ứng.',
          'Đặt văn bản liên kết theo đích đến, ví dụ “Xem công thức”. Văn bản rõ nghĩa giúp người đọc dễ định hướng.',
        ],
        challenge: 'Thêm một nguyên liệu mới và một bước pha chế. Tạo liên kết đến phần Nguyên liệu bằng id của tiêu đề.',
        html: '<h1>Trà chanh</h1>\n<a href="#cach-pha">Xem cách pha</a>\n<h2 id="nguyen-lieu">Nguyên liệu</h2>\n<ul>\n  <li>Trà</li>\n  <li>Chanh</li>\n</ul>\n<h2 id="cach-pha">Cách pha</h2>\n<ol>\n  <li>Ủ trà.</li>\n  <li>Thêm nước cốt chanh.</li>\n</ol>',
      },
      {
        id: 'html-ngu-nghia', title: 'HTML có ngữ nghĩa', minutes: 10,
        summary: 'Chia trang thành các vùng nội dung dễ hiểu và dễ điều hướng.',
        points: [
          '<header> chứa nội dung mở đầu, <nav> chứa liên kết điều hướng và <main> chứa nội dung chính.',
          '<article> phù hợp với nội dung có thể đứng độc lập, chẳng hạn một bài viết. <section> gom nội dung theo một chủ đề, thường có tiêu đề.',
          'Sắp xếp tiêu đề theo cấu trúc nội dung. Dùng <h1> cho tiêu đề trang, <h2> cho các phần chính và <h3> cho phần con.',
        ],
        challenge: 'Thêm một bài viết thứ hai với tiêu đề cấp 2 và một đoạn văn, rồi thêm chân trang bằng <footer>.',
        html: '<header>\n  <h1>Nhật ký học web</h1>\n</header>\n<main>\n  <article>\n    <h2>Ngày đầu tiên</h2>\n    <p>Mình đã tạo được một trang HTML.</p>\n  </article>\n</main>',
      },
      {
        id: 'bieu-mau', title: 'Biểu mẫu và nhãn', minutes: 12,
        summary: 'Tạo ô nhập có nhãn và kiểm tra dữ liệu bằng HTML.',
        points: [
          'Liên kết nhãn với trường nhập bằng cách đặt for của <label> bằng id của <input>. Người dùng có thể bấm vào nhãn để đưa con trỏ vào ô.',
          'Thuộc tính type="email" yêu cầu định dạng email. Thuộc tính required yêu cầu người dùng nhập giá trị trước khi gửi.',
          'Ví dụ dùng sự kiện submit để hiển thị thông báo trong trang. Trình duyệt kiểm tra các ràng buộc trước khi gọi sự kiện này.',
        ],
        challenge: 'Bổ sung ô nhập tên có nhãn và thuộc tính required. Thử gửi biểu mẫu khi bỏ trống, rồi điền đủ các trường.',
        html: '<form>\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" required>\n  <button type="submit">Đăng ký</button>\n</form>\n<p id="message" role="status"></p>',
        js: "document.querySelector('form').addEventListener('submit', (event) => {\n  event.preventDefault();\n  document.querySelector('#message').textContent = 'Đã nhận thông tin!';\n});",
      },
    ],
  },
  {
    id: 'css', title: 'CSS hiện đại', mark: 'CSS', level: 'Cơ bản',
    description: 'Tạo giao diện đẹp và linh hoạt với Flexbox, Grid và responsive.',
    lessons: [
      {
        id: 'bo-chon', title: 'Bộ chọn và thuộc tính', minutes: 12,
        summary: 'Chọn phần tử HTML và thay đổi màu sắc, cỡ chữ.',
        points: [
          'Một quy tắc CSS gồm bộ chọn và nhóm khai báo trong cặp ngoặc nhọn. Mỗi khai báo ghép một thuộc tính với một giá trị.',
          'Bộ chọn p áp dụng cho mọi đoạn văn. Bộ chọn .highlight chỉ áp dụng cho phần tử có lớp highlight.',
          'Khi hai quy tắc thông thường cùng chọn một phần tử, bộ chọn lớp cụ thể hơn bộ chọn tên thẻ.',
        ],
        challenge: 'Đổi màu của .highlight, tăng cỡ chữ của h1 và thêm một lớp mới cho đoạn văn đầu tiên.',
        html: '<h1>Bảng màu của mình</h1>\n<p>Đoạn văn thông thường.</p>\n<p class="highlight">Đoạn văn nổi bật.</p>',
        css: 'p { color: #425370; }\n.highlight { color: #6236d2; font-weight: bold; }',
      },
      {
        id: 'box-model', title: 'Mô hình hộp', minutes: 13,
        summary: 'Điều chỉnh khoảng đệm, đường viền và khoảng cách ngoài.',
        points: [
          'Box model gồm vùng nội dung, padding, border và margin theo thứ tự từ trong ra ngoài.',
          'Thay đổi padding để tăng khoảng cách giữa nội dung và viền. Thay đổi margin để tách phần tử khỏi các phần tử xung quanh.',
          'Với box-sizing: border-box, chiều rộng khai báo bao gồm cả padding và border. Margin vẫn nằm bên ngoài chiều rộng này.',
        ],
        challenge: 'Giữ width ở 240px, tăng padding lên 32px rồi thử bỏ box-sizing. So sánh chiều rộng hiển thị.',
        html: '<div class="box">Nội dung trong hộp</div>',
        css: '.box {\n  width: 240px;\n  box-sizing: border-box;\n  padding: 16px;\n  border: 3px solid #7049cf;\n  margin: 20px;\n  background: #eee7ff;\n}',
      },
      {
        id: 'flexbox', title: 'Bố cục với Flexbox', minutes: 14,
        summary: 'Sắp xếp các phần tử theo hàng hoặc cột.',
        points: [
          'Đặt display: flex trên phần tử cha để sắp xếp các phần tử con trực tiếp.',
          'justify-content căn chỉnh theo trục chính. align-items căn chỉnh theo trục vuông góc. flex-direction quyết định trục chính chạy theo hàng hay cột.',
          'gap tạo khoảng cách giữa các mục. flex-wrap: wrap cho phép các mục xuống dòng khi thiếu chỗ.',
        ],
        challenge: 'Thêm một thẻ mới, bật flex-wrap và thu hẹp trang. Sau đó thử justify-content: space-between.',
        html: '<div class="row">\n  <div>HTML</div>\n  <div>CSS</div>\n  <div>JavaScript</div>\n</div>',
        css: '.row { display: flex; gap: 12px; justify-content: center; }\n.row > div { background: #ebe3ff; padding: 12px; border-radius: 8px; }',
      },
      {
        id: 'grid-responsive', title: 'Grid và bố cục responsive', minutes: 16,
        summary: 'Dùng CSS Grid để đổi số cột theo độ rộng màn hình.',
        points: [
          'display: grid tạo một lưới hai chiều. grid-template-columns chia vùng chứa thành các cột.',
          'repeat(2, minmax(0, 1fr)) tạo hai cột bằng nhau và cho phép cả hai cột co lại khi thiếu không gian.',
          'Media query cập nhật bố cục theo chiều rộng vùng hiển thị. Trong Playground, đó là độ rộng của khung kết quả.',
        ],
        challenge: 'Tạo ba cột khi vùng kết quả rộng từ 420px trở lên. Thử thay ngưỡng đó để quan sát lúc lưới chuyển cột.',
        html: '<div class="grid">\n  <article>Bài HTML</article>\n  <article>Bài CSS</article>\n  <article>Bài JavaScript</article>\n</div>',
        css: '.grid { display: grid; gap: 10px; }\n.grid article { padding: 14px; background: #e2edff; border-radius: 8px; }\n@media (min-width: 380px) {\n  .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }\n}',
      },
    ],
  },
  {
    id: 'js', title: 'JavaScript', mark: 'JS', level: 'Cơ bản',
    description: 'Thêm tương tác cho trang web bằng JavaScript và DOM.',
    lessons: [
      {
        id: 'bien-va-gia-tri', title: 'Biến và giá trị', minutes: 12,
        summary: 'Dùng const và let để lưu dữ liệu, sau đó đưa kết quả lên trang.',
        points: [
          'Dùng const khi tên biến sẽ giữ cùng một giá trị hoặc tham chiếu. Dùng let nếu cần gán lại.',
          'Chuỗi nằm trong dấu nháy. Số được viết trực tiếp, chẳng hạn 3. Phép cộng hai số tạo ra một giá trị số mới.',
          'textContent cập nhật phần văn bản của phần tử. Bạn có thể ghép chuỗi và số để hiển thị kết quả.',
        ],
        challenge: 'Tạo biến const tên baiMoi với giá trị 2 rồi cộng vào số bài đã học. Dùng textContent để hiển thị tổng mới.',
        html: '<p id="result"></p>',
        js: "let daHoc = 1;\ndaHoc = daHoc + 1;\ndocument.querySelector('#result').textContent = 'Số bài đã học: ' + daHoc;",
      },
      {
        id: 'ham-va-dieu-kien', title: 'Hàm và điều kiện', minutes: 13,
        summary: 'Viết hàm tái sử dụng và trả về kết quả theo điều kiện.',
        points: [
          'Hàm gom một nhóm lệnh. Tham số cho phép cùng một hàm xử lý nhiều giá trị khác nhau.',
          'if chạy một nhánh khi điều kiện đúng. Toán tử >= kiểm tra một giá trị có lớn hơn hoặc bằng giá trị còn lại hay không.',
          'return trả kết quả cho nơi gọi hàm và kết thúc lần chạy hiện tại.',
        ],
        challenge: 'Thêm điều kiện để trả về “Xuất sắc” từ 9 điểm trở lên. Thử lần lượt gọi hàm với 4, 5 và 9.',
        html: '<p id="result"></p>',
        js: "function xepLoai(diem) {\n  if (diem >= 5) return 'Đạt';\n  return 'Cần luyện thêm';\n}\n\ndocument.querySelector('#result').textContent = xepLoai(7);",
      },
      {
        id: 'dom-su-kien', title: 'DOM và sự kiện', minutes: 16,
        summary: 'Đọc phần tử trên trang và lắng nghe thao tác bấm.',
        points: [
          'DOM biểu diễn cấu trúc HTML dưới dạng các đối tượng mà JavaScript có thể đọc và cập nhật.',
          'querySelector tìm phần tử đầu tiên khớp bộ chọn. addEventListener đăng ký hàm sẽ chạy khi một sự kiện xảy ra.',
          'Dùng một nút <button> cho hành động bấm. Người dùng có thể kích hoạt nút bằng chuột hoặc bàn phím.',
        ],
        challenge: 'Đổi thông báo sau khi bấm nút. Sau đó thêm nút thứ hai để đưa thông báo về nội dung ban đầu.',
        html: '<button id="greet">Gửi lời chào</button>\n<p id="message" role="status">Đang chờ...</p>',
        js: "const button = document.querySelector('#greet');\nconst message = document.querySelector('#message');\nbutton.addEventListener('click', () => {\n  message.textContent = 'Xin chào!';\n});",
      },
      {
        id: 'du-an-bo-dem', title: 'Dự án nhỏ — Bộ đếm', minutes: 19,
        summary: 'Kết hợp HTML, CSS và JavaScript để tạo một bộ đếm.',
        points: [
          'HTML cung cấp số hiện tại và nút thao tác. CSS trình bày giao diện và JavaScript cập nhật số.',
          'Biến count lưu trạng thái. Hàm render đưa giá trị hiện tại lên trang mỗi khi trạng thái thay đổi.',
          'Tách hàm hiển thị ra khỏi trình xử lý sự kiện để nút tăng, giảm và đặt lại dùng chung một cách cập nhật.',
        ],
        challenge: 'Thêm nút giảm nhưng giữ bộ đếm từ 0 trở lên. Sau đó tạo một nút đặt lại về 0.',
        html: '<main>\n  <h1>Bộ đếm</h1>\n  <p id="count" aria-live="polite">0</p>\n  <button id="add">Tăng 1</button>\n</main>',
        css: 'main { max-width: 240px; padding: 20px; background: #ece5ff; border-radius: 12px; }\n#count { font-size: 2rem; font-weight: bold; }',
        js: "let count = 0;\nconst output = document.querySelector('#count');\nfunction render() {\n  output.textContent = count;\n}\n\ndocument.querySelector('#add').addEventListener('click', () => {\n  count += 1;\n  render();\n});",
      },
    ],
  },
];

const references = [
  { course: 'html', terms: [['<main>', 'Vùng nội dung chính của trang.'], ['<a href="#muc">', 'Liên kết đến phần tử có id là muc.'], ['<label for="email">', 'Nhãn của ô nhập có id là email.']], lesson: 'html-ngu-nghia' },
  { course: 'css', terms: [['.ten-lop', 'Chọn các phần tử có class là ten-lop.'], ['display: flex', 'Sắp xếp các mục theo một trục.'], ['gap: 1rem', 'Tạo khoảng cách giữa các mục trong Flexbox hoặc Grid.']], lesson: 'flexbox' },
  { course: 'js', terms: [['const', 'Khai báo tên biến không thể gán lại.'], ['querySelector()', 'Tìm phần tử đầu tiên khớp bộ chọn CSS.'], ['addEventListener()', 'Đăng ký hàm xử lý một sự kiện.']], lesson: 'dom-su-kien' },
];
