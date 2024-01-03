
import axios from 'axios'
import { useEffect, useState } from 'react'
import {request} from "../../share/request"
import {Button, Space, Table, Tag} from "antd"
import { formatDateClient } from '../../share/helper'
import { DeleteFilled, EditFilled } from '@ant-design/icons'
function PaymentMethod(){

    const [list,setList] = useState([]) // declare react state

    useEffect(()=>{
        getList();
    },[])

    const getList = async () => {
        const res = await request("payment_method","get",{});
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
                    <div>Payment Method</div>
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
                        key:"code",
                        title:"code",
                        dataIndex:"code"
                    },
                    {
                        key:"is_active",
                        title:"is_active",
                        dataIndex:"is_active",
                        render:(value) => value ? <Tag color='green'>Actived</Tag> : <Tag color='pink'>Disable</Tag>
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

export default PaymentMethod;