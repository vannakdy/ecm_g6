
import axios from 'axios'
import { useEffect, useState } from 'react'
import {request} from "../../share/request"
function RolePage(){

    const [list,setList] = useState([]) // declare react state
    // const [username,setUsername] = useState("")
    // const [productPrice,setProductPrice] = useState(0)

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

    return (
        <div>
            <h1>Role  {list.length} </h1>
            <table style={{width:'100%'}}>
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
            </table>
        </div>
    )
}

export default RolePage;