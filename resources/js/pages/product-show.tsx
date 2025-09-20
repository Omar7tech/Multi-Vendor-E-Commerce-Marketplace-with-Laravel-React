import AppLayout from '@/layouts/app-layout';
import { Product } from '@/types';
import { Head } from '@inertiajs/react';
/* import CurrencyFormatter from '@/components/Core/CurrencyFormatter';
 */
export default function ProductShow({ product}: { product: Product  }) {
  console.log(product);
  return (
    <AppLayout>
      <Head title={product.title} />
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        
        
      </div>
    </AppLayout>
  );
}
