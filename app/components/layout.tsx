import { Outlet } from "react-router";
import Header from "./header";

const Layout = () => {
    return (
        <div>
            <Header />
            <main style={{ padding: '1rem' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;