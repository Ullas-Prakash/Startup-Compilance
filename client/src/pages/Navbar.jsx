import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="fixed top-0 w-full bg-black shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          ComplianceIQ
        </Link>

        <div className="space-x-6 text-sm font-medium">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>

          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link
                to="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <div className="inline-flex items-center space-x-3">
              <span className="font-medium">{user.name}</span>
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button onClick={logout} className="text-red-500">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
