import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { useEffect } from "react";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {

  const { user, dispatch } = useAuthContext()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch({ type: 'LOGIN', payload: user })
    } else {
      dispatch({ type: 'LOGOUT' })
    }
  }, [user])

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact path='/home'
            element={user ? <Home /> : <Login />}
          />
          <Route
            path='/login'
            element={!user ? <Login /> : <Home />}
          />
          <Route
            path='/register'
            element={!user ? <Register /> : <Home />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
