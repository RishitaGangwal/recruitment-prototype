import { useState, useEffect } from "react";
import { Eye, EyeOff, User, Mail, Lock, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          firstName: form.name.split(" ")[0],
          lastName: form.name.split(" ")[1] || " ",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await res.json();
      setMessage("Registration successful!");
      setForm({ name: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden">
      <div
        className={`hidden md:flex md:w-1/2 lg:w-3/5 relative items-center justify-center transition-all duration-1000 ease-out ${
          isVisible
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
        }`}
      >
        <div className="relative w-full h-full flex items-center justify-center p-8 lg:p-12">
          <div className="relative max-w-lg w-full">
            <img
              src="https://notioly.com/wp-content/uploads/2025/04/528.Working-In-The-Park.png"
              alt="Person working in park illustration"
              className="w-full h-auto object-contain transform hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => {
                e.target.src =
                  "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp";
              }}
            />
          </div>
        </div>
      </div>

      <div
        className={`w-full md:w-1/2 lg:w-2/5 flex items-center justify-center bg-slate-50 p-4 sm:p-6 lg:p-8 lg:py-3 transition-all duration-1000 delay-300 ${
          isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-4 sm:p-6 lg:p-5 space-y-5 lg:space-y-2 ">
            <div
              className={`text-center space-y-2 transition-all duration-800 delay-700 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-900 rounded-2xl mb-4 transform hover:rotate-3 hover:scale-110 transition-all duration-300">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-semibold text-slate-900">
                Create your account
              </h1>
            </div>

            <div
              className={`space-y-4 lg:space-y-5 transition-all duration-1000 delay-900 ${
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0"
              }`}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Full name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 border rounded-lg text-sm lg:text-base transition-all duration-300 ${
                      errors.name
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-slate-300 focus:border-slate-900 focus:ring-slate-200 hover:border-slate-400"
                    } focus:ring-2 focus:ring-opacity-20 focus:outline-none transform focus:scale-[1.02]`}
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-4 py-3 border rounded-lg text-sm lg:text-base transition-all duration-300 ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-slate-300 focus:border-slate-900 focus:ring-slate-200 hover:border-slate-400"
                    } focus:ring-2 focus:ring-opacity-20 focus:outline-none transform focus:scale-[1.02]`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={form.password}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-12 py-3 border rounded-lg text-sm lg:text-base transition-all duration-300 ${
                      errors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-slate-300 focus:border-slate-900 focus:ring-slate-200 hover:border-slate-400"
                    } focus:ring-2 focus:ring-opacity-20 focus:outline-none transform focus:scale-[1.02]`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={form.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full pl-11 pr-12 py-3 border rounded-lg text-sm lg:text-base transition-all duration-300 ${
                      errors.confirmPassword
                        ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                        : "border-slate-300 focus:border-slate-900 focus:ring-slate-200 hover:border-slate-400"
                    } focus:ring-2 focus:ring-opacity-20 focus:outline-none transform focus:scale-[1.02]`}
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    ) : (
                      <Eye className="h-5 w-5 text-slate-400 hover:text-slate-600" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                onClick={handleSubmit}
                className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white font-medium py-3 lg:py-4 px-4 rounded-lg transition-colors text-sm lg:text-base mt-6"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Creating account...
                  </div>
                ) : (
                  "Create account"
                )}
              </button>

              {/* Message Display */}
              {message && (
                <div
                  className={`p-4 rounded-lg text-center text-sm lg:text-base transition-all duration-500 transform ${
                    message.includes("successful")
                      ? "bg-green-50 text-green-800 border border-green-200 scale-100 opacity-100"
                      : "bg-red-50 text-red-800 border border-red-200 scale-100 opacity-100"
                  }`}
                >
                  {message}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-slate-100">
              <p className="text-sm lg:text-base text-slate-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
