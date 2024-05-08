import { useLocalObservable, enableStaticRendering } from "mobx-react-lite";
import { createContext, ReactElement, useContext } from "react";
import createStore from "@/store/module";

// If observer is used in server side rendering context; make sure to call enableStaticRendering(true),
// so that observer won't subscribe to any observables used, and no GC problems are introduced.
enableStaticRendering(typeof window !== "undefined");

interface IStoreProps {
  initialValue?: Record<any, any>;
  children: ReactElement;
}

const StoreContext = createContext<any>({});

export const StoreProvider = ({ initialValue, children }: IStoreProps) => {
  const state = useLocalObservable(createStore(initialValue ?? {}));
  return (
    <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
  );
};

export const useStore = () => {
  return useContext(StoreContext);
};
