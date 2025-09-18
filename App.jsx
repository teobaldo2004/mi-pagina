import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import ChatBot from "./components/ChatBot";
import './styles.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [view, setView] = useState(token ? "chat" : "login");

  const handleLogin = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
    setView("chat");
  };

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("token");
    setView("login");
  };

  return (
    <div className="container">
      <h1>Chatbot IA Demo</h1>
      {view === "login" && (
        <>
          <LoginForm onLogin={handleLogin} />
          <p>
            ¿No tienes cuenta?{" "}
            <button onClick={() => setView("register")}>Regístrate</button>
          </p>
        </>
      )}
      {view === "register" && (
        <>
          <RegisterForm onSuccess={() => setView("login")} />
          <p>
            ¿Ya tienes cuenta?{" "}
            <button onClick={() => setView("login")}>Inicia sesión</button>
          </p>
        </>
      )}
      {view === "chat" && (
        <div>
          <button onClick={handleLogout}>Cerrar sesión</button>
          <ChatBot token={token} />
        </div>
      )}
    </div>
  );
}

export default App;