import { Outlet } from "react-router-dom";
import Header from "./assets/components/header/Header";
import Footer from "./assets/components/footer/Footer";

const DefaultLayout = () => {
     return (
       <>
         <Header></Header>
         
           <Outlet></Outlet>
         
         <Footer></Footer>
       </>
     );
}
export default DefaultLayout;