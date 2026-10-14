import { Code2, Server, Smartphone, Cloud } from 'lucide-react'
import { useTranslations } from 'next-intl'

export function TechStackSection() {
  const t = useTranslations('home.techStack')

  const techCategories = [
    {
      name: 'Frontend',
      skills: [
        'React',
        'Next.js',
        'TypeScript',
        'Vue.js',
        'Tailwind CSS',
        'Redux / Zustand',
      ],
    },
    {
      name: 'Backend',
      skills: [
        'Node.js',
        'NestJS',
        'Go',
        'Python',
        'PHP / Laravel',
        'Java / Spring',
      ],
    },
    {
      name: 'Mobile',
      skills: [
        'Flutter',
        'React Native',
        'iOS (Swift)',
        'Android (Kotlin)',
        'Firebase',
      ],
    },
    {
      name: 'Cloud & Database',
      skills: [
        'PostgreSQL',
        'MySQL',
        'MongoDB',
        'AWS',
        'Google Cloud',
        'Docker / CI/CD',
      ],
    },
  ]

  return (
    <section id="tech-stack" className="py-24 bg-slate-50/70 scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-widest text-primary uppercase">
            {t('tag')}
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold text-navy mt-2">
            {t('title')}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {techCategories.map((category) => (
            <div
              key={category.name}
              className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-primary/50 transition-shadow"
            >
              <div className="flex items-center gap-3 mb-5 pb-3 border-b border-slate-100">
                <h3 className="font-bold text-navy text-base sm:text-lg">
                  {category.name}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-lg bg-slate-100/80 hover:bg-primary/10 hover:text-primary text-slate-700 text-xs font-medium transition-colors"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
