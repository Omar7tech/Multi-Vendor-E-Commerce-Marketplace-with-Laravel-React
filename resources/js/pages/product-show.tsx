import AppLayout from '@/layouts/app-layout';
import { Product } from '@/types';
import { Head } from '@inertiajs/react';

/* import CurrencyFormatter from '@/components/Core/CurrencyFormatter';
 */
export default function ProductShow({ product , variationOptions}: { product: Product , variationOptions: number[]  }) {
  console.log(product , variationOptions);
  return (
    <AppLayout>
      <Head title={product.title} />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <Carousel/>
        {product.category.id}

      </div>
    </AppLayout>
  );
}
