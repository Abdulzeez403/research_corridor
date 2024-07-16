import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import React from 'react';
// import { DollarSign } from 'react-icons/fa';

interface CardProps {
    title: string;
    total: any;
    icon?: any;
    subtitle: string
}

const CardComponent: React.FC<CardProps> = ({ title, total, icon, subtitle }) => {
    return (
        <Card x-chunk="dashboard-01-chunk-0 ">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 ">
                <CardTitle className="text-md font-medium">
                    {title}
                </CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-3xl font-bold text-customPrimary">{total}</div>
                <p className="text-xs text-muted-foreground">
                    {subtitle}
                </p>
            </CardContent>
        </Card>
    );
};

export default CardComponent;
