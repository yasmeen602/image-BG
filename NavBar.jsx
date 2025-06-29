import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from './context/AppContext';


const NavBar = () => {
  const { user, handleLogout } = useContext(AppContext);


  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600">BG Remover</Link>

        <div className="space-x-4">
          {user ? (
            <>
              <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-700 hover:text-indigo-600">Login</Link>
              <Link
                to="/register"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
