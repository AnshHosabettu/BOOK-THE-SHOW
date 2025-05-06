import React from 'react';
import { Film, Music as MusicNote, Ticket, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  color: string;
}

const Category: React.FC<CategoryProps> = ({ icon, title, description, link, color }) => {
  return (
    <Link 
      to={link}
      className="group relative overflow-hidden p-6 rounded-xl shadow-sm hover:shadow-md transition-all bg-white hover:translate-y-[-5px]"
    >
      <div className={`absolute top-0 left-0 w-full h-1 ${color}`} />
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-4 ${color} text-white`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Link>
  );
};

const CategorySection: React.FC = () => {
  const categories = [
    {
      icon: <Film />,
      title: 'Movies',
      description: 'Book tickets for the latest blockbusters and indie gems.',
      link: '/movies',
      color: 'bg-primary'
    },
    {
      icon: <Ticket />,
      title: 'Events',
      description: 'Discover amazing events happening in your city.',
      link: '/events',
      color: 'bg-secondary'
    },
    {
      icon: <MusicNote />,
      title: 'Concerts',
      description: 'Experience live music from your favorite artists.',
      link: '/concerts',
      color: 'bg-[#8844FF]'
    },
    {
      icon: <Trophy />,
      title: 'Sports',
      description: 'Catch live sports events and championships.',
      link: '/sports',
      color: 'bg-[#00A778]'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Category key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;