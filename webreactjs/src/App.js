import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./page/home/HomePage";
import EmployeePage from "./page/employee/EmployeePage";
import CustomerPage from "./page/customer/CustomerPage";
import LoginPage from "./page/auth/LoginPage";
import RegisterPage from "./page/auth/RegisterPage";
import RoutNotFound from "./page/404/RoutNotFound";
import MainLayout from "./component/layout/MainLayout";
import MainLayoutLogin from "./component/layout/MainLayoutLogin";
import RolePage from "./page/role/RolePage";

function App(){

  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="" element={<HomePage/>} />
          <Route path="/employee" element={<EmployeePage/>} />
          <Route path="/customer" element={<CustomerPage/>} />
          <Route path="/about" element={<CustomerPage/>} />
          <Route path="/product" element={<CustomerPage/>} />
          <Route path="/role" element={<RolePage/>} />
          <Route path="*" element={<RoutNotFound/>} />
        </Route>

        <Route element={<MainLayoutLogin />}>
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="*" element={<RoutNotFound/>} />
        </Route>

      </Routes>
     
    </BrowserRouter>
  )
}

export default App;