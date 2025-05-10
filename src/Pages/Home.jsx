import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
  ArrowRight,
  Code,
  Database,
  Layout,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Memoized Components
const StatusBadge = memo(() => (
  <div
    className="inline-block animate-float lg:mx-0"
    data-aos="zoom-in"
    data-aos-delay="400"
  >
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full blur opacity-30 group-hover:opacity-70 transition duration-700 group-hover:duration-200"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-violet-300 animate-pulse" />
          <span className="relative">
            <span className="absolute -inset-1 bg-violet-500/20 blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative">Ready to Innovate</span>
          </span>
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-violet-100 to-fuchsia-200 bg-clip-text text-transparent">
          Web
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-clip-text text-transparent">
          Developer
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech, category, icon: Icon }) => (
  <div className="px-4 py-2 hidden sm:flex items-center gap-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/20">
    <Icon className="w-4 h-4 text-violet-400" />
    <span className="text-violet-300 font-medium">{category}: </span>
    {tech}
  </div>
));
TechStack.displayName = "TechStack";

const CTAButton = memo(({ href, text, icon: Icon, primary = false }) => (
  <a href={href} className="block">
    <button className="group relative w-[170px]">
      <div
        className={`absolute -inset-0.5 ${
          primary
            ? "bg-gradient-to-r from-violet-600 to-fuchsia-600"
            : "bg-gradient-to-r from-gray-600 to-gray-800"
        } rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700 animate-pulse group-hover:animate-none`}
      ></div>
      <div
        className={`relative h-12 ${
          primary ? "bg-[#030014]" : "bg-[#030014]"
        } backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden`}
      >
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span
            className={`${
              primary
                ? "bg-gradient-to-r from-gray-100 to-white"
                : "bg-gradient-to-r from-gray-300 to-gray-100"
            } bg-clip-text text-transparent font-medium z-10`}
          >
            {text}
          </span>
          <Icon
            className={`w-4 h-4 text-gray-200 transform transition-all duration-300 z-10 ${
              primary ? "group-hover:translate-x-1" : "group-hover:rotate-45"
            }`}
          />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl blur opacity-20 group-hover:opacity-60 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300 group-hover:scale-110">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = [
  "Information Technology Student",
  "Tech Enthusiast",
  "Creative Developer",
];
const TECH_STACK = [
  {
    tech: "ReactJS, React Native, Next.js, Tailwind, MUI and ShadcnUI",
    category: "Front-end",
    icon: Layout,
  },
  {
    tech: "Node.js, Express, Spring Boot and Laravel",
    category: "Back-end",
    icon: Code,
  },
  {
    tech: "MongoDB, MySQL, Firebase and Redis",
    category: "Database",
    icon: Database,
  },
];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/LQT2201" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/lqtoan2201" },
  { icon: Instagram, link: "https://www.instagram.com/lqtoan_2201" },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
        duration: 800,
        easing: "ease-out-cubic",
      });
    };

    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Lottie configuration
  const lottieOptions = {
    src: "https://lottie.host/58753882-bb6a-49f5-a2c0-950eda1e135a/NLbpVqGegK.lottie",
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
      progressiveLoad: true,
    },
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${
      isHovering
        ? "scale-[180%] sm:scale-[160%] md:scale-[150%] lg:scale-[145%] rotate-2"
        : "scale-[175%] sm:scale-[155%] md:scale-[145%] lg:scale-[140%]"
    }`,
  };

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden" id="Home">
      {/* Background gradient orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-violet-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[250px] h-[250px] bg-fuchsia-600/20 rounded-full blur-[100px] animate-pulse-slow animation-delay-2000"></div>
      </div>

      {/* Noise texture overlay */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')] opacity-30 pointer-events-none"></div>

      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-[5%] sm:px-6 lg:px-[0%] min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-center h-screen md:justify-between gap-0 sm:gap-12 lg:gap-20">
            {/* Left Column */}
            <div
              className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
              data-aos="fade-right"
              data-aos-delay="200"
              style={{
                transform: `translate(${mousePosition.x * -0.2}px, ${
                  mousePosition.y * -0.2
                }px)`,
                transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
            >
              <div className="space-y-4 sm:space-y-6">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div
                  className="h-8 flex items-center"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-violet-500 to-fuchsia-500 ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p
                  className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light"
                  data-aos="fade-up"
                  data-aos-delay="1000"
                >
                  Creating <span className="text-violet-300">innovative</span>,{" "}
                  <span className="text-fuchsia-300">functional</span> and{" "}
                  <span className="text-violet-300">user-friendly</span>{" "}
                  websites and mobile apps for digital solutions that make an
                  impact.
                </p>

                {/* Tech Stack */}
                <div
                  className="flex flex-wrap gap-3 justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1200"
                >
                  {TECH_STACK.map((item, index) => (
                    <TechStack
                      key={index}
                      tech={item.tech}
                      category={item.category}
                      icon={item.icon}
                    />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div
                  className="flex flex-row gap-4 w-full justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1400"
                >
                  <CTAButton
                    href="#Portofolio"
                    text="Projects"
                    icon={ExternalLink}
                  />
                  <CTAButton
                    href="#Contact"
                    text="Contact"
                    icon={ArrowRight}
                    primary={true}
                  />
                </div>

                {/* Social Links */}
                <div
                  className="hidden sm:flex gap-4 justify-start"
                  data-aos="fade-up"
                  data-aos-delay="1600"
                >
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Optimized Lottie Animation */}
            <div
              className="w-full py-[10%] sm:py-0 lg:w-1/2 h-auto lg:h-[600px] xl:h-[750px] relative flex items-center justify-center order-2 lg:order-2 mt-8 lg:mt-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600"
              style={{
                transform: `translate(${mousePosition.x * 0.3}px, ${
                  mousePosition.y * 0.3
                }px)`,
                transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
            >
              <div className="relative w-full opacity-90">
                {/* Animated background elements */}
                <div className="absolute w-20 h-20 bg-violet-500/10 rounded-full blur-xl top-1/4 left-1/4 animate-float"></div>
                <div className="absolute w-32 h-32 bg-fuchsia-500/10 rounded-full blur-xl bottom-1/4 right-1/4 animate-float animation-delay-2000"></div>

                <div
                  className={`absolute inset-0 bg-gradient-to-r from-violet-600/10 to-fuchsia-600/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                    isHovering ? "opacity-70 scale-105" : "opacity-30 scale-100"
                  }`}
                ></div>

                <div
                  className={`relative z-10 w-full opacity-90 transform transition-transform duration-500 ${
                    isHovering ? "scale-105" : "scale-100"
                  }`}
                >
                  <DotLottieReact {...lottieOptions} />
                </div>

                <div
                  className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                    isHovering ? "opacity-70" : "opacity-30"
                  }`}
                >
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                      isHovering ? "scale-110" : "scale-100"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
