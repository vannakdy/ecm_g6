import React, { useEffect, useState } from "react"
import { request } from "../../share/request";
import { Button, Col, Divider, Form, Image, Input, InputNumber, Modal, Row, Select, Space, Spin, Table, Tag, message } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons"
import moment from "moment"
import { Config, formatDateClient } from "../../share/helper";
// id	
// category_id
// name
// description	
// price	
// quantity	
// image	
// is_active	
// create_at
const ProductPage = () => {

    const [list, setList] = useState([])
    const [categoryList, setCategoryList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0)
    const [listRole, setListRole] = useState([])
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState(null)
    const [imagePreView, setImagePreView] = useState(null)
    const [formRef] = Form.useForm()
    const inputFileRef = React.useRef();

    useEffect(() => {
        getList()
    }, [])

    const getList = async () => {
        // get data from api 
        setLoading(true);
        const res = await request("product", "get", {})
        setTimeout(() => {
            setLoading(false);
        }, 1000);

        if (res) {
            setList(res.list);
            setCategoryList(res.list_category);
            setBrandList(res.list_brand);
        }
    }

    const onClickNew = () => {
        setOpen(true)
    }

    const onCloseModal = () => {
        formRef.resetFields();
        setOpen(false)

    }

    const onFinish = async (item) => {
        var formData = new FormData();
        formData.append("name", item.name);
        formData.append("category_id", item.category_id);
        formData.append("brand", item.brand);
        formData.append("price", item.price);
        formData.append("quantity", item.quantity);
        formData.append("description", item.description);
        formData.append("is_active", item.is_active);
        formData.append("image", item.Image); // old image
        if (image != null) {
            formData.append("product_image", image, image.filename);
        }
        var method = "post";
        if (formRef.getFieldValue("id") != null) {
            method = "put";
            formData.append("id", formRef.getFieldValue("id"))
        }
        const res = await request("product", method, formData);
        if (res) {
            onCloseModal();
            message.success(res.message);
            getList();

        }
    }

    const onChangeImage = (e) => {
        var file = e.target.files[0];
        setImage(file);
        var currentImageSelected = URL.createObjectURL(file)
        setImagePreView(currentImageSelected)

    }

    const onRmove = async (data) => {
        var param = {
            id: data.id
        }
        const res = await request("product", "delete", param)
        if (res) {
            message.success(res.message);
            getList();
        }
    }

    const onClickEdit = (data) => {
        setOpen(true)
        setImagePreView(Config.image_path + data.image)
        formRef.setFieldsValue({
            name: data.name,
            category_id: data.category_id,
            brand: data.brand,
            price: data.price,
            quantity: data.quantity,
            is_active: data.is_active+"",
            description: data.description,
            image: data.image,
            id:data.id
        })
    }

    const onRemoveImage = () => {
        setImagePreView(null);
        setImage(null);
        inputFileRef.current.value = null;
        formRef.setFieldsValue({
            Image: null
        })
    }

    return (
        <div>
            <Spin spinning={loading}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 10
                }}>
                    <div>
                        <div>Product</div>
                        <div>{total}.Items</div>
                    </div>
                    <div>
                        <Button type="primary" onClick={onClickNew}>New</Button>
                    </div>
                </div>
                <Table
                    dataSource={list}
                    columns={[
                        {
                            key: "No",
                            title: "No",
                            dataIndex: "id",
                            render: (value, rows, index) => index + 1
                        },
                        {
                            key: "name",
                            title: "name",
                            dataIndex: "name"
                        },
                        {
                            key: "category_id",
                            title: "Category",
                            dataIndex: "category_name",
                        },
                        {
                            key: "description",
                            title: "description",
                            dataIndex: "description",
                        },
                        {
                            key: "quantity",
                            title: "quantity",
                            dataIndex: "quantity",
                        },
                        {
                            key: "price",
                            title: "price",
                            dataIndex: "price",
                        },
                        {
                            key: "is_active",
                            title: "Status",
                            dataIndex: "is_active",
                            render : (value) => <Tag color={value ? "green" : "red-inverse"}>{value ? "Actived" : "Disabled"}</Tag>
                            // render : (value) => value == 1 ? <Tag color="green">Actived</Tag> : <Tag color="pink">Diabled</Tag>
                            // render : (value) => {
                            //     if(value == 1){
                            //         return (
                            //             <Tag color="green">Actived</Tag>
                            //         )
                            //     }else{
                            //         return (
                            //             <Tag color="pink">Diabled</Tag>
                            //         )
                            //     }
                                
                            // }
                        },
                        {
                            key: "Image",
                            title: "Image",
                            dataIndex: "image",
                            render: (value) => {
                                if (value != "" && value != null && value != 'null') {
                                    return (
                                        <Image
                                            src={Config.image_path + value}
                                            width={60}
                                        />
                                    )
                                } else {
                                    return (
                                        <div style={{
                                            width: 60,
                                            height: 60,
                                            backgroundColor: "#EEE"
                                        }} />
                                    )
                                }

                            }
                        },
                        {
                            key: "Action",
                            title: "Action",
                            dataIndex: "Action",
                            render: (value, data) => {
                                return (
                                    <Space>
                                        <Button onClick={() => onClickEdit(data)} type="primary" icon={<EditFilled />} />
                                        <Button onClick={() => onRmove(data)} danger icon={<DeleteFilled />} />
                                    </Space>
                                )
                            }
                        },

                    ]}
                />
            </Spin>
            <Modal
                open={open}
                onCancel={onCloseModal}
                title={formRef.getFieldValue("Id") ? "Update Product" : "New Product"}
                footer={null}
                maskClosable={false}
                width={600}
            >
                <Divider />
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    form={formRef}
                >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Product Name"
                                name={"name"}
                                rules={[{ required: true,}]}
                            >
                                <Input placeholder="Product Name" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Category Name"
                                name="category_id"
                                rules={[{ required: true,}]}
                            >
                                <Select
                                    placeholder="Select Category name"
                                    style={{ width: '100%' }}
                                >
                                    {categoryList.map((item, index) => {
                                        return (
                                            <Select.Option key={index} value={item.Id}>{item.Name}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Brand"
                                name="brand"
                            >
                                <Select
                                    placeholder="Select brand"
                                    style={{ width: '100%' }}
                                >
                                    {brandList.map((item, index) => {
                                        return (
                                            <Select.Option key={index} value={item.Id}>{item.Name}</Select.Option>
                                        )
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Description"
                                name={"description"}
                            >
                                <Input.TextArea placeholder="Description" />
                            </Form.Item>

                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Price"
                                name={"price"}
                                rules={[{ required: true,}]}
                            >
                                <InputNumber style={{ width: "100%" }} placeholder="Price" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Quantity"
                                name={"quantity"}
                                rules={[{ required: true,}]}
                            >
                                <InputNumber style={{ width: "100%" }} placeholder="Quantity" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        label="Product Status"
                        name={"is_active"}
                    >
                        <Select placeholder="Select status">
                            <Select.Option value="1">Active</Select.Option>
                            <Select.Option value="0">Disable</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name={"image"}
                    >
                        <input ref={inputFileRef} onChange={onChangeImage} type="file" />
                        <div>
                            {(imagePreView != null && imagePreView != "") &&
                                <div style={{
                                    width: 100,
                                    backgroundColor: '#EEE',
                                    marginTop: 10,
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <img
                                        style={{}}
                                        src={imagePreView}
                                        width={50}
                                        height={50}
                                    />
                                    <Button danger onClick={onRemoveImage} icon={<DeleteFilled />} />

                                </div>
                            }
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button onClick={onCloseModal}>Cancel</Button>
                            <Button onClick={() => formRef.resetFields()}>Clear</Button>
                            <Button type="primary" htmlType="submit">{formRef.getFieldValue("Id") ? "Update" : "Save"}</Button>
                        </Space>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}

export default ProductPage;