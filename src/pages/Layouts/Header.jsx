import React from 'react';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  const getPageInfo = () => {
    switch (location.pathname) {
      case '/home':
        return {
          title: 'Bảng Điều Khiển (Dashboard)',
          desc: 'Tổng quan các chỉ số thống kê, tồn kho và các đầu sách mới nhất trong hệ thống.',
        };
      case '/categories':
        return {
          title: 'Danh Mục Sản Phẩm',
          desc: 'Quản lý, thêm mới, chỉnh sửa và phân loại các thể loại sách trong kho hàng.',
        };
      case '/products':
        return {
          title: 'Quản Lý Sản Phẩm (Sách)',
          desc: 'Danh sách chi tiết các cuốn sách, theo dõi giá bán và số lượng tồn kho theo thời gian thực.',
        };
      case '/about':
        return {
          title: 'Giới Thiệu Hệ Thống',
          desc: 'Thông tin tổng quan về mục tiêu, tính năng và công nghệ của ứng dụng Manage-Book.',
        };
      default:
        return {
          title: 'Hệ Thống Quản Lý Sách',
          desc: 'Giao diện quản trị kho sách và bán lẻ dành cho doanh nghiệp.',
        };
    }
  };

  const { title, desc } = getPageInfo();

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mb-6">
      <h1 className="text-xl font-bold text-gray-900 mb-1">{title}</h1>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
  );
};

export default Header;
