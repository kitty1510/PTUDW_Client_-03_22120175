import React, { useState } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { HiOutlineEnvelope, HiLockClosed } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

interface FormErrors {
  email?: string;
  password?: string;
}

interface RegisterRequest {
  email: string;
  password: string;
}

interface RegisterResponse {
  // Define your response type based on your API
  id?: string;
  message?: string;
  token?: string;
}

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // React Query mutation for registration
  const registerMutation = useMutation<
    RegisterResponse,
    Error,
    RegisterRequest
  >({
    mutationFn: async (credentials: RegisterRequest) => {
      const response = await axios.post(
        "https://ptudw-sever-03-22120175.vercel.app/auth/register",
        credentials
      );
      return response.data;
    },
    onSuccess: (data) => {
      // Handle successful registration
      console.log("Registration successful:", data);

      // Invalidate and refetch any related queries if needed
      queryClient.invalidateQueries({ queryKey: ["user"] });

      // Navigate to home page
      navigate("/");
    },
    onError: (error: any) => {
      // Handle error - you might want to show error messages from the server
      console.error("Registration failed:", error);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      // Execute the mutation
      registerMutation.mutate({ email, password });
    } else {
      console.log("Dữ liệu nhập không hợp lệ, không thể gửi biểu mẫu.");
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!email) {
      newErrors.email = "Vui lòng nhập email.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email không hợp lệ.";
    }

    if (!password) {
      newErrors.password = "Vui lòng nhập mật khẩu.";
    } else if (password.length < 6) {
      newErrors.password = "Mật khẩu phải có ít nhất 6 ký tự.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="flex w-full max-w-md h-150 flex-col justify-center items-center bg-gray-50 p-8">
        {/* Tiêu đề */}
        <h2 className="mb-8 text-3xl font-semibold text-gray-800 ">
          Đăng ký tài khoản
        </h2>

        {/* Hiển thị lỗi từ server */}
        {registerMutation.isError && (
          <div className="mb-4 w-full rounded-md bg-red-50 p-4 text-sm text-red-700">
            Đăng ký thất bại:{" "}
            {registerMutation.error?.message || "Có lỗi xảy ra"}
          </div>
        )}

        {/* Hiển thị thông báo thành công */}
        {registerMutation.isSuccess && (
          <div className="mb-4 w-full rounded-md bg-green-50 p-4 text-sm text-green-700">
            Đăng ký thành công! Đang chuyển hướng...
          </div>
        )}

        {/* Form đăng ký */}
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
                disabled={registerMutation.isPending}
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
                disabled={registerMutation.isPending}
              />
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-600">{errors.password}</p>
            )}
          </div>

          {/* Nút Đăng ký */}
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="w-full rounded-md bg-gray-900 px-4 py-3 text-base font-semibold text-white shadow-sm transition duration-200 ease-in-out hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {registerMutation.isPending ? "Đang xử lý..." : "Đăng ký"}
          </button>
        </form>

        <div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Bạn đã có tài khoản?{" "}
            <a
              href="/login"
              className="font-medium text-gray-900 hover:underline"
            >
              Đăng nhập
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
