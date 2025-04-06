import { useEffect } from "react";
import { Outlet, useNavigation } from "react-router";
import { useAppDispatch, useAppSelector } from "~/hooks";
import { fetchPages } from "~/features/pageSlice";
import Header from "./header";
import Footer from "./footer";
import LoadingComp from "./loadingComp";

const Layout = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation();

    const { pages, loading } = useAppSelector(state => state.pages); // Access the loading state from Redux


    // Fetch pages when the Layout component is first mounted
    useEffect(() => {
        dispatch(fetchPages({ page: 1, pageSize: 25 })); // You can customize page and pageSize
    }, [dispatch]);

    // Determine if a route transition is in progress
    const isNavigationLoading = navigation.state === "loading";
    const isLoading = isNavigationLoading || loading;  // Show loading if navigation or pages fetching is in progress

    return (
        <>
            <Header />
            {isLoading && (
                <div className="fixed inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
                    <LoadingComp message="Loading, please wait..." />
                </div>
            )}
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default Layout;