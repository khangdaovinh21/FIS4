
import React, { createContext, useState, ReactNode } from 'react';

interface Coupon {
    id: string;
    name: string;
    discount: number;
    image: any;
}

interface CouponsContextProps {
    selectedCoupon: Coupon | null;
    selectCoupon: (coupon: Coupon) => void;
}

export const CouponsContext = createContext<CouponsContextProps | undefined>(undefined);

export const CouponsProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

    const selectCoupon = (coupon: Coupon) => {
        setSelectedCoupon(coupon);
    };

    return (
        <CouponsContext.Provider value={{ selectedCoupon, selectCoupon }}>
            {children}
        </CouponsContext.Provider>
    );
};
