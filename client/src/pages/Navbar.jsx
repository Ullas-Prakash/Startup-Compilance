import { Link } from "react-router-dom";

export default function Navbar() {

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-blue-600">
          ComplianceIQ
        </h1>

        <div className="space-x-6 text-sm font-medium">
          <Link to="/" className="text-blue-600 hover:text-black">Home</Link>
          <Link to="/about" className="text-blue-600 hover:text-black">About</Link>
          <Link to="/contact" className="text-blue-600 hover:text-black">Contact</Link>
          <Link to="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Dashboard</Link>
          <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Login</Link>
          <Link to="/Signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Signup</Link>
          
        </div>
      </div>
    </nav>
  );
}
