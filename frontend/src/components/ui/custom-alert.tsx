import React, { useEffect, useState } from 'react';

interface CustomAlertProps {
    header: string;
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    onClose?: () => void;
}

const CustomAlert: React.FC<CustomAlertProps> = ({
    header,
    message,
    type = 'info',
    onClose
}) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            onClose?.();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    if (!isVisible) return null;

    const alertStyles: { [key: string]: string } = {
        success: 'bg-green-100 border-green-500 text-green-700',
        error: 'bg-red-100 border-red-500 text-red-700',
        warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
        info: 'bg-blue-100 border-blue-500 text-blue-700'
    };

    return (
        <div
            className={`fixed top-4 right-4 p-4 rounded-lg border-l-4 shadow-md transition-opacity ${alertStyles[type]}`}
            role="alert"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="font-bold mb-1">{header}</h3>
                    <p className="text-sm">{message}</p>
                </div>
                <button
                    onClick={() => {
                        setIsVisible(false);
                        onClose?.();
                    }}
                    className="ml-4 text-gray-500 hover:text-gray-700"
                >
                    ×
                </button>
            </div>
        </div>
    );
};

export default CustomAlert;