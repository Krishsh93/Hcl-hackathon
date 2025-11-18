import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              🏥 Healthcare Wellness
            </h1>
            <div className="flex gap-2 sm:gap-4">
              <Link
                to="/login"
                className="px-3 sm:px-4 py-2 text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-3 sm:px-4 py-2 text-sm sm:text-base bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6">
            Healthcare Wellness Portal
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Track your health goals and connect with healthcare providers for better wellness
          </p>
        </div>

        {/* Cards Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Patient Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 card-hover animate-fade-in">
            <div className="text-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">For Patients</h2>
              <p className="text-sm sm:text-base text-gray-600">
                Track your wellness goals and manage appointments
              </p>
            </div>
            <ul className="space-y-3 mb-6 sm:mb-8">
              <li className="flex items-start text-gray-700 text-sm sm:text-base">
                <span className="text-green-500 mr-2 mt-1 flex-shrink-0">✓</span>
                <span>Track sleep, water intake & exercise</span>
              </li>
              <li className="flex items-start text-gray-700 text-sm sm:text-base">
                <span className="text-green-500 mr-2 mt-1 flex-shrink-0">✓</span>
                <span>Book appointments with doctors</span>
              </li>
              <li className="flex items-start text-gray-700 text-sm sm:text-base">
                <span className="text-green-500 mr-2 mt-1 flex-shrink-0">✓</span>
                <span>Receive personalized health reminders</span>
              </li>
              <li className="flex items-start text-gray-700 text-sm sm:text-base">
                <span className="text-green-500 mr-2 mt-1 flex-shrink-0">✓</span>
                <span>View your health statistics & trends</span>
              </li>
            </ul>
            <div className="space-y-3">
              <Link
                to="/login?role=patient"
                className="block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-center py-3 sm:py-3.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                Patient Login
              </Link>
              <Link
                to="/register?role=patient"
                className="block w-full border-2 border-blue-600 text-blue-600 text-center py-3 sm:py-3.5 rounded-lg hover:bg-blue-50 transition-all duration-200 font-semibold text-sm sm:text-base"
              >
                Patient Sign Up
              </Link>
            </div>
          </div>

          {/* Doctor Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 hover:shadow-2xl transition-all duration-300 card-hover animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="text-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">For Doctors</h2>
              <p className="text-sm sm:text-base text-gray-600">
                Monitor patients and manage appointments efficiently
              </p>
            </div>
            <ul className="space-y-3 mb-6 sm:mb-8">
              <li className="flex items-start text-gray-700 text-sm sm:text-base">
                <span className="text-green-500 mr-2 mt-1 flex-shrink-0">✓</span>
                <span>View all your patients in one place</span>
              </li>
              <li className="flex items-start text-gray-700 text-sm sm:text-base">
                <span className="text-green-500 mr-2 mt-1 flex-shrink-0">✓</span>
                <span>Manage appointments & schedules</span>
              </li>
              <li className="flex items-start text-gray-700 text-sm sm:text-base">
                <span className="text-green-500 mr-2 mt-1 flex-shrink-0">✓</span>
                <span>Track patient health records & progress</span>
              </li>
              <li className="flex items-start text-gray-700 text-sm sm:text-base">
                <span className="text-green-500 mr-2 mt-1 flex-shrink-0">✓</span>
                <span>Monitor patient compliance & trends</span>
              </li>
            </ul>
            <div className="space-y-3">
              <Link
                to="/login?role=doctor"
                className="block w-full bg-gradient-to-r from-green-600 to-green-700 text-white text-center py-3 sm:py-3.5 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg text-sm sm:text-base"
              >
                Doctor Login
              </Link>
              <Link
                to="/register?role=doctor"
                className="block w-full border-2 border-green-600 text-green-600 text-center py-3 sm:py-3.5 rounded-lg hover:bg-green-50 transition-all duration-200 font-semibold text-sm sm:text-base"
              >
                Doctor Sign Up
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-12 sm:mt-16 lg:mt-20 max-w-5xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-8 sm:mb-12">
            Why Choose Our Platform?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl sm:text-4xl mb-3">🔒</div>
              <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Secure & Private</h4>
              <p className="text-xs sm:text-sm text-gray-600">Your health data is encrypted and protected</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl sm:text-4xl mb-3">📱</div>
              <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Easy to Use</h4>
              <p className="text-xs sm:text-sm text-gray-600">Simple interface for all age groups</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl sm:text-4xl mb-3">📊</div>
              <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Track Progress</h4>
              <p className="text-xs sm:text-sm text-gray-600">Monitor your health journey over time</p>
            </div>
            <div className="text-center p-4 sm:p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-3xl sm:text-4xl mb-3">🔔</div>
              <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">Smart Reminders</h4>
              <p className="text-xs sm:text-sm text-gray-600">Never miss important health tasks</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20 text-gray-600 text-sm sm:text-base">
          <p>© 2025 Healthcare Wellness Portal. All rights reserved.</p>
          <p className="mt-2 text-xs sm:text-sm">Built for better health management</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
