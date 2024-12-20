import { Outlet, useNavigation } from "react-router";
import Header from "./header";
import Footer from "./footer";
import LoadingComp from "./loadingComp";

const Layout = () => {
    const navigation = useNavigation();

    // Determine if a route transition is in progress
    const isLoading = navigation.state === "loading";
    return (
        <div>
            <Header />
            {isLoading && (
                <div className="loading-overlay">
                    <LoadingComp message="Loading, please wait..." />
                </div>
            )}
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;