import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../../front-end/src/context/AuthContext";
import Signup from "../../front-end/src/pages/Signup";
import Signin from '../../front-end/src/pages/Signin';
import Dashboard from '../../front-end/src/pages/Dashboard';
import type { JSX } from "react";


function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();
  return token ? children : <Navigate to="/signin" />;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/signin" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
