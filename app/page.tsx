'use client';

import React, { useRef } from 'react';
import { Github, Linkedin, Mail, MapPin, ExternalLink } from 'lucide-react';
import Image from 'next/image';

type Job = {
  role: string
  org: string
  period: string
  bullets: string[]
}

const EXPERIENCE: Job[] = [
  {
    role: 'Tutor',
    org: 'Universidad Peruana de Ciencias Aplicadas',
    period: '04/2026 - Actualidad',
    bullets: [
      'Lidero tutorías en ciberseguridad con énfasis en pentesting y seguridad ofensiva.',
      'Planifico y ejecuto actividades prácticas en entornos reales de laboratorio (Hack The Box).',
      'Fomento el aprendizaje colaborativo y el desarrollo de habilidades técnicas en los participantes.',
    ],
  },
  {
    role: 'Desarrollador Trainee',
    org: 'Consorcio Cueva',
    period: '07/2025 - 10/2025',
    bullets: [
      'PoC para MINED World con Bitdefender GravityZone Business Security Enterprise (XDR), evaluando detección y gestión.',
      'Diseñé encuestas de Cultura Organizacional en Seguridad de la Información alineada a ISO/IEC 27001.',
      'Soporte interno e implementación de código en módulos específicos del backend.',
    ],
  },
]
const EXPERIENCE_VISIBLE = 2

type Project = {
  title: string
  desc: string
  tech: string | string[]
  link: string
}

const PROJECTS: Project[] = [
  {
    title: 'PoC de Vulnerabilidad en Mailcow (CVE-2025-25198)',
    desc: 'Desarrollo de una prueba de concepto para validar una vulnerabilidad de Host Header Poisoning en Mailcow, explotando el flujo de restablecimiento de contraseña mediante la manipulación del encabezado Host. Implementé manejo de sesión y tokens CSRF, soporte HTTPS/HTTP2 y automatización del proceso de verificación en entornos de prueba controlados.',
    tech: 'Python',
    link: 'https://github.com/Groppoxx/CVE-2025-25198-PoC.git',
  },
  {
    title: 'Gestor de Perfiles OpenVPN (VPN-Manager)',
    desc: 'Desarrollo de una herramienta CLI en Python para organizar y gestionar perfiles OpenVPN en entornos Linux, orientada a plataformas de laboratorio como Hack The Box y TryHackMe. Implementé importación y organización automática de perfiles, deduplicación basada en hash, sanitización de configuraciones y un flujo interactivo de conexión, desconexión y monitoreo de estado mediante OpenVPN en modo daemon.',
    tech: 'Python',
    link: 'https://github.com/Groppoxx/VPN-Manager.git',
  },
  {
    title: 'OverPwnZ (YouTube) – Clases Gratuitas de Hacking Ético y Ciberseguridad',
    desc: 'Participación y apoyo en el desarrollo de un canal educativo perteneciente al equipo competitivo del grupo de estudio OverPwnZ. El proyecto está orientado a compartir conocimiento y guiar a estudiantes que buscan dar sus primeros pasos en el mundo del hacking ético. Se publican clases gratuitas y contenido práctico tanto de seguridad ofensiva como defensiva, incluyendo temas como Red Team, explotación de vulnerabilidades, CTFs y análisis Blue Team.',
    tech: ['YouTube', 'Community Project'],
    link: 'https://www.youtube.com/@OverPwnZ',
  },
]
const PROJECTS_VISIBLE = 3

type CtfEntry = {
  name: string
  subtitle: string
  year: string
}

const CTF_ENTRIES: CtfEntry[] = [
  { name: 'Cyber Apocalypse CTF: The Salt Crown', subtitle: 'Team • 5th place', year: '2026' },
  { name: 'Season VI US Cyber Open Competitive CTF - US Cyber Games', subtitle: 'Individual • 1st place', year: '2026' },
  { name: 'Hack4u CTF', subtitle: 'Individual • 13th place', year: '2026' },
  { name: 'Copa América de Ciberseguridad - Organization of American States (OAS)', subtitle: 'Team • 14th place', year: '2026' },
  { name: 'VulnCorp CTF - INE Security', subtitle: 'Individual • 21st place', year: '2026' },
  { name: 'CTF de Fluid Attacks - Reto LATAM', subtitle: 'Individual • 20th place', year: '2026' },
  { name: 'University CTF: Tinsel Trouble', subtitle: 'Team • 18th place', year: '2025' },
  { name: 'The Last Hack The World - API Query Security Challenge', subtitle: 'Individual • 3rd place', year: '2025' },
  { name: 'PERÚHACK CTF', subtitle: 'Individual • 1st place', year: '2025' },
  { name: 'Black Alpaca CTF', subtitle: 'Team • 5th place', year: '2025' },
  { name: 'CCCTF', subtitle: 'Team • 6th place', year: '2025' },
  { name: 'CTF CAUC', subtitle: 'Individual • 1st place', year: '2025' },
  { name: 'RootWars', subtitle: 'Individual • 9th place', year: '2025' },
  { name: 'Hack The Boo: The Hollowing of Caer Wyrrd', subtitle: 'Individual • 8th place', year: '2025' },
  { name: 'Kaspersky {ctf}', subtitle: 'Team • 9th place • América', year: '2025' },
  { name: 'TheWeekendHack CTF', subtitle: 'Team • 1st place', year: '2025' },
  { name: 'CiberSec UNASAM CTF', subtitle: 'Individual • 1st place', year: '2025' },
  { name: 'World Wide CTF', subtitle: 'Team • 19th place', year: '2025' },
  { name: 'Cyber Apocalypse CTF: Tales from Eldorian', subtitle: 'Team • 51st place • MVP', year: '2025' },
  { name: 'Duelo de Sedes UPC', subtitle: 'Team • 1st place', year: '2024' },
]
const CTF_VISIBLE = 7

export default function Portfolio() {
  const ctfScrollYRef = useRef<number | null>(null);
  const experienceScrollYRef = useRef<number | null>(null);
  const projectsScrollYRef = useRef<number | null>(null);

  const makeDetailsToggleHandler = (scrollRef: React.MutableRefObject<number | null>) =>
    (event: React.SyntheticEvent<HTMLDetailsElement>) => {
      const target = event.currentTarget
      if (target.open) {
        scrollRef.current = window.scrollY
        requestAnimationFrame(() => {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        })
        return
      }

      if (scrollRef.current !== null) {
        window.scrollTo({ top: scrollRef.current, behavior: 'smooth' })
      }
    }

  const handleCtfToggle = makeDetailsToggleHandler(ctfScrollYRef)
  const handleExperienceToggle = makeDetailsToggleHandler(experienceScrollYRef)
  const handleProjectsToggle = makeDetailsToggleHandler(projectsScrollYRef)

  const renderJob = (job: Job, idx: number) => (
    <div key={idx} className="bg-card cyber-card border border-border rounded-2xl p-6 hover:border-accent/50 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-sm font-bold text-accent cyber-title">{job.role}</h3>
          <p className="text-xs text-muted-foreground">{job.org}</p>
        </div>
        <span className="text-xs text-secondary cyber-accent-alt">{job.period}</span>
      </div>
      <ul className="text-xs text-muted-foreground space-y-1">
        {job.bullets.map((bullet) => (
          <li key={bullet}>• {bullet}</li>
        ))}
      </ul>
    </div>
  )

  const renderCtf = (entry: CtfEntry, idx: number) => (
    <div key={idx} className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="font-semibold">{entry.name}</p>
        <p className="text-xs text-muted-foreground">{entry.subtitle}</p>
      </div>
      <span className="text-xs cyber-accent-alt">{entry.year}</span>
    </div>
  )

  const renderProject = (project: Project, idx: number) => (
    <div key={idx} className="bg-card cyber-card border border-border rounded-2xl p-4 hover:border-accent/50 transition-colors flex gap-4">
      <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center cyber-kicker">
        <span className="text-xs font-bold">PRJ</span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-sm mb-1 cyber-title">{project.title}</h3>
        <p className="text-xs text-muted-foreground mb-2">{project.desc}</p>
        <div className="flex flex-wrap gap-2">
          {(Array.isArray(project.tech) ? project.tech : [project.tech]).map((tech) => (
            <span key={`${project.title}-${tech}`} className="text-xs px-2 py-1 rounded cyber-chip">
              {tech}
            </span>
          ))}
        </div>
      </div>
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 text-accent hover:text-accent/70 transition-colors"
      >
        <ExternalLink className="w-4 h-4" />
      </a>
    </div>
  )

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto">
          {/* Top Bento Grid - Profile + Interests */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {/* Profile Card - Large */}
            <div className="md:col-span-2 bg-card cyber-card border border-border rounded-2xl p-6 md:p-8">
              <div className="flex gap-6 mb-6">
                <div className="flex-shrink-0">
                  <div className="w-24 h-30 md:w-28 md:h-30 rounded-2xl overflow-hidden border border-border">
                    <Image
                      src="/profile.jpg"
                      alt="Iam Alvarez Orellana"
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold mb-1 cyber-title">
                    Iam Alvarez Orellana
                  </h1>
                  <p className="text-muted-foreground text-sm mb-3">Instructor de Ciberseguridad Ofensiva - HxPloit UPC</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Estudiante de 9° ciclo de Ciencias de la Computación en la Universidad Peruana de Ciencias Aplicadas (UPC), perteneciente al décimo superior, con un enfoque sólido en Ciberseguridad ofensiva. Me mantengo activo en Hack The Box, donde he resuelto más de 70 máquinas, y en competencias de Capture The Flag (CTF) tanto individuales como en equipo, enfrentando escenarios reales de explotación, análisis de vulnerabilidades y pentesting, fortaleciendo mi pensamiento crítico, disciplina técnica y la resolución de problemas en entornos adversos.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <a
                      href="mailto:iam_alvarez_orellana@hotmail.com"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-accent/40 text-accent hover:bg-accent/10 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      Contáctame
                    </a>
                    <a
                      href="https://www.linkedin.com/in/iam-anthony-marcelo-alvarez-orellana/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-accent/40 text-accent hover:bg-accent/10 transition-colors"
                    >
                      <Linkedin className="w-3.5 h-3.5" />
                      LinkedIn
                    </a>
                    <a
                      href="https://github.com/Groppoxx"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border border-accent/40 text-accent hover:bg-accent/10 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5" />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Interests Card */}
            <div className="bg-card cyber-card border border-border rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide cyber-title">
                <span className="cyber-accent">{'>>'}</span>{' '}
                <span className="text-foreground">Intereses</span>
              </h2>
              <div className="space-y-3">
                {[
                  'Penetration Testing',
                  'Red Teaming',
                  'Vulnerability Research',
                  'Security Architecture',
                  'Digital Forensics & Incident Response',
                  'Blue Teaming'
                ].map((interest) => (
                  <span key={interest} className="inline-block px-3 py-1 rounded-full text-xs mr-2 mb-2 cyber-chip">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Experience - full width, scales independently */}
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide cyber-title">
              <span className="cyber-accent">{'>>'}</span>{' '}
              <span className="text-foreground">Experiencia Profesional</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {EXPERIENCE.slice(0, EXPERIENCE_VISIBLE).map(renderJob)}
            </div>
            {EXPERIENCE.length > EXPERIENCE_VISIBLE && (
              <details className="group flex flex-col gap-4 mt-4" onToggle={handleExperienceToggle}>
                <summary className="order-1 group-open:order-2 cursor-pointer text-xs text-accent hover:text-accent/70 transition-colors">
                  <span className="group-open:hidden">Ver más</span>
                  <span className="hidden group-open:inline">Ver menos</span>
                </summary>
                <div className="order-2 group-open:order-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {EXPERIENCE.slice(EXPERIENCE_VISIBLE).map(renderJob)}
                </div>
              </details>
            )}
          </div>

          {/* Education + Details Grid - both fixed-size, safe to pair */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Education Card */}
            <div className="bg-card cyber-card border border-border rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide cyber-title">
                <span className="cyber-accent">{'>>'}</span>{' '}
                <span className="text-foreground">Educación y Certificaciones</span>
              </h2>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-accent/40 bg-accent/10 p-1">
                      <Image src="/upc.png" alt="UPC" width={32} height={32} className="h-full w-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1 cyber-accent">
                        <a
                          href="https://www.linkedin.com/in/iam-anthony-marcelo-alvarez-orellana/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent/70 transition-colors"
                        >
                          Ciencias de la Computación
                        </a>
                      </h3>
                      <p className="text-xs text-muted-foreground">Universidad Peruana de Ciencias Aplicadas (UPC)</p>
                    </div>
                  </div>
                  <span className="text-xs cyber-accent-alt">2026</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-accent/40 bg-accent/10 p-1">
                      <Image src="/ejptv2.png" alt="ejptv2" width={32} height={32} className="h-full w-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1 cyber-accent">
                        <a
                          href="https://certs.ine.com/c9cfb0f0-f136-46d0-9935-a9df394e6bbb#acc.aLSB86lr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent/70 transition-colors"
                        >
                          eJPTv2
                        </a>
                      </h3>
                      <p className="text-xs text-muted-foreground">Junior Penetration Tester • INE Security</p>
                    </div>
                  </div>
                  <span className="text-xs cyber-accent-alt">2025</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-accent/40 bg-accent/10 p-1">
                      <Image src="/pt1.png" alt="pt1" width={32} height={32} className="h-full w-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1 cyber-accent">
                        <a
                          href="https://assets.tryhackme.com/certification-certificate/68a0c9cb32d2db60f647af68.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent/70 transition-colors"
                        >
                          PT1
                        </a>
                      </h3>
                      <p className="text-xs text-muted-foreground">Junior Penetration Tester • TryHackMe</p>
                    </div>
                  </div>
                  <span className="text-xs cyber-accent-alt">2025</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-accent/40 bg-accent/10 p-1">
                      <Image src="/dante.png" alt="dante" width={32} height={32} className="h-full w-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1 cyber-accent">
                        <a
                          href="https://drive.google.com/file/d/1IKts4XQpoqTlL9NzC60BHt8GVX5lGYMd/view?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent/70 transition-colors"
                        >
                          Dante
                        </a>
                      </h3>
                      <p className="text-xs text-muted-foreground">Pro Lab: Dante • Hack The Box</p>
                    </div>
                  </div>
                  <span className="text-xs cyber-accent-alt">2025</span>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-accent/40 bg-accent/10 p-1">
                      <Image src="/crta.png" alt="crta" width={32} height={32} className="h-full w-full object-contain" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm mb-1 cyber-accent">
                        <a
                          href="https://labs.cyberwarfare.live/credential/achievement/69a8d48a22199ce9033141b9"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent/70 transition-colors"
                        >
                          CRTA
                        </a>
                      </h3>
                      <p className="text-xs text-muted-foreground">Certified Red Team Analyst • CyberWarfare Labs (CWL)</p>
                    </div>
                  </div>
                  <span className="text-xs cyber-accent-alt">2026</span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-card cyber-card border border-border rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wide cyber-title">
                <span className="cyber-accent">{'>>'}</span>{' '}
                <span className="text-foreground">Detalles</span>
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Idiomas</p>
                  <p className="font-semibold">Español (Nativo), Inglés (Avanzado), Portugués (Básico)</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <a href="mailto:iam_alvarez_orellana@hotmail.com" className="font-semibold text-accent hover:text-accent/70 transition-colors text-sm">
                    iam_alvarez_orellana@hotmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Rol Objetivo</p>
                  <p className="font-semibold">Practicante / Junior</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Labs Resueltos</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded cyber-chip">Hack The Box: 70</span>
                    <span className="text-xs px-2 py-1 rounded cyber-chip">TryHackMe: 109</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Ubicación</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <p className="font-semibold">Lima, Perú</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Disponibilidad</p>
                  <p className="font-semibold text-accent text-sm">Disponible para trabajar</p>
                </div>
              </div>
            </div>
          </div>

          {/* Languages & Frameworks + Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Languages & Frameworks */}
            <div className="bg-card cyber-card border border-border rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide cyber-title">
                <span className="cyber-accent">{'>>'}</span>{' '}
                <span className="text-foreground">Lenguajes y Frameworks</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                {['Microsoft Office', 'Python', 'Bash', 'JavaScript', 'C++', 'SQL'].map((lang) => (
                  <span key={lang} className="px-3 py-2 rounded-lg text-xs font-semibold cyber-chip">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools & Platforms */}
            <div className="bg-card cyber-card border border-border rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide cyber-title">
                <span className="cyber-accent">{'>>'}</span>{' '}
                <span className="text-foreground">Herramientas y Plataformas</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                {['Burp Suite', 'Metasploit', 'Kali Linux', 'Wireshark', 'Nmap', 'Docker'].map((tool) => (
                  <span key={tool} className="px-3 py-2 rounded-lg text-xs font-semibold cyber-chip">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Projects - full width, scales independently */}
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide cyber-title">
              <span className="cyber-accent">{'>>'}</span>{' '}
              <span className="text-foreground">Proyectos</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROJECTS.slice(0, PROJECTS_VISIBLE).map(renderProject)}
            </div>
            {PROJECTS.length > PROJECTS_VISIBLE && (
              <details className="group flex flex-col gap-4 mt-4" onToggle={handleProjectsToggle}>
                <summary className="order-1 group-open:order-2 cursor-pointer text-xs text-accent hover:text-accent/70 transition-colors">
                  <span className="group-open:hidden">Ver más</span>
                  <span className="hidden group-open:inline">Ver menos</span>
                </summary>
                <div className="order-2 group-open:order-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PROJECTS.slice(PROJECTS_VISIBLE).map(renderProject)}
                </div>
              </details>
            )}
          </div>

          {/* CTF Participation */}
          <div className="mt-4">
            <div className="bg-card cyber-card border border-border rounded-2xl p-6">
              <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide cyber-title">
                <span className="cyber-accent">{'>>'}</span>{' '}
                <span className="text-foreground">Participación en CTF</span>
              </h2>
              <div className="space-y-3">
                {CTF_ENTRIES.slice(0, CTF_VISIBLE).map(renderCtf)}
                {CTF_ENTRIES.length > CTF_VISIBLE && (
                  <details className="group flex flex-col gap-3" onToggle={handleCtfToggle}>
                    <summary className="order-1 group-open:order-2 cursor-pointer text-xs text-accent hover:text-accent/70 transition-colors">
                      <span className="group-open:hidden">Ver más</span>
                      <span className="hidden group-open:inline">Ver menos</span>
                    </summary>
                    <div className="order-2 group-open:order-1 space-y-3">
                      {CTF_ENTRIES.slice(CTF_VISIBLE).map(renderCtf)}
                    </div>
                  </details>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4 mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Portfolio Links */}
            <div>
              <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-4 cyber-title">
                <span className="cyber-accent">{'>>'}</span>{' '}
                <span className="text-foreground">Portafolio</span>
              </h4>
              <div className="flex gap-6">
                <a href="https://blogiamalvarez.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/70 transition-colors flex items-center gap-2 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  <span>Blog</span>
                </a>
                <a href="https://app.hackthebox.com/public/users/1924991" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/70 transition-colors flex items-center gap-2 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  <span>HackTheBox</span>
                </a>
                <a href="https://tryhackme.com/p/Maizeravla" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/70 transition-colors flex items-center gap-2 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  <span>TryHackMe</span>
                </a>
              </div>
            </div>

            {/* Footer Details */}
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-2">© 2026 Iam Alvarez Orellana</p>
              <p className="text-xs text-muted-foreground">Hecho con precisión y pasión por la seguridad</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
