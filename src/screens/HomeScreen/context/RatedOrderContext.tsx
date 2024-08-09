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

interface RatedOrderContextProps {
    ratedOrders: Order[];
    addRatedOrder: (order: Order) => void;
    removeRatedOrder: (orderId: string) => void;
}

const RatedOrderContext = createContext<RatedOrderContextProps | undefined>(undefined);

export const RatedOrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ratedOrders, setRatedOrders] = useState<Order[]>([]);

    const addRatedOrder = (order: Order) => {
        setRatedOrders([...ratedOrders, order]);
    };

    const removeRatedOrder = (orderId: string) => {
        setRatedOrders(ratedOrders.filter(order => order.id !== orderId));
    };

    return (
        <RatedOrderContext.Provider value={{ ratedOrders, addRatedOrder, removeRatedOrder }}>
            {children}
        </RatedOrderContext.Provider>
    );
};

export const useRatedOrders = () => {
    const context = useContext(RatedOrderContext);
    if (!context) {
        throw new Error('useRatedOrders must be used within a RatedOrderProvider');
    }
    return context;
};
