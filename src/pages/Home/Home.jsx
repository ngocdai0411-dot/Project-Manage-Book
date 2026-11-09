import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Statistic, Table, Button, Tag } from 'antd';
import { 
    BookOutlined, 
    AppstoreOutlined, 
    InboxOutlined, 
    UserOutlined,
    ArrowRightOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import instance from '../../services/01_index';

const Home = () => {
    const [stats, setStats] = useState({
        totalProducts: 0,
        totalCategories: 0,
        totalStock: 0,
        totalUsers: 0,
    });
    const [recentProducts, setRecentProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const [prodRes, catRes, userRes] = await Promise.all([
                    instance.get('/products'),
                    instance.get('/categories'),
                    instance.get('/users'),
                ]);

                const prods = prodRes.data || [];
                const cats = catRes.data || [];
                const users = userRes.data || [];

                const totalStock = prods.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

                setStats({
                    totalProducts: prods.length,
                    totalCategories: cats.length,
                    totalStock,
                    totalUsers: users.length,
                });

                setCategories(cats);
                setRecentProducts(prods.slice(-5).reverse());
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu dashboard:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const getCategoryName = (catId) => {
        const found = categories.find((c) => String(c.id) === String(catId));
        return found ? found.name : 'Chưa phân loại';
    };

    const columns = [
        {
            title: 'Tên sách',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span className="font-medium text-gray-800">{text}</span>,
        },
        {
            title: 'Thể loại',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (catId) => <Tag color="cyan">{getCategoryName(catId)}</Tag>,
        },
        {
            title: 'Giá bán',
            dataIndex: 'price',
            key: 'price',
            align: 'right',
            render: (price) => `${Number(price || 0).toLocaleString('vi-VN')} đ`,
        },
        {
            title: 'Tồn kho',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            render: (qty) => (
                <Tag color={Number(qty) > 10 ? 'green' : 'orange'}>
                    {qty} cuốn
                </Tag>
            ),
        },
    ];

    return (
        <div className="flex flex-col gap-6">
            {/* 4 Thẻ thống kê tổng quan */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                        <Statistic
                            title={<span className="text-gray-500 font-medium">Tổng đầu sách</span>}
                            value={stats.totalProducts}
                            prefix={<BookOutlined className="text-emerald-600 mr-2" />}
                            suffix="cuốn"
                            valueStyle={{ color: '#166534', fontWeight: 'bold' }}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                        <Statistic
                            title={<span className="text-gray-500 font-medium">Danh mục sách</span>}
                            value={stats.totalCategories}
                            prefix={<AppstoreOutlined className="text-blue-600 mr-2" />}
                            suffix="loại"
                            valueStyle={{ color: '#1e40af', fontWeight: 'bold' }}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                        <Statistic
                            title={<span className="text-gray-500 font-medium">Tổng tồn kho</span>}
                            value={stats.totalStock}
                            prefix={<InboxOutlined className="text-amber-600 mr-2" />}
                            suffix="sản phẩm"
                            valueStyle={{ color: '#b45309', fontWeight: 'bold' }}
                        />
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card bordered={false} className="shadow-sm rounded-2xl hover:shadow-md transition-shadow">
                        <Statistic
                            title={<span className="text-gray-500 font-medium">Tài khoản nhân sự</span>}
                            value={stats.totalUsers}
                            prefix={<UserOutlined className="text-purple-600 mr-2" />}
                            suffix="người"
                            valueStyle={{ color: '#6b21a8', fontWeight: 'bold' }}
                        />
                    </Card>
                </Col>
            </Row>

            {/* Bảng sách mới & Phím tắt nhanh */}
            <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm h-full">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <h3 className="font-bold text-gray-800 text-base">Sách Trong Kho Gần Đây</h3>
                                <p className="text-xs text-gray-500">Các đầu sách mới được cập nhật trong hệ thống</p>
                            </div>
                            <Link to="/products">
                                <Button type="link" size="small" className="flex items-center gap-1 text-[#285f42]">
                                    Xem tất cả <ArrowRightOutlined />
                                </Button>
                            </Link>
                        </div>

                        <Table 
                            columns={columns}
                            dataSource={recentProducts}
                            rowKey="id"
                            loading={loading}
                            pagination={false}
                            size="small"
                        />
                    </div>
                </Col>

                <Col xs={24} lg={8}>
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between h-full">
                        <div>
                            <h3 className="font-bold text-gray-800 text-base mb-1">Lối Tắt Thao Tác</h3>
                            <p className="text-xs text-gray-500 mb-5">Truy cập nhanh vào các tính năng chính</p>

                            <div className="flex flex-col gap-3">
                                <Link to="/products">
                                    <Button 
                                        type="primary" 
                                        block 
                                        style={{ backgroundColor: '#285f42' }}
                                        className="h-10 text-left font-medium"
                                    >
                                        + Thêm / Quản lý sách
                                    </Button>
                                </Link>

                                <Link to="/categories">
                                    <Button 
                                        block 
                                        className="h-10 text-left font-medium border-gray-300 hover:border-[#285f42]"
                                    >
                                        + Quản lý danh mục sách
                                    </Button>
                                </Link>

                                <Link to="/about">
                                    <Button 
                                        block 
                                        className="h-10 text-left font-medium border-gray-300"
                                    >
                                        ℹ️ Xem thông tin giới thiệu
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="mt-6 p-4 bg-[#f4f7f5] rounded-xl border border-[#e1e9e3]">
                            <p className="text-xs font-semibold text-[#285f42] mb-1">💡 Mẹo quản lý:</p>
                            <p className="text-xs text-gray-600">
                                Hãy tạo danh mục trước khi thêm sách mới để dễ dàng phân loại và tìm kiếm sản phẩm.
                            </p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Home;
