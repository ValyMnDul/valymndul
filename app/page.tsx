"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

type Certificate = {
  id: string;
  imageId: string;
  src: string;
  alt: string;
  title: string;
  description: string;
};

type Project = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  accentColor: string;
  repo: string;
  explore: string;
};

type Skill = {
  name: string;
  icon: string;
  level: number;
  barColor: string;
};

const certificates: Certificate[] = [
  {
    id: "1",
    imageId: "c1",
    src: "/Certificates/cybersecurity.png",
    alt: "Cybersecurity",
    title: "Cybersecurity",
    description: "Proud to have earned a Mention at the Cybersecurity Olympiad by \"Spiru Haret\" National College.",
  },
  {
    id: "2",
    imageId: "c2",
    src: "/Certificates/heighborhood.png",
    alt: "Neighborhood",
    title: "Neighborhood",
    description: "The certificate offered by Hack Club for the Neighborhood program.",
  },
  {
    id: "3",
    imageId: "c3",
    src: "/Certificates/infoeducatia.png",
    alt: "InfoEducatia",
    title: "InfoEducatia",
    description: "Participated in the County Stage of the InfoEducatia National Olympiad of Informatics.",
  },
  {
    id: "4",
    imageId: "c4",
    src: "/Certificates/hackovina.png",
    alt: "Hackovina",
    title: "Hackovina",
    description: "Thrilled to have won 1st place at Hackovina, a hackathon organized by Hack Club!",
  },
  {
    id: "5",
    imageId: "c5",
    src: "/Certificates/summer.png",
    alt: "Summer School",
    title: "Summer School 2025",
    description: "2nd place - 2025 Summer School competition, \"Spiru Haret\" National College of Informatics.",
  },
];

const projects: Project[] = [
  {
    title: "RiseBit",
    description: "RiseBit is a modern social media platform that transforms how people share, interact, and build communities online.",
    image: "/Projects/RiseBit.gif",
    imageAlt: "MNDList",
    accentColor: "#AD0097",
    repo: "https://github.com/ValyMnDul/risebit",
    explore: "https://risebit.valymnd.me",
  },
  {
    title: "Deskify",
    description: "Deskify is a web app that simulates a simple desktop OS with apps like Notes, Calculator, Settings, and Clock.",
    image: "/Projects/Deskify.gif",
    imageAlt: "Deskify",
    accentColor: "rgb(119, 119, 119)",
    repo: "https://github.com/ValyMnDul/Deskify",
    explore: "https://deskify.valymnd.me/",
  },
  {
    title: "Cubic Cube",
    description: "Cubic Cube is a minimalist Unity platformer where you guide a cube through obstacles to defeat the enemy at each level.",
    image: "/Projects/CubicCube.gif",
    imageAlt: "Cubic Cube",
    accentColor: "orange",
    repo: "https://github.com/ValyMnDul/Cubic-Cube",
    explore: "https://valymnd-bot.itch.io/cubic-cube/devlog/933688/cubic-cube",
  },
  {
    title: "MNDCode",
    description: "MNDCode is an interactive platform that teaches programming step by step through engaging lessons and practical exercises.",
    image: "/Projects/mndcode.gif",
    imageAlt: "MNDCode",
    accentColor: "#2070a9",
    repo: "https://github.com/ValyMnDul/MNDCode",
    explore: "https://mndcode.valymnd.hackclub.app/",
  },
];

const skills: Skill[] = [
  { name: "Next.js", icon: "/Skills/nextjs.png", level: 99, barColor: "var(--accent)" },
  { name: "Tailwind", icon: "/Skills/tailwind.png", level: 80, barColor: "#e6683c" },
  { name: "HTML", icon: "/Skills/html.png", level: 97, barColor: "#ff2727" },
  { name: "CSS", icon: "/Skills/css.png", level: 99, barColor: "var(--accent)" },
  { name: "Javascript", icon: "/Skills/javascript.png", level: 87, barColor: "#f7df1e" },
  { name: "Cybersecurity", icon: "/Skills/cybersecurity.png", level: 87, barColor: "var(--accent)" },
  { name: "C++", icon: "/Skills/cpp.png", level: 99, barColor: "#00599C" },
  { name: "Python", icon: "/Skills/python.png", level: 82, barColor: "#3776AB" },
  { name: "GIT", icon: "/Skills/git.png", level: 90, barColor: "#F05032" },
];

export default function Home() {
  const certificateDivRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [scrollValue, setScrollValue] = useState(true);
  const [focusValue, setFocusValue] = useState(false);
  const [formStatus, setFormStatus] = useState("");
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = window.localStorage.getItem("theme");
      if (savedTheme === "light" || savedTheme === "dark") {
        return savedTheme;
      }
    }
    return "dark";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const checkEdges = useCallback(() => {
    if (!certificateDivRef.current) return;
    const maxScrollLeft = certificateDivRef.current.scrollWidth - certificateDivRef.current.clientWidth;
    if (certificateDivRef.current.scrollLeft >= maxScrollLeft - 5) {
      certificateDivRef.current.scrollTo({ left: 0, behavior: "smooth" });
    }
  }, []);

  const setCarouselInterval = useCallback(() => {
    intervalRef.current = setInterval(() => {
      setScrollValue(false);
      if (certificateDivRef.current) {
        certificateDivRef.current.scrollBy({ left: 371, behavior: "smooth" });
        checkEdges();
      }
      setTimeout(() => setScrollValue(true), 500);
    }, 5000);
  }, [checkEdges]);

  useEffect(() => {
    setCarouselInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [setCarouselInterval]);

  const leftArrowClick = (direction: number) => {
    if (scrollValue && certificateDivRef.current) {
      certificateDivRef.current.scrollBy({ left: direction * 371, behavior: "smooth" });
      checkEdges();
      setTimeout(() => setScrollValue(true), 500);
      setScrollValue(false);
    }
  };

  const focusCertificate = (input: string) => {
    const image = document.getElementById(input);
    if (!focusValue) {
      setTimeout(() => {
        image?.requestFullscreen().catch((err) => console.error(err));
      }, 80);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else if (document.fullscreenElement) {
      setTimeout(() => {
        document.exitFullscreen().catch((err) => console.error(err));
      }, 80);
      setCarouselInterval();
    }
    setFocusValue((prev) => !prev);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xqalobyn", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (response.ok) {
        setFormStatus("Message sent successfully!");
        form.reset();
      } else {
        setFormStatus("An error occurred. Please try again.");
      }
    } catch {
      setFormStatus("An error occurred. Please try again.");
    }
    window.setTimeout(() => setFormStatus(""), 3000);
  };

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <>
      <div id="body" />
      <div onClick={() => scrollToSection("body")} className="staticHomeBtn" aria-label="Scroll to top">
        <i className="fa-solid fa-arrow-up"></i>
      </div>

      <nav className="desktop-nav">
        <div className="photo">
          <Image src="/me.png" alt="Logo" width={320} height={320} priority />
          <h1>Vasile Mîndrilă</h1>
        </div>

        <div className="navLinks">
          <button onClick={() => scrollToSection("body")}>
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </button>
          <button onClick={() => scrollToSection("about")}>
            <i className="fa-solid fa-user"></i>
            <span>About</span>
          </button>
          <button onClick={() => scrollToSection("skills")}>
            <i className="fa-solid fa-graduation-cap"></i>
            <span>Skills</span>
          </button>
          <button onClick={() => scrollToSection("certificates")}>
            <i className="fa-solid fa-stamp"></i>
            <span>Certificates</span>
          </button>
          <button onClick={() => scrollToSection("projects")}>
            <i className="fa-solid fa-code-branch"></i>
            <span>Projects</span>
          </button>
          <button onClick={() => scrollToSection("team")}>
            <i className="fa-solid fa-users"></i>
            <span>Team</span>
          </button>
          <button onClick={() => scrollToSection("contact")}>
            <i className="fa-solid fa-address-card"></i>
            <span>Contact</span>
          </button>
        </div>

        <div className="options">
          <div className="resume-btn" onClick={() => window.open("/CV.pdf", "_blank")}>
            <i className="fa-solid fa-file"></i>
            <span>Get CV</span>
          </div>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <i className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
          </button>
        </div>
      </nav>

      <main>
        <div className="mobileNav">
          <button onClick={() => scrollToSection("contact")}>Contact</button>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
            <i className={`fa-solid ${theme === "dark" ? "fa-sun" : "fa-moon"}`}></i>
          </button>
          <a href="/CV.pdf" download>Get CV</a>
        </div>

        <section id="home">
          <div className="home-content">
            <h2>Hey,</h2>
            <h1>I&apos;m Vasile.</h1>
            <Image className="mobile-avatar" src="/me.png" alt="Vasile Mîndrilă" width={250} height={250} priority />
            <p>Driven by a deep passion for technology <br className="hide-mobile" /> and continuous learning in the digital world.</p>
            <button className="scroll-down-btn" onClick={() => scrollToSection("about")} aria-label="Scroll down">
              <i className="fa-solid fa-arrow-down"></i>
            </button>
          </div>
        </section>

        <section id="about">
          <div className="section-container">
            <h2 className="section-title">About Me</h2>
            <div className="about-content">
              <div className="about-text">
                <p>
                  My full name is <span className="highlight">Vasile Valentin Mîndrilă</span>.<br /><br />
                  I am a committed Full Stack developer with a strong enthusiasm for technology and programming. I am pursuing a degree in Computer Science and continuously strive to expand my expertise in software development. I regularly take part in hackathons and coding contests, constantly seeking new opportunities to grow. My goal is to build innovative solutions that make a meaningful and positive difference in the world.
                </p>
                <div className="social-icons row-socials">
                  <i onClick={() => window.open("https://github.com/ValyMnDul", "_blank")} className="fa-brands fa-github"></i>
                  <i onClick={() => window.open("https://linkedin.com/in/vasilemindrila", "_blank")} className="fa-brands fa-linkedin linkedin-icon"></i>
                  <i onClick={() => window.open("https://www.instagram.com/valymnd/", "_blank")} className="fa-brands fa-instagram insta-icon"></i>
                </div>
              </div>
              <div className="school-card" onClick={() => window.open("https://www.cni-sv.ro/", "_blank")}>
                <h3>Current School</h3>
                <Image src="/cni.png" alt="cni" width={250} height={180} />
                <p>&quot;Spiru Haret&quot; <br /> National College of Informatics</p>
              </div>
            </div>
          </div>
        </section>

        <section id="skills">
          <div className="section-container">
            <h2 className="section-title">Skills</h2>
            <div className="skills-grid">
              {skills.map((skill) => (
                <div key={skill.name} className="skill-card">
                  <div className="skill-info">
                    <Image src={skill.icon} alt={skill.name} width={70} height={70} className="skill-icon" />
                    <p>{skill.name}</p>
                  </div>
                  <div className="skill-bar-container">
                    <div className="bar-track">
                      <div className="bar-fill" style={{ height: `${skill.level}%`, backgroundColor: skill.barColor }}></div>
                    </div>
                    <p>{skill.level}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="certificates">
          <div className="section-container">
            <h2 className="section-title">Certificates</h2>
            <div className="carousel-wrapper">
              <div ref={certificateDivRef} className="certificates-carousel">
                {certificates.map((cert) => (
                  <div key={cert.id} id={cert.id} className="certificate-card" onClick={() => focusCertificate(cert.imageId)}>
                    <div className="cert-image-wrapper">
                      <Image id={cert.imageId} src={cert.src} alt={cert.alt} width={320} height={220} />
                    </div>
                    <h3>{cert.title}</h3>
                    <p>{cert.description}</p>
                  </div>
                ))}
              </div>
              <div className="carousel-controls">
                <button onClick={() => leftArrowClick(-1)} aria-label="Previous"><i className="fa-solid fa-arrow-left"></i></button>
                <div className="dots">
                  {certificates.map((_, i) => <span key={i} onClick={() => scrollToSection(certificates[i].id)}></span>)}
                </div>
                <button onClick={() => leftArrowClick(1)} aria-label="Next"><i className="fa-solid fa-arrow-right"></i></button>
              </div>
            </div>
          </div>
        </section>

        <section id="projects">
          <div className="section-container">
            <h2 className="section-title">Projects</h2>
            <div className="projects-grid">
              {projects.map((project) => (
                <div key={project.title} className="project-card" style={{ borderRight: `5px solid ${project.accentColor}` }}>
                  <div className="project-image">
                    <Image src={project.image} alt={project.imageAlt} width={500} height={280} unoptimized />
                  </div>
                  <div className="project-meta">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="project-actions">
                      <button className="btn-primary" onClick={() => window.open(project.repo, "_blank")}>Repository</button>
                      <button className="btn-secondary" onClick={() => window.open(project.explore, "_blank")}>Explore</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="team">
          <div className="section-container">
            <h2 className="section-title">Team</h2>
            <div className="team-panel" onClick={() => window.open("https://ping.suceavahacks.org/", "_blank")}>
              <div className="team-cover">
                <Image src="/SuceavaHacksIco.png" alt="SuceavaHacks" width={120} height={120} className="team-logo" />
              </div>
              <div className="team-body">
                <div className="team-info">
                  <p>
                    A student-led tech community based in Suceava, <span className="highlight-ro">Ro</span><span className="highlight-ma">man</span><span className="highlight-ia">ia</span>. We create spaces for high schoolers to learn, build, and connect through technology.
                  </p>
                </div>
                <div className="team-actions">
                  <button className="btn-github" onClick={(e) => { e.stopPropagation(); window.open("https://github.com/suceavahacks", "_blank"); }}>GitHub</button>
                  <button className="btn-linkedin" onClick={(e) => { e.stopPropagation(); window.open("https://www.linkedin.com/company/suceavahacks", "_blank"); }}>LinkedIn</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div className="section-container">
            <h2 className="section-title">Contact</h2>
            <div className="contact-wrapper">
              <div className="form-card">
                <form id="contact-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" required maxLength={70} placeholder="Your Name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" required maxLength={70} placeholder="Your Email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea name="message" required maxLength={1000} placeholder="Tell me your Message"></textarea>
                  </div>
                  <button type="submit" className="submit-btn">Send Message</button>
                </form>
                {formStatus && <p className="form-status">{formStatus}</p>}
              </div>
            </div>

            <footer className="footer">
              <div className="footer-socials">
                <i onClick={() => window.open("https://www.instagram.com/valymnd/", "_blank")} className="fa-brands fa-instagram insta-icon"></i>
                <i onClick={() => window.open("https://github.com/ValyMnDul", "_blank")} className="fa-brands fa-github"></i>
                <i onClick={() => window.open("https://www.linkedin.com/in/vasilemindrila/", "_blank")} className="fa-brands fa-linkedin linkedin-icon"></i>
              </div>
              <div className="footer-divider"></div>
              <div className="footer-contact">
                <i onClick={() => { window.location.href = "mailto:mindrilavasilevalentin@gmail.com"; }} className="fa-solid fa-envelope" title="Email"></i>
                <i onClick={() => window.open("/phone", "_blank")} className="fa-solid fa-phone" title="Phone"></i>
                <i onClick={() => window.open("/location", "_blank")} className="fa-solid fa-location-dot" title="Location"></i>
              </div>
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}