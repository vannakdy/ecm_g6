import React, { useEffect, useState } from "react"
import { request } from "../../share/request";
import { Button, Col, Divider, Form, Image, Input, InputNumber, Modal, Row, Select, Space, Spin, Table, Tag, message } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons"
import moment from "moment"
import { Config, formatDateClient } from "../../share/helper";
import styles from "./styles.module.css"
const POS = () => {

    const [list, setList] = useState([])
    const [txtSearchId, setTxtSearchId] = useState([])
    const [categoryList, setCategoryList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listRole, setListRole] = useState([])
    const [open, setOpen] = useState(false)
    const [image, setImage] = useState(null)
    const [imagePreView, setImagePreView] = useState(null)
    const [formRef] = Form.useForm()
    const inputFileRef = React.useRef();

    const [subTotal,setSubTotal] = useState(0)
    const [discount,setDiscount] = useState(0)
    const [tx,setTax] = useState(0)
    const [total,setTotal] = useState(0)

    const getList = async (ParamId) => {
        setLoading(true);
        var param = {
            id:ParamId
        }
        const res = await request("product/getone", "post",param )
        setLoading(false);
        if (res && res.list.length > 0) {
            var listTmp = res.list;
            if(listTmp.length > 0){;
                listTmp[0].qty = 1;
            }
            // find is existing product id => update qty
            var isExisting = 0;
            for(var i = 0 ; i < list.length ; i ++){
                if(list[i].id == listTmp[0].id){ // => true => mean have existing product
                    list[i].qty = list[i].qty + 1;
                    listTmp = [...list];
                    isExisting = 1;
                    break;
                }
            }
            // end
            
            if(isExisting == 0){
                listTmp =  [...listTmp, ...list]; // concat data from api + current list
            }

            // find subtotal, total
            var sub_total = 0;
            listTmp.map((item,index)=>{
                sub_total = sub_total +  (item.price * item.qty)
            })
            var total = sub_total;
            // end find subtotal, total

           

            setSubTotal(sub_total);
            setTotal(total);
            setList(listTmp);
            setTxtSearchId("");
        }else{
            message.info("Product not found!")
        }
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


    const onRemoveImage = () => {
        setImagePreView(null);
        setImage(null);
        inputFileRef.current.value = null;
        formRef.setFieldsValue({
            Image: null
        })
    }

    const onSearchProductId = (value) => {
        if(value != null && value != ""){
            getList(value)
        }
      
    }

    const handleCheckout = async() => {
        if(list.length == 0 ){
            return null
        }
        var param = {
            customer_id : 1,
            user_id : 1,
            order_status_id : 7,
            payment_method_id : 1,
            total : total,
            note : "",
            is_paid : true,
            array_product : list
        }
        const res = await request("order","post",param);
        if(res){
            message.success(res.message)
            setList([])
        }else{
            message.error("Something wrong!")
        }
    }

    return (
        <div>
            <div className="txtMain">POS</div>
            <Row gutter={5}>
                <Col className={styles.contain_g1} span={16}>
                    <div className={styles.contain_search}>
                        <Input.Search
                            value={txtSearchId}
                            placeholder="Prodoct Id" 
                            style={{width:200}} 
                            onSearch={onSearchProductId}
                            onChange={(e)=>{
                                setTxtSearchId(e.target.value)
                            }}
                            allowClear={true}
                        />
                    </div>
                    {list.map((item,index)=>{
                        return (
                            <div className={styles.rowProduct} key={index}>
                                <div style={{display:'flex'}}>
                                    <div style={{marginRight:15}}>
                                        <Image 
                                            width={80}
                                            src={Config.image_path+item.image}
                                        />
                                    </div>
                                    <div>
                                        <div className={styles.txtId}>ID : {item.id}</div>
                                        <div className={styles.txtName}>{item.name}</div>
                                        <div className={styles.txtDes}>{item.description}</div>
                                        <div className={styles.txtQty}>Stock : {item.quantity}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className={styles.txtPrice} >{"$"+item.price.toFixed(2)}</div>
                                    <div className={styles.txtQty}>Qty : {item.qty}</div>
                                    
                                </div>
                            </div>

                        )
                    })}
                </Col>
                <Col style={{padding:15}} className={styles.contain_g2} span={8}>
                    <div className="txtMain">Summary</div>
                    <Input placeholder="Customer" />
                    <Input placeholder="Payment Method" />
                    <Input placeholder="Order status" />
                    <div className={styles.rowSummary}>
                        <div className="txtMain" >Sub Total</div>
                        <div className="txtPrice">{"$"+subTotal.toFixed(2)}</div>
                    </div>
                    <div className={styles.rowSummary}>
                        <div className="txtMain" >Discount</div>
                        <div className="txtPrice">
                            <InputNumber size="small" value={0} />
                        </div>
                    </div>
                    <div className={styles.rowSummary}>
                        <div className="txtMain" >Tax</div>
                        <div className="txtPrice">
                            <InputNumber size="small" value={0} />
                        </div>
                    </div>
                    <Divider />
                    <div className={styles.rowSummary}>
                        <div className="txtMain" >Total</div>
                        <div className="txtPrice">{"$"+total.toFixed(2)}</div>
                    </div>
                    <Button block onClick={handleCheckout} type="primary">Checkout</Button>
                </Col>
            </Row>

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

export default POS;