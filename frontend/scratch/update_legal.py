import os
import re

for doc in ['PrivacyPolicyPage.jsx', 'TermsOfServicePage.jsx']:
    p = os.path.join(r"c:\Users\GC\Downloads\OneDrive\Desktop\Agent AI CS\frontend\src\components\Legal", doc)
    with open(p, 'r', encoding='utf-8') as f:
        c = f.read()

    # Import useGlobalContext
    if "useGlobalContext" not in c:
        c = c.replace("import React, { useState } from 'react';", "import React from 'react';\nimport { useGlobalContext } from '../../App';")
        
        # Replace local state with global context
        c = re.sub(
            r'const \[language, setLanguage\] = useState\([^)]*\);',
            'const { language, changeLanguage: setLanguage } = useGlobalContext();',
            c
        )
        
        with open(p, 'w', encoding='utf-8') as f:
            f.write(c)

print("Updated Legal documents.")
