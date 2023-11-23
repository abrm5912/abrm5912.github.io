import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Exchange } from '../types/exchange';

interface ExchangeState {
  items: Exchange[];
  isLoading: boolean;
  setExchangeItems: (items: Exchange[]) => void;
  updateExchangeItem: (item: Exchange) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export const useExchangeStore = create<ExchangeState>()(devtools((set) => ({
  items: [],
  isLoading: false,
  setExchangeItems: (items: Exchange[]) => set(() => ({
    items
  })),
  updateExchangeItem: (item: Exchange) => set((state) => ({
    items: state.items.map((el) => el.id === item.id ? item : el)
  })),
  setIsLoading: (isLoading: boolean) => set(() => ({
    isLoading
  }))
}), { name: 'exchangeStore', version: 1 }));
