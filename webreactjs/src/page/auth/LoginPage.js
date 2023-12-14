import {Link,useNavigate} from "react-router-dom"

const LoginPage = () => {

    const navigate = useNavigate()

    const onClickLogin = () => {
        console.log("Hello You have clicked me")
        // alert("Hello Click Button Login")
        // check password 
        var isPassCorrect = true 
        if(isPassCorrect){
            navigate("/")
        }else{
            alert("Incorrect password")
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
                /> <br/>
                <input 
                    placeholder="password"
                    style={{
                        padding:5,
                        height:35,
                        width:"100%",
                        marginTop:10
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