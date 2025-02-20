# Online Watch Shop Web Backend

## Mô tả
Nơi lưu xử lý dữ liệu về phía database(MongoDB) và đưa dữ liệu (API) lên cho frontend

## Tính năng chính
1. Xác thực & Quản lý người dùng
Đăng ký, đăng nhập, phân quyền (Admin, User, Shipper).
Bảo mật bằng JWT, bcrypt.

2.Quản lý sản phẩm
CRUD sản phẩm, danh mục, hình ảnh.
Tìm kiếm, lọc theo danh mục.

3.Quản lý đơn hàng & giỏ hàng
Tạo, cập nhật đơn hàng, trạng thái vận chuyển.
Xử lý giỏ hàng, tính tổng giá, phí ship.

4. Thanh toán & Giao hàng
Tích hợp Zalopay.
Quản lý vận chuyển, tracking đơn hàng.

5.Báo cáo & Phân tích
Thống kê doanh thu, số lượng đơn hàng, hành vi khách hàng.
6. Bảo mật & API
Xác thực API bằng JWT
Cung cấp RESTful API.


## Cài đặt
- Tải về máy:
git clone https://github.com/ntsang2511/ShoppingOnlineBackEnd.git

- Tạo tài khoản mongoDB để tạo lưu trữ và thay link MONGOO_DB mới trong file .env ( Đảm bảo port 3001 có sẵn trong file .env chưa có dự án nào đang hoạt động trên đó, nếu có hãy đổi sang port khác)

- Cài đặt dependencies:
npm install

- Chạy ứng dụng:
npm start

## Công nghệ sử dụng
NodeJS,ExpressJS, mongoose, nodemailer, axios, cors, body-parser, cookie-parser, jsonwebtoken,...

## Thông tin liên hệ
- Email: tansang25112003@gmail.com
- GitHub: https://github.com/ntsang2511
