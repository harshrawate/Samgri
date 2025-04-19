import React from "react";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            Login
          </button>
        </form>
        <div className="flex justify-between mt-4 text-sm">
          <a href="/forgot-password" className="text-orange-500">Forgot Password?</a>
          <a href="/signup" className="text-orange-500">Sign Up</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
