import { BookCheck, ChevronRight } from 'lucide-react';
import React, { useEffect } from 'react';
import { useNotifications } from './context';


interface INotification {
    message: string;
    // Add other fields as necessary
}

const NotificationItem: React.FC<INotification> = ({ message }) => (
    <div className="flex justify-between my-4">
        <div className='flex gap-x-2 items-center'>
            <div className="bg-green-400 rounded-md p-2">
                <BookCheck className="text-white" />
            </div>
            <div>
                {/* <h4 className="text-sm font-semibold">{title}</h4> */}
                <p className="text-xs">{message}</p>
            </div>
        </div>
        <ChevronRight />
    </div>
);

export const Notifications: React.FC = () => {
    const { notifications, loading, error, getNotifications } = useNotifications();

    useEffect(() => {
        getNotifications();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {notifications && notifications.length > 0 ? (
                notifications.map((n: any, index: number) => (
                    <NotificationItem
                        key={index}
                        message={n.message}
                    />
                ))
            ) : (
                <div>No notifications available</div>
            )}
        </div>
    );
};
