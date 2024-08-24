import React, { createContext, useState, useContext, ReactNode } from 'react';

interface Topping {
    name: string;
    price: number;
    quantity: number;
}

interface CartItem {
    mainDish: string;
    quantities: number[];
    toppings: Topping[];
    extraQuantity: number;
    totalPrice: number;
    priceMainDish: number;
}

interface Order {
    id: string;
    cart: CartItem[];
    total: number;
    deliveryFee: number;
    couponDiscount: number;
    storeName: string;
}

interface CanceledOrderContextProps {
    canceledOrders: Order[];
    addCanceledOrder: (order: Order) => void;
    removeCanceledOrder: (orderId: string) => void;
}

const CanceledOrderContext = createContext<CanceledOrderContextProps | undefined>(undefined);

export const CanceledOrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [canceledOrders, setCanceledOrders] = useState<Order[]>([]);

    const addCanceledOrder = (order: Order) => {
        setCanceledOrders([...canceledOrders, order]);
    };

    const removeCanceledOrder = (orderId: string) => {
        setCanceledOrders(canceledOrders.filter(order => order.id !== orderId));
    };

    return (
        <CanceledOrderContext.Provider value={{ canceledOrders, addCanceledOrder, removeCanceledOrder }}>
            {children}
        </CanceledOrderContext.Provider>
    );
};

export const useCanceledOrders = () => {
    const context = useContext(CanceledOrderContext);
    if (!context) {
        throw new Error('useCanceledOrders must be used within a CanceledOrderProvider');
    }
    return context;
};
