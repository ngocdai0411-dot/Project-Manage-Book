import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import Header from './Header';
import { 
  AppstoreOutlined, 
  ShoppingCartOutlined, 
  BookOutlined, 
  InfoCircleOutlined, 
  UserOutlined 
} from '@ant-design/icons';

const AppLayout = () => {
  const location = useLocation();

  // Khai báo các đường dẫn khớp chính xác với App.js
  const menuItems = [
    { path: '/home', label: 'Dashboard', icon: <AppstoreOutlined /> },
    { path: '/categories', label: 'Danh Mục Sản Phẩm', icon: <ShoppingCartOutlined /> },
    { path: '/products', label: 'Sản Phẩm', icon: <BookOutlined /> },
    { path: '/about', label: 'Giới Thiệu', icon: <InfoCircleOutlined /> },
  ];

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans">
      {/* Sidebar bên trái */}
      <aside className="w-72 bg-[#548261] flex flex-col p-5 select-none">
        {/* Profile / Brand Info */}
        <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-xl mb-8 border border-white/10">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-lg">
            <UserOutlined />
          </div>
          <div>
            <h2 className="text-white font-bold text-sm">Quản Lý Sách</h2>
            <p className="text-green-100 text-xs opacity-80">Admin System</p>
          </div>
        </div>

        {/* Menu Navigation */}
        <nav className="flex flex-col gap-2 flex-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-[#c8d9ce] text-[#2d4a34] font-semibold shadow-sm'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Khu vực nội dung bên phải */}
      <div className="flex-1 flex flex-col min-w-0 p-6">
        <Header />
        
        {/* Phần hiển thị nội dung trang con */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;