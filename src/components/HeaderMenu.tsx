'use client';

import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaBriefcase, FaBox, FaQuoteRight, FaQuestion, FaEnvelope } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderMenuProps {
  logo?: string;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ logo = 'ttter' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const sectionId = section.getAttribute('id') || '';
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });

      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { id: 'home', label: 'דף הבית', icon: <FaHome /> },
    { id: 'about', label: 'אודות', icon: <FaInfoCircle /> },
    { id: 'services', label: 'שירותים', icon: <FaBriefcase /> },
    { id: 'products', label: 'מוצרים', icon: <FaBox /> },
    { id: 'testimonials', label: 'המלצות', icon: <FaQuoteRight /> },
    { id: 'faq', label: 'שאלות נפוצות', icon: <FaQuestion /> },
    { id: 'contact', label: 'צור קשר', icon: <FaEnvelope /> },
  ];

  const menuVariants = {
    closed: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
      },
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: 50 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <header className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="logo text-2xl font-bold text-primary">
            {logo}
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse">
            {menuItems.map((item) => (
              <ScrollLink
                key={item.id}
                to={item.id}
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className={`flex items-center gap-2 cursor-pointer transition-colors duration-300 hover:text-primary font-heebo text-lg ${
                  activeSection === item.id ? 'text-primary font-medium border-b-2 border-primary' : 'text-gray-700'
                }`}
              >
                <span className="rtl:ml-1 ltr:mr-1">{item.icon}</span>
                {item.label}
              </ScrollLink>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden text-gray-700 hover:text-primary focus:outline-none p-2"
            aria-label={isOpen ? 'סגור תפריט' : 'פתח תפריט'}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="lg:hidden fixed top-0 right-0 h-full w-64 bg-white shadow-xl z-50 overflow-y-auto"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <div className="text-xl font-bold text-primary">{logo}</div>
              <button
                onClick={closeMenu}
                className="text-gray-700 hover:text-primary focus:outline-none"
                aria-label="סגור תפריט"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <nav className="p-4 flex flex-col space-y-4 rtl:text-right">
              {menuItems.map((item) => (
                <motion.div key={item.id} variants={itemVariants}>
                  <ScrollLink
                    to={item.id}
                    spy={true}
                    smooth={true}
                    offset={-70}
                    duration={500}
                    onClick={closeMenu}
                    className={`flex items-center gap-2 py-2 px-4 rounded-md transition-colors duration-300 hover:bg-gray-100 hover:text-primary ${
                      activeSection === item.id ? 'text-primary font-medium bg-gray-100' : 'text-gray-700'
                    }`}
                  >
                    <span className="rtl:ml-2 ltr:mr-2">{item.icon}</span>
                    {item.label}
                  </ScrollLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-black z-40"
            onClick={closeMenu}
          />
        )}
      </AnimatePresence>
    </header>
  );
};

export default HeaderMenu;