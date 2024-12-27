"use client"; // Certifique-se de que o código será executado apenas no cliente

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === "admin" && password === "123") {
      localStorage.setItem("token", "fake-jwt-token");
      router.push("/home");
    } else {
      setErrorMessage("Credenciais inválidas!");
    }
  };

  useEffect(() => {
    // Verifique se há um token antes de renderizar a página
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/home");
    }
  }, [router]); // Só rodar quando o componente for montado no cliente

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input type="text" name="username" placeholder="Usuário" required />
        <input type="password" name="password" placeholder="Senha" required />
        <button type="submit">Entrar</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
}
