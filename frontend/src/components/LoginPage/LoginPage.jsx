import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import './LoginPage.css';

function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
  } catch { return null; }
}

export function LoginPage({ onLogin, addToast }) {
  const [activeTab, setActiveTab] = useState('register');
  const [isHidden, setIsHidden] = useState(false);
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const enterDashboard = (profile) => {
    setIsHidden(true);
    setTimeout(() => onLogin(profile), 800);
  };

  const handleFormSubmit = (e, type) => {
    e.preventDefault();
    const profile = {
      name: type === 'login' ? 'User' : (e.target.firstName?.value + ' ' + e.target.lastName?.value).trim(),
      email: e.target.email?.value || e.target['reg-email']?.value || '',
      picture: null,
    };
    setTimeout(() => enterDashboard(profile), 1000);
  };

  const handleGoogleSuccess = (credentialResponse) => {
    const payload = parseJwt(credentialResponse.credential);
    if (payload) {
      enterDashboard({
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      });
    }
  };

  const handleBypass = () => {
    enterDashboard({ name: 'Dev User', email: 'dev@regalia.ai', picture: null });
  };

  const handleGoogleCustomLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const payload = await res.json();
        enterDashboard({
          name: payload.name,
          email: payload.email,
          picture: payload.picture,
        });
      } catch (err) {
        addToast('Gagal memuat profil Google', 'error');
      }
    },
    onError: () => addToast('Google Sign-In gagal', 'error'),
  });

  return (
    <div className={`access-portal-container min-h-screen flex items-center justify-center p-4 ${isHidden ? 'hidden' : ''}`} id="access-portal">
      <div className="portal-card glass-card w-full max-w-md p-6 sm:p-8 rounded-[2rem] relative overflow-hidden transition-all duration-500 hover:shadow-xl border border-white/10 group">
        
        {/* Header Toggle */}
        <header className="flex justify-between items-center mb-6 relative z-10">
          <div className="flex bg-black/50 rounded-full p-1 border border-white/10 shadow-inner">
            <button
              onClick={() => setActiveTab('register')}
              type="button"
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 border-0 cursor-pointer ${
                activeTab === 'register' ? 'bg-white/15 text-white shadow-md' : 'text-white/50 hover:text-white bg-transparent'
              }`}
            >Sign up</button>
            <button
              onClick={() => setActiveTab('login')}
              type="button"
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 border-0 cursor-pointer ${
                activeTab === 'login' ? 'bg-white/15 text-white shadow-md' : 'text-white/50 hover:text-white bg-transparent'
              }`}
            >Sign in</button>
          </div>
          <button aria-label="Close" onClick={handleBypass} type="button" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors cursor-pointer bg-transparent">
            <svg className="h-5 w-5 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </header>

        {/* Register Form */}
        <form className={`space-y-[7px] relative z-10 ${activeTab === 'register' ? 'block' : 'hidden'}`} onSubmit={(e) => handleFormSubmit(e, 'register')}>
          <h1 className="text-2xl font-bold mb-6 tracking-tight text-white">Create an account</h1>
          
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="sr-only" htmlFor="firstName">First name</label>
              <input className="glass-input w-full rounded-xl px-4 py-3 text-sm text-white focus:ring-0" id="firstName" name="firstName" placeholder="First name" type="text" defaultValue="Leonor" />
            </div>
            <div className="flex-1 relative">
              <label className="sr-only" htmlFor="lastName">Last name</label>
              <input className="glass-input w-full rounded-xl px-4 py-3 text-sm text-white focus:ring-0" id="lastName" name="lastName" placeholder="Last name" type="text" />
            </div>
          </div>

          <div className="relative">
            <label className="sr-only" htmlFor="reg-email">Email</label>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <svg className="h-5 w-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <input className="glass-input w-full rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:ring-0 relative z-0" id="reg-email" name="email" placeholder="Enter your email" type="email" required />
          </div>

          {/* Password Input for Register */}
          <div className="relative">
            <label className="sr-only" htmlFor="reg-password">Password</label>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <svg className="h-5 w-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <input 
              className="glass-input w-full rounded-xl pl-11 pr-12 py-3 text-sm text-white focus:ring-0 relative z-0" 
              id="reg-password" 
              name="password" 
              placeholder="Create a password" 
              type={showPassword ? "text" : "password"} 
              required 
            />
            <button 
              type="button" 
              className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 text-white/40 hover:text-white/80 transition-colors bg-transparent border-0 cursor-pointer p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <div className="relative phone-input-container">
            <style>{`
              .phone-input-container .react-international-phone-input {
                width: 100%;
                background: rgba(0, 0, 0, 0.3) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                border-left: none !important;
                color: #ffffff !important;
                height: 50px !important;
                border-top-right-radius: 0.75rem;
                border-bottom-right-radius: 0.75rem;
                padding-left: 12px;
              }
              .phone-input-container .react-international-phone-country-selector-button {
                background: rgba(0, 0, 0, 0.3) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                border-top-left-radius: 0.75rem;
                border-bottom-left-radius: 0.75rem;
                height: 50px !important;
                padding: 0 12px;
                color: white;
              }
              .phone-input-container .react-international-phone-country-selector-dropdown {
                background: rgba(15, 17, 26, 0.95) !important;
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                color: white !important;
                border-radius: 0.75rem !important;
                z-index: 50 !important;
              }
              .phone-input-container .react-international-phone-country-selector-dropdown__list-item {
                color: white !important;
              }
              .phone-input-container .react-international-phone-country-selector-dropdown__list-item:hover {
                background: rgba(255, 255, 255, 0.1) !important;
              }
              .phone-input-container .react-international-phone-country-selector-dropdown__list-item--selected {
                background: rgba(255, 255, 255, 0.2) !important;
              }
            `}</style>
            <PhoneInput
              defaultCountry="id"
              value={phone}
              onChange={(phone) => setPhone(phone)}
            />
          </div>

          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 btn-slide-black w-full rounded-xl py-3 !mt-[17px] text-sm font-medium text-white transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] border-0 cursor-pointer" type="submit">
            <span>Create an account</span>
          </button>

          <div className="relative flex items-center py-5 z-10">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink-0 mx-4 text-white/30 text-xs font-medium tracking-wider">OR SIGN IN WITH</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div className="flex z-10 relative mb-2 justify-center">
            <button 
              type="button" 
              onClick={() => handleGoogleCustomLogin()}
              className="w-full rounded-xl py-3 flex items-center justify-center gap-3 bg-[#131314] hover:bg-[#1f1f1f] text-white transition-colors border border-white/10 cursor-pointer shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="text-sm font-medium">Continue with Google</span>
            </button>
          </div>
          <p className="text-center text-white/40 text-xs mt-4 relative z-10">
            By creating an account, you agree to our <a href="#" className="text-blue-400 hover:text-blue-300">Terms & Service</a>
          </p>
        </form>

        {/* Login Form */}
        <form className={`space-y-[7px] relative z-10 ${activeTab === 'login' ? 'block' : 'hidden'}`} onSubmit={(e) => handleFormSubmit(e, 'login')}>
          <h1 className="text-2xl font-bold mb-6 tracking-tight text-white">Sign In to Regalia</h1>
          
          <div className="relative">
            <label className="sr-only" htmlFor="login-email">Email</label>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <svg className="h-5 w-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
            <input className="glass-input w-full rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:ring-0 relative z-0" id="login-email" name="email" placeholder="Enter your email" type="email" required autoComplete="username" />
          </div>

          <div className="relative">
            <label className="sr-only" htmlFor="login-password">Password</label>
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
              <svg className="h-5 w-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <input 
              className="glass-input w-full rounded-xl pl-11 pr-12 py-3 text-sm text-white focus:ring-0 relative z-0" 
              id="login-password" 
              name="password" 
              placeholder="Password" 
              type={showPassword ? "text" : "password"} 
              required 
              autoComplete="current-password" 
            />
            <button 
              type="button" 
              className="absolute inset-y-0 right-0 pr-4 flex items-center z-10 text-white/40 hover:text-white/80 transition-colors bg-transparent border-0 cursor-pointer p-0"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>

          <div className="flex justify-between items-center text-sm text-white/60 py-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input type="checkbox" defaultChecked className="rounded border-white/10 bg-black/40 text-blue-500 focus:ring-0 focus:ring-offset-0" />
              <span>Keep me signed in</span>
            </label>
            <button type="button" className="text-white/60 hover:text-white transition-colors bg-transparent border-0 cursor-pointer p-0" onClick={() => addToast('Reset link simulated.', 'info')}>
              Forgot password?
            </button>
          </div>

          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 btn-slide-black w-full rounded-xl py-3 !mt-[17px] text-sm font-medium text-white transition-all shadow-lg shadow-blue-500/25 active:scale-[0.98] border-0 cursor-pointer" type="submit">
            <span>Let's go login</span>
          </button>

          <button type="button" className="w-full rounded-xl py-2.5 mt-3 border border-dashed border-white/20 bg-white/5 hover:bg-white/10 text-white/70 transition-colors text-sm font-medium flex items-center justify-center gap-2 cursor-pointer bg-transparent" onClick={handleBypass}>
            <span>Bypass Authentication (Demo Mode)</span>
          </button>
        </form>
      </div>
    </div>
  );
}
