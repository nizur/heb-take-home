import Image from 'next/image';
import type { Order } from '../../types/pizza';

interface OrderCardProps {
  order: Order;
}

function OrderCard({ order }: OrderCardProps) {
  const flavorImg = order.Flavor.toLowerCase().replaceAll(' ', '_');

  return (
    <div className="max-w-[280px] rounded overflow-hidden shadow-lg bg-inherit border">
      <Image
        className="w-full aspect-video"
        src={`/${flavorImg}.jpg`}
        layout="responsive"
        alt={order.Flavor}
        height="70px"
        width="100%"
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 capitalize">{order.Size} {order.Flavor}</div>
        <p className="text-base">
          {order.Size} {order.Flavor} on {order.Crust} crust
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Table #{order.Table_No}</span>
      </div>
    </div>
  );
}

export default OrderCard;
