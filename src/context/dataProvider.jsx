import React, { useState } from 'react';
import userData from '../data/user1.json';
import { DataContext } from './data';

export default function DataProvider({ children }) {
  const [user, setUser] = useState(userData);

  return (
    <DataContext.Provider value={{ user, setUser }}>
      {children}
    </DataContext.Provider>
  );
}
