import re

files = [
    r'c:\Users\GC\Downloads\OneDrive\Desktop\Agent AI CS\frontend\src\components\Legal\privacyTranslations.js',
    r'c:\Users\GC\Downloads\OneDrive\Desktop\Agent AI CS\frontend\src\components\Legal\termsTranslations.js'
]

replacements = [
    (r'\s*\(`nama_bisnis`\)', ''),
    (r'\s*\(`wa_phone_number_id`\)', ''),
    (r'\s*\(`wa_access_token`\)', ''),
    (r'\s*\(`port 8000`\)', ''),
    (r'\s*\(`gemini-2.5-flash` \/ `gemini-3.1-pro`\)', ''),
    (r'\s*\(`regalia\.db`\)', ''),
    (r'\s*\(`client_id`\)', ''),
    (r'\s*\(`knowledge_base`\)', ''),
    (r'\s*\(`is_active = 1`\)', ''),
    (r'\s*\(`is_active = 0`\)', ''),
    (r'\s*\(`toggle_slang`, `toggle_java`, `toggle_ongkir`, `toggle_anger`, and `toggle_fallback`\)', ''),
    (r'\s*\(`toggle_slang`, `toggle_java`, `toggle_ongkir`, `toggle_anger` dan `toggle_fallback`\)', ''),
    (r'\s*\(`toggle_slang`, `toggle_java`, `toggle_ongkir`, `toggle_anger` und `toggle_fallback`\)', ''),
    (r'\s*\(`toggle_slang`, `toggle_java`, `toggle_ongkir`, `toggle_anger` et `toggle_fallback`\)', ''),
    (r'\s*\(`toggle_slang`, `toggle_java`, `toggle_ongkir`, `toggle_anger` e `toggle_fallback`\)', ''),
    (r'\s*\(`toggle_slang`, `toggle_java`, `toggle_ongkir`, `toggle_anger` y `toggle_fallback`\)', ''),
    (r'\s*\(`toggle_slang`, `toggle_java`, `toggle_ongkir`, `toggle_anger` 및 `toggle_fallback`\)', ''),
    (r'\s*\(`toggle_slang`, `toggle_java`, `toggle_ongkir`, `toggle_anger`, और `toggle_fallback`\)', ''),
    (r'\s*\(`\/ws`\)', ''),
    (r'\(`port 8000` endpoints, dashboard UI, and Gemini AI agent routing\)', 'accessing the application programming interfaces, user interfaces, and routing algorithms'),
    (r'\(endpoint `port 8000`, dasbor UI, dan perutean agen AI Gemini\)', 'yang mencakup antarmuka pemrograman aplikasi, antarmuka pengguna, dan algoritma perutean'),
    (r'\(`port 8000`-Endpunkte, Dashboard-UI und Gemini-KI-Agenten-Routing\)', 'einschließlich Anwendungsprogrammierschnittstellen, Benutzeroberflächen und Routing-Algorithmen'),
    (r'\(points de terminaison `port 8000`, interface du tableau de bord et routage de l\'agent IA Gemini\)', 'comprenant les interfaces de programmation d\'applications, les interfaces utilisateur et les algorithmes de routage'),
    (r'\(endpoint `port 8000`, interfaccia dashboard e instradamento dell\'agente IA Gemini\)', 'che include interfacce di programmazione delle applicazioni, interfacce utente e algoritmi di instradamento'),
    (r'\(puntos de conexión `port 8000`, interfaz de usuario del panel de control y enrutamiento del agente de IA Gemini\)', 'que incluye interfaces de programación de aplicaciones, interfaces de usuario y algoritmos de enrutamiento'),
    (r'\(endpoints `port 8000`, interface do painel e roteamento de agente de IA Gemini\)', 'que inclui interfaces de programação de aplicativos, interfaces de usuário e algoritmos de roteamento'),
    (r'\(`port 8000` 엔드포인트, 대시보드 UI 및 Gemini AI 에이전트 라우팅\)', '응용 프로그램 프로그래밍 인터페이스, 사용자 인터페이스 및 라우팅 알고리즘을 포함하여'),
    (r'\(`port 8000` एंडपॉइंट्स, डैशबोर्ड UI, और Gemini AI एजेंट राउटिंग\)', 'जिसमें एप्लिकेशन प्रोग्रामिंग इंटरफेस, यूजर इंटरफेस और राउटिंग एल्गोरिदम शामिल हैं'),
    (r'\("we," "our," or "us"\)', '(hereinafter referred to as the "Company")'),
    (r'\("kami" atau "perusahaan"\)', '(selanjutnya disebut sebagai "Perusahaan")'),
    (r'\(„wir“, „unser“ oder „uns“\)', '(im Folgenden als "Unternehmen" bezeichnet)'),
    (r'\(« nous », « notre » ou « nos »\)', '(ci-après dénommée la "Société")'),
    (r'\("noi", "nostro" o "ci"\)', '(di seguito denominata la "Società")'),
    (r'\("nosotros", "nuestro" o "nos"\)', '(en adelante, la "Empresa")'),
    (r'\("nós", "nosso" ou "nos"\)', '(doravante denominada a "Empresa")'),
    (r'\("당사" 또는 "회사"\)', '(이하 "회사"라 칭함)'),
    (r'\("हम," "हमारा," या "हमें"\)', '(इसके बाद "कंपनी" के रूप में संदर्भित)'),
    (r'\(e\.g\., Javanese \/ Slang toggles\)', 'such as regional dialect adaptations'),
    (r'\(misalnya, toggle Bahasa Jawa atau Bahasa Gaul\/Slang\)', 'seperti penyesuaian dialek regional'),
    (r'\(z\. B\. Javanisch- \/ Slang-Schalter\)', 'wie regionale Dialektanpassungen'),
    (r'\(par exemple, activation du javanais ou de l\'argot\)', 'telles que les adaptations de dialectes régionaux'),
    (r'\(es\. attivazione dialetto giavanese o gergo giovanile\)', 'come gli adattamenti dialettali regionali'),
    (r'\(por ejemplo, activación de javanés o jerga juvenil\)', 'como las adaptaciones de dialectos regionales'),
    (r'\(ex\.: ativação de dialeto javanês ou gírias\/slang\)', 'como adaptações de dialetos regionais'),
    (r'\(예: 자바어 또는 십대 은어 설정\)', '지역 방언 적응과 같은'),
    (r'\(जैसे जावानीस या स्लैंग टॉगल\)', 'जैसे क्षेत्रीय बोली अनुकूलन'),
    (r'\(misalnya pemicu `anger_detected` atau fallback\)', 'seperti peringatan sistem atau kegagalan penanganan'),
    (r'\(e\.g\., `anger_detected` or fallback triggers\)', 'such as system alerts or fallback triggers'),
    (r'\(z\. B\. `anger_detected` oder Fallback-Auslöser\)', 'wie Systemwarnungen oder Fallback-Auslöser'),
    (r'\(par ex\., les déclencheurs `anger_detected` ou de secours\)', 'tels que les alertes système ou les déclencheurs de secours'),
    (r'\(ad es\. attivazioni di `anger_detected` o di emergenza\)', 'come avvisi di sistema o trigger di emergenza'),
    (r'\(por ejemplo, activaciones de `anger_detected` o respaldo\)', 'como alertas de sistema o disparadores de respaldo'),
    (r'\(ex\.: acionadores de `anger_detected` ou contingência\)', 'como alertas de sistema ou gatilhos de contingência'),
    (r'\(예: `anger_detected` 또는 폴백 트리거\)', '예: 시스템 경고 또는 폴백 트리거'),
    (r'\(उदा\., `anger_detected` या फ़ॉलबैक ट्रिगर\)', 'जैसे सिस्टम अलर्ट या फ़ॉलबैक ट्रिगर'),
    # Finally clear any remaining backticked variables safely:
    (r'`wa_access_token`', ''),
    (r'`wa_phone_number_id`', ''),
]

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for pattern, replacement in replacements:
        content = re.sub(pattern, replacement, content)
        
    # Remove remaining empty parentheses like "()" or "( )" that might have been left
    content = re.sub(r'\(\s*\)', '', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Replacement complete.")
