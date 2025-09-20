import { Product } from '@/types';
import { Link } from '@inertiajs/react';
import CurrencyFormatter from '../Core/CurrencyFormatter';

export default function ProductItem({ product }: { product: Product }) {
    return (
        <div className="group card border border-base-100 bg-base-300 shadow transition-all duration-300 hover:shadow-lg">
            {/* Image Section */}
            <figure className="relative overflow-hidden">
                <img
                    src={product.image || 'https://placehold.co/600x400/png'}
                    alt={product.title}
                    className="h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </figure>

            <div className="card-body space-y-3 p-4">
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                        <h3 className="mb-2 card-title line-clamp-2 text-base leading-tight font-bold">{product.title}</h3>
                        <div className="space-y-1 text-sm">
                            <div className="flex items-center text-base-content/70">
                                <span className="mr-1">by</span>
                                <span className="hover:text-primary-focus cursor-pointer font-semibold text-primary transition-colors">
                                    {product.user.name}
                                </span>
                            </div>
                            <div className="flex items-center text-base-content/70">
                                <span className="mr-1">in</span>
                                <span className="font-semibold text-secondary">{product.department.name}</span>
                            </div>
                        </div>
                    </div>

                    <div className="shrink-0 text-right">
                        <div className="text-xl font-bold text-success">
                            <CurrencyFormatter amount={product.price} currencyCode="USD" />
                        </div>
                    </div>
                </div>

                <p className="line-clamp-2 text-sm leading-relaxed text-base-content/60">{product.description}</p>

                <div className="flex items-center">
                    <div
                        className={`mr-2 h-2 w-2 rounded-full ${
                            product.quantity > 10 ? 'bg-success' : product.quantity > 0 ? 'bg-warning' : 'bg-error'
                        }`}
                    ></div>
                    <span
                        className={`text-sm font-medium ${
                            product.quantity > 10 ? 'text-success' : product.quantity > 0 ? 'text-warning' : 'text-error'
                        }`}
                    >
                        {product.quantity > 0 ? `${product.quantity} in stock` : 'Out of stock'}
                    </span>
                </div>

                <div className="card-actions justify-end gap-2 pt-2">
                    <Link href={route('product.show', [product])} className="btn btn-outline btn-sm">
                        View Details
                    </Link>
                    <button className={`btn btn-sm ${product.quantity > 0 ? 'btn-primary' : 'btn-disabled'}`} disabled={product.quantity === 0}>
                        {product.quantity > 0 ? 'Add to Cart' : 'Sold Out'}
                    </button>
                </div>
            </div>
        </div>
    );
}
