'use client';

import { createContext, useContext, useState } from 'react';

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [coordinates, setCoordinates] = useState([40.6, -74]);
  return (
    <AppContext.Provider value={{ coordinates, setCoordinates }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
