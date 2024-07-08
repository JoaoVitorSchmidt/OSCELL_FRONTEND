import React, { useState } from 'react';
import './LoginForm.css';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [pending, setPending] = useState(false); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    setPending(true);
  
    try {
      const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Dados recebidos:', data); // Verifica o que está sendo recebido
  
        const { token, username } = data; // Ajuste para receber token e username
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        window.location.href = '/os';
      } else {
        setError('Credenciais inválidas.');
      }
    } catch (error) {
      setError('Erro na comunicação com o servidor');
    } finally {
      setPending(false);
    }
  };  

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>OS CELL</h1>
        <div>
          <input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" disabled={pending}>
          {pending ? "Entrando..." : "ENTRAR"}
        </button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default LoginForm;
