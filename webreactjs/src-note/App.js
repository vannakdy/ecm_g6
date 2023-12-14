import logo from './logo.svg';
import './App.css';


function App() {

  const name = "sok";
  const age = 12;
  const dob = "12/12/1999"

  const arrCourse = ["HTML","C++","C#","Database","Java"];

  const objProduct =  {
    id : 1,
    name : "Coca",
    qty : 10,
  }

  const arrProduct = [
    {
      id : 1,
      name : "Coca",
      qty : 10,
    },
    {
      id : 2,
      name : "Sting",
      qty : 2000,
    },
    {
      id : 3,
      name : "Tiger",
      qty : 100,
    }
  ]

  return (
    <div>
      <div>{objProduct.id}-{objProduct.name}-{objProduct.qty}</div>
      <h1>{name}</h1>
      <button>{age}</button>
      <div>{dob}</div>
      <div>{arrCourse.length}</div>
      <div>{arrCourse[arrCourse.length-1]}</div>
      <div style={{padding:10}}>
        {arrCourse.map((item,index)=>
          <div style={{padding:10,margin:2,background:'#888',width:200}}>
            <div>{index+1}.{item}</div>
          </div>
        )}
      </div>
      <h1>List Product </h1>
      <div style={{padding:10}}>
        {arrProduct.map((item,index)=>
          <div style={{padding:10,margin:2,background:'#454',width:200}}>
            <div style={{color:"#FFF"}}>{index+1}.{item.name}</div>
            <div style={{color:"#FFF"}}>{item.qty}</div>
          </div>
        )}
      </div>

      <div 
        style={{
          marginTop:100,
          backgroundColor:"pink",
          height:300,
          width:300,
          border:"1px solid gray",
          marginLeft:20,
          padding:20,
          borderRadius:10,
          margin:'auto'
        }}
      >
        <img  src={logo} style={{width:80}}/>
        <div style={{fontSize:22,fontWeight:'bold',marginBottom:10}}>Login</div>
        <hr/>
        <input 
          style={{
            width:"100%",
            padding:4,
            marginTop:20,
          }}
          placeholder='Username' 
        />
        <input 
          style={{
            width:"100%",
            padding:4,
            marginTop:20,
            marginBottom:20
          }}
          placeholder='Password' 
        />
        <br/>
        <button>Login</button>
        <button>Create New Account</button>
      </div>
    </div>
  );
}

export default App;
