import {useEffect, useState} from "react"
import { request } from "../../share/request";
import {Button, Image, Space, Table} from "antd";
import {EditFilled,DeleteFilled} from "@ant-design/icons"
import moment from "moment"
import { Config, formatDateClient } from "../../share/helper";
const  EmployeePage = () => {

    const [list,setList] = useState([])

    useEffect(()=>{
        getList()
    },[])
    
    const getList = async () => {
        // get data from api 
        const res = await request("employee","get",{})
        if(res){
            setList(res.list)
        }
    }

    return (
        <div>
            <h1>Employee</h1>
            <Table 
                dataSource={list}
                columns={[
                    {
                        key : "No",
                        title : "No",
                        dataIndex : "Id",
                        render : (value,rows,index) => index + 1
                    },
                    {
                        key : "Firstname",
                        title : "Firstname",
                        dataIndex : "Firstname"
                    },
                    {
                        key : "Lastname",
                        title : "Lastname",
                        dataIndex : "Lastname",
                    },
                    {
                        key : "Gender",
                        title : "Gender",
                        dataIndex : "Gender",
                        render : (value) =>  (value == 0 ? "Female" : "Male")
                        // render : (value) => {
                        //     if(value == 0){
                        //         return "Female"
                        //     }else {
                        //         return "Male"
                        //     }
                        // }
                    },
                    {
                        key : "Dob",
                        title : "Dob",
                        dataIndex : "Dob",
                        render : (value) => formatDateClient(value)// 01/12/2024
                    },
                    {
                        key : "Email",
                        title : "Email",
                        dataIndex : "Email",
                    },
                    {
                        key : "Role",
                        title : "Role",
                        dataIndex : "Role",
                    },
                    {
                        key : "Image",
                        title : "Image",
                        dataIndex : "Image",
                        render : (value) => {
                            return (
                                <Image 
                                    src={Config.image_path+value}
                                    width={100}
                                />
                            )
                        }
                    },
                    {
                        key : "Action",
                        title : "Action",
                        dataIndex : "Action",
                        render : () => {
                            return (
                                <Space>
                                    <Button onClick={()=>alert(1)} type="primary" icon={<EditFilled/>} />
                                    <Button onClick={()=>alert(2)} danger icon={<DeleteFilled />} />
                                </Space>
                            )
                        }
                    },

                ]}
            />
        </div>
    )
}

export default EmployeePage;