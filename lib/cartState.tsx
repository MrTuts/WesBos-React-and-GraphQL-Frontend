import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from 'react';

const LocalStateContext = createContext<null | {
  cartOpen: boolean;
  setCartOpen: Dispatch<SetStateAction<boolean>>;
  toggleCart: () => void;
  closeCart: () => void;
  openCart: () => void;
}>(null);
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }: { children: ReactNode }) {
  const [cartOpen, setCartOpen] = useState(false);

  const toggleCart = useCallback(() => {
    setCartOpen((val) => !val);
  }, []);

  const closeCart = useCallback(() => {
    setCartOpen(false);
  }, []);

  const openCart = useCallback(() => {
    setCartOpen(true);
  }, []);

  return (
    <LocalStateProvider
      value={{ cartOpen, setCartOpen, toggleCart, closeCart, openCart }}
    >
      {children}
    </LocalStateProvider>
  );
}

function useCart() {
  const all = useContext(LocalStateContext);
  if (all === null) {
    throw new Error('You need to wrap content in CartStateProvider');
  }
  return all;
}

export { CartStateProvider, useCart };
