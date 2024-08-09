import React, { createContext, useState, ReactNode, useEffect } from 'react';

interface CartItem {
    mainDish: string;
    quantities: number[];
    toppings: { name: string; price: string; quantity: number }[];
    extraQuantity: number;
    totalPrice: number;
}

interface CartContextProps {
    cart: CartItem[];
    totalPrice: number;
    addToCart: (items: CartItem[] | CartItem) => void;
}

export const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

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

    const calculateTotalPrice = (updatedCart: CartItem[] = cart) => {
        const total = updatedCart.reduce((sum, item) => sum + item.totalPrice, 0);
        setTotalPrice(total);
    };

    useEffect(() => {
        calculateTotalPrice();
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, totalPrice, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};
