import React, { useEffect, useState } from 'react';
import { Button, Space, Table, Modal, Form, Input, Popconfirm, message } from "antd";
import instance from '../../services/01_index';

const Categories = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);

    // Tải danh sách danh mục từ API
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await instance.get("/categories");
            setData(res.data || []);
        } catch (error) {
            console.error("Lỗi khi tải danh mục:", error);
            message.error("Không thể tải danh sách danh mục");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Mở modal thêm mới
    const showAddModal = () => {
        setEditingCategory(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    // Mở modal sửa
    const showEditModal = (record) => {
        setEditingCategory(record);
        form.setFieldsValue({
            name: record.name,
            description: record.description,
        });
        setIsModalOpen(true);
    };

    // Đóng modal
    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingCategory(null);
        form.resetFields();
    };

    // Submit form thêm hoặc sửa
    const onFinish = async (values) => {
        try {
            if (editingCategory) {
                // Sửa danh mục
                const payload = {
                    ...editingCategory,
                    ...values,
                    updatedAt: new Date().toISOString(),
                };
                const res = await instance.put(`/categories/${editingCategory.id}`, payload);
                message.success("Cập nhật danh mục thành công!");
                setData(data.map((item) => (item.id === editingCategory.id ? res.data : item)));
            } else {
                // Thêm danh mục mới
                const payload = {
                    ...values,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };
                const res = await instance.post("/categories", payload);
                message.success("Thêm mới danh mục thành công!");
                setData([...data, res.data]);
            }

            setIsModalOpen(false);
            setEditingCategory(null);
            form.resetFields();
        } catch (error) {
            console.error("Lỗi khi lưu danh mục:", error);
            message.error("Đã xảy ra lỗi khi lưu danh mục");
        }
    };

    // Xóa danh mục
    const handleDelete = async (id) => {
        try {
            await instance.delete(`/categories/${id}`);
            message.success("Xóa danh mục thành công!");
            setData(data.filter((item) => item.id !== id));
        } catch (error) {
            console.error("Lỗi khi xóa danh mục:", error);
            message.error("Không thể xóa danh mục này");
        }
    };

    const columns = [
        {
            title: 'STT',
            key: 'stt',
            width: 70,
            align: 'center',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Tên danh mục',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span className="font-semibold text-gray-800">{text}</span>,
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => (date ? new Date(date).toLocaleString('vi-VN') : '-'),
        },
        {
            title: 'Ngày cập nhật',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            render: (date) => (date ? new Date(date).toLocaleString('vi-VN') : '-'),
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <Button 
                        type="link" 
                        className="text-blue-600 hover:text-blue-800 p-0"
                        onClick={() => showEditModal(record)}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Xác nhận xóa"
                        description={`Bạn có chắc chắn muốn xóa "${record.name}"?`}
                        onConfirm={() => handleDelete(record.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                        okButtonProps={{ danger: true }}
                    >
                        <Button 
                            type="link" 
                            danger 
                            className="p-0"
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h2 className="text-lg font-bold text-gray-800">Danh Sách Danh Mục</h2>
                    <p className="text-xs text-gray-500">Quản lý và phân loại các thể loại sách</p>
                </div>
                <Button 
                    type="primary" 
                    style={{ backgroundColor: "#285f42" }}
                    onClick={showAddModal}
                >
                    + Thêm Danh Mục
                </Button>
            </div>

            <Table 
                columns={columns} 
                dataSource={data} 
                rowKey="id" 
                loading={loading}
                pagination={{ pageSize: 8 }}
            />

            {/* Modal Thêm / Sửa Danh Mục */}
            <Modal
                title={editingCategory ? "Cập nhật danh mục" : "Thêm danh mục mới"}
                open={isModalOpen}
                onOk={() => form.submit()}
                onCancel={handleCancel}
                okText={editingCategory ? "Lưu thay đổi" : "Thêm mới"}
                cancelText="Hủy"
                okButtonProps={{ style: { backgroundColor: "#285f42" } }}
                destroyOnClose
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    className="mt-4"
                >
                    <Form.Item
                        label="Tên danh mục"
                        name="name"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên danh mục!" },
                            { min: 2, message: "Tên danh mục phải có ít nhất 2 ký tự!" },
                        ]}
                    >
                        <Input placeholder="Ví dụ: Lập trình Web, Kinh tế..." />
                    </Form.Item>

                    <Form.Item
                        label="Mô tả"
                        name="description"
                        rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
                    >
                        <Input.TextArea
                            rows={4}
                            placeholder="Nhập mô tả ngắn gọn về danh mục này"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Categories;
