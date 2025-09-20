import HeroSection from '@/components/App/hero-section';
import ProductItem from '@/components/App/productItem';
import AppLayout from '@/layouts/app-layout';
import { PaginationProps, Product } from '@/types';
import { Head } from '@inertiajs/react';

export default function Welcome({ products }: { products: PaginationProps<Product> }) {
    return (
        <AppLayout>
            <Head title="Welcome" />
            <HeroSection/>
            <div className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.data.map((product: Product) => (
                        <ProductItem key={product.slug} product={product} />
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}
