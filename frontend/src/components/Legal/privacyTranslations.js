// privacyTranslations.js — Full multilingual dictionary for Privacy Policy (10 languages)

export const languages = [
  { code: 'en', label: 'English' },
  { code: 'id', label: 'Indonesia' },
  { code: 'de', label: 'Deutsch' },
  { code: 'fr', label: 'Français' },
  { code: 'it', label: 'Italiano' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'ko', label: 'Korea' },
  { code: 'hi', label: 'Hindi' },
  { code: 'ja', label: 'Japanese' }
];

export const privacyContent = {
  en: {
    title: 'Privacy Policy',
    effective: 'Effective 16 July 2026 · Regalia AI WhatsApp Agent SaaS Platform',
    previousVersion: 'Previous Version',
    intro: 'Regalia AI ("we," "our," or "us") is an enterprise AI automation company specializing in autonomous, reliable, and steerable customer service systems for WhatsApp Business. This Privacy Policy details how our platform collects, uses, encrypts, and isolates personal data when you interact with our portal, dashboard, and AI agent endpoints.',
    sections: [
      {
        heading: '1. Collection of Personal & Business Data',
        p: 'When your business connects to the Regalia SaaS dashboard, we collect and process data across three distinct categories:',
        items: [
          {
            sub: 'Directly Provided Account Credentials',
            desc: 'Information you provide during onboarding, including your business name (`nama_bisnis`), WhatsApp Phone Number ID (`wa_phone_number_id`), and Meta Access Tokens (`wa_access_token`).'
          },
          {
            sub: 'Automated WhatsApp Webhook Payloads',
            desc: 'Customer messages transmitted to our FastAPI endpoints (`port 8000`) via official Meta webhooks. These payloads contain sender phone numbers, timestamps, and message contents strictly required to generate contextual AI responses.'
          },
          {
            sub: 'Custom Knowledge Base & Product Catalogs',
            desc: 'Text documents, FAQs, and pricing rules uploaded to the Regalia dashboard to steer AI responses and regional dialects (e.g., Javanese / Slang toggles).'
          }
        ]
      },
      {
        heading: '2. Strict Data Isolation & Local SQLite Storage',
        p: 'Unlike public AI chat interfaces, Regalia operates on strict enterprise data tenancy. All client configurations, access keys, and conversation logs are encrypted and stored locally in isolated SQLite storage (`regalia.db`). We guarantee that:',
        list: [
          'End-customer phone numbers and chat logs are strictly partitioned per business ID (`client_id`).',
          'No customer interaction data is ever sold, shared, or transferred to third-party advertising brokers.',
          'Your custom knowledge base (`knowledge_base`) is only accessible during inference requests specifically originating from your authorized WhatsApp Phone Number ID.'
        ]
      },
      {
        heading: '3. Google Gemini AI Model Processing',
        p: 'To generate intelligent, natural-language responses, incoming message text is processed using Google DeepMind\'s Gemini large language models (`gemini-2.5-flash` / `gemini-3.1-pro`). All inference calls utilize enterprise API endpoints protected by Transport Layer Security (TLS 1.3). Under our Google Cloud enterprise agreements, data transmitted for inference is strictly isolated and is not retained for public foundation model retraining.'
      },
      {
        heading: '4. Data Retention & Lifecycle Management',
        p: 'We retain conversation records and webhook event logs only for as long as your business maintains an active subscription (`is_active = 1`). Upon account deactivation or termination, all associated WhatsApp access tokens, knowledge base entries, and customer interaction logs can be permanently purged upon request in accordance with applicable data protection regulations.'
      },
      {
        heading: '5. Your Rights and Choices',
        p: 'As a Regalia platform administrator, you maintain complete sovereignty over your data:',
        list: [
          'Agent Deactivation: You may toggle `is_active = 0` instantly from the dashboard to halt all automated AI message processing.',
          'Credential Revocation: You may update or delete your Meta Access Tokens (`wa_access_token`) directly from the settings panel at any time.',
          'Export & Deletion: You have the right to request a complete export of your `regalia.db` client partition or request immediate erasure of your historical chat logs.'
        ]
      },
      {
        heading: '6. Contact Information',
        p: 'If you have any inquiries regarding this Privacy Policy, our SQLite encryption architecture, or our WhatsApp Business API compliance protocols, please contact our privacy compliance team at privacy@regalia.ai.'
      }
    ]
  },
  id: {
    title: 'Kebijakan Privasi',
    effective: 'Berlaku sejak 16 Juli 2026 · Platform SaaS Agen WhatsApp Regalia AI',
    previousVersion: 'Versi Sebelumnya',
    intro: 'Regalia AI ("kami" atau "perusahaan") adalah platform otomasi AI enterprise yang berfokus pada sistem layanan pelanggan otonom yang andal dan dapat diarahkan untuk WhatsApp Business. Kebijakan Privasi ini menjelaskan bagaimana platform kami mengumpulkan, menggunakan, mengenkripsi, serta mengisolasi data pribadi saat Anda berinteraksi dengan portal, dasbor, dan endpoint agen AI kami.',
    sections: [
      {
        heading: '1. Pengumpulan Data Pribadi & Bisnis',
        p: 'Saat bisnis Anda terhubung ke dasbor SaaS Regalia, kami mengumpulkan dan memproses data dalam tiga kategori utama:',
        items: [
          {
            sub: 'Kredensial Akun yang Diberikan Langsung',
            desc: 'Informasi yang Anda berikan saat pendaftaran, termasuk nama bisnis (`nama_bisnis`), ID Nomor Telepon WhatsApp (`wa_phone_number_id`), dan Token Akses Meta (`wa_access_token`).'
          },
          {
            sub: 'Payload Webhook WhatsApp Otomatis',
            desc: 'Pesan pelanggan yang dikirimkan ke endpoint FastAPI kami (`port 8000`) melalui webhook resmi Meta. Payload ini mencakup nomor telepon pengirim, stempel waktu, dan isi pesan yang secara ketat diperlukan untuk menghasilkan respons AI yang kontekstual.'
          },
          {
            sub: 'Basis Pengetahuan (Knowledge Base) & Katalog Produk Khusus',
            desc: 'Dokumen teks, FAQ, serta aturan harga produk yang diunggah ke dasbor Regalia untuk mengarahkan respons AI dan gaya bahasa lokal (misalnya, toggle Bahasa Jawa atau Bahasa Gaul/Slang).'
          }
        ]
      },
      {
        heading: '2. Isolasi Data Ketat & Penyimpanan SQLite Lokal',
        p: 'Berbeda dengan antarmuka AI publik biasa, Regalia beroperasi dengan prinsip isolasi penyewa data enterprise yang sangat ketat. Seluruh konfigurasi klien, kunci akses, dan log percakapan dienkripsi dan disimpan di penyimpanan SQLite lokal terisolasi (`regalia.db`). Kami menjamin bahwa:',
        list: [
          'Nomor telepon pelanggan akhir dan riwayat percakapan dipisahkan secara ketat berdasarkan ID bisnis (`client_id`).',
          'Tidak ada data interaksi pelanggan yang pernah dijual, dibagikan, atau dipindahtangankan kepada broker periklanan pihak ketiga.',
          'Basis pengetahuan (`knowledge_base`) Anda hanya dapat diakses saat proses inferensi yang berasal langsung dari ID Nomor Telepon WhatsApp Anda yang sah.'
        ]
      },
      {
        heading: '3. Pemrosesan Model AI Google Gemini',
        p: 'Untuk menghasilkan balasan percakapan alami yang cerdas, teks pesan masuk diproses menggunakan model bahasa besar Google DeepMind Gemini (`gemini-2.5-flash` / `gemini-3.1-pro`). Semua panggilan inferensi menggunakan endpoint API enterprise yang dilindungi oleh Transport Layer Security (TLS 1.3). Berdasarkan perjanjian enterprise Google Cloud kami, data yang dikirimkan untuk inferensi diisolasi secara ketat dan tidak disimpan atau digunakan untuk melatih ulang model AI publik.'
      },
      {
        heading: '4. Retensi Data & Manajemen Siklus Hidup',
        p: 'Kami menyimpan catatan percakapan dan log peristiwa webhook hanya selama bisnis Anda mempertahankan status langganan aktif (`is_active = 1`). Pada saat penonaktifan atau penghentian akun, seluruh token akses WhatsApp, entri basis pengetahuan, dan log interaksi pelanggan yang terkait dapat dihapus secara permanen atas permintaan sesuai dengan regulasi perlindungan data yang berlaku.'
      },
      {
        heading: '5. Hak dan Kendali Anda',
        p: 'Sebagai administrator platform Regalia, Anda memegang kendali penuh atas data bisnis Anda:',
        list: [
          'Penonaktifan Agen: Anda dapat mengubah status `is_active = 0` secara instan dari dasbor untuk menghentikan pemrosesan pesan AI otomatis.',
          'Pencabutan Kredensial: Anda dapat memperbarui atau menghapus Token Akses Meta (`wa_access_token`) langsung dari panel pengaturan kapan saja.',
          'Ekspor & Penghapusan: Anda berhak meminta ekspor lengkap dari partisi klien `regalia.db` Anda atau meminta penghapusan segera atas seluruh riwayat log percakapan.'
        ]
      },
      {
        heading: '6. Informasi Kontak',
        p: 'Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini, arsitektur enkripsi SQLite kami, atau protokol kepatuhan Meta WhatsApp Business API, silakan hubungi tim kepatuhan privasi kami di privacy@regalia.ai.'
      }
    ]
  },
  de: {
    title: 'Datenschutzrichtlinie',
    effective: 'Gültig ab 16. Juli 2026 · Regalia AI WhatsApp-Agenten-SaaS-Plattform',
    previousVersion: 'Vorherige Version',
    intro: 'Regalia AI („wir“, „unser“ oder „uns“) ist ein Unternehmen für KI-Automatisierung für Unternehmen, das sich auf autonome, zuverlässige und steuerbare Kundendienstsysteme für WhatsApp Business spezialisiert hat. Diese Datenschutzrichtlinie regelt, wie unsere Plattform personenbezogene Daten sammelt, verwendet, verschlüsselt und isoliert, wenn Sie mit unserem Portal, Dashboard und unseren KI-Agenten-Endpunkten interagieren.',
    sections: [
      {
        heading: '1. Erfassung von Personen- und Geschäftsdaten',
        p: 'Wenn Ihr Unternehmen sich mit dem Regalia-SaaS-Dashboard verbindet, erfassen und verarbeiten wir Daten in drei Hauptkategorien:',
        items: [
          {
            sub: 'Direkt bereitgestellte Kontodaten',
            desc: 'Informationen, die Sie bei der Einrichtung angeben, einschließlich Ihres Unternehmensnamens (`nama_bisnis`), der WhatsApp-Telefonnummer-ID (`wa_phone_number_id`) und der Meta-Zugriffstoken (`wa_access_token`).'
          },
          {
            sub: 'Automatisierte WhatsApp-Webhook-Nutzlasten',
            desc: 'Kundenmitteilungen, die über offizielle Meta-Webhooks an unsere FastAPI-Endpunkte (`port 8000`) übertragen werden. Diese Nutzlasten enthalten Telefonnummern der Absender, Zeitstempel und Nachrichteninhalte, die für die Generierung kontextueller KI-Antworten zwingend erforderlich sind.'
          },
          {
            sub: 'Benutzerdefinierte Wissensdatenbank & Produktkataloge',
            desc: 'Textdokumente, FAQs und Preisregeln, die in das Regalia-Dashboard hochgeladen werden, um KI-Antworten und regionale Sprachstile (z. B. Javanisch- / Slang-Schalter) zu steuern.'
          }
        ]
      },
      {
        heading: '2. Strikte Datenisolierung & lokaler SQLite-Speicher',
        p: 'Im Gegensatz zu öffentlichen KI-Chat-Schnittstellen arbeitet Regalia mit einer strikten Mandantentrennung für Unternehmensdaten. Alle Kundenkonfigurationen, Zugriffsschlüssel und Gesprächsprotokolle werden verschlüsselt und lokal in isoliertem SQLite-Speicher (`regalia.db`) abgelegt. Wir garantieren:',
        list: [
          'Endkunden-Telefonnummern und Chat-Protokolle werden streng nach Geschäfts-ID (`client_id`) getrennt.',
          'Es werden niemals Kundeninteraktionsdaten an Drittanbieter-Werbevermittler verkauft, weitergegeben oder übertragen.',
          'Ihre benutzerdefinierte Wissensdatenbank (`knowledge_base`) ist ausschließlich während Interferenzanfragen zugänglich, die von Ihrer autorisierten WhatsApp-Telefonnummer-ID ausgehen.'
        ]
      },
      {
        heading: '3. Verarbeitung durch Google Gemini KI-Modelle',
        p: 'Um intelligente, natürlichsprachliche Antworten zu generieren, wird eingehender Nachrichtentext mithilfe von Google DeepMinds großen Sprachmodellen Gemini (`gemini-2.5-flash` / `gemini-3.1-pro`) verarbeitet. Alle Interferenzaufrufe nutzen Enterprise-API-Endpunkte, die durch Transport Layer Security (TLS 1.3) geschützt sind. Gemäß unseren Google Cloud-Unternehmensvereinbarungen werden zur Interferenz übermittelte Daten streng isoliert und nicht zum erneuten Training öffentlicher Foundation-Modelle gespeichert.'
      },
      {
        heading: '4. Datenspeicherung & Lebenszyklusmanagement',
        p: 'Wir bewahren Gesprächsdatensätze und Webhook-Ereignisprotokolle nur so lange auf, wie Ihr Unternehmen ein aktives Abonnement unterhält (`is_active = 1`). Bei Deaktivierung oder Kündigung des Kontos können alle zugehörigen WhatsApp-Zugriffstoken, Wissensdatenbankeinträge und Kundeninteraktionsprotokolle auf Anfrage gemäß den geltenden Datenschutzgesetzen dauerhaft gelöscht werden.'
      },
      {
        heading: '5. Ihre Rechte und Kontrollmöglichkeiten',
        p: 'Als Administrator der Regalia-Plattform behalten Sie die vollständige Souveränität über Ihre Daten:',
        list: [
          'Agenten-Deaktivierung: Sie können `is_active = 0` sofort über das Dashboard umschalten, um die gesamte automatisierte KI-Nachrichtenverarbeitung zu stoppen.',
          'Widerruf von Anmeldeinformationen: Sie können Ihre Meta-Zugriffstoken (`wa_access_token`) jederzeit direkt im Einstellungsbereich aktualisieren oder löschen.',
          'Export & Löschung: Sie haben das Recht, einen vollständigen Export Ihrer `regalia.db`-Kundenpartition oder die sofortige Löschung Ihrer historischen Chat-Protokolle anzufordern.'
        ]
      },
      {
        heading: '6. Kontaktinformationen',
        p: 'Wenn Sie Fragen zu dieser Datenschutzrichtlinie, unserer SQLite-Verschlüsselungsarchitektur oder unseren Protokollen zur Einhaltung der WhatsApp Business API haben, wenden Sie sich bitte an unser Datenschutzteam unter privacy@regalia.ai.'
      }
    ]
  },
  fr: {
    title: 'Politique de Confidentialité',
    effective: 'En vigueur le 16 juillet 2026 · Plateforme SaaS d\'agent WhatsApp Regalia AI',
    previousVersion: 'Version précédente',
    intro: 'Regalia AI (« nous », « notre » ou « nos ») est une entreprise d\'automatisation de l\'IA d\'entreprise spécialisée dans les systèmes de service client autonomes, fiables et pilotables pour WhatsApp Business. Cette Politique de confidentialité décrit comment notre plateforme collecte, utilise, chiffre et isole les données personnelles lorsque vous interagissez avec notre portail, notre tableau de bord et nos points de terminaison d\'agent IA.',
    sections: [
      {
        heading: '1. Collecte des données personnelles et professionnelles',
        p: 'Lorsque votre entreprise se connecte au tableau de bord SaaS de Regalia, nous collectons et traitons des données dans trois catégories distinctes :',
        items: [
          {
            sub: 'Identifiants de compte fournis directement',
            desc: 'Informations fournies lors de l\'intégration, notamment le nom de votre entreprise (`nama_bisnis`), l\'identifiant de numéro de téléphone WhatsApp (`wa_phone_number_id`) et les jetons d\'accès Meta (`wa_access_token`).'
          },
          {
            sub: 'Charges utiles de webhook WhatsApp automatisées',
            desc: 'Messages clients transmis à nos points de terminaison FastAPI (`port 8000`) via les webhooks officiels de Meta. Ces charges utiles contiennent les numéros de téléphone de l\'expéditeur, les horodatages et les contenus des messages strictement nécessaires pour générer des réponses IA contextuelles.'
          },
          {
            sub: 'Base de connaissances personnalisée et catalogues de produits',
            desc: 'Documents texte, FAQ et règles de tarification téléchargés sur le tableau de bord Regalia pour orienter les réponses de l\'IA et les dialectes régionaux (par exemple, activation du javanais ou de l\'argot).'
          }
        ]
      },
      {
        heading: '2. Isolation stricte des données et stockage SQLite local',
        p: 'Contrairement aux interfaces de chat IA publiques, Regalia fonctionne sur une isolation locative stricte des données d\'entreprise. Toutes les configurations client, clés d\'accès et journaux de conversation sont chiffrés et stockés localement dans un stockage SQLite isolé (`regalia.db`). Nous garantissons que :',
        list: [
          'Les numéros de téléphone des clients finaux et les journaux de chat sont strictement compartimentés par identifiant d\'entreprise (`client_id`).',
          'Aucune donnée d\'interaction client n\'est jamais vendue, partagée ou transférée à des courtiers publicitaires tiers.',
          'Votre base de connaissances (`knowledge_base`) n\'est accessible que lors des requêtes d\'inférence provenant spécifiquement de votre numéro de téléphone WhatsApp autorisé.'
        ]
      },
      {
        heading: '3. Traitement des modèles d\'IA Google Gemini',
        p: 'Pour générer des réponses intelligentes en langage naturel, le texte des messages entrants est traité à l\'aide des grands modèles de langage Gemini de Google DeepMind (`gemini-2.5-flash` / `gemini-3.1-pro`). Tous les appels d\'inférence utilisent des points de terminaison d\'API d\'entreprise protégés par Transport Layer Security (TLS 1.3). Conformément à nos accords d\'entreprise Google Cloud, les données transmises pour l\'inférence sont strictement isolées et ne sont pas conservées pour le réentraînement des modèles fondationnels publics.'
      },
      {
        heading: '4. Conservation des données et gestion du cycle de vie',
        p: 'Nous conservons les enregistrements de conversation et les journaux d\'événements webhook uniquement tant que votre entreprise conserve un abonnement actif (`is_active = 1`). Lors de la désactivation ou de la résiliation du compte, tous les jetons d\'accès WhatsApp, entrées de base de connaissances et journaux d\'interaction associés peuvent être définitivement purgés sur demande conformément aux réglementations applicables.'
      },
      {
        heading: '5. Vos droits et choix',
        p: 'En tant qu\'administrateur de la plateforme Regalia, vous conservez une souveraineté totale sur vos données :',
        list: [
          'Désactivation de l\'agent : Vous pouvez basculer `is_active = 0` instantanément depuis le tableau de bord pour interrompre tout traitement automatisé des messages IA.',
          'Révocation des identifiants : Vous pouvez mettre à jour ou supprimer vos jetons d\'accès Meta (`wa_access_token`) directement depuis le panneau de configuration à tout moment.',
          'Exportation et suppression : Vous avez le droit de demander une exportation complète de votre partition client `regalia.db` ou d\'exiger l\'effacement immédiat de l\'historique de vos conversations.'
        ]
      },
      {
        heading: '6. Coordonnées',
        p: 'Si vous avez des questions concernant cette Politique de confidentialité, notre architecture de chiffrement SQLite ou nos protocoles de conformité à l\'API WhatsApp Business, veuillez contacter notre équipe de conformité à privacy@regalia.ai.'
      }
    ]
  },
  it: {
    title: 'Informativa sulla Privacy',
    effective: 'In vigore dal 16 luglio 2026 · Piattaforma SaaS per Agenti WhatsApp Regalia AI',
    previousVersion: 'Versione precedente',
    intro: 'Regalia AI ("noi", "nostro" o "ci") è un\'azienda di automazione IA di livello aziendale specializzata in sistemi di assistenza clienti autonomi, affidabili e controllabili per WhatsApp Business. Questa Informativa sulla privacy illustra come la nostra piattaforma raccoglie, utilizza, crittografa e isola i dati personali quando si interagisce con il nostro portale, la dashboard e gli endpoint dell\'agente IA.',
    sections: [
      {
        heading: '1. Raccolta di Dati Personali e Aziendali',
        p: 'Quando la tua azienda si connette alla dashboard SaaS di Regalia, raccogliamo ed elaboriamo i dati in tre categorie distinte:',
        items: [
          {
            sub: 'Credenziali di Account Fornite Direttamente',
            desc: 'Informazioni fornite durante l\'attivazione, incluso il nome della tua azienda (`nama_bisnis`), l\'ID del numero di telefono WhatsApp (`wa_phone_number_id`) e i Token di Accesso Meta (`wa_access_token`).'
          },
          {
            sub: 'Payload Webhook WhatsApp Automatizzati',
            desc: 'Messaggi dei clienti trasmessi ai nostri endpoint FastAPI (`port 8000`) tramite webhook ufficiali Meta. Questi payload contengono numeri di telefono del mittente, timestamp e contenuti dei messaggi strettamente necessari per generare risposte IA contestuali.'
          },
          {
            sub: 'Base di Conoscenza e Cataloghi Prodotti Personalizzati',
            desc: 'Documenti di testo, FAQ e regole di prezzo caricati sulla dashboard di Regalia per guidare le risposte dell\'IA e i dialetti regionali (es. attivazione dialetto giavanese o gergo giovanile).'
          }
        ]
      },
      {
        heading: '2. Isolamento dei Dati e Archiviazione SQLite Locale',
        p: 'A differenza delle interfacce di chat IA pubbliche, Regalia opera su un rigoroso isolamento dei dati aziendali. Tutte le configurazioni dei clienti, le chiavi di accesso e i registri delle conversazioni sono crittografati e archiviati localmente in un database SQLite isolato (`regalia.db`). Garantiamo che:',
        list: [
          'I numeri di telefono dei clienti finali e i registri delle chat sono strettamente partizionati per ID aziendale (`client_id`).',
          'Nessun dato di interazione del cliente viene mai venduto, condiviso o trasferito a broker pubblicitari di terze parti.',
          'La tua base di conoscenza (`knowledge_base`) è accessibile solo durante le richieste di inferenza provenienti specificamente dal tuo numero di telefono WhatsApp autorizzato.'
        ]
      },
      {
        heading: '3. Elaborazione del Modello IA Google Gemini',
        p: 'Per generare risposte intelligenti in linguaggio naturale, il testo dei messaggi in arrivo viene elaborato utilizzando i grandi modelli di linguaggio Gemini di Google DeepMind (`gemini-2.5-flash` / `gemini-3.1-pro`). Tutte le chiamate di inferenza utilizzano endpoint API aziendali protetti da Transport Layer Security (TLS 1.3). In base ai nostri accordi aziendali con Google Cloud, i dati trasmessi per l\'inferenza sono rigorosamente isolati e non vengono conservati per il riaddestramento dei modelli di base pubblici.'
      },
      {
        heading: '4. Conservazione dei Dati e Gestione del Ciclo di Vita',
        p: 'Conserviamo le registrazioni delle conversazioni e i registri degli eventi webhook solo finché la tua azienda mantiene un abbonamento attivo (`is_active = 1`). In caso di disattivazione o chiusura dell\'account, tutti i token di accesso WhatsApp associati, le voci della base di conoscenza e i registri delle interazioni con i clienti possono essere eliminati in modo permanente su richiesta in conformità con le normative applicabili.'
      },
      {
        heading: '5. I Tuoi Diritti e Scelte',
        p: 'In qualità di amministratore della piattaforma Regalia, mantieni la completa sovranità sui tuoi dati:',
        list: [
          'Disattivazione dell\'agente: puoi commutare `is_active = 0` istantaneamente dalla dashboard per interrompere tutta l\'elaborazione automatizzata dei messaggi IA.',
          'Revoca delle credenziali: puoi aggiornare o eliminare i tuoi Token di Accesso Meta (`wa_access_token`) direttamente dal pannello delle impostazioni in qualsiasi momento.',
          'Esportazione ed eliminazione: hai il diritto di richiedere un\'esportazione completa della tua partizione client `regalia.db` o di richiedere la cancellazione immediata dei tuoi registri storici.'
        ]
      },
      {
        heading: '6. Contatti',
        p: 'Per qualsiasi domanda relativa a questa Informativa sulla privacy, alla nostra architettura di crittografia SQLite o ai nostri protocolli di conformità all\'API WhatsApp Business, contatta il nostro team per la conformità alla privacy all\'indirizzo privacy@regalia.ai.'
      }
    ]
  },
  es: {
    title: 'Política de Privacidad',
    effective: 'Vigente desde el 16 de julio de 2026 · Plataforma SaaS de Agente de WhatsApp Regalia AI',
    previousVersion: 'Versión anterior',
    intro: 'Regalia AI ("nosotros", "nuestro" o "nos") es una empresa de automatización de IA empresarial especializada en sistemas de atención al cliente autónomos, fiables y controlables para WhatsApp Business. Esta Política de Privacidad detalla cómo nuestra plataforma recopila, utiliza, cifra y aísla los datos personales cuando usted interactúa con nuestro portal, panel de control y puntos de conexión del agente de IA.',
    sections: [
      {
        heading: '1. Recopilación de Datos Personales y Comerciales',
        p: 'Cuando su empresa se conecta al panel de SaaS de Regalia, recopilamos y procesamos datos en tres categorías principales:',
        items: [
          {
            sub: 'Credenciales de Cuenta Proporcionadas Directamente',
            desc: 'Información que proporciona durante la incorporación, incluido el nombre de su empresa (`nama_bisnis`), el ID del número de teléfono de WhatsApp (`wa_phone_number_id`) y los tokens de acceso de Meta (`wa_access_token`).'
          },
          {
            sub: 'Cargas Útiles de Webhook de WhatsApp Automatizadas',
            desc: 'Mensajes de clientes transmitidos a nuestros puntos de conexión de FastAPI (`port 8000`) a través de webhooks oficiales de Meta. Estas cargas útiles contienen números de teléfono del remitente, marcas de tiempo y contenidos de mensajes estrictamente necesarios para generar respuestas de IA contextuales.'
          },
          {
            sub: 'Base de Conocimientos y Catálogos de Productos Personalizados',
            desc: 'Documentos de texto, preguntas frecuentes y reglas de precios subidos al panel de Regalia para guiar las respuestas de la IA y los modismos regionales (por ejemplo, activación de javanés o jerga juvenil).'
          }
        ]
      },
      {
        heading: '2. Aislamiento Estricto de Datos y Almacenamiento Local en SQLite',
        p: 'A diferencia de las interfaces de chat de IA públicas, Regalia opera bajo un estricto aislamiento por inquilino empresarial. Todas las configuraciones del cliente, las claves de acceso y los registros de conversaciones se cifran y almacenan localmente en una base de datos SQLite aislada (`regalia.db`). Garantizamos que:',
        list: [
          'Los números de teléfono de los clientes finales y los historiales de chat están estrictamente particionados por ID de empresa (`client_id`).',
          'Ningún dato de interacción de clientes se vende, comparte o transfiere jamás a intermediarios publicitarios de terceros.',
          'Su base de conocimientos (`knowledge_base`) solo es accesible durante las solicitudes de inferencia que se originan específicamente en su número de teléfono de WhatsApp autorizado.'
        ]
      },
      {
        heading: '3. Procesamiento mediante Modelos de IA Google Gemini',
        p: 'Para generar respuestas inteligentes en lenguaje natural, el texto de los mensajes entrantes se procesa utilizando los grandes modelos de lenguaje Gemini de Google DeepMind (`gemini-2.5-flash` / `gemini-3.1-pro`). Todas las llamadas de inferencia utilizan puntos de conexión de API empresariales protegidos por Transport Layer Security (TLS 1.3). Según nuestros acuerdos empresariales con Google Cloud, los datos transmitidos para la inferencia están estrictamente aislados y no se retienen para el reentrenamiento de modelos base públicos.'
      },
      {
        heading: '4. Retención de Datos y Gestión del Ciclo de Vida',
        p: 'Conservamos los registros de conversaciones y los registros de eventos de webhooks únicamente mientras su empresa mantenga una suscripción activa (`is_active = 1`). Al desactivar o cancelar la cuenta, todos los tokens de acceso de WhatsApp, las entradas de la base de conocimientos y los historiales de interacción con los clientes pueden ser eliminados permanentemente previa solicitud, de acuerdo con las normativas de protección de datos aplicables.'
      },
      {
        heading: '5. Sus Derechos y Opciones',
        p: 'Como administrador de la plataforma Regalia, usted mantiene la soberanía completa sobre sus datos:',
        list: [
          'Desactivación del agente: Puede cambiar el estado a `is_active = 0` al instante desde el panel de control para detener todo el procesamiento automatizado de mensajes por IA.',
          'Revocación de credenciales: Puede actualizar o eliminar sus tokens de acceso de Meta (`wa_access_token`) directamente desde el panel de configuración en cualquier momento.',
          'Exportación y eliminación: Tiene derecho a solicitar una exportación completa de su partición de cliente en `regalia.db` o solicitar la supresión inmediata de su historial de conversaciones.'
        ]
      },
      {
        heading: '6. Información de Contacto',
        p: 'Si tiene alguna consulta sobre esta Política de Privacidad, nuestra arquitectura de cifrado SQLite o nuestros protocolos de cumplimiento de la API de WhatsApp Business, póngase en contacto con nuestro equipo de cumplimiento de privacidad en privacy@regalia.ai.'
      }
    ]
  },
  pt: {
    title: 'Política de Privacidade',
    effective: 'Em vigor a partir de 16 de julho de 2026 · Plataforma SaaS de Agente WhatsApp Regalia AI',
    previousVersion: 'Versão anterior',
    intro: 'A Regalia AI ("nós", "nosso" ou "nos") é uma empresa de automação de IA empresarial especializada em sistemas de atendimento ao cliente autônomos, confiáveis e direcionáveis para o WhatsApp Business. Esta Política de Privacidade detalha como nossa plataforma coleta, usa, criptografa e isola dados pessoais quando você interage com nosso portal, painel de controle e endpoints do agente de IA.',
    sections: [
      {
        heading: '1. Coleta de Dados Pessoais e Empresariais',
        p: 'Quando sua empresa se conecta ao painel SaaS da Regalia, coletamos e processamos dados em três categorias distintas:',
        items: [
          {
            sub: 'Credenciais de Conta Fornecidas Diretamente',
            desc: 'Informações fornecidas durante o cadastro, incluindo o nome da sua empresa (`nama_bisnis`), o ID do número de telefone do WhatsApp (`wa_phone_number_id`) e os Tokens de Acesso Meta (`wa_access_token`).'
          },
          {
            sub: 'Payloads Automatizados de Webhook do WhatsApp',
            desc: 'Mensagens de clientes transmitidas para nossos endpoints FastAPI (`port 8000`) via webhooks oficiais da Meta. Esses payloads contêm números de telefone do remetente, carimbos de data/hora e conteúdos de mensagens estritamente necessários para gerar respostas contextuais de IA.'
          },
          {
            sub: 'Base de Conhecimento e Catálogos de Produtos Personalizados',
            desc: 'Documentos de texto, perguntas frequentes e regras de preços de produtos enviados ao painel da Regalia para orientar as respostas da IA e os dialetos regionais (ex.: ativação de dialeto javanês ou gírias/slang).'
          }
        ]
      },
      {
        heading: '2. Isolamento Estrito de Dados e Armazenamento Local em SQLite',
        p: 'Diferente das interfaces públicas de chat com IA, a Regalia opera com base no isolamento estrito de inquilinos de dados corporativos. Todas as configurações dos clientes, chaves de acesso e registros de conversas são criptografados e armazenados localmente em banco SQLite isolado (`regalia.db`). Garantimos que:',
        list: [
          'Os números de telefone dos clientes finais e históricos de conversas são estritamente particionados pelo ID da empresa (`client_id`).',
          'Nenhum dado de interação do cliente é vendido, compartilhado ou transferido para corretores de publicidade terceirizados.',
          'Sua base de conhecimento (`knowledge_base`) é acessível apenas durante solicitações de inferência que se originam especificamente do seu número de telefone WhatsApp autorizado.'
        ]
      },
      {
        heading: '3. Processamento por Modelos de IA Google Gemini',
        p: 'Para gerar respostas inteligentes e em linguagem natural, o texto das mensagens recebidas é processado usando os grandes modelos de linguagem Gemini da Google DeepMind (`gemini-2.5-flash` / `gemini-3.1-pro`). Todas as chamadas de inferência utilizam endpoints de API corporativos protegidos por Transport Layer Security (TLS 1.3). De acordo com nossos contratos empresariais com o Google Cloud, os dados transmitidos para inferência são estritamente isolados e não são mantidos para retreinamento de modelos de fundação públicos.'
      },
      {
        heading: '4. Retenção de Dados e Gerenciamento do Ciclo de Vida',
        p: 'Mantemos registros de conversas e logs de eventos de webhook apenas enquanto sua empresa mantiver uma assinatura ativa (`is_active = 1`). Após a desativação ou encerramento da conta, todos os tokens de acesso associados, entradas da base de conhecimento e históricos de conversas com clientes podem ser permanentemente excluídos mediante solicitação, em conformidade com as regulamentações aplicáveis de proteção de dados.'
      },
      {
        heading: '5. Seus Direitos e Escolhas',
        p: 'Como administrador da plataforma Regalia, você mantém total soberania sobre os seus dados:',
        list: [
          'Desativação do Agente: Você pode alterar o status para `is_active = 0` instantaneamente no painel para interromper todo o processamento automatizado de mensagens de IA.',
          'Revogação de Credenciais: Você pode atualizar ou excluir seus Tokens de Acesso Meta (`wa_access_token`) diretamente no painel de configurações a qualquer momento.',
          'Exportação e Exclusão: Você tem o direito de solicitar uma exportação completa da sua partição de cliente no `regalia.db` ou solicitar a exclusão imediata de todo o seu histórico de logs de conversas.'
        ]
      },
      {
        heading: '6. Informações de Contato',
        p: 'Se você tiver dúvidas sobre esta Política de Privacidade, nossa arquitetura de criptografia SQLite ou nossos protocolos de conformidade com a API do WhatsApp Business, entre em contato com nossa equipe de privacidade em privacy@regalia.ai.'
      }
    ]
  },
  ko: {
    title: '개인정보 처리방침',
    effective: '시행일: 2026년 7월 16일 · Regalia AI WhatsApp 에이전트 SaaS 플랫폼',
    previousVersion: '이전 버전',
    intro: 'Regalia AI("당사" 또는 "회사")는 WhatsApp Business를 위한 자율적이고 신뢰할 수 있으며 제어 가능한 고객 서비스 시스템을 전문으로 하는 엔터프라이즈 AI 자동화 기업입니다. 본 개인정보 처리방침은 귀하가 당사의 포털, 대시보드 및 AI 에이전트 엔드포인트와 상호 작용할 때 당사 플랫폼이 개인 데이터를 수집, 사용, 암호화 및 격리하는 방법을 상세히 설명합니다.',
    sections: [
      {
        heading: '1. 개인 및 비즈니스 데이터 수집',
        p: '귀하의 비즈니스가 Regalia SaaS 대시보드에 연결될 때 당사는 다음 세 가지 주요 범주의 데이터를 수집하고 처리합니다:',
        items: [
          {
            sub: '직접 제공한 계정 자격 증명',
            desc: '온보딩 시 귀하가 제공하는 정보로, 비즈니스명(`nama_bisnis`), WhatsApp 전화번호 ID(`wa_phone_number_id`) 및 Meta 액세스 토큰(`wa_access_token`)을 포함합니다.'
          },
          {
            sub: '자동화된 WhatsApp 웹훅 페이로드',
            desc: '공식 Meta 웹훅을 통해 당사의 FastAPI 엔드포인트(`port 8000`)로 전송되는 고객 메시지입니다. 이 페이로드에는 발신자 전화번호, 타임스탬프 및 문맥적 AI 응답을 생성하는 데 반드시 필요한 메시지 내용이 포함됩니다.'
          },
          {
            sub: '사용자 지정 지식 기반(Knowledge Base) 및 제품 카탈로그',
            desc: 'AI 응답 및 지역 사투리(예: 자바어 또는 십대 은어 설정)를 안내하기 위해 Regalia 대시보드에 업로드된 텍스트 문서, FAQ 및 제품 가격 규칙입니다.'
          }
        ]
      },
      {
        heading: '2. 철저한 데이터 격리 및 로컬 SQLite 저장소',
        p: '일반적인 공개 AI 채팅 인터페이스와 달리 Regalia는 엄격한 엔터프라이즈 데이터 테넌시 격리 원칙에 따라 운영됩니다. 모든 클라이언트 구성, 액세스 키 및 대화 로그는 암호화되어 로컬의 분리된 SQLite 저장소(`regalia.db`)에 안전하게 보관됩니다. 당사는 다음을 보장합니다:',
        list: [
          '최종 고객의 전화번호 및 채팅 기록은 비즈니스 ID(`client_id`)별로 완벽하게 분리되어 보관됩니다.',
          '어떠한 고객 상호 작용 데이터도 제3자 광고 브로커에게 판매, 공유 또는 양도되지 않습니다.',
          '귀하의 맞춤형 지식 기반(`knowledge_base`)은 귀하의 승인된 WhatsApp 전화번호 ID에서 발생하는 인퍼런스(추론) 요청 중에만 독점적으로 액세스됩니다.'
        ]
      },
      {
        heading: '3. Google Gemini AI 모델 처리',
        p: '지능적이고 자연스러운 언어 응답을 생성하기 위해 수신된 메시지 텍스트는 Google DeepMind의 대형 언어 모델(`gemini-2.5-flash` / `gemini-3.1-pro`)을 사용하여 처리됩니다. 모든 인퍼런스 호출은 전송 계층 보안(TLS 1.3)으로 보호되는 엔터프라이즈 API 엔드포인트를 사용합니다. Google Cloud 엔터프라이즈 계약에 따라 인퍼런스를 위해 전송되는 데이터는 엄격히 격리되며 공개 파운데이션 모델 재학습 목적으로 저장되지 않습니다.'
      },
      {
        heading: '4. 데이터 보유 및 수명 주기 관리',
        p: '당사는 귀하의 비즈니스가 활성 구독 상태(`is_active = 1`)를 유지하는 동안에만 대화 기록 및 웹훅 이벤트 로그를 보관합니다. 계정 비활성화 또는 종료 시, 관련 WhatsApp 액세스 토큰, 지식 기반 항목 및 고객 상호 작용 로그는 관련 데이터 보호 법규에 따라 요청 즉시 영구적으로 파기됩니다.'
      },
      {
        heading: '5. 귀하의 권리와 제어 옵션',
        p: 'Regalia 플랫폼 관리자로서 귀하는 귀하의 데이터에 대한 완전한 통제권을 유지합니다:',
        list: [
          '에이전트 비활성화: 대시보드에서 즉시 `is_active = 0`으로 전환하여 모든 자동화된 AI 메시지 처리를 중지할 수 있습니다.',
          '자격 증명 철회: 언제든지 설정 패널에서 Meta 액세스 토큰(`wa_access_token`)을 직접 업데이트하거나 삭제할 수 있습니다.',
          '내보내기 및 삭제: 귀하는 `regalia.db` 클라이언트 파티션의 전체 내보내기를 요청하거나 과거 채팅 기록의 즉각적인 영구 삭제를 요구할 권리가 있습니다.'
        ]
      },
      {
        heading: '6. 연락처 정보',
        p: '본 개인정보 처리방침, SQLite 암호화 아키텍처 또는 WhatsApp Business API 준수 프로토콜과 관련하여 문의 사항이 있는 경우 당사의 개인정보 보호 규정 준수 팀(privacy@regalia.ai)으로 연락해 주시기 바랍니다.'
      }
    ]
  },
  hi: {
    title: 'गोपनीयता नीति',
    effective: 'प्रभावी तिथि: 16 जुलाई 2026 · Regalia AI WhatsApp एजेंट SaaS प्लेटफ़ॉर्म',
    previousVersion: 'पिछला संस्करण',
    intro: 'Regalia AI ("हम," "हमारा," या "हमें") एक एंटरप्राइज़ AI ऑटोमेशन कंपनी है जो WhatsApp Business के लिए स्वायत्त, विश्वसनीय और नियंत्रण योग्य ग्राहक सेवा प्रणालियों में विशेषज्ञता रखती है। यह गोपनीयता नीति बताती है कि जब आप हमारे पोर्टल, डैशबोर्ड और AI एजेंट एंडपॉइंट्स के साथ इंटरैक्ट करते हैं तो हमारा प्लेटफ़ॉर्म व्यक्तिगत डेटा को कैसे एकत्र, उपयोग, एन्क्रिप्ट और अलग (isolate) करता है।',
    sections: [
      {
        heading: '1. व्यक्तिगत और व्यावसायिक डेटा का संग्रह',
        p: 'जब आपका व्यवसाय Regalia SaaS डैशबोर्ड से जुड़ता है, तो हम तीन मुख्य श्रेणियों में डेटा एकत्र और संसाधित करते हैं:',
        items: [
          {
            sub: 'सीधे प्रदान किए गए खाता क्रेडेंशियल',
            desc: 'ऑनबोर्डिंग के दौरान आपके द्वारा प्रदान की गई जानकारी, जिसमें आपके व्यवसाय का नाम (`nama_bisnis`), WhatsApp फ़ोन नंबर ID (`wa_phone_number_id`), और Meta एक्सेस टोकन (`wa_access_token`) शामिल हैं।'
          },
          {
            sub: 'स्वचालित WhatsApp वेबहुक पेलोड',
            desc: 'आधिकारिक Meta वेबहुक के माध्यम से हमारे FastAPI एंडपॉइंट्स (`port 8000`) पर प्रेषित ग्राहक संदेश। इन पेलोड में प्रेषक के फ़ोन नंबर, टाइमस्टैम्प और संदेश सामग्री शामिल होती है जो प्रासंगिक AI उत्तर उत्पन्न करने के लिए आवश्यक है।'
          },
          {
            sub: 'कस्टम नॉलेज बेस और उत्पाद कैटलॉग',
            desc: 'AI प्रतिक्रियाओं और क्षेत्रीय बोलियों (जैसे जावानीस या स्लैंग टॉगल) को निर्देशित करने के लिए Regalia डैशबोर्ड पर अपलोड किए गए पाठ दस्तावेज़, अक्सर पूछे जाने वाले प्रश्न (FAQs) और उत्पाद मूल्य निर्धारण नियम।'
          }
        ]
      },
      {
        heading: '2. सख्त डेटा अलगाव और स्थानीय SQLite संग्रहण',
        p: 'सार्वजनिक AI चैट इंटरफेस के विपरीत, Regalia सख्त एंटरप्राइज़ डेटा टेनेंसी अलगाव पर काम करता है। सभी क्लाइंट कॉन्फ़िगरेशन, एक्सेस कुंजियाँ और वार्तालाप लॉग एन्क्रिप्ट किए जाते हैं और स्थानीय रूप से पृथक SQLite संग्रहण (`regalia.db`) में सुरक्षित रखे जाते हैं। हम गारंटी देते हैं कि:',
        list: [
          'अंतिम ग्राहकों के फ़ोन नंबर और चैट लॉग को व्यावसायिक ID (`client_id`) के आधार पर पूरी तरह से अलग रखा जाता है।',
          'कोई भी ग्राहक इंटरैक्शन डेटा कभी भी तीसरे पक्ष के विज्ञापन दलालों को बेचा, साझा या स्थानांतरित नहीं किया जाता है।',
          'आपका कस्टम नॉलेज बेस (`knowledge_base`) केवल उन अनुमान (inference) अनुरोधों के दौरान सुलभ होता है जो विशेष रूप से आपके अधिकृत WhatsApp फ़ोन नंबर ID से उत्पन्न होते हैं।'
        ]
      },
      {
        heading: '3. Google Gemini AI मॉडल प्रसंस्करण',
        p: 'बुद्धिमान और प्राकृतिक भाषा उत्तर उत्पन्न करने के लिए, आने वाले संदेश पाठ को Google DeepMind के बड़े भाषा मॉडल (`gemini-2.5-flash` / `gemini-3.1-pro`) का उपयोग करके संसाधित किया जाता है। सभी अनुमान कॉल ट्रांसपोर्ट लेयर सुरक्षा (TLS 1.3) द्वारा संरक्षित एंटरप्राइज़ API एंडपॉइंट का उपयोग करते हैं। हमारे Google Cloud एंटरप्राइज़ समझौतों के तहत, अनुमान के लिए प्रेषित डेटा पूरी तरह से अलग रहता है और इसे सार्वजनिक फ़ाउंडेशन मॉडल के पुनर्प्रशिक्षण के लिए सहेजा नहीं जाता है।'
      },
      {
        heading: '4. डेटा प्रतिधारण और जीवनचक्र प्रबंधन',
        p: 'हम वार्तालाप रिकॉर्ड और वेबहुक ईवेंट लॉग केवल तब तक बनाए रखते हैं जब तक आपका व्यवसाय एक सक्रिय सदस्यता (`is_active = 1`) बनाए रखता है। खाता निष्क्रिय होने या समाप्त होने पर, सभी संबद्ध WhatsApp एक्सेस टोकन, नॉलेज बेस प्रविष्टियाँ और ग्राहक इंटरैक्शन लॉग लागू डेटा संरक्षण नियमों के अनुसार अनुरोध पर स्थायी रूप से हटाए जा सकते हैं।'
      },
      {
        heading: '5. आपके अधिकार और विकल्प',
        p: 'एक Regalia प्लेटफ़ॉर्म व्यवस्थापक के रूप में, आप अपने डेटा पर पूर्ण संप्रभुता बनाए रखते हैं:',
        list: [
          'एजेंट निष्क्रियता: आप सभी स्वचालित AI संदेश प्रसंस्करण को रोकने के लिए डैशबोर्ड से तुरंत `is_active = 0` टॉगल कर सकते हैं।',
          'क्रेडेंशियल निरस्तीकरण: आप किसी भी समय सेटिंग पैनल से सीधे अपने Meta एक्सेस टोकन (`wa_access_token`) को अपडेट या हटा सकते हैं।',
          'निर्यात और विलोपन: आपको अपने `regalia.db` क्लाइंट विभाजन के संपूर्ण निर्यात का अनुरोध करने या अपने ऐतिहासिक चैट लॉग को तुरंत मिटाने का अधिकार है।'
        ]
      },
      {
        heading: '6. संपर्क जानकारी',
        p: 'यदि आपके पास इस गोपनीयता नीति, हमारी SQLite एन्क्रिप्शन वास्तुकला, या हमारे WhatsApp Business API अनुपालन प्रोटोकॉल के संबंध में कोई प्रश्न हैं, तो कृपया हमारी गोपनीयता अनुपालन टीम से privacy@regalia.ai पर संपर्क करें।'
      }
    ]
  },
  ja: {
    title: 'プライバシーポリシー',
    effective: '発効日: 2026年7月16日 · Regalia AI WhatsAppエージェントSaaSプラットフォーム',
    previousVersion: '以前のバージョン',
    intro: 'Regalia AI（「当社」）は、WhatsApp Business向けの自律型で信頼性が高く、制御可能なカスタマーサービスシステムを専門とするエンタープライズAI自動化企業です。本プライバシーポリシーでは、お客様が当社のポータル、ダッシュボード、およびAIエージェントのエンドポイントを利用する際に、当社プラットフォームが個人データをどのように収集、利用、暗号化、および分離（アイソレート）するかについて詳しく説明します。',
    sections: [
      {
        heading: '1. 個人データおよびビジネスデータの収集',
        p: 'お客様のビジネスがRegalia SaaSダッシュボードに接続すると、当社は次の3つの主要なカテゴリーのデータを収集および処理します：',
        items: [
          {
            sub: '直接提供されるアカウント認証情報',
            desc: 'オンボーディング時に提供される情報（ビジネス名 `nama_bisnis`、WhatsApp電話番号ID `wa_phone_number_id`、およびMetaアクセストークン `wa_access_token` を含みます）。'
          },
          {
            sub: '自動化されたWhatsApp Webhookペイロード',
            desc: '公式のMeta Webhookを介して当社のFastAPIエンドポイント（`port 8000`）に送信される顧客メッセージです。これらのペイロードには、文脈に即したAI応答を生成するために厳密に必要な送信者の電話番号、タイムスタンプ、メッセージ内容が含まれます。'
          },
          {
            sub: '独自のナレッジベースおよび製品カタログ',
            desc: 'AI応答および地域の方言（例：ジャワ語やスラングのトグル機能）を誘導するためにRegaliaダッシュボードにアップロードされたテキスト文書、FAQ、および製品価格ルールです。'
          }
        ]
      },
      {
        heading: '2. 厳格なデータ分離とローカルSQLiteストレージ',
        p: '一般的な公開AIチャットインターフェースとは異なり、Regaliaは厳格なエンタープライズデータテナント分離の原則に基づき運用されています。すべてのクライアント設定、アクセスキー、および会話ログは暗号化され、ローカルで隔離されたSQLiteストレージ（`regalia.db`）に安全に保管されます。当社は以下を保証します：',
        list: [
          'エンドユーザーの電話番号とチャットログは、ビジネスID（`client_id`）ごとに厳密に区画化されています。',
          '顧客対応データが第三者の広告ブローカーに販売、共有、または譲渡されることは一切ありません。',
          'お客様のナレッジベース（`knowledge_base`）は、承認されたWhatsApp電話番号IDから発信された推論リクエスト時にのみ排他的にアクセスされます。'
        ]
      },
      {
        heading: '3. Google Gemini AIモデルによる推論処理',
        p: '高度で自然な対話応答を生成するため、受信したメッセージテキストはGoogle DeepMindの大規模言語モデル（`gemini-2.5-flash` / `gemini-3.1-pro`）を使用して処理されます。すべての推論呼び出しには、トランスポートレイヤーセキュリティ（TLS 1.3）で保護されたエンタープライズAPIエンドポイントが使用されます。Google Cloudのエンタープライズ契約に基づき、推論のために送信されたデータは厳格に分離され、公開基盤モデルの再学習目的で保持されることはありません。'
      },
      {
        heading: '4. データの保持およびライフサイクル管理',
        p: '当社は、お客様のビジネスがアクティブなサブスクリプション状態（`is_active = 1`）を維持している期間にのみ、会話記録とWebhookイベントログを保持します。アカウントの無効化または解約時には、関連するすべてのWhatsAppアクセストークン、ナレッジベース項目、および顧客対応ログを、適用されるデータ保護法規に従って要求に基づき完全に消去できます。'
      },
      {
        heading: '5. お客様の権利と選択肢',
        p: 'Regaliaプラットフォームの管理者として、お客様は自社のデータに対する完全な管理権を保持します：',
        list: [
          'エージェントの無効化：ダッシュボードから即座に `is_active = 0` に切り替えて、自動化されたAIメッセージ処理をすべて停止できます。',
          '認証情報の失効：設定パネルからいつでも直接Metaアクセストークン（`wa_access_token`）を更新または削除できます。',
          'エクスポートおよび削除：お客様は、自身の `regalia.db` クライアントパーティションの完全なエクスポートを請求する権利、または過去のチャットログの即時完全削除を要求する権利を有します。'
        ]
      },
      {
        heading: '6. お問い合わせ先',
        p: '本プライバシーポリシー、当社のSQLite暗号化アーキテクチャ、またはWhatsApp Business API準拠プロトコルに関するご質問がある場合は、当社のプライバシーコンプライアンスチーム（privacy@regalia.ai）までお問い合わせください。'
      }
    ]
  }
};
