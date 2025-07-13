'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  User, 
  Shield, 
  Zap, 
  Globe, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  UserPlus,
  LogIn,
  X,
  Check,
  AlertCircle,
  Loader2
} from 'lucide-react';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

// Utility functions
const generateAvatarColor = (name: string) => {
  const colors = [
    'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-pink-500',
    'bg-indigo-500', 'bg-red-500', 'bg-yellow-500', 'bg-teal-500'
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
};

const getInitials = (name: string) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePassword = (password: string) => {
  return {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
  };
};

// Components
const PasswordStrengthIndicator = ({ password }: { password: string }) => {
  const checks = validatePassword(password);
  const strength = Object.values(checks).filter(Boolean).length;
  
  const getStrengthColor = () => {
    if (strength < 2) return 'bg-red-500';
    if (strength < 4) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = () => {
    if (strength < 2) return 'Weak';
    if (strength < 4) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded ${
              i <= strength ? getStrengthColor() : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${
        strength < 2 ? 'text-red-600' : 
        strength < 4 ? 'text-yellow-600' : 'text-green-600'
      }`}>
        Password strength: {getStrengthText()}
      </p>
      <div className="text-xs text-gray-500 mt-1">
        <div className={checks.length ? 'text-green-600' : 'text-gray-400'}>
          ✓ At least 8 characters
        </div>
        <div className={checks.uppercase ? 'text-green-600' : 'text-gray-400'}>
          ✓ One uppercase letter
        </div>
        <div className={checks.lowercase ? 'text-green-600' : 'text-gray-400'}>
          ✓ One lowercase letter
        </div>
        <div className={checks.number ? 'text-green-600' : 'text-gray-400'}>
          ✓ One number
        </div>
      </div>
    </div>
  );
};

const Avatar = ({ user }: { user: User }) => {
  const initials = getInitials(user.name);
  const colorClass = generateAvatarColor(user.name);

  return (
    <div className={`w-8 h-8 rounded-full ${colorClass} flex items-center justify-center text-white text-sm font-medium`}>
      {initials}
    </div>
  );
};

const UserDropdown = ({ user, onLogout }: { user: User; onLogout: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-gray-50 rounded-lg p-2 transition-colors"
      >
        <Avatar user={user} />
        <span className="hidden md:block text-sm font-medium">{user.name}</span>
      </button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-20">
            <div className="p-3 border-b">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="p-1">
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded">
                Profile Settings
              </button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 rounded">
                Account
              </button>
              <hr className="my-1" />
              <button 
                onClick={onLogout}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded"
              >
                Sign Out
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const Modal = ({ isOpen, onClose, children }: { 
  isOpen: boolean; 
  onClose: () => void; 
  children: React.ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
};

export default function Home() {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    loading: false
  });

  const [modals, setModals] = useState({
    login: false,
    register: false,
    forgotPassword: false,
    resetCode: false,
    newPassword: false
  });

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    rememberMe: false,
    acceptTerms: false,
    resetCode: '',
    resetEmail: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const openModal = (modal: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modal]: true }));
    setFormErrors({});
  };

  const closeModal = (modal: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modal]: false }));
    setFormErrors({});
  };

  const closeAllModals = () => {
    setModals({
      login: false,
      register: false,
      forgotPassword: false,
      resetCode: false,
      newPassword: false
    });
    setFormErrors({});
  };

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const validateForm = (type: 'login' | 'register' | 'forgot' | 'reset') => {
    const errors: Record<string, string> = {};

    if (type === 'login') {
      if (!formData.email) errors.email = 'Email is required';
      else if (!validateEmail(formData.email)) errors.email = 'Invalid email format';
      if (!formData.password) errors.password = 'Password is required';
    }

    if (type === 'register') {
      if (!formData.name.trim()) errors.name = 'Name is required';
      if (!formData.email) errors.email = 'Email is required';
      else if (!validateEmail(formData.email)) errors.email = 'Invalid email format';
      if (!formData.password) errors.password = 'Password is required';
      else {
        const passwordChecks = validatePassword(formData.password);
        if (!passwordChecks.length) errors.password = 'Password must be at least 8 characters';
      }
      if (formData.password !== formData.confirmPassword) {
        errors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.acceptTerms) errors.acceptTerms = 'You must accept the terms';
    }

    if (type === 'forgot') {
      if (!formData.resetEmail) errors.resetEmail = 'Email is required';
      else if (!validateEmail(formData.resetEmail)) errors.resetEmail = 'Invalid email format';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm('login')) return;

    setAuthState(prev => ({ ...prev, loading: true }));
    
    // Simulate API call
    setTimeout(() => {
      setAuthState({
        isAuthenticated: true,
        user: {
          id: '1',
          name: formData.name || 'John Doe',
          email: formData.email
        },
        loading: false
      });
      closeAllModals();
      showNotification('success', 'Successfully logged in!');
      setFormData(prev => ({ ...prev, email: '', password: '' }));
    }, 1500);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm('register')) return;

    setAuthState(prev => ({ ...prev, loading: true }));
    
    // Simulate API call
    setTimeout(() => {
      setAuthState({
        isAuthenticated: true,
        user: {
          id: '1',
          name: formData.name,
          email: formData.email
        },
        loading: false
      });
      closeAllModals();
      showNotification('success', 'Account created successfully!');
      setFormData(prev => ({ 
        ...prev, 
        email: '', 
        password: '', 
        confirmPassword: '', 
        name: '',
        acceptTerms: false
      }));
    }, 1500);
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm('forgot')) return;

    setAuthState(prev => ({ ...prev, loading: true }));
    
    // Simulate API call
    setTimeout(() => {
      setAuthState(prev => ({ ...prev, loading: false }));
      closeModal('forgotPassword');
      openModal('resetCode');
      showNotification('success', 'Reset code sent to your email!');
    }, 1500);
  };

  const handleLogout = () => {
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false
    });
    showNotification('success', 'Successfully logged out!');
  };

  const benefits = [
    {
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      title: "Secure & Private",
      description: "Your personal information is protected with enterprise-grade security and privacy controls."
    },
    {
      icon: <Zap className="w-8 h-8 text-green-600" />,
      title: "Lightning Fast",
      description: "Create and share your profile in seconds with our streamlined, intuitive interface."
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-600" />,
      title: "Global Reach",
      description: "Connect with people worldwide and share your story across all platforms seamlessly."
    },
    {
      icon: <User className="w-8 h-8 text-orange-600" />,
      title: "Personal Branding",
      description: "Build your digital presence with customizable profiles that reflect your unique identity."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? <Check className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {notification.message}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-gray-900">Know Me</h1>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#features" className="text-gray-500 hover:text-gray-900 transition-colors">Features</a>
              <a href="#about" className="text-gray-500 hover:text-gray-900 transition-colors">About</a>
              <a href="#contact" className="text-gray-500 hover:text-gray-900 transition-colors">Contact</a>
            </nav>

            {/* Auth Section */}
            <div className="flex items-center gap-4">
              {authState.isAuthenticated && authState.user ? (
                <UserDropdown user={authState.user} onLogout={handleLogout} />
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => openModal('login')}
                    className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => openModal('register')}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                Share Your Story,
                <span className="text-blue-600"> Connect</span> with the World
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Create a beautiful, personalized profile that showcases who you are. 
                Connect with others and build meaningful relationships in the digital age.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => openModal('register')}
                  className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg"
                >
                  Get Started Free
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-lg">
                  Watch Demo
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    JD
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">John Doe</h3>
                    <p className="text-gray-600">Software Engineer</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Know Me helped me create a professional online presence that truly represents who I am."
                </p>
                <div className="flex gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Know Me?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the powerful features that make Know Me the perfect platform 
              for building your digital identity and connecting with others.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gray-50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-100 transition-colors">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Login Modal */}
      <Modal isOpen={modals.login} onClose={() => closeModal('login')}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <button onClick={() => closeModal('login')} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 ${
                    formErrors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={(e) => setFormData(prev => ({ ...prev, rememberMe: e.target.checked }))}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button
                type="button"
                onClick={() => {
                  closeModal('login');
                  openModal('forgotPassword');
                }}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={authState.loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              {authState.loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => {
                  closeModal('login');
                  openModal('register');
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </Modal>

      {/* Register Modal */}
      <Modal isOpen={modals.register} onClose={() => closeModal('register')}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
            <button onClick={() => closeModal('register')} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 ${
                    formErrors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formErrors.password && <p className="text-red-500 text-sm mt-1">{formErrors.password}</p>}
              {formData.password && <PasswordStrengthIndicator password={formData.password} />}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 ${
                    formErrors.confirmPassword ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {formErrors.confirmPassword && <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>}
            </div>

            <div>
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.acceptTerms}
                  onChange={(e) => setFormData(prev => ({ ...prev, acceptTerms: e.target.checked }))}
                  className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-blue-600 hover:text-blue-800">Privacy Policy</a>
                </span>
              </label>
              {formErrors.acceptTerms && <p className="text-red-500 text-sm mt-1">{formErrors.acceptTerms}</p>}
            </div>

            <button
              type="submit"
              disabled={authState.loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              {authState.loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <button
                onClick={() => {
                  closeModal('register');
                  openModal('login');
                }}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>
      </Modal>

      {/* Forgot Password Modal */}
      <Modal isOpen={modals.forgotPassword} onClose={() => closeModal('forgotPassword')}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Reset Password</h2>
            <button onClick={() => closeModal('forgotPassword')} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Enter your email address and we'll send you a code to reset your password.
          </p>

          <form onSubmit={handleForgotPassword} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.resetEmail}
                onChange={(e) => setFormData(prev => ({ ...prev, resetEmail: e.target.value }))}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  formErrors.resetEmail ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {formErrors.resetEmail && <p className="text-red-500 text-sm mt-1">{formErrors.resetEmail}</p>}
            </div>

            <button
              type="submit"
              disabled={authState.loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              {authState.loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="w-5 h-5" />
                  Send Reset Code
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                closeModal('forgotPassword');
                openModal('login');
              }}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Back to Sign In
            </button>
          </div>
        </div>
      </Modal>

      {/* Reset Code Modal */}
      <Modal isOpen={modals.resetCode} onClose={() => closeModal('resetCode')}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Enter Reset Code</h2>
            <button onClick={() => closeModal('resetCode')} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            We've sent a 6-digit code to your email. Enter it below to continue.
          </p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={formData.resetCode}
                onChange={(e) => setFormData(prev => ({ ...prev, resetCode: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest"
                placeholder="000000"
                maxLength={6}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Verify Code
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Didn't receive the code?{' '}
              <button className="text-blue-600 hover:text-blue-800 font-medium">
                Resend
              </button>
            </p>
          </div>
        </div>
      </Modal>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Know Me</h3>
              <p className="text-gray-400">
                Building connections through authentic digital profiles.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Know Me. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}