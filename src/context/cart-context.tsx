
"use client";

import type { Activity } from '@/components/activities/activity-card';
import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface CartItem extends Activity {
  selectedDate?: Date;
  participants: number;
  totalPrice: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Activity, selectedDate: Date | undefined, participants: number) => void;
  removeFromCart: (itemId: string, itemTitle: string) => void;
  clearCart: () => void;
  itemCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = useCallback((activity: Activity, selectedDate: Date | undefined, participants: number) => {
    // Simple check to prevent duplicate items if added with same core details
    // For a real app, you might want more sophisticated logic (e.g., check selectedDate and participants too)
    const existingItemIndex = cartItems.findIndex(item => item.id === activity.id && item.selectedDate?.getTime() === selectedDate?.getTime());
    
    let newTotalPrice = activity.price * participants;

    if (existingItemIndex > -1) {
      // Optionally, update quantity or notify user item is already in cart
      // For now, let's just update if participants changed, or simply notify
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex] = {
        ...updatedItems[existingItemIndex],
        participants: updatedItems[existingItemIndex].participants + participants, // Or just set to new participants
        totalPrice: updatedItems[existingItemIndex].totalPrice + newTotalPrice
      };
      setCartItems(updatedItems);
      toast({
        title: "Carrito Actualizado",
        description: `Se actualizaron los participantes para "${activity.title}".`,
      });

    } else {
      const newItem: CartItem = {
        ...activity,
        selectedDate,
        participants,
        totalPrice: newTotalPrice,
      };
      setCartItems(prevItems => [...prevItems, newItem]);
      toast({
        title: "¡Añadido al Carrito!",
        description: `"${activity.title}" se ha añadido a tu carrito.`,
      });
    }
  }, [cartItems, toast]);

  const removeFromCart = useCallback((itemId: string, itemTitle: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast({
      title: "Artículo Eliminado",
      description: `"${itemTitle}" se ha eliminado de tu carrito.`,
    });
  }, [toast]);

  const clearCart = useCallback(() => {
    setCartItems([]);
    toast({
      title: "Carrito Vaciado",
      description: "Todos los artículos han sido eliminados del carrito.",
    });
  }, [toast]);

  const itemCount = cartItems.reduce((sum, item) => sum + item.participants, 0);


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};
