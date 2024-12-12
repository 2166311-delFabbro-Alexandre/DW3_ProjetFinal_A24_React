import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

interface RouteProtegeeProps {
  children: ReactNode; // Les composants enfants (par ex., une page sécurisée)
}

/**
 * Composant de route sécurisée.
 * @param children - Composants à afficher si l'utilisateur est authentifié.
 * @returns Les enfants si authentifié, sinon redirection vers /login.
 */
export const RouteProtegee: React.FC<RouteProtegeeProps> = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Chargement...</div>; // Indicateur de chargement
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};
