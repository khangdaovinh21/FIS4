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

interface OrderContextProps {
    orders: Order[];
    completedOrders: Order[];
    toRateOrders: Order[];
    addOrder: (order: Order) => void;
    completeOrder: (order: Order) => void;
    removeOrderFromToRate: (orderId: string) => void; 
}

const OrderContext = createContext<OrderContextProps | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
    const [toRateOrders, setToRateOrders] = useState<Order[]>([]);

    const addOrder = (order: Order) => {
        const updatedCart = order.cart.map(cartItem => ({
            ...cartItem,
            priceMainDish: cartItem.quantities.reduce((sum, quantity) => sum + quantity * 12, 0)
        }));

        setOrders([...orders, { ...order, cart: updatedCart }]);
    };

    const completeOrder = (order: Order) => {
        setCompletedOrders([...completedOrders, order]);
        setToRateOrders([...toRateOrders, order]);
        setOrders(orders.filter(o => o.id !== order.id));
    };

    const removeOrderFromToRate = (orderId: string) => {
        setToRateOrders(toRateOrders.filter(order => order.id !== orderId));
    };

    return (
        <OrderContext.Provider value={{ orders, completedOrders, toRateOrders, addOrder, completeOrder, removeOrderFromToRate }}>
            {children}
        </OrderContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrderContext);
    if (!context) {
        throw new Error('useOrders must be used within an OrderProvider');
    }
    return context;
};
