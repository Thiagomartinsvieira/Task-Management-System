import React from "react";
import { AlertCircle } from "lucide-react";
import { useToast } from "./ui/use-toast";

interface ErrorToastProps {
  message?: string;
  duration?: number;
  variant?: "default" | "destructive";
  onClose?: () => void;
}

const ErrorToast: React.FC<ErrorToastProps> = ({
  message = "An error occurred. Please try again.",
  duration = 5000,
  variant = "destructive",
  onClose = () => {},
}) => {
  const { toast } = useToast();

  const showErrorToast = () => {
    toast({
      variant,
      title: "Error",
      description: message,
      duration: duration,
      onOpenChange: (open) => {
        if (!open) onClose();
      },
    });
  };

  // Component for demonstration purposes
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 w-full max-w-[350px] h-[80px] flex items-center">
      <div className="flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-red-500" />
        <div>
          <h4 className="text-sm font-medium text-gray-900">Error</h4>
          <p className="text-xs text-gray-500">{message}</p>
        </div>
      </div>
      <button
        onClick={showErrorToast}
        className="ml-auto text-xs text-blue-600 hover:text-blue-800"
      >
        Show Toast
      </button>
    </div>
  );
};

export default ErrorToast;
