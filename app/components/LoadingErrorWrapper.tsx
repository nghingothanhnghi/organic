import React from "react";

interface LoadingErrorWrapperProps {
  loading: boolean;
  error: string | null;
  children: React.ReactNode;
}

const LoadingErrorWrapper: React.FC<LoadingErrorWrapperProps> = ({ loading, error, children }) => {
  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-4">Error: {error}</div>;
  }

  return <>{children}</>;
};

export default LoadingErrorWrapper;
