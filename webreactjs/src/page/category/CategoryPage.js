import React, {useEffect, useState} from "react"
import {request} from "../../share/request";
import {Button, Form, Input, Modal, Select, Space, Table, Tag, message} from "antd";
import { formatDateClient } from "../../share/helper";
import {DeleteFilled,EditFilled,FileAddFilled} from "@ant-design/icons"
const CategoryPage = () => {

    const [list,setList] = useState([])
    const [txtSearch,setTxtSearch] = useState("")
    const [statusSearch,setStatusSearch] = useState("")
    const [openModal,setOpenModal] = useState(false)
    const [categoryForm] = Form.useForm()
    const IdHiden = categoryForm.getFieldValue("Id"); 

    useEffect(()=>{
        getList();
    },[txtSearch,statusSearch])

    const getList = async () => {
        var param = "?txtSearch="+txtSearch
        param += "&txtStatus="+statusSearch
        const res = await request("category"+param,"get");
        if(res){
            setList(res.list)
        }else{
            alert(res.message)
        }
    }   

    const onSearch = (value) => {
        setTxtSearch(value)
    }

    const onSelectStatus = (value) => {
       setStatusSearch(value)
    }

    const onClearStatus = () => {
        setStatusSearch("")
    }

    const onFinish = async (value) => {
       
        var param = {
            Name : value.Name,
            Description : value.Description,
            Satus : value.Status
        }
        var method = "post"
        if(IdHiden){ // case update 
            param.Id = IdHiden
            method = "put"
        }
        const res = await request("category",method,param)
        onCloseModal();
        if(res){
            if(res.error){
                message.warning(res.message)
                return false;
            }
            message.success(res.message);
            getList();
        }else{
            message.success(res.message);
        }
        

    }

    const onClickNew = () => {
        setOpenModal(true)
    }

    const onCloseModal = () => {
        setOpenModal(false)
        categoryForm.resetFields();
    }

    const onClickEditBtn = (data) => {
        setOpenModal(true)
        categoryForm.setFieldsValue({
            Id : data.Id, // create new name in form
            Name : data.Name,
            Description:data.Description,
            Status : data.Status+""
        })
       
    }

    const onClickDeleteBtn = async (data) => {
        const res = await request("category/"+data.Id,"delete")
        if(res){
            message.success(res.message)
            getList();
        }
    }

   

    return (
        <div>
            <h1>{}</h1>
            <div 
                style={{
                    display:'flex',
                    justifyContent:'space-between'
                }}
            >
                <div>
                    <div>Category</div>
                    <div>Total : {list?.length}</div>
                </div>
                <div>
                    <Button onClick={onClickNew} type="primary" icon={<FileAddFilled/>}>New</Button>
                </div>
            </div>
            <div style={{marginTop:5,marginBottom:5}}>
                <Space>
                    <Input.Search allowClear style={{width:200}} onSearch={onSearch}  placeholder="Search"/>
                    <Select style={{width:150}} onClear={onClearStatus} allowClear placeholder="Status" onSelect={onSelectStatus}>
                        <Select.Option value={"1"}>Active</Select.Option>
                        <Select.Option value={"0"}>Disable</Select.Option>
                    </Select>
                </Space>
            </div>
            <Table 
                size="small"
                scroll={{
                    y: 240,
                }}
                pagination={{
                    pageSize:5
                }}
                dataSource={list}
                columns={[
                    {
                        key : "No",
                        title : "No",
                        dataIndex : "No",
                        render  : (value,rows,index) => (index + 1)
                    },
                    {
                        key : "Name",
                        title : "Name",
                        dataIndex : "Name",
                    },
                    {
                        key : "Description",
                        title : "Description",
                        dataIndex : "Description",
                    },
                    {
                        key : "Status",
                        title : "Status",
                        dataIndex : "Status",
                        render : (value) => value ? <Tag color="green">Actived</Tag> : <Tag color="red">Disabled</Tag>
                    },
                    {
                        key : "CreateAt",
                        title : "CreateAt",
                        dataIndex : "CreateAt",
                        render : (value) => formatDateClient(value)
                    },
                    {
                        key : "Action",
                        title : "Action",
                        dataIndex : "Action",
                        render : (value,data) => {
                            return (
                                <Space>
                                    <Button size="small" onClick={()=>onClickEditBtn(data)} type="primary" icon={<EditFilled/>}/>
                                    <Button size="small" onClick={()=>onClickDeleteBtn(data)}  danger icon={<DeleteFilled/>}/>
                                </Space>
                            )
                        }
                    }
                ]}
            />
            <Modal
                title={IdHiden ? "Update" : "New"}
                open={openModal}
                footer={null}
                onCancel={onCloseModal}
            >
                <Form
                    labelCol={{
                        span:6
                    }}
                    wrapperCol={{
                        span:18
                    }}
                    form={categoryForm}
                    onFinish={onFinish} 
                >
                    <Form.Item
                        label="Name"
                        name={"Name"}
                        rules={[
                            { required: true},
                        ]}
                    >
                        <Input placeholder="Name" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name={"Description"}
                        rules={[
                            { required: true},
                        ]}
                    >
                        <Input.TextArea 
                            placeholder="Description"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Status"
                        name={"Status"}
                    >
                       <Select placeholder={"Status"}>
                            <Select.Option value={"1"}>Active</Select.Option>
                            <Select.Option value={"0"}>Disable</Select.Option>
                       </Select>
                    </Form.Item>

                    <Form.Item
                       wrapperCol={{
                        offset:6,
                        span:18
                       }}
                       style={{
                        textAlign:"right"
                       }}
                    >
                        <Space>
                            <Button onClick={onCloseModal}>Cancel</Button>
                            <Button htmlType="submit" type="primary" >{IdHiden ? "Update" : "Save"}</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default CategoryPage;