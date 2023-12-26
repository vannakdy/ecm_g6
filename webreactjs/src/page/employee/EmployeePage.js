import React, { useEffect, useState } from "react"
import { request } from "../../share/request";
import { Button, Form, Image, Input, InputNumber, Modal, Select, Space, Table, message } from "antd";
import { EditFilled, DeleteFilled } from "@ant-design/icons"
import moment from "moment"
import { Config, formatDateClient } from "../../share/helper";
const EmployeePage = () => {

    const [list, setList] = useState([])
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
        const res = await request("employee", "get", {})
        if (res) {
            setList(res.list);
            setTotal(res.totalRecords);
            setListRole(res.roleList)
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
        formData.append("Firstname", item.Firstname);
        formData.append("Lastname", item.Lastname);
        formData.append("Gender", item.Gender);
        formData.append("Dob", item.Dob);
        formData.append("Tel", item.Tel);
        formData.append("Email", item.Email);
        formData.append("Address", "Adresss...");
        formData.append("Salary", 200);
        formData.append("RoleId", item.RoleId);
        formData.append("Image", item.Image); // old image
        if(image != null){
            formData.append("upload_emp", image, image.filename);
        }
        var method = "post";
        if(formRef.getFieldValue("Id") != null){
            method = "put";
            formData.append("Id",formRef.getFieldValue("Id"))
        }
        const res = await request("employee", method, formData)
        if (res) {
            onCloseModal();
            message.success(res.message)
            getList()

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
            Id: data.Id
        }
        const res = await request("employee", "delete", param)
        if (res) {
            message.success(res.message);
            getList();
        }
    }

    const onClickEdit = (data) => {
        setOpen(true)
        setImagePreView(Config.image_path+data.Image)
        formRef.setFieldsValue({
            Firstname:data.Firstname,
            Lastname:data.Lastname,
            Gender:data.Gender+"",
            Dob:data.Dob+"",
            Tel:data.Tel,
            Email:data.Email,
            Address:data.Address,
            Salart:data.Salary,
            RoleId:data.RoleId,
            Id:data.Id,
            Image:data.Image
        })
    }

    const onRemoveImage = () => {
        setImagePreView(null);
        setImage(null);
        inputFileRef.current.value = null;
        formRef.setFieldsValue({
            Image:null
        })
    }

    return (
        <div>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10
            }}>
                <div>
                    <div>Employee</div>
                    <div>{total}.Emp</div>
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
                        dataIndex: "Id",
                        render: (value, rows, index) => index + 1
                    },
                    {
                        key: "Firstname",
                        title: "Firstname",
                        dataIndex: "Firstname"
                    },
                    {
                        key: "Lastname",
                        title: "Lastname",
                        dataIndex: "Lastname",
                    },
                    {
                        key: "Gender",
                        title: "Gender",
                        dataIndex: "Gender",
                        render: (value) => (value == 0 ? "Female" : "Male")
                    },
                    {
                        key: "Dob",
                        title: "Dob",
                        dataIndex: "Dob",
                        render: (value) => formatDateClient(value)// 01/12/2024
                    },
                    {
                        key: "Email",
                        title: "Email",
                        dataIndex: "Email",
                    },
                    {
                        key: "RoleName",
                        title: "RoleName",
                        dataIndex: "RoleName",
                    },
                    {
                        key: "Image",
                        title: "Image",
                        dataIndex: "Image",
                        render: (value) => {
                            if(value != "" && value != null && value != 'null'){
                                return (
                                    <Image
                                        src={Config.image_path + value}
                                        width={60}
                                    />
                                )
                            }else{
                                return (
                                    <div style={{
                                        width:60,
                                        height:60,
                                        backgroundColor:"#EEE"
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
            <Modal
                open={open}
                onCancel={onCloseModal}
                title={formRef.getFieldValue("Id") ? "Update Employee" : "New Employee"}
                footer={null}
                maskClosable={false}
            >
                <Form
                    onFinish={onFinish}
                    form={formRef}
                >
                    <Form.Item
                        label="Firstname"
                        name={"Firstname"}
                    >
                        <Input placeholder="Firstname" />
                    </Form.Item>

                    <Form.Item
                        label="Lastname"
                        name={"Lastname"}
                    >
                        <Input placeholder="Lastname" />
                    </Form.Item>

                    <Form.Item
                        label="Gender"
                        name={"Gender"}
                    >
                        <Select placeholder="Gender">
                            <Select.Option value="1">Male</Select.Option>
                            <Select.Option value="0">Female</Select.Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        label="Dob"
                        name={"Dob"}
                    >
                        <Input placeholder="Dob" />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name={"Email"}
                    >
                        <Input placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name={"Address"}
                    >
                        <Input.TextArea placeholder="Address" />
                    </Form.Item>

                    <Form.Item
                        label="Salary"
                        name={"Salary"}
                    >
                        <InputNumber style={{width:"100%"}} placeholder="Salary" />
                    </Form.Item>

                    <Form.Item
                        label="Tel"
                        name={"Tel"}
                    >
                        <Input placeholder="Tel" />
                    </Form.Item>

                    <Form.Item
                        label="RoleId"
                        name="RoleId"
                    >
                        <Select
                            placeholder="Select Role"
                            style={{ width: '100%' }}
                        >
                            {listRole.map((item, index) => {
                                return (
                                    <Select.Option key={index} value={item.Id}>{item.Name}</Select.Option>
                                )
                            })}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Image"
                        name={"Image"}
                    >
                        <input ref={inputFileRef} onChange={onChangeImage} type="file" />
                        <div>
                            {(imagePreView != null && imagePreView != "") &&
                                <div style={{
                                    width: 100,
                                    backgroundColor: '#EEE', 
                                    marginTop: 10,
                                    display:'flex',
                                    justifyContent:'space-between'
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
                            <Button onClick={()=>formRef.resetFields()}>Clear</Button>
                            <Button type="primary" htmlType="submit">{formRef.getFieldValue("Id") ? "Update" : "Save"}</Button>
                        </Space>
                    </Form.Item>

                </Form>
            </Modal>
        </div>
    )
}

export default EmployeePage;