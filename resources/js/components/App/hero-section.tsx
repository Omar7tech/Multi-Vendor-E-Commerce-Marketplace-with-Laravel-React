import { Link } from '@inertiajs/react';

export default function HeroSection() {
  return (
    <div className="hero min-h-[70vh] bg-base-200 rounded-box overflow-hidden">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold text-base-content">Discover Amazing Products</h1>
          <p className="py-6 text-lg text-base-content/80">
            Explore a vast marketplace of unique items from various vendors. Find exactly what you need, or discover something new!
          </p>
          <Link href={route('dashboard')} className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300">
            Start Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
