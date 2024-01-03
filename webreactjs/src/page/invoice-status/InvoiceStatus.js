
import axios from 'axios'
import { useEffect, useState } from 'react'
import {request} from "../../share/request"
import {Button, Space, Table} from "antd"
import { formatDateClient } from '../../share/helper'
import { DeleteFilled, EditFilled } from '@ant-design/icons'
function InvoiceStatus(){

    const [list,setList] = useState([]) 

    useEffect(()=>{
        getList();
    },[])

    const getList = async () => {
        const res = await request("invoice_status","get",{});
        if(res){
            setList(res.list)
        }
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
                    <div>Invoice Status</div>
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
                        key:"name",
                        title:"name",
                        dataIndex:"name"
                    },
                    {
                        key:"message",
                        title:"message",
                        dataIndex:"message"
                    },
                    {
                        key:"sort_order",
                        title:"sort_order",
                        dataIndex:"sort_order"
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
        </div>
    )
}

export default InvoiceStatus;