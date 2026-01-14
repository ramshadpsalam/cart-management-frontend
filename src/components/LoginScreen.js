import React, { useState } from 'react';

function LoginScreen({ onLogin, loading }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    setError('');
    const result = await onLogin(email, password);
    if (!result.success) {
      setError(result.error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Admin Login
        </h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          
          {error && (
            <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
          
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-gray-50 rounded text-sm text-gray-600">
          <p className="font-semibold mb-2">Demo Accounts:</p>
          <div className="space-y-1">
            <p><span className="font-medium">Superadmin:</span> superadmin@test.com / super123</p>
            <p><span className="font-medium">Admin:</span> admin@test.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;