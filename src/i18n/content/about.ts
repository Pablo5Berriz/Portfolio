export const about = {
  fr: {
    title: 'À propos',
    bio: [
      "Je suis Paul Quentin Ondoa, développeur full-stack diplômé en développement web et mobile du Collège Multihexa (Chicoutimi). Je conçois des interfaces claires côté frontend et des systèmes fiables et sécurisés côté backend.",
      "Sur SLG Tech, j'ai corrigé 8 vulnérabilités critiques identifiées lors d'un audit de sécurité et migré le stockage de données de fichiers JSON vers PostgreSQL. Sur Garage Auto Gonzague, j'ai construit un CRM de facturation (Next.js, Prisma, PostgreSQL) avec calcul automatique des taxes et traitement des données clients conforme à la Loi 25.",
      "Mon stack principal : HTML, CSS, JavaScript/TypeScript, Next.js, React, React Native, Node.js, PHP, C#/ASP.NET, ainsi que MySQL, PostgreSQL et MongoDB côté données.",
      "Je m'intéresse à la conception de systèmes d'orchestration multi-agents IA pour la livraison logicielle — gates de validation, mécanismes anti-auto-validation et permissions strictes entre agents — une approche que j'applique notamment sur Logigest.",
    ],
    educationTitle: 'Éducation',
    education: [
      {
        institution: 'Collège Multihexa, Chicoutimi',
        period: 'Septembre 2022 – Mai 2024',
        program: 'Programmation Web et Mobile',
        logo: '/images/education/multihexa.jpg',
      },
      {
        institution: 'EMICA, Montréal',
        period: 'Août 2022 – Janvier 2023',
        program: "Création d'entreprise",
        logo: '/images/education/emica.jpg',
      },
      {
        institution: 'Université de Douala, Douala',
        period: 'Octobre 2013 – Août 2016',
        program: 'Sociologie économique',
        logo: '/images/education/university.jpg',
      },
      {
        institution: 'Université de Douala, Douala',
        period: 'Octobre 2009 – Août 2012',
        program: 'Droit',
        logo: '/images/education/university.jpg',
      },
    ],
    certificationsTitle: 'Certifications',
    certifications: [
      {
        name: 'Bootcamp complet en développement web',
        issuer: 'Udemy',
        date: 'Janvier 2024',
        logo: '/images/education/udemy.png',
      },
    ],
  },
  en: {
    title: 'About',
    bio: [
      "I'm Paul Quentin Ondoa, a full-stack developer trained in web and mobile development at Collège Multihexa (Chicoutimi). I design clear frontend interfaces and reliable, secure backend systems.",
      "On SLG Tech, I fixed 8 critical vulnerabilities found during a security audit and migrated data storage from JSON files to PostgreSQL. On Garage Auto Gonzague, I built a billing CRM (Next.js, Prisma, PostgreSQL) with automated tax calculation and customer data handling compliant with Quebec's Law 25.",
      'My core stack: HTML, CSS, JavaScript/TypeScript, Next.js, React, React Native, Node.js, PHP, C#/ASP.NET, plus MySQL, PostgreSQL and MongoDB for data.',
      "I focus on designing multi-agent AI orchestration systems for software delivery — validation gates, anti-self-approval mechanisms, and strict permissions between agents — an approach I apply notably on Logigest.",
    ],
    educationTitle: 'Education',
    education: [
      {
        institution: 'Collège Multihexa, Chicoutimi',
        period: 'September 2022 – May 2024',
        program: 'Web and Mobile Programming',
        logo: '/images/education/multihexa.jpg',
      },
      {
        institution: 'EMICA, Montreal',
        period: 'August 2022 – January 2023',
        program: 'Business creation',
        logo: '/images/education/emica.jpg',
      },
      {
        institution: 'University of Douala, Douala',
        period: 'October 2013 – August 2016',
        program: 'Economic sociology',
        logo: '/images/education/university.jpg',
      },
      {
        institution: 'University of Douala, Douala',
        period: 'October 2009 – August 2012',
        program: 'Law',
        logo: '/images/education/university.jpg',
      },
    ],
    certificationsTitle: 'Certifications',
    certifications: [
      {
        name: 'Complete Web Development Bootcamp',
        issuer: 'Udemy',
        date: 'January 2024',
        logo: '/images/education/udemy.png',
      },
    ],
  },
} as const;
