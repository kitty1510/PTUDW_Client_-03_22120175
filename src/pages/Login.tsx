import React, { useState } from "react";
import { HiOutlineEnvelope, HiLockClosed } from "react-icons/hi2";

interface FormErrors {
  email?: string;
  password?: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Chỉ thực thi khi validation thành công
    if (validateForm()) {
      console.log("Dữ liệu hợp lệ, đang gửi:", { email, password });
      alert("Đăng nhập thành công! (Kiểm tra console)");
      // Đặt lại form (tùy chọn)
      setEmail("");
      setPassword("");
      setErrors({});
    } else {
      console.log("Validation thất bại, vui lòng kiểm tra lại form.");
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    // Thêm logic xác thực nếu cần
    if (!email) {
      newErrors.email = "Vui lòng nhập email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      // Một regex đơn giản để kiểm tra định dạng email
      newErrors.email = "Email không hợp lệ.";
    }

    // Kiểm tra Mật khẩu
    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu.";
    } else if (password.length < 6) {
      // Ví dụ: yêu cầu mật khẩu tối thiểu 6 ký tự
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    setErrors(newErrors);

    // Trả về true nếu không có lỗi (object newErrors rỗng)
    return Object.keys(newErrors).length === 0;
  };

  return (
    // Sử dụng nền của trang (bg-gray-100) hoặc nền của card (bg-white/bg-gray-50)
    // Ở đây tôi dùng bg-gray-50 (xám rất nhạt) giống như ảnh
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-md h-150 flex-col justify-center items-center bg-gray-50 p-8">
        {/* Tiêu đề */}
        <h2 className="mb-8 text-3xl font-semibold text-gray-800 ">
          Đăng nhập tài khoản
        </h2>
        {/* Form đăng nhập */}
        <form className="w-full" onSubmit={handleSubmit}>
          {/* Trường Email */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <HiOutlineEnvelope className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                id="email"
                className="block w-full rounded-md border border-gray-300 bg-white p-3 pl-10 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          {/* Trường Mật khẩu */}
          <div className="mb-5">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <HiLockClosed className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="password"
                id="password"
                className="block w-full rounded-md border border-gray-300 bg-white p-3 pl-10 text-gray-900 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="**********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Quên mật khẩu */}
          <div className="mb-6 text-right">
            <a href="#" className="text-sm text-gray-700 hover:underline">
              Quên mật khẩu ?
            </a>
          </div>

          {/* Nút Đăng nhập */}
          <button
            type="submit"
            className="w-full rounded-md bg-gray-900 px-4 py-3 text-base font-semibold text-white shadow-sm transition duration-200 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
          >
            Đăng nhập
          </button>
        </form>
        <div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Bạn chưa có tài khoản?{" "}
            <a
              href="/register"
              className="font-medium text-gray-900 hover:underline"
            >
              Đăng ký
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
