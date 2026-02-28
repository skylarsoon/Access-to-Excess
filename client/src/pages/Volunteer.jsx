import React, { useState } from "react";
import { Truck, Users, ShoppingBag, Package, Plus, Minus } from "lucide-react";

// Fruit & Vegetable SVG Icons
const AppleIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M12 2c-1.5 0-2.5 1-3 2-2 0-4 1.5-4 4 0 4 3 10 7 12 4-2 7-8 7-12 0-2.5-2-4-4-4-.5-1-1.5-2-3-2z" />
    <path d="M12 2v4" />
    <path d="M10 1c1 0 2 1 2 2" />
  </svg>
);

const CarrotIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M8 21l8-14" />
    <path d="M16 7c2-2 4-2 5-1s1 3-1 5l-8 8c-2 2-4 2-5 1s-1-3 1-5l8-8z" />
    <path d="M18 4l2 2" />
    <path d="M15 3l1 1" />
    <path d="M20 7l1 1" />
  </svg>
);

const GrapesIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="12" cy="8" r="2" />
    <circle cx="9" cy="12" r="2" />
    <circle cx="15" cy="12" r="2" />
    <circle cx="12" cy="16" r="2" />
    <circle cx="7" cy="16" r="2" />
    <circle cx="17" cy="16" r="2" />
    <path d="M12 2v4" />
    <path d="M10 3c1 0 2 1 2 1" />
  </svg>
);

const LemonIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <ellipse cx="12" cy="12" rx="8" ry="6" transform="rotate(45 12 12)" />
    <path d="M14 10c0 1-1 2-2 2s-2-1-2-2" />
  </svg>
);

const LeafIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M6 21c3-3 8-8 14-8-2 8-7 11-14 8z" />
    <path d="M6 21c-1-4 2-9 6-12" />
  </svg>
);

const BroccoliIcon = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <circle cx="12" cy="6" r="3" />
    <circle cx="8" cy="9" r="2.5" />
    <circle cx="16" cy="9" r="2.5" />
    <circle cx="10" cy="12" r="2" />
    <circle cx="14" cy="12" r="2" />
    <path d="M12 14v8" />
  </svg>
);

function Volunteer() {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    availability: "",
  });

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const scrollToForm = () => {
    const formSection = document.getElementById("volunteer-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Update formData when user types
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update only the field that changed
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    // Validate phone number
    const phoneRegex = /^\+?[\d\s\-()]{10,}$/;
    if (!phoneRegex.test(formData.phone)) {
      alert("Please enter a valid phone number containing at least 10 digits.");
      return;
    }

    try {
      const response = await fetch("/api/volunteer-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      alert("Form submitted successfully! Thank you!");
      setFormData({ name: "", email: "", phone: "", availability: "" });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit form. Please try again.");
    }
  };

  const faqs = [
    {
      question: "How do I sign up to volunteer with Access to Excess?",
      answer:
        "Simply fill out our volunteer application form above. Once submitted, our volunteer coordinator will reach out to you with next steps and available opportunities.",
    },
    {
      question: "Do I need experience to volunteer for food rescue?",
      answer:
        "No prior experience is required! We provide all necessary training and guidance. All you need is enthusiasm and a willingness to help our community.",
    },
    {
      question: "What time commitment is required?",
      answer:
        "We have flexible shifts ranging from 1-4 hours. You can volunteer as little or as often as your schedule allows.",
    },
    {
      question: "Where do food rescue activities take place?",
      answer:
        "Activities take place throughout the Dayton, Ohio area including local grocery stores, restaurants, farms, and our distribution centers.",
    },
    {
      question: "Can I volunteer as a group or with my company?",
      answer:
        "Absolutely! We welcome corporate groups, school clubs, faith organizations, and families. Contact us in advance to schedule a group volunteer session.",
    },
    {
      question: "What should I wear as a food rescue volunteer?",
      answer:
        "Please wear closed-toe shoes and comfortable clothing that you don't mind getting a little dirty. We recommend layers as some activities are outdoors.",
    },
    {
      question: "Do you offer community service hours for students?",
      answer:
        "Yes! We're happy to sign off on community service hours for students. Just let us know when you sign up.",
    },
    {
      question: "Is there a background check required?",
      answer:
        "Background checks are only required for volunteers working directly with vulnerable populations or driving vehicles for food transport.",
    },
    {
      question: "Can I volunteer if I have a full-time job?",
      answer:
        "Yes! Many of our volunteers work full-time. We offer evening and weekend opportunities to accommodate various schedules.",
    },
    {
      question: "What if I can't commit to regular shifts?",
      answer:
        "That's perfectly fine! We welcome one-time volunteers and those who can only help occasionally. Every bit of help makes a difference.",
    },
  ];

  const volunteerImages = [
    {
      src: "/volunteer-action-2.jpg",
      alt: "Community food distribution event with volunteers",
    },
    {
      src: "/volunteer-action-1.jpg",
      alt: "Fresh produce display with vegetables",
    },
    {
      src: "/volunteer-action-3.jpg",
      alt: "Farmers market booth with fresh fruits and vegetables",
    },
  ];

  return (
    <div className="animate-fade-in bg-white">
      {/* Hero Section - Full width background with overlay - SAME HEIGHT AS HOME */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-start overflow-hidden -mt-20">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/volunteer-hero.jpg"
            alt="Access to Excess volunteer at farmers market with fresh produce"
            className="w-full h-full object-cover"
          />
          {/* Linear Gradient Overlay - Left to Right (dark on left, fades right) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0) 100%)",
            }}
          ></div>
          {/* Additional dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full pt-20">
          <div className="max-w-xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-10 leading-[1.15]">
              Volunteer with Access to Excess
              <br />
              in <span className="text-pro-light-green">Dayton, Ohio.</span>
            </h1>
            <div className="flex flex-row gap-4 mt-8">
              <button
                onClick={scrollToForm}
                className="px-6 py-3 bg-pro-green hover:bg-pro-dark text-white text-[15px] font-bold rounded-md shadow-lg transition-all"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Mission Section */}
      <section className="px-6 md:px-8 py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#166534] mb-2 leading-tight">
            Join our Mission
          </h2>
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6">
            Every volunteer makes a difference
          </h3>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Join our mission to rescue surplus food and redistribute it to those
            in need. Every volunteer makes a difference in fighting food waste
            and hunger in our community.
          </p>
        </div>
      </section>

      {/* What You Will Help With Section - Dark Green Background (FOOTER GREEN) */}
      <section className="relative px-6 md:px-8 py-20 md:py-24 bg-pro-dark overflow-hidden">
        {/* Decorative fruit icons - positioned on the edges */}
        <div className="absolute top-6 left-6 opacity-30">
          <AppleIcon className="w-10 h-10 text-white" />
        </div>
        <div className="absolute top-10 left-20 opacity-30">
          <CarrotIcon className="w-12 h-12 text-white" />
        </div>
        <div className="absolute top-20 left-8 opacity-30">
          <GrapesIcon className="w-9 h-9 text-white" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-30">
          <LemonIcon className="w-11 h-11 text-white" />
        </div>
        <div className="absolute bottom-20 right-24 opacity-30">
          <LeafIcon className="w-8 h-8 text-white" />
        </div>
        <div className="absolute bottom-32 right-12 opacity-30">
          <BroccoliIcon className="w-10 h-10 text-white" />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-14">
            What You Will Help With
          </h2>
          <div className="grid md:grid-cols-4 gap-6 mb-10">
            {/* Card 1 - Food Pickups */}
            <div className="bg-transparent border-2 border-white/30 rounded-xl p-6 text-center hover:border-white/50 transition-all">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-5">
                <Truck size={28} className="text-pro-dark" />
              </div>
              <h3 className="text-base font-bold text-white mb-3">
                Food Pickups
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Transport rescued food from donors to distribution sites
              </p>
            </div>

            {/* Card 2 - Admin & Operations */}
            <div className="bg-transparent border-2 border-white/30 rounded-xl p-6 text-center hover:border-white/50 transition-all">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-5">
                <Users size={28} className="text-pro-dark" />
              </div>
              <h3 className="text-base font-bold text-white mb-3">
                Admin & Operations
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Help with scheduling, data entry, and organizational tasks
              </p>
            </div>

            {/* Card 3 - Market Support */}
            <div className="bg-transparent border-2 border-white/30 rounded-xl p-6 text-center hover:border-white/50 transition-all">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-5">
                <ShoppingBag size={28} className="text-pro-dark" />
              </div>
              <h3 className="text-base font-bold text-white mb-3">
                Market Support
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Assist with organizing and running community markets
              </p>
            </div>

            {/* Card 4 - Cleanup & Logistics */}
            <div className="bg-transparent border-2 border-white/30 rounded-xl p-6 text-center hover:border-white/50 transition-all">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-5">
                <Package size={28} className="text-pro-dark" />
              </div>
              <h3 className="text-base font-bold text-white mb-3">
                Cleanup & Logistics
              </h3>
              <p className="text-sm text-white/80 leading-relaxed">
                Support warehouse sorting, packing, and facility maintenance
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-8">
            <button
              onClick={() => (window.location.href = "/donate")}
              className="px-8 py-3.5 bg-[#FFC570] text-gray-900 font-bold rounded-lg hover:bg-[#e5b060] transition-colors shadow-lg"
            >
              Can't Volunteer? Donate Instead
            </button>
          </div>
        </div>
      </section>

      {/* Volunteers in Action Section */}
      <section className="px-6 md:px-8 py-20 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12">
            Volunteers in Action
          </h2>

          {/* Three images side by side */}
          <div className="grid md:grid-cols-3 gap-6">
            {volunteerImages.map((image, index) => (
              <div
                key={index}
                className="aspect-[4/3] rounded-lg overflow-hidden shadow-md"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sign Up to Volunteer Section - Dark Green Background (FOOTER GREEN) */}
      <section
        id="volunteer-form"
        className="relative px-6 md:px-8 py-20 md:py-28 bg-pro-dark overflow-hidden"
      >
        {/* Decorative fruit icons */}
        <div className="absolute top-8 left-8 opacity-20">
          <AppleIcon className="w-11 h-11 text-white" />
        </div>
        <div className="absolute top-16 left-24 opacity-20">
          <BroccoliIcon className="w-14 h-14 text-white" />
        </div>
        <div className="absolute top-28 left-12 opacity-20">
          <CarrotIcon className="w-10 h-10 text-white" />
        </div>
        <div className="absolute bottom-16 right-12 opacity-20">
          <GrapesIcon className="w-12 h-12 text-white" />
        </div>
        <div className="absolute bottom-10 right-28 opacity-20">
          <LemonIcon className="w-10 h-10 text-white" />
        </div>

        <div className="max-w-lg mx-auto relative z-10">
          {/* White Form Card */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-[#166534] mb-3">
              Sign Up to Volunteer
            </h2>
            <p className="text-sm text-center text-gray-500 mb-8 max-w-sm mx-auto">
              Join our team of dedicated volunteers making a difference in the
              community. Help us rescue food and fight hunger together.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#166534] focus:ring-1 focus:ring-[#166534] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#166534] focus:ring-1 focus:ring-[#166534] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 xxx-xxx-xxxx"
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#166534] focus:ring-1 focus:ring-[#166534] transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  General Availability
                </label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#166534] focus:ring-1 focus:ring-[#166534] transition-colors appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23666'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 12px center",
                    backgroundSize: "20px",
                  }}
                  required
                >
                  <option value="">Select your availability...</option>
                  <option value="monday-friday">Monday–Friday</option>
                  <option value="weekends">Weekends</option>
                  <option value="saturday-sunday-mornings">
                    Saturday–Sunday mornings
                  </option>
                  <option value="saturday-sunday-afternoons">
                    Saturday–Sunday afternoons
                  </option>
                  <option value="flexible">Flexible</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#166534] text-white text-base font-semibold rounded-lg hover:bg-pro-dark transition-colors mt-2"
              >
                Join Us
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section - Light Background */}
      <section className="px-6 md:px-8 py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#166534] mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-gray-600 max-w-xl mx-auto">
              Have questions about volunteering? We've got answers. Find
              everything you need to know about joining our food rescue mission.
            </p>
          </div>

          {/* FAQ Accordion Container - Light Green Background */}
          <div className="bg-[#f0fdf4] rounded-2xl p-6 md:p-8 shadow-sm">
            <div className="space-y-0">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`border-b border-[#dcfce7] last:border-b-0 ${index === 0 ? "" : ""}`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-5 flex justify-between items-center text-left hover:bg-[#dcfce7]/50 transition-colors px-2 rounded-lg"
                  >
                    <span className="text-sm md:text-base font-medium text-gray-800 pr-4">
                      {faq.question}
                    </span>
                    <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-gray-500">
                      {openFaq === index ? (
                        <Minus size={18} />
                      ) : (
                        <Plus size={18} />
                      )}
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="pb-5 px-2">
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Volunteer;
