// src/components/ErrorMessage.tsx
interface ErrorMessageProps {
    message: string;
  }
  
  const ErrorMessage = ({ message }: ErrorMessageProps) => {
    return (
      <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md">
        {message}
      </div>
    );
  };
  
  export default ErrorMessage;