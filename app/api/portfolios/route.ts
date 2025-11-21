import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { generateAvatarDataUrl } from '@/lib/utils';

// Sample data for demonstration when database is unavailable
const samplePortfolios = [
  {
    _id: '1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    bio: 'Full-stack developer with 5+ years of experience building scalable web applications. Passionate about creating intuitive user experiences and clean, maintainable code.',
    skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS', 'Docker', 'GraphQL', 'Next.js'],
    profileImage: generateAvatarDataUrl('SJ', '#667eea'),
    portfolioItems: [
      {
        title: 'E-commerce Platform',
        description: 'Built a full-featured e-commerce platform with real-time inventory management and payment processing.',
        projectUrl: 'https://github.com'
      },
      {
        title: 'Task Management App',
        description: 'Collaborative task management application with real-time updates and team collaboration features.',
        projectUrl: 'https://github.com'
      }
    ]
  },
  {
    _id: '2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    bio: 'UI/UX Designer and Frontend Developer specializing in creating beautiful, accessible web experiences. Love turning complex problems into simple, elegant solutions.',
    skills: ['Figma', 'JavaScript', 'CSS', 'React', 'Vue.js', 'Tailwind', 'Animation', 'Accessibility'],
    profileImage: generateAvatarDataUrl('MC', '#764ba2'),
    portfolioItems: [
      {
        title: 'Design System',
        description: 'Created a comprehensive design system used across multiple products, improving consistency and development speed.',
        projectUrl: 'https://github.com'
      },
      {
        title: 'Mobile App Redesign',
        description: 'Led the redesign of a mobile app, resulting in 40% increase in user engagement.',
        projectUrl: 'https://github.com'
      },
      {
        title: 'Portfolio Website Builder',
        description: 'Built a no-code portfolio builder with drag-and-drop interface and customizable templates.',
        projectUrl: 'https://github.com'
      }
    ]
  },
  {
    _id: '3',
    name: 'Emily Rodriguez',
    email: 'emily@example.com',
    bio: 'Data scientist and machine learning engineer focused on building AI-powered solutions. Experienced in NLP, computer vision, and predictive analytics.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'SQL', 'Data Visualization', 'ML Ops'],
    profileImage: generateAvatarDataUrl('ER', '#66c2a5'),
    portfolioItems: [
      {
        title: 'Sentiment Analysis Tool',
        description: 'Developed a sentiment analysis tool for social media monitoring with 95% accuracy.',
        projectUrl: 'https://github.com'
      }
    ]
  }
];

// GET all active user portfolios (public endpoint)
export async function GET() {
  try {
    await connectDB();

    const users = await User.find({ 
      profileStatus: 'active',
      role: 'user'
    }).select('name bio skills portfolioItems profileImage');

    return NextResponse.json({
      portfolios: users,
      count: users.length,
    });
  } catch (error) {
    console.error('Get portfolios error:', error);
    // Return sample data if database is not available
    return NextResponse.json({
      portfolios: samplePortfolios,
      count: samplePortfolios.length,
    });
  }
}
