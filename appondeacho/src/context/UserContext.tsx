import React, { createContext, useReducer, ReactNode  } from 'react';
import { initialState, UserReducer } from '../reducers/UserReducer';

// Criar o contexto
export const UserContext = createContext<{
  state: any; // Tipo do estado
  dispatch: React.Dispatch<any>; // Tipo do despachante
}>({ state: initialState, dispatch: () => {} });

interface UserContextProviderProps {
  children: ReactNode;
}

// Desestruturar o Provider do contexto
const { Provider } = UserContext;

// Componente que envolve outros componentes e fornece o contexto
const UserContextProvider = ({ children }: UserContextProviderProps) => {
  // Definir o estado e o despachante do Reducer
  const [state, dispatch] = useReducer(UserReducer, initialState);

  return (
    // Usar o Provider do contexto para prover o valor do contexto aos componentes filhos
    <Provider value={{ state, dispatch }}>
      {children}
    </Provider>
  );
};

export default UserContextProvider;
