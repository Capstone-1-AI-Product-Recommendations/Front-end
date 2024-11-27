/** @format */

const ForgotPasswordData = {
  // Danh sách tài khoản
  accounts: [
    {
      id: 1,
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
      verificationCode: "74578" // Mã xác thực mặc định
    },
    {
      id: 2,
      email: "seller@gmail.com",
      password: "seller123",
      role: "seller",
      verificationCode: "85214"
    },
    {
      id: 3,
      email: "user@gmail.com",
      password: "user123",
      role: "user",
      verificationCode: "96325"
    }
  ],

  // Thông tin về mã xác thực
  verificationInfo: {
    codeLength: 5, // Độ dài mã xác thực
    expiryTime: 300, // Thời gian hiệu lực của mã (giây)
    resendDelay: 60 // Thời gian chờ để gửi lại mã (giây)
  },

  // Quy tắc mật khẩu
  passwordRules: {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumbers: true,
    requireSpecialChars: true
  },

  // Thông báo lỗi
  errorMessages: {
    emailNotFound: "Email không tồn tại trong hệ thống!",
    invalidCode: "Mã xác thực không chính xác!",
    codeExpired: "Mã xác thực đã hết hạn!",
    passwordMismatch: "Mật khẩu xác nhận không khớp!",
    weakPassword: "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!"
  },

  // Thông báo thành công
  successMessages: {
    codeSent: "Mã xác thực đã được gửi vào email của bạn!",
    codeVerified: "Xác thực thành công!",
    passwordReset: "Mật khẩu đã được đặt lại thành công!"
  }
};

export default ForgotPasswordData; 