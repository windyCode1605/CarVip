const express = require("express");
const multer = require('multer');
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(cors());  // Cho phép React Native truy cập API
app.use(express.json()); // Hỗ trợ đọc JSON từ request
app.use('/uploads', express.static('uploads')); // Truy cập ảnh qua /uploads

// 🔗 Kết nối MySQL
const db = mysql.createConnection({
  host: "localhost",   // Địa chỉ server MySQL (thường là localhost)
  user: "root",        // Tài khoản MySQL của bạn
  password: "123456789",        // Mật khẩu MySQL (để trống nếu không đặt)
  database: "carvip1", // Thay bằng database của bạn
});

db.connect((err) => {
  if (err) {
    console.error("❌ Lỗi kết nối MySQL: ", err);
    return;
  }
  console.log("✅ Kết nối MySQL thành công!");
});






// Cấu hình nơi lưu ảnh xe 
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Thư mục lưu ảnh
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName); // Tên file duy nhất
  },
});
const upload = multer({ storage: storage });


// API upload ảnh và cập nhật vào bảng Car
app.post('/upload/:car_id', upload.single('image'), (req, res) => {
  const carId = req.params.car_id;
  const filePath = req.file ? req.file.filename : null;

  if (!filePath) {
    return res.status(400).json({ message: 'No image uploaded' });
  }

  // Cập nhật tên ảnh vào database
  const sql = `UPDATE Car SET IMG_Motor = ? WHERE car_id = ?`;
  db.query(sql, [filePath, carId], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Upload and update successful', filename: filePath });
  });
});










// 📝 API lấy danh sách xe
app.get('/car', (req, res) => {
  const car = 'SELECT * FROM car';
  db.query(car, (err, results) => {
    if(err) return res.status(500).json({error: err});
    res.json(results);
  })
})







// API Đăng nhập
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.promise().execute(
      "SELECT * FROM account WHERE username = ? AND password = ?",
      [username, password]
    );
    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Sai tài khoản hoặc mật khẩu!" });
    }
    const account = rows[0];
    const token = jwt.sign({ person_id: account.person_id }, "secretKey", { expiresIn: "1h" });
    res.json({
      success: true,
      message: "Đăng nhập thành công!",
      token,
      person_id: account.person_id,
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).json({ success: false, message: "Lỗi đăng nhập!", error });
  }
});






// API lấy thông tin toàn bộ khách hàng.
app.get('/customers', (req, res) => {
  db.query('SELECT * FROM customers', (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Lỗi truy vấn dữ liệu.');
    } else {
      res.json(results); // Trả về mảng khách hàng
    }
  });
});





// API thêm mới một khách hàng
app.post("/customers", async (req, res) => {
  const {
    first_name,
    last_name,
    email,
    phone_number,
    date_of_birth,
    gender,
    address,
    driver_license_number,
    driver_license_expiry,
    membership_status,
    id_card_number,
    id_card_issued_date,
    id_card_issued_by,
    driver_license_class,
    driver_license_issued_date,
    driver_license_issued_by,
    balance,
    total_rent,
    password,
    note
  } = req.body;

  try {
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const sql = `
      INSERT INTO customers (
        first_name, last_name, email, phone_number, date_of_birth, gender, address,
        driver_license_number, driver_license_expiry, membership_status,
        id_card_number, id_card_issued_date, id_card_issued_by,
        driver_license_class, driver_license_issued_date, driver_license_issued_by,
        balance, total_rent, password, note
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const values = [
      first_name, last_name, email, phone_number, date_of_birth, gender, address,
      driver_license_number, driver_license_expiry, membership_status,
      id_card_number, id_card_issued_date, id_card_issued_by,
      driver_license_class, driver_license_issued_date, driver_license_issued_by,
      balance || 0, total_rent || 0, hashedPassword, note
    ];

    db.query(sql, values, (err, result) => {
      if (err) {
        console.error("❌ Lỗi khi thêm khách hàng:", err);
        return res.status(500).json({ success: false, message: "Thêm khách hàng thất bại" });
      }
      res.status(201).json({ success: true, message: "Thêm khách hàng thành công", customer_id: result.insertId });
    });

  } catch (error) {
    console.error("❌ Lỗi server:", error);
    res.status(500).json({ success: false, message: "Lỗi server khi thêm khách hàng" });
  }
});



// 🔥 Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
