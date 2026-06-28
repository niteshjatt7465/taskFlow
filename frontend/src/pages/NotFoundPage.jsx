import { Link } from 'react-router-dom';
import { HiOutlineHome, HiOutlineFaceFrown } from 'react-icons/hi2';

const NotFoundPage = () => (
  <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
    <div className="text-center max-w-md animate-fade-in">
      {/* Icon */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-24 h-24 rounded-3xl bg-primary-600/10 border border-primary-500/20 flex items-center justify-center">
          <HiOutlineFaceFrown className="w-12 h-12 text-primary-400" />
        </div>
      </div>

      {/* 404 Number */}
      <h1 className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-400 to-purple-500 mb-4 leading-none">
        404
      </h1>

      {/* Heading */}
      <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>

      {/* Description */}
      <p className="text-gray-400 leading-relaxed mb-8">
        Oops! The page you're looking for doesn't exist or has been moved.
        Let's get you back to your tasks.
      </p>

      {/* CTA */}
      <Link to="/" className="btn-primary" id="back-home-btn">
        <HiOutlineHome className="w-5 h-5" />
        Back to Home
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
