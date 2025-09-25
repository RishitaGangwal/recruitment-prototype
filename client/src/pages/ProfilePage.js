import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/register");
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data || "Failed to fetch profile");
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-5 max-w-md w-full border border-rose-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Something went wrong
            </h3>
            <p className="text-gray-600 text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full border border-rose-100">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
              <div className="w-8 h-8 bg-white rounded-full opacity-30"></div>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Loading your profile
            </h3>
            <p className="text-gray-600 text-sm">Please wait a moment...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-orange-50">
      <div className="bg-white/80 backdrop-blur-sm border-b border-rose-100 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              Your Profile
            </h1>
            <button
              onClick={handleLogout}
              className="text-sm bg-gray-100 text-gray-900 font-semibold px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors border border-gray-300"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-3xl shadow-lg border border-rose-100 overflow-hidden">
          <div className="bg-gradient-to-r from-rose-500 to-pink-500 px-6 py-5 sm:px-5">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="text-center sm:text-left flex-1">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-rose-100 text-lg">{user.email}</p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    First Name
                  </label>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {user.firstName}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Email Address
                  </label>
                  <p className="mt-1 text-lg font-medium text-gray-900">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="space-y-4 justify-center items-center">
                <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Last Name
                  </label>
                  <p className="mt-1 text-lg font-medium text-gray-900 break-all">
                    {user.lastName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
