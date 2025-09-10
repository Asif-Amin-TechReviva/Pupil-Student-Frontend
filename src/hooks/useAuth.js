import { useContext } from 'react';

import JWTContext from 'contexts/JWTContext';

// ==============================|| HOOKS - AUTH ||============================== //

export default function useAuth() {
  const context = useContext(JWTContext);

  if (!context) throw new Error('context must be used inside a provider');

  return context;
}
