import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Home from './pages/Home';
import Navbar from './layout/Navbar';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Login from './pages/authentication/Login';
import Signup from './pages/authentication/Signup';
import ProtectedRoute from './pages/authentication/ProtectedRoute';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
        <Route
            exact
            path="/"
            element={
              <ProtectedRoute>
                <Navbar />
                <Home />
              </ProtectedRoute>
            }
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
