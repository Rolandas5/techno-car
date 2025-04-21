import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CarList } from './components/CarList/CarList';
import { Navigation } from './components/Navigation/Navigation';
import { CarDetails } from './components/CarDetails/CarDetails';
import { NotFound } from './components/NotFound/NotFound';
import { ReviewPage } from './components/ReviewPage/ReviewPage';
// import { LoginForm } from './components/LoginForm/LoginForm';
import { Register } from './components/Register/Register';
import { Login } from './components/Login/Login';
import { Dashboard } from './components/Dashboard/Dashboard';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Navigation />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<CarList />} />
              <Route path="/cars/:id" element={<CarDetails />} />
              <Route path="/reviews" element={<ReviewPage />} />
              {/* <Route path="/login" element={<LoginForm />} /> */}
              <Route path="*" element={<NotFound />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              {/* Tikriname ar zmogus gali patekt i dashboard */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              {/*  */}
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
