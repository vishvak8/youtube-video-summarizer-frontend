import React, { useState } from 'react';
import nhost from './nhost';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastStyle = {
  background: 'linear-gradient(135deg, #667eea, #764ba2)', // Match gradient color
  color: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
};

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    try {
      const { error } = await nhost.auth.signUp({
        email,
        password,
      });

      if (error) {
        toast.error(`Signup failed: ${error.message}`, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          style: toastStyle,
        });
      } else {
        toast.success('Signup successful! Please verify your email.', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          style: toastStyle,
        });
      }
    } catch (err) {
      console.error('Signup Error:', err);
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="card">
      <h1 className="title">Sign Up</h1>
      <form onSubmit={handleSignup} className="form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          disabled={isLoading} // Disable inputs during loading
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          disabled={isLoading} // Disable inputs during loading
        />
        <button type="submit" className="button" disabled={isLoading}>
          {isLoading ? 'Processing...' : 'Sign Up'}
        </button>
      </form>
      {isLoading && <div className="loading-spinner"></div>} {/* Add spinner */}
    </div>
  );
};

export default Signup;
