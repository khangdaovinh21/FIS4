import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
    mainDish: string;
    quantities: number[];
    toppings: { name: string; price: number; quantity: number }[];
    extraQuantity: number;
    totalPrice: number;
}

interface CartContextProps {
    cart: CartItem[];
    totalPrice: number;
    storeName: string;
    baseDeliveryFee: number;
    addToCart: (items: CartItem[] | CartItem) => void;
    clearCart: () => void;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [storeName, setStoreName] = useState('Hadilao HotPot');
    const baseDeliveryFee = 2;

    const addToCart = (items: CartItem[] | CartItem) => {
        let newCart;
        if (Array.isArray(items)) {
            newCart = items;
        } else {
            newCart = [...cart, items];
        }
        setCart(newCart);
        calculateTotalPrice(newCart);
    };

    const clearCart = () => {
        setCart([]);
        setTotalPrice(0);
    };

    const calculateTotalPrice = (updatedCart: CartItem[] = cart) => {
        const total = updatedCart.reduce((sum, item) => sum + item.totalPrice, 0);
        setTotalPrice(total);
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, totalPrice, storeName, baseDeliveryFee, addToCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
