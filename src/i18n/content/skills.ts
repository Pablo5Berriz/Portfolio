export interface SkillCategory {
  title: string;
  skills: { name: string; icon: string }[];
}

export const skills = {
  fr: {
    title: 'Compétences',
    lede: 'Technologies et outils utilisés sur des projets réels, listés dans les études de cas.',
    categories: [
      {
        title: 'Développement web et mobile',
        skills: [
          { name: 'HTML5', icon: 'simple-icons:html5' },
          { name: 'CSS3', icon: 'simple-icons:css3' },
          { name: 'JavaScript', icon: 'simple-icons:javascript' },
          { name: 'TypeScript', icon: 'simple-icons:typescript' },
          { name: 'Next.js', icon: 'simple-icons:nextdotjs' },
          { name: 'React', icon: 'simple-icons:react' },
          { name: 'React Native', icon: 'simple-icons:react' },
          { name: 'Node.js', icon: 'simple-icons:nodedotjs' },
          { name: 'PHP', icon: 'simple-icons:php' },
          { name: 'Python', icon: 'simple-icons:python' },
          { name: 'C#', icon: 'simple-icons:csharp' },
          { name: 'ASP.NET', icon: 'simple-icons:dotnet' },
          { name: 'Flutter', icon: 'simple-icons:flutter' },
          { name: 'Android', icon: 'simple-icons:android' },
        ],
      },
      {
        title: 'Bases de données',
        skills: [
          { name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
          { name: 'MySQL', icon: 'simple-icons:mysql' },
          { name: 'MongoDB', icon: 'simple-icons:mongodb' },
          { name: 'SQL Server', icon: 'lucide:database' },
        ],
      },
      {
        title: 'Infrastructure & outils',
        skills: [
          { name: 'Proxmox', icon: 'lucide:server' },
          { name: 'Docker', icon: 'simple-icons:docker' },
          { name: 'GitHub', icon: 'simple-icons:github' },
          { name: 'GitLab', icon: 'simple-icons:gitlab' },
          { name: 'Fedora / Linux', icon: 'simple-icons:fedora' },
          { name: 'Apache', icon: 'simple-icons:apache' },
          { name: 'Visual Studio Code', icon: 'simple-icons:visualstudiocode' },
          { name: 'Jira', icon: 'simple-icons:jira' },
        ],
      },
      {
        title: 'Support technique',
        skills: [
          { name: 'Active Directory', icon: 'lucide:network' },
          { name: 'Windows Server', icon: 'lucide:server-cog' },
          { name: 'Google Workspace', icon: 'simple-icons:google' },
          { name: 'Okta', icon: 'lucide:shield-check' },
          { name: 'phpMyAdmin', icon: 'simple-icons:phpmyadmin' },
          { name: 'TeamViewer', icon: 'lucide:monitor-smartphone' },
        ],
      },
    ] as SkillCategory[],
  },
  en: {
    title: 'Skills',
    lede: 'Technologies and tools used on real projects, listed in the case studies.',
    categories: [
      {
        title: 'Web & mobile development',
        skills: [
          { name: 'HTML5', icon: 'simple-icons:html5' },
          { name: 'CSS3', icon: 'simple-icons:css3' },
          { name: 'JavaScript', icon: 'simple-icons:javascript' },
          { name: 'TypeScript', icon: 'simple-icons:typescript' },
          { name: 'Next.js', icon: 'simple-icons:nextdotjs' },
          { name: 'React', icon: 'simple-icons:react' },
          { name: 'React Native', icon: 'simple-icons:react' },
          { name: 'Node.js', icon: 'simple-icons:nodedotjs' },
          { name: 'PHP', icon: 'simple-icons:php' },
          { name: 'Python', icon: 'simple-icons:python' },
          { name: 'C#', icon: 'simple-icons:csharp' },
          { name: 'ASP.NET', icon: 'simple-icons:dotnet' },
          { name: 'Flutter', icon: 'simple-icons:flutter' },
          { name: 'Android', icon: 'simple-icons:android' },
        ],
      },
      {
        title: 'Databases',
        skills: [
          { name: 'PostgreSQL', icon: 'simple-icons:postgresql' },
          { name: 'MySQL', icon: 'simple-icons:mysql' },
          { name: 'MongoDB', icon: 'simple-icons:mongodb' },
          { name: 'SQL Server', icon: 'lucide:database' },
        ],
      },
      {
        title: 'Infrastructure & tools',
        skills: [
          { name: 'Proxmox', icon: 'lucide:server' },
          { name: 'Docker', icon: 'simple-icons:docker' },
          { name: 'GitHub', icon: 'simple-icons:github' },
          { name: 'GitLab', icon: 'simple-icons:gitlab' },
          { name: 'Fedora / Linux', icon: 'simple-icons:fedora' },
          { name: 'Apache', icon: 'simple-icons:apache' },
          { name: 'Visual Studio Code', icon: 'simple-icons:visualstudiocode' },
          { name: 'Jira', icon: 'simple-icons:jira' },
        ],
      },
      {
        title: 'Technical support',
        skills: [
          { name: 'Active Directory', icon: 'lucide:network' },
          { name: 'Windows Server', icon: 'lucide:server-cog' },
          { name: 'Google Workspace', icon: 'simple-icons:google' },
          { name: 'Okta', icon: 'lucide:shield-check' },
          { name: 'phpMyAdmin', icon: 'simple-icons:phpmyadmin' },
          { name: 'TeamViewer', icon: 'lucide:monitor-smartphone' },
        ],
      },
    ] as SkillCategory[],
  },
} as const;
