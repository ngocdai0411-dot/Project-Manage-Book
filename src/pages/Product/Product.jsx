import React, { useEffect, useState } from 'react';
import { 
    Button, 
    Space, 
    Table, 
    Modal, 
    Form, 
    Input, 
    InputNumber, 
    Select, 
    Popconfirm, 
    Tag, 
    message 
} from "antd";
import instance from '../../services/01_index';

const Product = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [form] = Form.useForm();

    // Tải danh sách sản phẩm và danh mục
    const fetchData = async () => {
        setLoading(true);
        try {
            const [prodRes, catRes] = await Promise.all([
                instance.get('/products'),
                instance.get('/categories'),
            ]);
            setProducts(prodRes.data || []);
            setCategories(catRes.data || []);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
            message.error("Không thể tải danh sách sản phẩm");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Mở modal thêm sản phẩm mới
    const showAddModal = () => {
        setEditingProduct(null);
        form.resetFields();
        setIsModalOpen(true);
    };

    // Mở modal chỉnh sửa sản phẩm
    const showEditModal = (record) => {
        setEditingProduct(record);
        form.setFieldsValue({
            name: record.name,
            categoryId: record.categoryId ? String(record.categoryId) : undefined,
            price: record.price,
            quantity: record.quantity,
            description: record.description,
        });
        setIsModalOpen(true);
    };

    // Đóng modal
    const handleCancel = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
        form.resetFields();
    };

    // Xử lý gửi Form (Thêm hoặc Sửa)
    const onFinish = async (values) => {
        try {
            const payload = {
                ...values,
                price: Number(values.price),
                quantity: Number(values.quantity),
            };

            if (editingProduct) {
                // Chỉnh sửa sản phẩm
                const res = await instance.put(`/products/${editingProduct.id}`, {
                    ...editingProduct,
                    ...payload,
                });
                message.success("Cập nhật sản phẩm thành công!");
                setProducts(products.map((p) => (p.id === editingProduct.id ? res.data : p)));
            } else {
                // Thêm sản phẩm mới
                const res = await instance.post('/products', payload);
                message.success("Thêm mới sản phẩm thành công!");
                setProducts([...products, res.data]);
            }

            setIsModalOpen(false);
            setEditingProduct(null);
            form.resetFields();
        } catch (error) {
            console.error("Lỗi khi lưu sản phẩm:", error);
            message.error("Đã xảy ra lỗi khi lưu sản phẩm");
        }
    };

    // Xóa sản phẩm
    const handleDelete = async (id) => {
        try {
            await instance.delete(`/products/${id}`);
            message.success("Xóa sản phẩm thành công!");
            setProducts(products.filter((p) => p.id !== id));
        } catch (error) {
            console.error("Lỗi khi xóa sản phẩm:", error);
            message.error("Không thể xóa sản phẩm này");
        }
    };

    // Lấy tên danh mục theo categoryId
    const getCategoryName = (catId) => {
        if (!catId) return 'Chưa phân loại';
        const found = categories.find((c) => String(c.id) === String(catId));
        return found ? found.name : 'Chưa phân loại';
    };

    const columns = [
        {
            title: 'STT',
            key: 'stt',
            width: 65,
            align: 'center',
            render: (_, __, index) => index + 1,
        },
        {
            title: 'Tên sách',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span className="font-semibold text-gray-800">{text}</span>,
        },
        {
            title: 'Danh mục',
            dataIndex: 'categoryId',
            key: 'categoryId',
            render: (catId) => (
                <Tag color="cyan">
                    {getCategoryName(catId)}
                </Tag>
            ),
        },
        {
            title: 'Giá bán',
            dataIndex: 'price',
            key: 'price',
            align: 'right',
            render: (price) => (
                <span className="font-medium text-emerald-700">
                    {Number(price || 0).toLocaleString('vi-VN')} đ
                </span>
            ),
        },
        {
            title: 'Số lượng tồn',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
            render: (quantity) => {
                const qty = Number(quantity || 0);
                const color = qty > 20 ? 'green' : qty > 0 ? 'orange' : 'red';
                return <Tag color={color}>{qty} quyển</Tag>;
            },
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            key: 'description',
            ellipsis: true,
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
                        description={`Bạn có chắc chắn muốn xóa sách "${record.name}"?`}
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
                    <h2 className="text-lg font-bold text-gray-800">Danh Sách Sản Phẩm (Sách)</h2>
                    <p className="text-xs text-gray-500">Quản lý kho sách, giá bán và số lượng tồn kho</p>
                </div>
                <Button 
                    type="primary" 
                    style={{ backgroundColor: "#285f42" }}
                    onClick={showAddModal}
                >
                    + Thêm Sản Phẩm
                </Button>
            </div>

            <Table 
                columns={columns} 
                dataSource={products} 
                rowKey="id" 
                loading={loading}
                pagination={{ pageSize: 8 }}
            />

            {/* Modal Thêm / Sửa Sản Phẩm */}
            <Modal
                title={editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm mới"}
                open={isModalOpen}
                onOk={() => form.submit()}
                onCancel={handleCancel}
                okText={editingProduct ? "Lưu thay đổi" : "Thêm mới"}
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
                        label="Tên sách"
                        name="name"
                        rules={[
                            { required: true, message: "Vui lòng nhập tên sách!" },
                            { min: 2, message: "Tên sách phải có ít nhất 2 ký tự!" },
                        ]}
                    >
                        <Input placeholder="Ví dụ: Lập trình Frontend với ReactJS" />
                    </Form.Item>

                    <Form.Item
                        label="Danh mục"
                        name="categoryId"
                        rules={[{ required: true, message: "Vui lòng chọn danh mục!" }]}
                    >
                        <Select 
                            placeholder="Chọn danh mục sách"
                            options={categories.map((cat) => ({
                                label: cat.name,
                                value: String(cat.id),
                            }))}
                        />
                    </Form.Item>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            label="Giá bán (VND)"
                            name="price"
                            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
                        >
                            <InputNumber
                                min={0}
                                step={1000}
                                className="w-full"
                                placeholder="100000"
                                formatter={(val) => `${val}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(val) => (val ? val.replace(/\$\s?|(,*)/g, '') : '')}
                            />
                        </Form.Item>

                        <Form.Item
                            label="Số lượng trong kho"
                            name="quantity"
                            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
                        >
                            <InputNumber
                                min={0}
                                step={1}
                                className="w-full"
                                placeholder="10"
                            />
                        </Form.Item>
                    </div>

                    <Form.Item
                        label="Mô tả sách"
                        name="description"
                    >
                        <Input.TextArea
                            rows={3}
                            placeholder="Nhập mô tả tóm tắt về nội dung cuốn sách"
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Product;
