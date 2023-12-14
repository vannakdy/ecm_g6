import {Outlet} from "react-router-dom"
const MainLayoutLogin = () => {

    return (
        <div>
            <div 
                style={{
                    height:60,
                    backgroundColor:"pink"
                }}
            >
                <div style={{textAlign:'center',fontSize:18,paddingTop:10}}>Header Brand Name</div>
            </div>

            <div>
                <Outlet/>
            </div>
        </div>
    )
}

export default MainLayoutLogin;