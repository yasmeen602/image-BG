// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const PrivateRoute = ({ children }) => {
  const { user } = useAppContext(); // Assuming `user` holds authentication status

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
