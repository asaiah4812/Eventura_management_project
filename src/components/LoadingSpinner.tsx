// src/components/LoadingSpinner.tsx
const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
      </div>
    );
  };
  
  export default LoadingSpinner;