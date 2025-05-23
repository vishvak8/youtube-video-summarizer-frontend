import React, { useState } from 'react';
import './App.css';
import { useAuthenticationStatus, useSignOut } from '@nhost/react';
import Login from './Login';
import Signup from './Signup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const { isAuthenticated } = useAuthenticationStatus();
  const { signOut } = useSignOut();

  const [isSignup, setIsSignup] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toastStyle = {
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
  };

  const handleLogout = () => {
    signOut();
    toast.info('Logged out successfully!', {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      style: toastStyle,
    });
    // Reset youtubeUrl and summary when user logs out
    setYoutubeUrl('');
    setSummary('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSummary('');

    try {
      const youtubeUrlRegex = /^https?:\/\/(www\.)?youtube\.com\/watch\?v=.+$/;
      if (!youtubeUrlRegex.test(youtubeUrl)) {
        toast.error('Invalid YouTube URL. Please check and try again.', {
          position: 'top-center',
          autoClose: 5000,
          style: toastStyle,
        });
        setIsLoading(false);
        return;
      }

      const response = await fetch(
        'https://4125-49-206-12-70.ngrok-free.app/process',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ youtube_url: youtubeUrl }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error || 'An unknown error occurred.', {
          position: 'top-center',
          autoClose: 5000,
          style: toastStyle,
        });
      } else {
        setSummary(data.summary);
        toast.success('🎉 Summary generated successfully!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: false,
          style: toastStyle,
        });
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(
        'An error occurred while processing the video. Please try again.',
        {
          position: 'top-center',
          autoClose: 5000,
          style: toastStyle,
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div>
        {isSignup ? <Signup /> : <Login />}
        <div className="toggle-container">
          <p>
            {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
            <button
              className="toggle-button"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? 'Login' : 'Sign Up'}
            </button>
          </p>
        </div>
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="app-container">
      <button onClick={handleLogout} className="logout-button">
        Logout
      </button>
      <div className="card">
        <h1 className="title">YouTube Video Summarizer</h1>
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            placeholder="Enter YouTube URL"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            className="input"
          />
          <button type="submit" className="button">
            {isLoading ? 'Processing...' : 'Summarize'}
          </button>
        </form>
        {isLoading ? (
          <div className="loading-spinner"></div>
        ) : (
          summary && (
            <div className="summary-section">
              <h2 className="summary-title">Summary:</h2>
              <p className="summary-text">{summary}</p>
            </div>
          )
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
