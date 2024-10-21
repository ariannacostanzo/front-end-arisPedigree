import { Outlet } from "react-router-dom";
import Header from "./assets/components/header/Header";
import Footer from "./assets/components/footer/Footer";

const DefaultLayout = () => {
     return (
     <>
     <div className="p-4 container mx-auto">

       <Header></Header>
       <main>
        <Outlet></Outlet>
       </main>
       <Footer></Footer>
     </div>
     </>
     )
}
export default DefaultLayout;