
import axios from 'axios'
import { useEffect, useState } from 'react'
import {request} from "../../share/request"
import {Button, Space, Table} from "antd"
import { formatDateClient } from '../../share/helper'
import { DeleteFilled, EditFilled } from '@ant-design/icons'
function RolePage(){

    const [list,setList] = useState([]) // declare react state

    useEffect(()=>{
        getList();
    },[])

    const getList = async () => {
        const res = await request("role","get",{});
        if(res){
            setList(res.role)
        }
    }

    const getList1 = async () => {

        // const res = await request("role","get",{});
        // if(res){
        //     setList(res.role)
        // }

        // request("role","get",{}).then(res=>{
        //     setList(res.role)
        // })

        // axios({
        //     url: "http://localhost:8081/api/role",
        //     method: "get",
        //     data:{
        //     }
        // }).then(res=>{
        //     setList(res.data.role)
        //     // console.log(res.data.total)
        //     // console.log(res.data.role)
        //     /// data response from server
        // }).catch(err=>{
        //     console.log(err)
        //     /// error
        // }).finally(()=>{
        //     ///
        //     console.log("finally")
        // })
    }

    const onClickEdit = () => {

    }

    const onRmove = () => {

    }

    const onClickNew = () => {

    }
    
    return (
        <div>
           <div style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10
            }}>
                <div>
                    <div>Role</div>
                </div>
                <div>
                    <Button type="primary" onClick={onClickNew}>New</Button>
                </div>
            </div>
            <Table
                dataSource={list}
                columns={[
                    {
                        key:"No",
                        title:"No",
                        render:(value,data,index) => index+1
                    },
                    {
                        key:"Name",
                        title:"Name",
                        dataIndex:"Name"
                    },
                    {
                        key:"Code",
                        title:"Code",
                        dataIndex:"Code"
                    },
                    {
                        key:"CreateAt",
                        title:"CreateAt",
                        dataIndex:"CreateAt",
                        render:(value) => formatDateClient(value,true)
                    },
                    {
                        key:"Action",
                        title:"Action",
                        render:(value,data) => {
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
            {/* <table style={{width:'100%'}}>
                <thead>
                    <tr>
                        <th style={{textAlign:"left"}}>Id</th>
                        <th style={{textAlign:"left"}}>Name</th>
                        <th style={{textAlign:"left"}}>Code</th>
                        <th style={{textAlign:"left"}}>CreateAt</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((item,index)=>(
                        <tr key={index}>
                            <td>{item.Id}</td>
                            <td>{item.Name}</td>
                            <td>{item.Code}</td>
                            <td>{item.CreateAt}</td>
                        </tr>
                    ))}
                    
                </tbody>
            </table> */}
        </div>
    )
}

export default RolePage;