import { OrderDetails } from '@/components/OrderDetails';

type OrderPageProps = {
  params: { orderId: string };
};

export default function OrderPage({ params }: OrderPageProps) {
  return <OrderDetails orderId={params.orderId} />;
}

export function generateStaticParams() {
  // Orders are user-generated, so we expose no pre-rendered params.
  return [] as { orderId: string }[];
}
