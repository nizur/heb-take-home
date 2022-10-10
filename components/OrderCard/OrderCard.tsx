import Image from 'next/image';
import type { PlacedOrder } from '../../types/pizza';
import cancelIcon from '../../public/x.svg';

interface OrderCardProps {
  onCancel?: (id: string) => Promise<void>;
  order: PlacedOrder;
}

function OrderCard({ onCancel, order }: OrderCardProps) {
  const flavorImg = order.Flavor.toLowerCase().replaceAll(' ', '_');

  return (
    <div className="relative max-w-[280px] rounded overflow-hidden shadow-lg bg-inherit border">
      <Image
        className="w-full aspect-video"
        src={`/${flavorImg}.jpg`}
        layout="responsive"
        alt={order.Flavor}
        height="70px"
        width="100%"
      />
      <div className="px-6 py-4 min-h-[180px]">
        <div className="font-bold text-xl mb-2 capitalize">{order.Size} {order.Flavor}</div>
        <p className="text-base">
          {order.Size} {order.Flavor} on {order.Crust} crust
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full px-6 pt-4 pb-2 flex justify-between items-center">
        <div className="flex-auto text-sm font-semibold">Table #{order.Table_No}</div>
        <span
          className="group flex items-center gap-2 flex-none text-red-600 text-sm font-semibold cursor-pointer"
          onClick={() => onCancel(order.Order_ID)}>
          <span className="text-transparent group-hover:text-red-600 transition-all ease-in-out">Cancel</span>
          <img
            {...cancelIcon}
            width="12"
            height="12"
            alt="Cancel order"
          />
        </span>
      </div>
    </div>
  );
}

export default OrderCard;
