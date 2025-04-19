import React, { useState } from "react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Forgot Password Request for:", email);
    // Replace this with API call to send password reset link
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Forgot Password
        </h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          Enter your registered email address to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
          >
            Send Reset Link
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          <a href="/login" className="text-orange-500 font-medium">
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
