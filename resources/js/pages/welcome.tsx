import AppLayout from '@/layouts/app-layout';
/* import { type SharedData } from '@/types'; */
import { Head/* , usePage */ } from '@inertiajs/react';

export default function Welcome() {
  /* const { auth } = usePage<SharedData>().props; */

  return (
    <>
      <AppLayout>
        <Head title="Welcome">

        </Head>
        <div>
          This is Home
        </div>
      </AppLayout>
    </>
  );
}
