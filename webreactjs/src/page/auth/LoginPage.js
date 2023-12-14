import { useState } from "react"
import {Link,useNavigate} from "react-router-dom"
import { request } from "../../share/request"
import {message} from "antd"

const LoginPage = () => {

    const navigate = useNavigate()
    const [username,setUsername ] = useState("")
    const [password,setPassword ] = useState("")

    const onClickLogin = async () => {
        var data = {
            "Username" : username,//"098887766",
            "Password" : password//"123456"
        }
        if(username == ""){
            message.info("Please fill username!")
            return false;
        }else if (password == "") {
            message.info("Please fill password")
            return false;
        }
        const res = await request("employee/login","post",data);
        if(res){
            if(res.error){
                message.error(res.message)
            }else{
                // mean login success 
                // localStorage.setItem("your_key",value_to_store) // set
                // localStorage.setItem("your_key1",value_to_store)
                // const data = localStorage.getItem("your_key")  // get 
                // const data1 = localStorage.getItem("your_key1") 
                // localStorage.clear(); // clear
                // localStorage.removeItem("your_key1") // remove key

                // res.menu 
                // res.profile 
                // res.message
                localStorage.setItem("menu",JSON.stringify(res.menu)) // convert object from api to string Object
                localStorage.setItem("profile",JSON.stringify(res.profile))
                localStorage.setItem("isLogin","1")
                navigate("/")
            }
        }
        
    }

    return (
        <div>
           <div
                style={{
                    height:280,
                    width:400,
                    padding:20,
                    backgroundColor:"#eee",
                    margin:'auto',
                    marginTop:100
                }}
           >
                <div style={{fontSize:22,fontWeight:'bold',marginBottom:15}}>Login</div>
                <input 
                    placeholder="username"
                    style={{
                        padding:5,
                        height:35,
                        width:"100%"
                    }}
                    value={username}
                    onChange={(e)=>{
                        setUsername(e.target.value)
                    }}
                /> <br/>
                <input 
                    placeholder="password"
                    type="password"
                    style={{
                        padding:5,
                        height:35,
                        width:"100%",
                        marginTop:10
                    }}
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}
                /> <br/>
                    <button 
                        onClick={onClickLogin}
                        style={{height:40,backgroundColor:"#000",color:"#FFF",marginTop:20,width:200}}
                    >Login</button>
           </div>
        </div>
    )
}

export default LoginPage;

// function LoginPage(){

//     return (
//         <div>
//             <h1>LoginPage</h1>
//         </div>
//     )
// }

// export default LoginPage;