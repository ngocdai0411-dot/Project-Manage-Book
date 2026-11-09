import React from 'react';
import { Form, Input, Checkbox, Button, message } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import instance from '../../services/01_index'; // Điều chỉnh lại đường dẫn này cho đúng với vị trí file axios của bạn

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { username, password } = values;

    try {
      // Lấy ra các tài khoản từ db.json
      const res = await instance.get("/users"); 
      const accountList = res.data;

      // So sánh tài khoản được gửi lên từ form có tồn tại trong danh sách không
      const account = accountList.find(
        (acc) => acc.username === username && acc.password === password
      );

      if (account) {
        message.success("Đăng nhập thành công");
        navigate("/home"); // Chuyển hướng về trang chủ hoặc trang quản lý
      } else {
        message.error("Tên đăng nhập hoặc mật khẩu không đúng");
      }
    } catch (error) {
      console.error(error);
      message.error("Lỗi kết nối đến máy chủ API!");
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#548261] flex flex-col md:flex-row items-center justify-center gap-12 md:gap-[80px] p-6 md:p-16 font-sans">
      {/* Khối bên trái - Giới thiệu trang web */}
      <div className="text-white md:pr-6 w-full md:w-auto max-w-2xl">
        <p className="text-start text-sm md:text-base font-semibold tracking-wider text-green-100 mb-4 uppercase">
          Quản Lý Sách · Admin Management UI
        </p>

        <h1 className="text-start text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
          Bộ giao diện quản lý bán hàng, kho và nhân sự cho doanh nghiệp bán lẻ đa kênh
        </h1>

        <p className="text-start text-green-50 text-base md:text-lg mb-8 opacity-90 leading-relaxed">
          Tone màu lấy cảm hứng từ website: xanh lá trà, xanh đậm thương hiệu, vàng kem giấy trà và điểm nhấn vàng nâu. Thiết kế ưu tiên rõ dữ liệu, thao tác nhanh tại quầy và dễ mở rộng đa kênh.
        </p>

        {/* Các Tags/Pills */}
        <div className="flex flex-wrap gap-4 mt-5">
          <span className="px-6 py-2.5 rounded-md bg-[#fdfbf3] text-black font-semibold text-sm cursor-default">
            Đơn hàng kho
          </span>
          <span className="px-6 py-2.5 rounded-md bg-[#fdfbf3] text-black font-semibold text-sm cursor-default">
            Quản lý nhân sự
          </span>
          <span className="px-6 py-2.5 rounded-md bg-[#fdfbf3] text-black font-semibold text-sm cursor-default">
            Xem đơn hàng
          </span>
        </div>
      </div>

      {/* Khối bên phải - Form Đăng nhập bằng Ant Design */}
      <div className="w-full max-w-[420px] bg-[#fdfbf3] rounded-2xl p-8 shadow-2xl">
        <h2 className="text-2xl font-bold text-center text-[#2d4a34] mb-1">
          Đăng nhập
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Vui lòng đăng nhập để truy cập hệ thống
        </p>

        <Form
          name="login_form"
          layout="vertical"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          requiredMark={false}
        >
          {/* Tên đăng nhập */}
          <Form.Item
            label={<span className="text-xs font-semibold text-gray-700">Tên đăng nhập</span>}
            name="username"
            rules={[{ required: true, message: 'Vui lòng nhập tên đăng nhập!' }]}
            className="mb-4"
          >
            <Input 
              placeholder="admin" 
              className="py-2 rounded-lg border-gray-200"
            />
          </Form.Item>

          {/* Mật khẩu */}
          <Form.Item
            label={<span className="text-xs font-semibold text-gray-700">Mật khẩu</span>}
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
            className="mb-3"
          >
            <Input.Password
              placeholder="••••••••"
              iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              className="py-2 rounded-lg border-gray-200"
            />
          </Form.Item>

          {/* Ghi nhớ & Quên mật khẩu */}
          <div className="flex items-center justify-between mb-5">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox className="text-xs text-gray-700 font-medium">Ghi nhớ tôi</Checkbox>
            </Form.Item>
            <a href="#forgot" className="text-xs text-blue-600 hover:underline font-medium">
              Quên mật khẩu?
            </a>
          </div>

          {/* Nút Đăng nhập */}
          <Form.Item className="mb-4">
            <Button
              type="primary"
              htmlType="submit"
              block
              className="h-11 bg-[#548261] hover:!bg-[#436a4e] text-white font-medium rounded-lg text-sm border-none shadow-none"
            >
              Đăng nhập hệ thống
            </Button>
          </Form.Item>
        </Form>

        {/* Tạo tài khoản */}
        <p className="text-center text-xs text-gray-600 mt-4">
          Chưa có tài khoản?{' '}
          <a href="#register" className="text-gray-800 font-semibold hover:underline">
            Tạo tài khoản
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;