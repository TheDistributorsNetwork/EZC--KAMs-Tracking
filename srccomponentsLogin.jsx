import React from 'react';

export default function Login({ onLogin }) {
  const handleLogin = async () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = window.location.origin;
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user&redirect_uri=${redirectUri}`;
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl mb-4 font-semibold">Login to Continue</h2>
      <button onClick={handleLogin} className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
        Login with GitHub
      </button>
    </div>
  );
}
