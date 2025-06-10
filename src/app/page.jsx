"use client";
import React from "react";

import { useHandleStreamResponse } from "../utilities/runtime-helpers";

("use client");

function MainComponent() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeService, setActiveService] = useState(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [streamingMessage, setStreamingMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [successStories] = useState([
    {
      title: "Correctional Facility Network Upgrade",
      description:
        "Complete transformation of correctional center infrastructure across 20+ branches with advanced security implementation.",
      service_category: "ICT Infrastructure",
      implementation_time: "8 months",
      client_name: "Department of Correctional Services",
      metrics: {
        network_uptime: "99.999%",
        cost_savings: "R1.5M annually",
        security_incidents: "Reduced by 95%",
        branches_connected: "20+",
      },
    },
    {
      title: "Smart City Platform Development",
      description:
        "Built an integrated IoT platform for real-time monitoring of city infrastructure and emergency services.",
      service_category: "Software Solutions",
      implementation_time: "12 months",
      client_name: "Metropolitan Council",
      metrics: {
        response_time: "45% faster",
        cost_reduction: "R25M saved",
        efficiency_gain: "60% improved",
        system_uptime: "99.99%",
      },
    },
    {
      title: "24/7 IT Operations Management",
      description:
        "Comprehensive IT infrastructure management and support for critical manufacturing systems.",
      service_category: "Managed Services",
      implementation_time: "Ongoing",
      client_name: "Industrial Giant",
      metrics: {
        downtime_reduction: "98%",
        resolution_time: "2.5 hours avg",
        cost_savings: "35% reduction",
        satisfaction: "92% positive",
      },
    },
    {
      title: "Digital Transformation Strategy",
      description:
        "End-to-end digital transformation strategy and implementation across all business units.",
      service_category: "Consulting & Advisory",
      implementation_time: "18 months",
      client_name: "Energy Corporation",
      metrics: {
        productivity: "75% increase",
        digital_adoption: "90% rate",
        cost_savings: "R100M identified",
        process_efficiency: "85% improved",
      },
    },
    {
      title: "Cloud Migration Project",
      description:
        "Large-scale migration of legacy systems to cloud infrastructure with zero downtime.",
      service_category: "ICT Infrastructure",
      implementation_time: "6 months",
      client_name: "Financial Services Co",
      metrics: {
        cost_reduction: "45% savings",
        performance: "200% faster",
        recovery_time: "Under 2 hours",
        scalability: "On-demand",
      },
    },
    {
      title: "Custom ERP Implementation",
      description:
        "Integrated ERP solution combining finance, HR, and supply chain with real-time analytics.",
      service_category: "Software Solutions",
      implementation_time: "14 months",
      client_name: "Manufacturing Leader",
      metrics: {
        efficiency: "85% improved",
        reporting_time: "90% faster",
        paper_reduction: "95%",
        roi_timeline: "18 months",
      },
    },
    {
      title: "Cybersecurity Enhancement",
      description:
        "Complete security infrastructure upgrade and implementation of advanced threat protection.",
      service_category: "Managed Services",
      implementation_time: "4 months",
      client_name: "Government Agency",
      metrics: {
        security_rating: "95% improvement",
        threat_detection: "Under 5 minutes",
        compliance: "100% achieved",
        incidents: "Reduced by 90%",
      },
    },
    {
      title: "IT Strategy Optimization",
      description:
        "Strategic technology roadmap development and implementation guidance.",
      service_category: "Consulting & Advisory",
      implementation_time: "3 months",
      client_name: "Retail Chain",
      metrics: {
        tech_efficiency: "65% increase",
        cost_optimization: "40% savings",
        project_delivery: "30% faster",
        user_satisfaction: "88% positive",
      },
    },
  ]);
  const [clients, setClients] = useState([
    {
      name: "GPL",
      logo: "https://ucarecdn.com/46cd3017-b64d-43f8-afc7-deb5431171d1/-/format/auto/",
    },
    {
      name: "Ethekwini Municipality",
      logo: "https://ucarecdn.com/fb49beb2-edb9-4a07-914b-e87131e4aed6/-/format/auto/",
    },
    {
      name: "Denel",
      logo: "https://ucarecdn.com/84360f79-5e87-4fdc-b21c-2769346a8a95/-/format/auto/",
    },
    {
      name: "HM Inc",
      logo: "https://ucarecdn.com/51c8e4f7-a18b-46eb-9bf3-f8f7b58a64e0/-/format/auto/",
    },
    {
      name: "Uhambo",
      logo: "https://ucarecdn.com/bb52e219-ab9f-42bd-8419-e447d5a160a1/-/format/auto/",
    },
    {
      name: "Sasol",
      logo: "https://ucarecdn.com/08490e28-b76a-46f2-8ca8-720181ebbcc8/-/format/auto/",
    },
    {
      name: "Thabure",
      logo: "https://ucarecdn.com/5eb56507-3a8b-43a3-bc81-2a64f298d57f/-/format/auto/",
    },
    {
      name: "Maredi Telecoms",
      logo: "https://ucarecdn.com/b10b4f67-1829-4c3d-80ee-dd1cb8a14d1b/-/format/auto/",
    },
    {
      name: "GGDA",
      logo: "https://ucarecdn.com/d655a2e4-f70c-4add-adb8-d7d397b6990a/-/format/auto/",
    },
    {
      name: "DPWI",
      logo: "https://ucarecdn.com/446b9aa5-5886-4136-aa2e-f8700b82814e/-/format/auto/",
    },
    {
      name: "Exxaro",
      logo: "https://ucarecdn.com/7b933317-f2d0-4560-b2ee-8c6760cb4099/-/format/auto/",
    },
    {
      name: "GPF",
      logo: "https://ucarecdn.com/5ab7e5f1-f309-4b69-a3fb-6c02f082ede3/-/format/auto/",
    },
    {
      name: "GEP",
      logo: "https://ucarecdn.com/8aec0ca4-2d19-4028-a500-71aad6048b5f/-/format/auto/",
    },
    {
      name: "Masana",
      logo: "https://ucarecdn.com/cae7e55b-b927-41e0-96ca-4acef301ad0c/-/format/auto/",
    },
    {
      name: "Old Mutual",
      logo: "https://ucarecdn.com/f00f7fd7-2cd7-46b2-9860-345099a10ab8/-/format/auto/",
    },
    {
      name: "Lugcobo",
      logo: "https://ucarecdn.com/d8596eca-11e4-4595-b3a7-90596eca91fd/-/format/auto/",
    },
    {
      name: "Rivoningo",
      logo: "https://ucarecdn.com/d8d336c6-a1be-4b12-b0cc-abd25e903c71/-/format/auto/",
    },
    {
      name: "L. F. Mothapo Building Construction",
      logo: "https://ucarecdn.com/080c6774-6d37-4414-8e2a-dadbcca35093/-/format/auto/",
    },
    {
      name: "Wina Pressings",
      logo: "https://ucarecdn.com/da8fa8c1-4110-411d-bcaa-af314823ccfb/-/format/auto/",
    },
    {
      name: "Liquid Intelligent Technologies",
      logo: "https://ucarecdn.com/d2417a6b-456a-4c8f-b872-50a5ee93d4ca/-/format/auto/",
    },
  ]);
  const handleStreamResponse = useHandleStreamResponse({
    onChunk: setStreamingMessage,
    onFinish: (message) => {
      setMessages((prev) => [...prev, { role: "assistant", content: message }]);
      setStreamingMessage("");
      setIsLoading(false);
    },
  });
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = { role: "user", content: inputMessage };
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/integrations/chat-gpt/conversationgpt4", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "system",
              content: `You are a helpful AI assistant for 80concept, an ICT company. You specialize in:
              1. ICT Infrastructure: networking, servers, cloud services, and hardware
              2. Software Solutions: custom software development, ERP systems, and application integration
              3. Managed Services & Support: IT support, monitoring, maintenance, and security services
              4. Consulting & Advisory: IT strategy, digital transformation, and process optimization
              
              Provide concise, accurate responses about these services. If asked about topics outside these areas, politely redirect to relevant services or suggest contacting the sales team.`,
            },
            ...messages,
            userMessage,
          ],
          stream: true,
        }),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      handleStreamResponse(response);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please try again later.",
        },
      ]);
      setIsLoading(false);
    }
  };
  const services = [
    {
      icon: "fa-server",
      title: "ICT Infrastructure",
      description: "Building robust and scalable IT infrastructure solutions",
      subServices: [
        "Network Design & Implementation",
        "Data Center Solutions",
        "Cloud Infrastructure",
        "Hardware Integration",
        "Infrastructure Security",
      ],
    },
    {
      icon: "fa-code",
      title: "Software Solutions",
      description: "Custom Software, OEM Licensing & Enterprise Applications",
      subServices: [
        "Custom Application Solutions",
        "OEM Productivity Software",
        "Enterprise Application (ERP/CRM/SCM)",
        "Specialised Software",
        "System Integration Solutions",
      ],
    },
    {
      icon: "fa-tools",
      title: "Managed Services",
      description: "Comprehensive IT management and technical support",
      subServices: [
        "24/7 Technical Support",
        "System Monitoring",
        "Preventive Maintenance",
        "Help Desk Services",
        "Performance Optimization",
      ],
    },
    {
      icon: "fa-lightbulb",
      title: "Consulting & Advisory",
      description: "Strategic IT consulting and business technology advisory",
      subServices: [
        "IT Strategy Development",
        "Digital Transformation",
        "Technology Assessment",
        "Project Management",
        "Business Process Optimization",
      ],
    },
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
      to: "hello@80concept.co.za",
    };

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      alert("Message sent! We will get back to you soon.");
      e.target.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  useEffect(() => {
    const fetchClientLogos = async () => {
      try {
        const response = await fetch(
          "/integrations/image-search/imagesearch?q=corporate+logo+design"
        );
        if (!response.ok) throw new Error("Failed to fetch logos");
        const data = await response.json();
        if (data.status === "success" && Array.isArray(data.items)) {
          const newLogos = data.items.map((item) => ({
            name: item.title || "Company Logo",
            logo: item.originalImageUrl,
          }));
          const combinedClients = [...clients, ...newLogos].slice(0, 20);
          setClients(combinedClients);
        }
      } catch (error) {
        console.error("Error fetching logos:", error);
      }
    };
    const fetchBackgroundImage = async () => {
      try {
        const section = document.getElementById("home");
        if (section) {
          const img = new Image();
          img.src =
            "https://ucarecdn.com/d13bfe69-21a8-494e-b4d3-9a25d19f29cc/-/format/auto/";
          img.onload = () => {
            section.style.backgroundImage = `url('${img.src}')`;
          };
          img.onerror = () => {
            section.style.backgroundColor = "#1a3c61";
          };
        }
      } catch (error) {
        console.error("Error setting background image:", error);
      }
    };

    fetchBackgroundImage();

    const handleClickOutside = (event) => {
      if (
        isMenuOpen &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".menu-button") &&
        !event.target.closest(".nav-toggle")
      ) {
        setIsMenuOpen(false);
      }
      if (isModalOpen && !event.target.closest(".bg-white")) {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    const handleScroll = (e) => {
      e.preventDefault();
      const href = e.currentTarget.getAttribute("href");
      const section = document.querySelector(href);
      if (section) {
        const navHeight = 64;
        const top = section.offsetTop - navHeight;
        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
      setIsMenuOpen(false);
    };
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => {
      link.addEventListener("click", handleScroll);
    });

    const newsInterval = setInterval(() => {
      if (isPanelOpen) {
        fetchStories();
      }
    }, 5 * 60 * 1000);

    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleScroll);
      });
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen, isModalOpen, isPanelOpen]);

  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/27713122883`, "_blank");
  };
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };
  const handleTouchMove = (e) => {
    if (touchStartX === null) return;
    const currentX = e.touches[0].clientX;
    const diff = touchStartX - currentX;

    if (diff > 50 && !isPanelOpen) {
      setIsPanelOpen(true);
    }
    if (diff < -50 && isPanelOpen) {
      setIsPanelOpen(false);
    }
  };
  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  return (
    <div className="min-h-screen bg-white relative">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-white focus:text-black"
      >
        Skip to main content
      </a>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="theme-color" content="#1a3c61" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="format-detection" content="telephone=no" />
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'"
        />
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="SAMEORIGIN" />
        <meta
          httpEquiv="Referrer-Policy"
          content="strict-origin-when-cross-origin"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="80concept" />
        <meta name="geo.region" content="ZA-GT" />
        <meta name="geo.placename" content="Bryanston" />
        <title>
          80concept | Leading ICT Solutions & Digital Transformation Services in
          South Africa
        </title>
        <meta
          name="description"
          content="80concept delivers enterprise-grade ICT infrastructure, custom software development, managed IT services, and strategic consulting. Specialists in digital transformation, cybersecurity, and cloud solutions across South Africa."
        />
        <link rel="canonical" href="https://80concept.co.za" />
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="preload"
          href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
          as="style"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://ucarecdn.com/d13bfe69-21a8-494e-b4d3-9a25d19f29cc/-/format/auto/"
          as="image"
        />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <link
          rel="apple-touch-icon"
          sizes="152x152"
          href="/icons/touch-icon-ipad.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/touch-icon-iphone-retina.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="167x167"
          href="/icons/touch-icon-ipad-retina.png"
        />
        <meta name="msapplication-TileColor" content="#1a3c61" />
        <meta
          name="msapplication-TileImage"
          content="/icons/ms-touch-icon.png"
        />
        <meta name="msapplication-config" content="/browserconfig.xml" />

        <meta property="og:site_name" content="80concept" />
        <meta
          property="og:title"
          content="Enterprise ICT Solutions & Digital Transformation | 80concept"
        />
        <meta
          property="og:description"
          content="Transform your business with cutting-edge ICT solutions. Expert services in infrastructure, software development, managed IT & strategic consulting."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://80concept.co.za" />
        <meta property="og:locale" content="en_ZA" />
        <meta
          property="og:image"
          content="https://80concept.co.za/og-image.jpg"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@80concept" />
        <meta name="twitter:creator" content="@80concept" />
        <meta
          name="twitter:title"
          content="Enterprise ICT Solutions & Digital Transformation | 80concept"
        />
        <meta
          name="twitter:description"
          content="Transform your business with cutting-edge ICT solutions. Expert services in infrastructure, software development, managed IT & strategic consulting."
        />
        <meta
          name="twitter:image"
          content="https://80concept.co.za/og-image.jpg"
        />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "ITService",
            "name": "80concept",
            "url": "https://80concept.co.za",
            "logo": "https://80concept.co.za/logo.png",
            "description": "Leading South African ICT solutions provider specializing in enterprise IT infrastructure, custom software development, managed services, and digital transformation consulting",
            "areaServed": {
              "@type": "Country",
              "name": "South Africa"
            },
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "71 Homestead Ave",
              "addressLocality": "Bryanston",
              "addressRegion": "Gauteng",
              "postalCode": "2191",
              "addressCountry": "ZA"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": -26.0733764,
              "longitude": 28.0247998
            },
            "serviceType": [
              "ICT Infrastructure Services",
              "Custom Software Development",
              "Managed IT Services",
              "Technology Consulting"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+27-10-012-6507",
              "contactType": "customer service",
              "email": "hello@80concept.co.za",
              "availableLanguage": ["English"]
            },
            "sameAs": [
              "https://www.linkedin.com/company/80concept",
              "https://twitter.com/80concept"
            ],
            "openingHoursSpecification": {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday"
              ],
              "opens": "08:00",
              "closes": "17:00"
            },
            "award": [
              "ISO 27001 Certified",
              "Microsoft Gold Partner"
            ]
          }
        `}</script>
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "ICT Solutions",
            "provider": {
              "@type": "Organization",
              "name": "80concept"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "ICT Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "ICT Infrastructure",
                    "description": "Enterprise-grade infrastructure solutions including network design, data center operations, and cybersecurity"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Software Development",
                    "description": "Custom software solutions, enterprise applications, and system integration services"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Managed IT Services",
                    "description": "24/7 IT support, infrastructure management, and help desk services"
                  }
                }
              ]
            }
          }
        `}</script>
        <script>{`
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', function() {
              navigator.serviceWorker.register('/service-worker.js').then(function(registration) {
                console.log('ServiceWorker registration successful');
              }, function(err) {
                console.log('ServiceWorker registration failed: ', err);
              });
            });
          }
        `}</script>
      </head>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="bg-[#1a3c61] text-white fixed w-full z-50"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <span
                className="text-xl font-bold animate-title hover:animate-balloon cursor-pointer text-[#4CAF50]"
                role="heading"
                aria-level="1"
              >
                80concept
              </span>
            </div>

            <div className="hidden md:flex space-x-8">
              <a
                href="tel:+27627299533"
                className="hover:text-[#4CAF50] flex items-center"
                aria-label="Call us at +27 62 729 9533"
              >
                <i className="fas fa-phone mr-2" aria-hidden="true"></i>
                +27 62 729 9533
              </a>
              <a
                href="#home"
                className="hover:text-[#4CAF50]"
                aria-label="Go to home section"
              >
                Home
              </a>
              <a
                href="#about"
                className="hover:text-[#4CAF50]"
                aria-label="Go to about section"
              >
                About
              </a>
              <a
                href="#services"
                className="hover:text-[#4CAF50]"
                aria-label="Go to services section"
              >
                Services
              </a>
              <a
                href="#contact"
                className="hover:text-[#4CAF50]"
                aria-label="Go to contact section"
              >
                Contact
              </a>
            </div>

            <div className="md:hidden flex items-center space-x-4">
              <a
                href="tel:+27627299533"
                className="hover:text-[#4CAF50] flex items-center"
                aria-label="Call us at +27 62 729 9533"
              >
                <i className="fas fa-phone mr-2" aria-hidden="true"></i>
                +27 62 729 9533
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="menu-button"
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                <i
                  className={`fas ${
                    isMenuOpen ? "fa-times" : "fa-bars"
                  } text-2xl transition-transform duration-300`}
                  aria-hidden="true"
                ></i>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden fixed top-16 w-full bg-[#1a3c61] bg-opacity-80 text-white z-50 mobile-menu transform transition-transform duration-300 ease-in-out">
          <div className="px-4 py-2 space-y-2">
            <a
              href="#home"
              className="block hover:text-[#4CAF50] transition-colors duration-200 py-2"
            >
              Home
            </a>
            <a
              href="#about"
              className="block hover:text-[#4CAF50] transition-colors duration-200 py-2"
            >
              About
            </a>
            <a
              href="#services"
              className="block hover:text-[#4CAF50] transition-colors duration-200 py-2"
            >
              Services
            </a>
            <a
              href="#contact"
              className="block hover:text-[#4CAF50] transition-colors duration-200 py-2"
            >
              Contact
            </a>
          </div>
        </div>
      )}

      <main id="main-content" role="main">
        <section
          id="home"
          className="pt-16 bg-cover bg-center min-h-[600px] relative"
          style={{
            backgroundImage:
              "url('https://ucarecdn.com/d13bfe69-21a8-494e-b4d3-9a25d19f29cc/-/format/auto/')",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(26, 60, 97, 0.6)",
          }}
        >
          <div className="max-w-7xl mx-auto px-4 py-20 relative z-10">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Smart Tech Solutions
              </h1>
              <p className="text-xl mb-8">
                Empowering businesses with AI technology solutions
              </p>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsModalOpen(true);
                }}
                className="bg-[#4CAF50] text-white px-8 py-3 rounded-full hover:bg-[#45a049] transition"
              >
                Get Started
              </a>
            </div>
          </div>
        </section>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <i className="fas fa-times text-xl"></i>
              </button>

              <h3 className="text-2xl font-bold mb-6 text-center text-gray-800">
                How can we help you?
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsChatOpen(true);
                  }}
                  className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-[#4CAF50] hover:bg-[#4CAF50] hover:text-white transition-all group"
                >
                  <i className="fas fa-comments text-2xl mb-2 text-[#4CAF50] group-hover:text-white"></i>
                  <span className="text-sm whitespace-nowrap">Chat Now</span>
                </button>

                <a
                  href="tel:+27627299533"
                  className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-[#4CAF50] hover:bg-[#4CAF50] hover:text-white transition-all group"
                >
                  <i className="fas fa-phone text-2xl mb-2 text-[#4CAF50] group-hover:text-white"></i>
                  <span className="text-sm whitespace-nowrap">Call Us</span>
                </a>

                <a
                  href="mailto:hello@80concept.co.za"
                  className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-[#4CAF50] hover:bg-[#4CAF50] hover:text-white transition-all group"
                >
                  <i className="fas fa-envelope text-2xl mb-2 text-[#4CAF50] group-hover:text-white"></i>
                  <span className="text-sm whitespace-nowrap">Email Us</span>
                </a>

                <a
                  href="#contact"
                  onClick={() => {
                    setIsModalOpen(false);
                    document.querySelector("#contact").scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className="flex flex-col items-center justify-center p-4 rounded-lg border-2 border-[#4CAF50] hover:bg-[#4CAF50] hover:text-white transition-all group"
                >
                  <i className="fas fa-message text-2xl mb-2 text-[#4CAF50] group-hover:text-white"></i>
                  <span className="text-sm whitespace-nowrap">
                    Contact Form
                  </span>
                </a>
              </div>

              <p className="text-sm text-gray-500 text-center mt-6">
                Choose your preferred way to connect with us
              </p>
            </div>
          </div>
        )}

        <section id="about" className="py-[60px] bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6">About Us</h2>
                <p className="text-gray-600 leading-relaxed">
                  80concept (Pty) Ltd is a leading Information and Communication
                  Technology (ICT) company dedicated to delivering innovative
                  and reliable technology solutions to businesses worldwide.
                  Established in 2015, we have grown to become a trusted partner
                  for organisations seeking to enhance their digital
                  infrastructure, optimize operations, and drive growth through
                  cutting-edge technology.
                </p>
                <div className="space-y-4 mt-6">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Our Mission</h3>
                    <p className="text-gray-600">
                      To empower businesses with transformative ICT solutions
                      that foster innovation, efficiency, and sustainable
                      growth.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Our Vision</h3>
                    <p className="text-gray-600">
                      To be recognized on a global scale for our commitment to
                      excellence, customer satisfaction, and technological
                      advancement.
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex items-start space-x-4">
                    <i className="fas fa-brain text-[#4CAF50] text-xl mt-1"></i>
                    <div>
                      <h3 className="font-semibold mb-2">Industry Expertise</h3>
                      <p className="text-gray-600">
                        Deep understanding of ICT solutions and industry best
                        practices
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <i className="fas fa-user-check text-[#4CAF50] text-xl"></i>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Client-Centric Approach
                      </h3>
                      <p className="text-gray-600">
                        Tailored solutions that meet your specific business
                        needs
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <i className="fas fa-shield-alt text-[#4CAF50] text-xl mt-1"></i>
                    <div>
                      <h3 className="font-semibold mb-2">Reliability</h3>
                      <p className="text-gray-600">
                        Consistent performance and dependable service delivery
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <i className="fas fa-chart-line text-[#4CAF50] text-xl mt-1"></i>
                    <div>
                      <h3 className="font-semibold mb-2">
                        Proven Track Record
                      </h3>
                      <p className="text-gray-600">
                        Successfully delivered projects for diverse clients
                        since 2015
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <i className="fas fa-headset text-[#4CAF50] text-xl mt-1"></i>
                    <div>
                      <h3 className="font-semibold mb-2">24/7 Support</h3>
                      <p className="text-gray-600">
                        Round-the-clock assistance whenever you need it
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="services" className="pt-[50px] pb-[70px] bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Our Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 relative cursor-pointer"
                  style={{
                    animation:
                      activeService === index
                        ? "serviceHover 1s ease infinite"
                        : "none",
                  }}
                  onMouseEnter={() => setActiveService(index)}
                  onMouseLeave={() => setActiveService(null)}
                  onClick={() =>
                    setActiveService(activeService === index ? null : index)
                  }
                >
                  <i
                    className={`fas ${service.icon} text-4xl text-[#1a3c61] mb-2`}
                  ></i>
                  <h3 className="text-xl font-semibold mb-1">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-1 text-sm">
                    {service.description}
                  </p>
                  <div
                    className={`absolute left-0 right-0 bg-[#e8f5e9] p-4 rounded-lg shadow-lg transition-all duration-300 z-50 ${
                      activeService === index
                        ? "opacity-100 visible"
                        : "opacity-0 invisible"
                    }`}
                    style={{
                      top: "100%",
                      marginTop: "1px",
                      width: "100%",
                      maxWidth: "100vw",
                      transform: "none",
                    }}
                  >
                    <ul className="list-disc list-inside text-gray-600 space-y-0.5 text-sm">
                      {service.subServices.map((subService, subIndex) => (
                        <li key={subIndex} className="leading-tight">
                          {subService}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="clientele" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Clientele</h2>
            <div className="flex flex-col md:flex-row justify-between">
              <div className="w-full md:w-4/5">
                <h3 className="text-xl font-bold mb-8">Corporation</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {clients.map((client, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center bg-white rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
                    >
                      <img
                        src={client.logo}
                        alt={`${client.name} logo`}
                        className="max-h-12 w-auto object-contain"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full md:w-1/5 md:ml-[30px] mt-8 md:mt-0 pl-0 md:pl-[20px]">
                <h3 className="text-xl font-bold mb-8">Industry Served</h3>
                <div className="space-y-4 pl-[30px]">
                  {[
                    { icon: "fa-shield-alt", name: "Defense" },
                    { icon: "fa-gavel", name: "Law" },
                    { icon: "fa-home", name: "Real Estate" },
                    { icon: "fa-oil-can", name: "Petroleum" },
                    { icon: "fa-mobile-alt", name: "Telecommunication" },
                    { icon: "fa-landmark", name: "Financial Sector" },
                    { icon: "fa-hard-hat", name: "Construction" },
                    { icon: "fa-industry", name: "Metal Pressing" },
                    { icon: "fa-mountain", name: "Mining" },
                  ].map((industry, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <i
                        className={`fas ${industry.icon} text-[#4CAF50] text-xl`}
                      ></i>
                      <span className="text-gray-700">{industry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          className={`fixed right-0 top-1/2 -translate-y-1/2 w-[350px] h-[560px] bg-white shadow-xl transform transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:shadow-2xl hover:translate-x-0 active:scale-[0.99] ${
            isPanelOpen ? "translate-x-0" : "translate-x-[calc(100%-10px)]"
          }`}
          style={{
            zIndex: 40,
            borderTopLeftRadius: "12px",
            borderBottomLeftRadius: "12px",
            borderLeft: "1px solid #e5e7eb",
            touchAction: "pan-y pinch-zoom",
          }}
          onMouseEnter={() => setIsPanelOpen(true)}
          onMouseLeave={() => setIsPanelOpen(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="p-4 h-full bg-white rounded-lg overflow-hidden">
            <div className="flex items-center mb-3">
              <h3 className="text-lg font-bold text-[#1a3c61]">
                Success Stories
              </h3>
            </div>

            <div className="mb-4">
              <div
                className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
                style={{
                  msOverflowStyle: "none",
                  scrollbarWidth: "none",
                  "::-webkit-scrollbar": { display: "none" },
                }}
              >
                <button
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                    selectedCategory === "all"
                      ? "bg-[#4CAF50] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  All
                </button>
                {[
                  "ICT Infrastructure",
                  "Software Solutions",
                  "Managed Services",
                  "Consulting & Advisory",
                ].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors ${
                      selectedCategory === category
                        ? "bg-[#4CAF50] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4 overflow-y-auto h-[calc(100%-6rem)] pr-2 scrollbar-hide">
              {successStories
                .filter(
                  (story) =>
                    selectedCategory === "all" ||
                    story.service_category === selectedCategory
                )
                .map((story, index) => (
                  <div
                    key={index}
                    className="p-4 border rounded-lg hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-[#4CAF50] px-2 py-1 bg-[#4CAF50]/10 rounded-full">
                        {story.service_category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {story.implementation_time}
                      </span>
                    </div>
                    <h4 className="font-semibold text-[#1a3c61] mb-2">
                      {story.title}
                    </h4>
                    <p className="text-sm text-gray-600 mb-3">
                      {story.description}
                    </p>
                    <div className="text-sm">
                      <div className="font-medium text-gray-700 mb-2">
                        Key Achievements:
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {Object.entries(story.metrics).map(([key, value]) => (
                          <div
                            key={key}
                            className="flex items-start space-x-2 bg-gray-50 p-2 rounded"
                          >
                            <i className="fas fa-check-circle text-[#4CAF50] text-sm mt-0.5"></i>
                            <div>
                              <span className="text-gray-700 font-medium capitalize">
                                {key.replace(/_/g, " ")}:
                              </span>
                              <span className="text-gray-600 ml-1">
                                {value}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100">
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-building text-[#4CAF50] text-xs"></i>
                        <span className="text-xs text-gray-500">
                          Client:{" "}
                          <span className="font-medium">
                            {story.client_name}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div
            className={`absolute -left-1 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center transition-transform duration-300 ${
              isPanelOpen ? "rotate-180" : ""
            }`}
          >
            <i className="fas fa-chevron-left text-[#4CAF50] text-lg"></i>
          </div>
        </div>
        <section id="contact" className="py-12 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Contact Us</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      className="w-full px-4 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      className="w-full px-4 py-2 border rounded"
                      required
                    />
                  </div>
                  <div>
                    <textarea
                      name="message"
                      rows="4"
                      placeholder="Your Message"
                      className="w-full px-4 py-2 border rounded"
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#1a3c61] text-white px-8 py-3 rounded hover:bg-[#2c5282] transition"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              <div>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt text-[#1a3c61] text-xl w-8"></i>
                    <span>71 Homestead Ave, Bryanston, 2191</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-phone text-[#1a3c61] text-xl w-8"></i>
                    <a
                      href="tel:(+27) 10 012 6507"
                      className="hover:text-[#4CAF50] transition"
                    >
                      (+27) 10 012 6507
                    </a>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-envelope text-[#1a3c61] text-xl w-8"></i>
                    <a
                      href="mailto:hello@80concept.co.za"
                      className="hover:text-[#4CAF50] transition"
                    >
                      hello@80concept.co.za
                    </a>
                  </div>
                  <div className="mt-4 w-full h-[300px] rounded-lg overflow-hidden">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3583.084936797903!2d28.024799776491506!3d-26.07337638162731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e957359aa24bc1d%3A0x563c593b71d782c0!2s71%20Homestead%20Ave%2C%20Bryanston%2C%20Sandton%2C%202191!5e0!3m2!1sen!2sza!4v1699488792705!5m2!1sen!2sza"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="bg-[#1a3c61] text-white py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center">
              <p>&copy; 2025 80concept (Pty) Ltd. All rights reserved.</p>
            </div>
          </div>
        </footer>
        <div
          className={`fixed bottom-4 right-4 z-50 flex flex-col gap-3 transition-opacity duration-300 ${
            isModalOpen ? "opacity-0" : "opacity-100"
          }`}
        >
          {!isChatOpen && (
            <button
              onClick={() => setIsChatOpen(true)}
              className="bg-[#4CAF50] text-white p-3 rounded-full shadow-lg hover:bg-[#45a049] transition animate-vibrate"
              aria-label="Open chat support"
            >
              <i className="fas fa-robot text-xl" aria-hidden="true"></i>
            </button>
          )}

          <button
            onClick={handleWhatsAppClick}
            className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#128C7E] transition"
            aria-label="Contact on WhatsApp"
          >
            <i className="fab fa-whatsapp text-xl" aria-hidden="true"></i>
          </button>

          {isChatOpen && (
            <div
              className="bg-white rounded-lg shadow-xl w-[350px] h-[500px] flex flex-col absolute bottom-0 right-0"
              role="dialog"
              aria-labelledby="chat-title"
            >
              <div className="bg-[#1a3c61] text-white p-4 rounded-t-lg flex justify-between items-center">
                <h3 id="chat-title" className="font-semibold">
                  Smart Support
                </h3>
                <button
                  onClick={() => setIsChatOpen(false)}
                  aria-label="Close chat"
                >
                  <i className="fas fa-times" aria-hidden="true"></i>
                </button>
              </div>

              <div
                className="flex-1 p-4 overflow-y-auto"
                role="log"
                aria-live="polite"
                aria-atomic="true"
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 ${
                      message.role === "user" ? "text-right" : "text-left"
                    }`}
                    role="article"
                    aria-label={`${
                      message.role === "user"
                        ? "Your message"
                        : "Assistant's response"
                    }`}
                  >
                    <div
                      className={`inline-block p-3 rounded-lg ${
                        message.role === "user"
                          ? "bg-[#1a3c61] text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
                {streamingMessage && (
                  <div className="mb-4 text-left">
                    <div className="inline-block p-3 rounded-lg bg-gray-100 text-gray-800">
                      {streamingMessage}
                    </div>
                  </div>
                )}
              </div>

              <form
                onSubmit={handleSendMessage}
                className="p-4 border-t"
                aria-label="Chat message form"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    name="message"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border rounded"
                    aria-label="Message input"
                  />
                  <button
                    type="submit"
                    className="bg-[#4CAF50] text-white px-4 py-2 rounded hover:bg-[#45a049] transition"
                    aria-label="Send message"
                  >
                    <i className="fas fa-paper-plane" aria-hidden="true"></i>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </main>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}

export default MainComponent;