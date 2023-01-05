import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./auth";
import Dashboard from "./pages/Dashboard";
import ViewTodo from "./pages/ViewTodo";
import AddTodo from "./pages/AddTodo";
import UpdateTodo from "./pages/UpdateTodo";
import DeleteTodo from "./pages/DeleteTodo";
import About from "./pages/About";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
    return (
        <Routes>
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/view" element={<PrivateRoute><ViewTodo /></PrivateRoute>} />
            <Route path="/add" element={<PrivateRoute><AddTodo /></PrivateRoute>} />
            <Route path="/update" element={<PrivateRoute><UpdateTodo /></PrivateRoute>} />
            <Route path="/delete" element={<PrivateRoute><DeleteTodo /></PrivateRoute>} />
            <Route path="/about" element={<PrivateRoute><About /></PrivateRoute>} />
            <Route path="/my-profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
        </Routes>
    );
}

export default App;