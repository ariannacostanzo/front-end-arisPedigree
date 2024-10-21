import { Outlet } from "react-router-dom";
import Header from "./assets/components/header/Header";
import Footer from "./assets/components/footer/Footer";

const DefaultLayout = () => {
     return (
       <>
         <Header></Header>
         <main className="p-4 container mx-auto">
           <Outlet></Outlet>
         </main>
         <Footer></Footer>
       </>
     );
}
export default DefaultLayout;