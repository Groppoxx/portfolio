'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Mail, Github, Linkedin, MapPin, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export default function Portfolio() {
  const ctfScrollYRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioVolume = 0.1;
  const [isPlaying, setIsPlaying] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const handleCtfToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
    const target = event.currentTarget
    if (target.open) {
      ctfScrollYRef.current = window.scrollY
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      return
    }

    if (ctfScrollYRef.current !== null) {
      window.scrollTo({ top: ctfScrollYRef.current, behavior: 'smooth' })
    }
  }

  useEffect(() => {
    const handleFirstInteraction = () => {
      const audio = audioRef.current
      if (!audio) {
        return
      }

      audio.muted = false
      audio.volume = audioVolume
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
          setIsActivated(true)
        })
        .catch(() => {
          // Autoplay can still be blocked; user can use the toggle button.
        })
    }

    const options: AddEventListenerOptions = { once: true }
    document.addEventListener('click', handleFirstInteraction, options)
    document.addEventListener('keydown', handleFirstInteraction, options)

    const audio = audioRef.current
    if (audio) {
      audio.volume = audioVolume
    }

    return () => {
      document.removeEventListener('click', handleFirstInteraction)
      document.removeEventListener('keydown', handleFirstInteraction)
    }
  }, [])

  const toggleAudio = () => {
    const audio = audioRef.current
    if (!audio) {
      return
    }

    if (audio.paused) {
      audio.muted = false
      audio.volume = audioVolume
      audio
        .play()
        .then(() => {
          setIsPlaying(true)
          setIsActivated(true)
        })
        .catch(() => {
          setIsPlaying(false)
        })
      return
    }

    audio.pause()
    setIsPlaying(false)
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <audio
        ref={audioRef}
        src="/LoFI_TECH_HOUSE.webm"
        autoPlay
        muted
        loop
        preload="auto"
        onLoadedMetadata={(event) => {
          event.currentTarget.volume = audioVolume
        }}
      />
      <button
        type="button"
        onClick={toggleAudio}
        className="fixed bottom-4 right-4 z-50 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-foreground shadow-lg backdrop-blur transition-colors hover:border-accent/50"
      >
        {isPlaying ? 'Music: On' : isActivated ? 'Music: Off' : 'Enable music'}
      </button>
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
                      alt="Security Expert"
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
                  <p className="text-muted-foreground text-sm mb-3">Instructor de Ciberseguridad Ofensiva - HxPloit UPC </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Estudiante de 9° ciclo de Ciencias de la Computación en la Universidad Peruana de Ciencias Aplicadas (UPC), perteneciente al décimo superior, con un enfoque sólido en Ciberseguridad ofensiva. Me mantengo activo en Hack The Box, donde he resuelto más de 70 máquinas, y en competencias de Capture The Flag (CTF) tanto individuales como en equipo, enfrentando escenarios reales de explotación, análisis de vulnerabilidades y pentesting, fortaleciendo mi pensamiento crítico, disciplina técnica y la resolución de problemas en entornos adversos.
                  </p>
                </div>
              </div>
            </div>

            {/* Interests Card */}
            <div className="bg-card cyber-card border border-border rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide cyber-title">
                <span className="cyber-accent">{'>>'}</span>{' '}
                <span className="text-foreground">Interests</span>
              </h3>
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

          {/* Experience + Education Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Experience Cards */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide cyber-title">
                <span className="cyber-accent">{'>>'}</span>{' '}
                <span className="text-foreground">Professional Experience</span>
              </h3>
              {/* Job 1 */}
              <div className="bg-card cyber-card border border-border rounded-2xl p-6 hover:border-accent/50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-accent cyber-title">Tutor HXPLOIT</h3>
                    <p className="text-xs text-muted-foreground">Universidad Peruana de Ciencias Aplicadas</p>
                  </div>
                  <span className="text-xs text-secondary cyber-accent-alt">03/2025 - Actualidad</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Lidero tutorías en ciberseguridad con énfasis en pentesting y seguridad ofensiva.</li>
                  <li>• Planifico y ejecuté actividades prácticas en entornos reales de laboratorio (Hack The Box).</li>
                  <li>• Fomento el aprendizaje colaborativo y el desarrollo de habilidades técnicas en los participantes.</li>
                </ul>
              </div>

              {/* Job 2 */}
              <div className="bg-card cyber-card border border-border rounded-2xl p-6 hover:border-accent/50 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-sm font-bold text-accent cyber-title">Desarrollador Trainee</h3>
                    <p className="text-xs text-muted-foreground">Consorcio Cueva</p>
                  </div>
                  <span className="text-xs text-secondary cyber-accent-alt">07/2025 - 10/2025</span>
                </div>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• PoC para MINED World con Bitdefender GravityZone Business Security Enterprise (XDR), evaluando detección y gestión.</li>
                  <li>• Diseñe encuestas de Cultura Organizacional en Seguridad de la Información alineada a ISO/IEC 27001.</li>
                  <li>• Soporte interno e implementación de código en módulos específicos del backend.</li>
                </ul>
              </div>
            </div>

            {/* Education Card */}
            <div className="bg-card cyber-card border border-border rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide cyber-title">
                <span className="cyber-accent">{'>>'}</span>{' '}
                <span className="text-foreground">Education & Certifications</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex gap-3">
                    <div className="mt-1 flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-accent/40 bg-accent/10 p-1">
                      <Image src="/upc.png" alt="UPC" width={32} height={32} className="h-full w-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-1 cyber-accent">
                        <a
                          href="https://www.linkedin.com/in/iam-anthony-marcelo-alvarez-orellana/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent/70 transition-colors"
                        >
                          Ciencias de la Computación
                        </a>
                      </h4>
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
                      <h4 className="font-semibold text-sm mb-1 cyber-accent">
                        <a
                          href="https://certs.ine.com/c9cfb0f0-f136-46d0-9935-a9df394e6bbb#acc.aLSB86lr"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent/70 transition-colors"
                        >
                          eJPTv2
                        </a>
                      </h4>
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
                      <h4 className="font-semibold text-sm mb-1 cyber-accent">
                        <a
                          href="https://assets.tryhackme.com/certification-certificate/68a0c9cb32d2db60f647af68.pdf"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent/70 transition-colors"
                        >
                          PT1
                        </a>
                      </h4>
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
                      <h4 className="font-semibold text-sm mb-1 cyber-accent">
                        <a
                          href="https://drive.google.com/file/d/1IKts4XQpoqTlL9NzC60BHt8GVX5lGYMd/view?usp=sharing"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-accent/70 transition-colors"
                        >
                          Dante
                        </a>
                      </h4>
                      <p className="text-xs text-muted-foreground">Pro Lab: Dante • Hack The Box</p>
                    </div>
                  </div>
                  <span className="text-xs cyber-accent-alt">2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Languages & Frameworks + Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* Languages & Frameworks */}
            <div className="bg-card cyber-card border border-border rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide cyber-title">
                <span className="cyber-accent">{'>>'}</span>{' '}
                <span className="text-foreground">Languages & Frameworks</span>
              </h3>
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
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide cyber-title">
                <span className="cyber-accent">{'>>'}</span>{' '}
                <span className="text-foreground">Tools & Platforms</span>
              </h3>
              <div className="flex flex-wrap gap-3">
                {['Burp Suite', 'Metasploit', 'Kali Linux', 'Wireshark', 'Nmap', 'Docker'].map((tool) => (
                  <span key={tool} className="px-3 py-2 rounded-lg text-xs font-semibold cyber-chip">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Projects + Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Projects */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide cyber-title">
                <span className="cyber-accent">{'>>'}</span>{' '}
                <span className="text-foreground">Projects</span>
              </h3>
              <div className="space-y-3">
                {[
                  {
                    title: 'PoC de Vulnerabilidad en Mailcow (CVE-2025-25198)',
                    desc: 'Desarrollo de una prueba de concepto para validar una vulnerabilidad de Host Header Poisoning en Mailcow, explotando el flujo de restablecimiento de contraseña mediante la manipulación del encabezado Host. Implementé manejo de sesión y tokens CSRF, soporte HTTPS/HTTP2 y automatización del proceso de verificación en entornos de prueba controlados.',
                    tech: 'Python',
                    link: 'https://github.com/Groppoxx/CVE-2025-25198-PoC.git'
                  },
                  {
                    title: 'Gestor de Perfiles OpenVPN (VPN-Manager)',
                    desc: 'Desarrollo de una herramienta CLI en Python para organizar y gestionar perfiles OpenVPN en entornos Linux, orientada a plataformas de laboratorio como Hack The Box y TryHackMe. Implementé importación y organización automática de perfiles, deduplicación basada en hash, sanitización de configuraciones y un flujo interactivo de conexión, desconexión y monitoreo de estado mediante OpenVPN en modo daemon.',
                    tech: 'Python',
                    link: 'https://github.com/Groppoxx/VPN-Manager.git'
                  },
                  {
                    title: 'OverPwnZ (YouTube) – Clases Gratuitas de Hacking Ético y Ciberseguridad',
                    desc: 'Participación y apoyo en el desarrollo de un canal educativo perteneciente al equipo competitivo del grupo de estudio OverPwnZ. El proyecto está orientado a compartir conocimiento y guiar a estudiantes que buscan dar sus primeros pasos en el mundo del hacking ético. Se publican clases gratuitas y contenido práctico tanto de seguridad ofensiva como defensiva, incluyendo temas como Red Team, explotación de vulnerabilidades, CTFs y análisis Blue Team.',
                    tech: ['YouTube', 'Community Project'],
                    link: 'https://www.youtube.com/@OverPwnZ'
                  }
                ].map((project, idx) => (
                  <div key={idx} className="bg-card cyber-card border border-border rounded-2xl p-4 hover:border-accent/50 transition-colors flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center cyber-kicker">
                      <span className="text-xs font-bold">PRJ</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-sm mb-1 cyber-title">{project.title}</h4>
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
                ))}
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-card cyber-card border border-border rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-6 uppercase tracking-wide cyber-title">
                <span className="cyber-accent">{'>>'}</span>{' '}
                <span className="text-foreground">Details</span>
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Languages</p>
                  <p className="font-semibold">Español (Nativo), Ingles (Avanzado), Portugues (Basico)</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Email</p>
                  <a href="mailto:iam_alvarez_orellana@hotmail.com" className="font-semibold text-accent hover:text-accent/70 transition-colors text-sm">
                    iam_alvarez_orellana@hotmail.com
                  </a>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Target Role</p>
                  <p className="font-semibold">Practicante / Junior</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Labs Solved</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-2 py-1 rounded cyber-chip">Hack The Box: 70</span>
                    <span className="text-xs px-2 py-1 rounded cyber-chip">TryHackMe: 109</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-accent" />
                    <p className="font-semibold">Lima, Peru</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-2">Availability</p>
                  <p className="font-semibold text-accent text-sm">Open to work</p>
                </div>
              </div>
            </div>
          </div>

          {/* CTF Participation */}
          <div className="mt-4">
            <div className="bg-card cyber-card border border-border rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wide cyber-title">
                <span className="cyber-accent">{'>>'}</span>{' '}
                <span className="text-foreground">CTF Participation</span>
              </h3>
              <div className="space-y-3">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">CTF de Fluid Attacks - Reto LATAM</p>
                    <p className="text-xs text-muted-foreground">Individual • 20th place</p>
                  </div>
                  <span className="text-xs cyber-accent-alt">2026</span>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">University CTF: Tinsel Trouble</p>
                    <p className="text-xs text-muted-foreground">Team • 18th place</p>
                  </div>
                  <span className="text-xs cyber-accent-alt">2025</span>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">The Last Hack The World - API Query Security Challenge</p>
                    <p className="text-xs text-muted-foreground">Individual • 3rd place</p>
                  </div>
                  <span className="text-xs cyber-accent-alt">2025</span>
                </div>
                <details className="group flex flex-col" onToggle={handleCtfToggle}>
                  <summary className="order-1 group-open:order-2 cursor-pointer text-xs text-accent hover:text-accent/70 transition-colors transition-all duration-300 ease-out">
                    <span className="group-open:hidden">Show more</span>
                    <span className="hidden group-open:inline">Show less</span>
                  </summary>
                  <div className="order-2 group-open:order-1 mt-3 space-y-3 transition-all duration-300 ease-out">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">PERÚHACK</p>
                    <p className="text-xs text-muted-foreground">Individual • 1st place</p>
                  </div>
                  <span className="text-xs cyber-accent-alt">2025</span>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">Black Alpaca CTF</p>
                    <p className="text-xs text-muted-foreground">Team • 5th place</p>
                  </div>
                  <span className="text-xs cyber-accent-alt">2025</span>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">CCCTF</p>
                    <p className="text-xs text-muted-foreground">Team • 6th place</p>
                  </div>
                  <span className="text-xs cyber-accent-alt">2025</span>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">CTF CAUC</p>
                    <p className="text-xs text-muted-foreground">Individual • 1st place</p>
                  </div>
                  <span className="text-xs cyber-accent-alt">2025</span>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">RootWars</p>
                    <p className="text-xs text-muted-foreground">Individual • 9th place</p>
                  </div>
                  <span className="text-xs cyber-accent-alt">2025</span>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">Hack The Boo: The Hollowing of Caer Wyrrd</p>
                    <p className="text-xs text-muted-foreground">Individual • 8th place</p>
                  </div>
                  <span className="text-xs cyber-accent-alt">2025</span>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">Kaspersky {"{ctf}"}</p>
                    <p className="text-xs text-muted-foreground">Team • 9th place • América</p>
                  </div>
                  <span className="text-xs cyber-accent-alt">2025</span>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">TheWeekendHack CTF</p>
                    <p className="text-xs text-muted-foreground">Team • 1st place</p>
                  </div>
                  <span className="text-xs cyber-accent-alt">2025</span>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">CiberSec UNASAM CTF</p>
                    <p className="text-xs text-muted-foreground">Individual • 1st place</p>
                  </div>
                  <span className="text-xs cyber-accent-alt">2025</span>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">World Wide CTF</p>
                    <p className="text-xs text-muted-foreground">Team • 19th place</p>
                  </div>
                  <span className="text-xs cyber-accent-alt">2025</span>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">Cyber Apocalupse CTF: Tales from Eldorian</p>
                    <p className="text-xs text-muted-foreground">Team • 51st place • MVP</p>
                  </div>
                  <span className="text-xs cyber-accent-alt">2025</span>
                </div>
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="font-semibold">Duelo de Sedes UPC</p>
                    <p className="text-xs text-muted-foreground">Team • 1st place</p>
                  </div>
                  <span className="text-xs cyber-accent-alt">2024</span>
                </div>
                  </div>
                </details>
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
                <span className="text-foreground">Portfolio</span>
              </h4>
              <div className="flex gap-6">
                <a href="https://github.com/Groppoxx" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/70 transition-colors flex items-center gap-2 text-sm">
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a href="https://www.linkedin.com/in/iam-anthony-marcelo-alvarez-orellana/" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/70 transition-colors flex items-center gap-2 text-sm">
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
                <a href="https://app.hackthebox.com/public/users/1924991" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/70 transition-colors flex items-center gap-2 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  <span>Hack The Box</span>
                </a>
                <a href="https://tryhackme.com/p/Maizeravla" target="_blank" rel="noopener noreferrer" className="text-accent hover:text-accent/70 transition-colors flex items-center gap-2 text-sm">
                  <ExternalLink className="w-4 h-4" />
                  <span>TryHackMe</span>
                </a>
              </div>
            </div>

            {/* Footer Details */}
            <div className="text-right">
              <p className="text-xs text-muted-foreground mb-2">© 2026 Security Professional</p>
              <p className="text-xs text-muted-foreground">Crafted with precision and passion for security</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
