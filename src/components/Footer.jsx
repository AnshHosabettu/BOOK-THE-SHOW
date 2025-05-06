import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone } from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const footerLinks = [
    {
      title: 'About',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Contact Us', path: '/contact' },
        { name: 'Careers', path: '/careers' },
        { name: 'Blog', path: '/blog' },
        { name: 'Corporate Information', path: '/corporate' },
      ],
    },
    {
      title: 'Help',
      links: [
        { name: 'FAQs', path: '/faqs' },
        { name: 'Terms & Conditions', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Report an Issue', path: '/report' },
        { name: 'Feedback', path: '/feedback' },
      ],
    },
    {
      title: 'Entertainment',
      links: [
        { name: 'Movies', path: '/movies' },
        { name: 'Events', path: '/events' },
        { name: 'Plays', path: '/plays' },
        { name: 'Sports', path: '/sports' },
        { name: 'Activities', path: '/activities' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook className="h-5 w-5" />, path: 'https://facebook.com' },
    { icon: <Twitter className="h-5 w-5" />, path: 'https://twitter.com' },
    { icon: <Instagram className="h-5 w-5" />, path: 'https://instagram.com' },
    { icon: <Youtube className="h-5 w-5" />, path: 'https://youtube.com' },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              BookTheShow is your one-stop destination for booking movies, events, plays, concerts, and more. 
              Find the best entertainment options in your city and book tickets with ease.
            </p>
            <div className="flex items-center space-x-4 mb-4">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.path} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-gray-800 p-2 rounded-full hover:bg-secondary transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-gray-300 text-sm">support@booktheshow.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </div>
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.path} 
                      className="text-gray-300 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} BookTheShow. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link to="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;