import React, { useState } from 'react';
import'./login.css'
function LoginForm() {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [error, setError] = useState('');
const handleLogin = (e) => {
e.preventDefault();
if (username === 'admin' && password === 'password') {
alert('Login successful');
setUsername('');
setPassword('');
setError('');
} else {
setError('Invalid username or password');
}
};
return (
<div className="login">
<h2>Login</h2>
<form onSubmit={handleLogin}>
<div>
<label>Username</label>
<input
type="text"
value={username}
onChange={(e) => setUsername(e.target.value)}
required
/>
</div>
<div>
<label>Password</label>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
/>
</div>
{error && <p style={{ color: 'red' }}>{error}</p>}
<button type="submit">Login</button>
</form>
</div>
);
}
export default LoginForm;