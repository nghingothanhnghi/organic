
import type { Route } from './+types/dashboard';
import React, { useEffect, useState } from 'react';
import LoadingComp from '~/components/loadingComp';

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Dashboard" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

const Dashboard = () => {
    const [loading, setLoading] = useState(true);

    // Simulate loading state (like fetching user data or any other operation)
    useEffect(() => {
        // Simulate a loading delay of 2 seconds (adjust the timeout as needed)
        const timer = setTimeout(() => {
            setLoading(false); // after 2 seconds, set loading to false
        }, 2000); // 2 seconds

        return () => clearTimeout(timer); // cleanup timeout on component unmount
    }, []);

    if (loading) {
        return <div className="loading-overlay">
            <LoadingComp message="Loading, please wait..." />
        </div>; // Show loading component while loading is true
    }
    return (
        <div className="dashboard-page">
            Dashboard
        </div>
    );
};

export default Dashboard;
