-- Xóa dữ liệu cũ nếu cần (Cẩn thận khi dùng)
-- DELETE FROM users WHERE username IN ('studenttest_4', 'studenttest_1');

-- Chèn tài khoản Teacher (studenttest_4)
-- Mật khẩu hash của 'voleanhnghia1311N@' là: $2a$10$86I9VvY5R.Y0Y5V.Y0Y5V.Y0Y5V.Y0Y5V.Y0Y5V.Y0Y5V.Y0Y5V. (Mẫu hash)
-- Lưu ý: Bạn nên sử dụng chức năng "Register" trên giao diện để password được hash chính xác bởi Spring Security.
-- Tuy nhiên đây là ví dụ INSERT thủ công:

INSERT INTO users (username, password_hash, full_name, role) 
VALUES ('studenttest_4', '$2a$10$MvNfG1YvB6L0F6iV3X.BReB9SjA6I7D9B8C7D6E5F4G3H2I1J0K1L', 'Teacher Test', 'TEACHER');

INSERT INTO users (username, password_hash, full_name, role) 
VALUES ('studenttest_1', '$2a$10$MvNfG1YvB6L0F6iV3X.BReB9SjA6I7D9B8C7D6E5F4G3H2I1J0K1L', 'Student Test', 'STUDENT');
