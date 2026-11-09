import React from 'react';
import { Card, Row, Col, Tag, Typography, Divider } from 'antd';
import { 
    BookOutlined, 
    AppstoreOutlined, 
    CheckCircleOutlined, 
    CodeOutlined
} from '@ant-design/icons';

const { Paragraph, Text } = Typography;

const About = () => {
    return (
        <div className="flex flex-col gap-6">
            {/* Thẻ giới thiệu chính */}
            <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                    <span className="p-2.5 bg-[#eaf2ec] text-[#285f42] rounded-xl text-xl flex items-center justify-center">
                        <BookOutlined />
                    </span>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 m-0">Hệ Thống Quản Lý Sách (Manage-Book)</h2>
                        <span className="text-xs text-gray-500">Phiên bản 1.0.0 · Thiết kế đơn giản & tiện dụng</span>
                    </div>
                </div>

                <Paragraph className="text-gray-600 text-sm leading-relaxed mt-4">
                    Ứng dụng được thiết kế nhằm giúp các cửa hàng sách nhỏ và vừa có thể dễ dàng quản lý danh mục sách,
                    sản phẩm, giá bán cũng như số lượng tồn kho theo thời gian thực một cách trực quan, nhanh gọn và thuận tiện nhất.
                </Paragraph>

                <div className="flex flex-wrap gap-2 mt-4">
                    <Tag color="success">Dễ sử dụng</Tag>
                    <Tag color="processing">Giao diện Ant Design</Tag>
                    <Tag color="warning">Quản lý kho nhanh</Tag>
                    <Tag color="cyan">Tối ưu hiệu suất</Tag>
                </div>
            </div>

            {/* Các khối chi tiết */}
            <Row gutter={[16, 16]}>
                {/* Khối tính năng */}
                <Col xs={24} md={12}>
                    <Card 
                        title={<span className="font-bold text-gray-800 flex items-center gap-2"><AppstoreOutlined className="text-[#285f42]" /> Các tính năng chính</span>}
                        bordered={false} 
                        className="rounded-2xl shadow-sm border border-gray-200 h-full"
                    >
                        <ul className="space-y-3 text-sm text-gray-700">
                            <li className="flex items-start gap-2">
                                <CheckCircleOutlined className="text-emerald-600 mt-1" />
                                <span><strong>Quản lý danh mục:</strong> Thêm, chỉnh sửa, xóa và phân loại các chủ đề sách.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircleOutlined className="text-emerald-600 mt-1" />
                                <span><strong>Quản lý sản phẩm:</strong> Theo dõi chi tiết giá bán, số lượng sách tồn kho và mô tả sách.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircleOutlined className="text-emerald-600 mt-1" />
                                <span><strong>Báo cáo thống kê:</strong> Bảng điều khiển (Dashboard) hiển thị tổng quan số lượng đầu sách và hàng tồn.</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircleOutlined className="text-emerald-600 mt-1" />
                                <span><strong>Đăng nhập & phân quyền:</strong> Quản trị viên (Admin) và Nhân viên bán hàng (Staff).</span>
                            </li>
                        </ul>
                    </Card>
                </Col>

                {/* Khối công nghệ */}
                <Col xs={24} md={12}>
                    <Card 
                        title={<span className="font-bold text-gray-800 flex items-center gap-2"><CodeOutlined className="text-[#285f42]" /> Công nghệ sử dụng</span>}
                        bordered={false} 
                        className="rounded-2xl shadow-sm border border-gray-200 h-full"
                    >
                        <div className="space-y-4 text-sm">
                            <div>
                                <Text strong className="text-gray-800 block mb-1">Giao diện (Frontend):</Text>
                                <div className="flex flex-wrap gap-1.5">
                                    <Tag color="blue">React 19</Tag>
                                    <Tag color="geekblue">Vite</Tag>
                                    <Tag color="cyan">Ant Design v6</Tag>
                                    <Tag color="green">Tailwind CSS v4</Tag>
                                    <Tag color="purple">React Router v7</Tag>
                                </div>
                            </div>

                            <Divider className="my-2" />

                            <div>
                                <Text strong className="text-gray-800 block mb-1">Dịch vụ & Dữ liệu (Backend / Mock):</Text>
                                <div className="flex flex-wrap gap-1.5">
                                    <Tag color="orange">JSON Server (REST API)</Tag>
                                    <Tag color="volcano">Axios HTTP Client</Tag>
                                </div>
                            </div>

                            <Divider className="my-2" />

                            <div>
                                <Text strong className="text-gray-800 block mb-1">Phong cách thiết kế:</Text>
                                <Text type="secondary" className="text-xs">
                                    Tông màu xanh lá trà tự nhiên (#548261), mang lại cảm giác dễ chịu, thanh lịch khi làm việc thời gian dài.
                                </Text>
                            </div>
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default About;
