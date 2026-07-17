const fs = require('fs');
const path = require('path');

const locales = ['en', 'id', 'de', 'fr', 'it', 'es', 'pt', 'ko', 'hi', 'ja'];

const newTranslations = {
  signUp: {
    en: 'Sign up', id: 'Daftar', de: 'Registrieren', fr: "S'inscrire", it: 'Iscriviti', es: 'Regístrate', pt: 'Inscreva-se', ko: '가입하기', hi: 'साइन अप करें', ja: 'サインアップ'
  },
  signIn: {
    en: 'Sign in', id: 'Masuk', de: 'Anmelden', fr: 'Se connecter', it: 'Accedi', es: 'Iniciar sesión', pt: 'Entrar', ko: '로그인', hi: 'साइन इन करें', ja: 'サインイン'
  },
  createAccount: {
    en: 'Create an account', id: 'Buat akun', de: 'Konto erstellen', fr: 'Créer un compte', it: 'Crea un account', es: 'Crear una cuenta', pt: 'Criar uma conta', ko: '계정 만들기', hi: 'खाता बनाएं', ja: 'アカウントを作成する'
  },
  firstName: {
    en: 'First name', id: 'Nama depan', de: 'Vorname', fr: 'Prénom', it: 'Nome', es: 'Nombre', pt: 'Nome', ko: '이름', hi: 'पहला नाम', ja: '名'
  },
  lastName: {
    en: 'Last name', id: 'Nama belakang', de: 'Nachname', fr: 'Nom de famille', it: 'Cognome', es: 'Apellido', pt: 'Sobrenome', ko: '성', hi: 'अंतिम नाम', ja: '姓'
  },
  enterEmail: {
    en: 'Enter your email', id: 'Masukkan email', de: 'E-Mail eingeben', fr: 'Entrez votre e-mail', it: 'Inserisci la tua email', es: 'Introduce tu correo', pt: 'Digite seu e-mail', ko: '이메일 입력', hi: 'अपना ईमेल दर्ज करें', ja: 'メールアドレスを入力'
  },
  createPassword: {
    en: 'Create a password', id: 'Buat kata sandi', de: 'Passwort erstellen', fr: 'Créer un mot de passe', it: 'Crea una password', es: 'Crea una contraseña', pt: 'Criar uma senha', ko: '비밀번호 생성', hi: 'पासवर्ड बनाएं', ja: 'パスワードを作成する'
  },
  continueBtn: {
    en: 'Continue', id: 'Lanjutkan', de: 'Weiter', fr: 'Continuer', it: 'Continua', es: 'Continuar', pt: 'Continuar', ko: '계속하기', hi: 'जारी रखें', ja: '続ける'
  },
  googleSignIn: {
    en: 'Sign in with Google', id: 'Masuk dengan Google', de: 'Mit Google anmelden', fr: 'Se connecter avec Google', it: 'Accedi con Google', es: 'Iniciar sesión con Google', pt: 'Entrar com o Google', ko: 'Google로 로그인', hi: 'Google से साइन इन करें', ja: 'Googleでサインイン'
  },
  signInToRegalia: {
    en: 'Sign in to Regalia', id: 'Masuk ke Regalia', de: 'Bei Regalia anmelden', fr: 'Se connecter à Regalia', it: 'Accedi a Regalia', es: 'Iniciar sesión en Regalia', pt: 'Entrar no Regalia', ko: 'Regalia에 로그인', hi: 'Regalia में साइन इन करें', ja: 'Regaliaにサインイン'
  },
  welcomeBack: {
    en: 'Welcome back! Please enter your details.', id: 'Selamat datang kembali! Silakan masukkan detail Anda.', de: 'Willkommen zurück! Bitte geben Sie Ihre Daten ein.', fr: 'Bon retour! Veuillez entrer vos détails.', it: 'Bentornato! Inserisci i tuoi dettagli.', es: '¡Bienvenido de nuevo! Por favor ingrese sus detalles.', pt: 'Bem-vindo de volta! Por favor insira seus detalhes.', ko: '다시 오신 것을 환영합니다! 세부 정보를 입력하십시오.', hi: 'वापसी पर स्वागत है! कृपया अपना विवरण दर्ज करें।', ja: 'お帰りなさい！詳細を入力してください。'
  },
  enterPassword: {
    en: 'Enter your password', id: 'Masukkan kata sandi', de: 'Passwort eingeben', fr: 'Entrez votre mot de passe', it: 'Inserisci la tua password', es: 'Introduce tu contraseña', pt: 'Digite sua senha', ko: '비밀번호 입력', hi: 'अपना पासवर्ड दर्ज करें', ja: 'パスワードを入力'
  },
  forgotPassword: {
    en: 'Forgot password?', id: 'Lupa kata sandi?', de: 'Passwort vergessen?', fr: 'Mot de passe oublié?', it: 'Password dimenticata?', es: '¿Olvidaste tu contraseña?', pt: 'Esqueceu a senha?', ko: '비밀번호 찾기', hi: 'पासवर्ड भूल गए?', ja: 'パスワードを忘れた場合'
  }
};

locales.forEach(lang => {
  const file = path.join(__dirname, `src/locales/${lang}.json`);
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  for (const key in newTranslations) {
    data[key] = newTranslations[key][lang] || newTranslations[key]['en'];
  }
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
});
console.log('Updated locales!');
