import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";

const Layout = () => {
    return (
        <div>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;