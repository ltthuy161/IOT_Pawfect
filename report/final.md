# CÁC YÊU CẦU CĂN BẢN ĐÃ ĐƯỢC THỰC HIỆN


## Phần Thiết bị

- Có tối thiểu một thiết bị INPUT: **Cảm biến siêu âm UltraSonic HY-SRF05**: đo khoảng cách giữa lượng thức ăn còn lại trong thùng và nắp thùng.
- Có tối thiểu một thiết bị OUTPUT: **Servo SG90**: Động cơ quay để thả thức ăn cho vật nuôi

## Luồng thiết bị đến Firebase:

- Các cảm biến được điều khiển bởi mạch **Arduino Mega 2560** để đo các giá trị từ môi trường. Các thông tin này được xử lý bởi chính mạch **Arduino Mega 2560** trước khi được chuyển tới module WiFi **ESP-12F** nhờ giao tiếp **Serial** và thư viện **ArduinoJson**.
- Khi kết nối WiFi được thiết lập, **ESP-12F** sẽ sử dụng thư viện **Firebase** để gửi dữ liệu lên **Firebase Realtime Database** - là một nền tảng cơ sở dữ liệu thời gian thực, cho phép dữ liệu được lưu trữ và quản lý một cách hiệu quả. Mọi thông tin được gửi từ **ESP-12F** sẽ được cập nhật ngay lập tức trong cơ sở dữ liệu của **Firebase**, đảm bảo dữ liệu được lưu trữ một cách an toàn và có thể truy cập từ bất kỳ đâu.

## Luồng Firebase đến thiết bị:

Module WiFi **ESP-12F** sẽ liên tục kết nối với **Firebase Realtime Database**. Trong quá trình này, **ESP-12F** liên tục theo dõi các thay đổi hoặc cập nhật từ **Firebase**, chẳng hạn như lệnh điều khiển hoặc tín hiệu từ người dùng. Khi **ESP-12F** nhận được tín hiệu tương ứng từ **Firebase**, nó sẽ ngay lập tức thực hiện các lệnh như bật/tắt hoặc ra lệnh chạy cho các thiết bị đầu ra liên quan, đảm bảo các thiết bị hoạt động chính xác theo yêu cầu và trong thời gian thực.

\pagebreak 

# CÁC YÊU CẦU NÂNG CAO

## SỬ DỤNG THÊM CÁC THIẾT BỊ

### INPUT

**- Trong chương trình học:** 

- **Cảm biến nhiệt độ, độ ẩm DHT11**: đo nhiệt độ và độ ẩm trong buồng chứa thức ăn.
  
**- Ngoài chương trình học:**

- **Cân (Loadcell 5kg và mạch chuyển đổi tín hiệu HX711):** Đo khối lượng thức ăn có trên đĩa thức ăn.

### OUTPUT

**- Trong chương trình học:**

- **Màn hình LCD:** Hiển thị nhiệt độ và độ ẩm trong phòng.

**- Ngoài chương trình học:** 

- **LED ma trận:** Hiển thị lượng thức ăn còn trong thùng.

## LƯU DỮ LIỆU CẢM BIẾN LÊN CLOUD

Các bước để lưu dữ liệu cảm biến lên firebase database:

**- Kết nối Wi-Fi:**

Người dùng có thể sử dụng điện thoại để điều khiển **ESP-12F** kết nối vào mạng WiFi gần đó. Quá trình kết nối này được quản lý bởi thư viện **WifiManager**.

**- Đăng nhập Firebase:**

- Kết nối với Firebase Realtime Database được thực hiện thông qua API_KEY và DATABASE_URL.
- Việc đăng nhập sử dụng một tài khoản email đã được đăng ký trước đó.

**- Đọc dữ liệu cảm biến:**

- **Arduino Mega 2560** thực hiện việc đọc dữ liệu từ các cảm biến DHT11, cân (HX711 và loadcell), cảm biến sóng siêu âm, cảm biến mực nước, và cảm biến chuyển động PIR mỗi 10 giây.
- Dữ liệu này sau khi được xử lý và chuyển đổi sang định dạng phù hợp sẽ được đóng gói thành một đối tượng Json và gửi đến **ESP-12F** qua Serial.

**- Gửi dữ liệu lên Firebase:**

- Dữ liệu cảm biến được đẩy lên Firebase Realtime Database bằng cách sử dụng hàm Firebase.RTDB.setJSON().
- Mỗi loại dữ liệu như nhiệt độ, độ ẩm, khối lượng, mức nước, và sự hiện diện của thú cưng được lưu trữ ở các đường dẫn riêng biệt trong nhánh sensors_data của Firebase Realtime Database.
- Các phản hồi từ thiết bị được ghi trực tiếp vào đường dẫn tương ứng trong REQUEST bằng lệnh Firebase.RTDB.setInt().

**- Nhận yêu cầu từ Firebase:**

- **ESP-12F** sẽ nhận được thông báo khi có thay đổi tại đường dẫn REQUEST. Khi đó, nó sẽ đọc toàn bộ thông tin tại đường dẫn này và kiểm tra xem thiết bị nào đang được yêu cầu thực hiện lệnh. Nếu thiết bị đó không bận, **ESP-12F** sẽ chuyển tiếp yêu cầu đến **Arduino Mega 2560** để điều khiển thiết bị thực hiện lệnh.
- Sau khi lệnh được thực hiện xong, thiết bị sẽ báo lại cho **Arduino Mega 2560**, từ đó chuyển tiếp phản hồi đến **ESP-12F** qua Serial, và cuối cùng phản hồi sẽ được gửi lên Realtime Database để xác nhận rằng yêu cầu đã được thực hiện thành công.

## GỬI THÔNG BÁO QUA MAIL

- **Tính năng**: Tính năng gửi thông báo xác minh email cho người dùng sau khi đăng nhập thành công giúp đảm bảo rằng người dùng đã cung cấp một địa chỉ email hợp lệ và có thể truy cập được. Điều này thường được thực hiện để tăng cường bảo mật cho tài khoản người dùng và xác nhận quyền sở hữu địa chỉ email. 

- **Mô tả chi tiết**:
    - Đăng nhập thành công: Người dùng đăng nhập và ứng dụng nhận được thông tin từ Firebase Authentication.
    - Kiểm tra trạng thái email: Ứng dụng kiểm tra nếu email của người dùng đã được xác minh (emailVerified).
    - Gửi email xác minh: Nếu email chưa xác minh, ứng dụng dùng sendEmailVerification() để gửi một email xác minh đến người dùng.
    - Thông báo người dùng: Thông báo rằng email xác minh đã được gửi và yêu cầu người dùng kiểm tra hộp thư để hoàn tất xác minh.

\pagebreak

# Tham Khảo