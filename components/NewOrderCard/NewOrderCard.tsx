import Image from 'next/image';
import { flavors, crusts, sizes, tableNos } from '../../services/options';
import CancelButton from '../CancelButton';
import Select from '../Select';
import { Order } from '../../types/pizza';

export interface NewOrderCardOnUpdate {
  index: string;
  property: string;
  value: string | number;
}

export interface NewOrderCardProps {
  id: string;
  order: Order;
  onUpdate: (updateWith: NewOrderCardOnUpdate) => void;
  onCancel: (id: string) => void;
}

function NewOrderCard({
  id,
  order,
  onCancel,
  onUpdate
}: NewOrderCardProps): JSX.Element {
  const flavorImg = order.Flavor.toLowerCase().replaceAll(' ', '_');

  return (
    <div className="flex
      p-3 mb-3
      border border-inherit rounded
    ">
      <div className="flex-1 w-4 mr-4">
        <Image
          className="w-full aspect-video rounded"
          src={`/${flavorImg}.jpg`}
          layout="responsive"
          alt={order.Flavor}
          height="70px"
          width="100%"
        />
      </div>
      <div className="flex-auto">
        <div className="flex justify-between items-start">
          <h3 className="flex-auto text-bold text-orange-500 mb-2">Pizza #{Number(id) + 1}</h3>
          <CancelButton onClick={() => onCancel(id)} />
        </div>
        <div>
          <Select
            name="flavor"
            options={flavors}
            value={order['Flavor']}
            onChange={(e) => onUpdate({
              index: id,
              property: 'Flavor',
              value: e.target.value
            })}
          />
        </div>
        <div>
          <Select
            name="crust"
            options={crusts}
            value={order['Crust']}
            onChange={(e) => onUpdate({
              index: id,
              property: 'Crust',
              value: e.target.value
            })}
          />
        </div>
        <div>
          <Select
            name="size"
            options={sizes}
            value={order['Size']}
            onChange={(e) => onUpdate({
              index: id,
              property: 'Size',
              value: e.target.value
            })}
          />
        </div>
        <div>
          <Select
            name="tableNo"
            options={tableNos}
            value={order['Table_No']}
            onChange={(e) => onUpdate({
              index: id,
              property: 'Crust',
              value: Number(e.target.value)
            })}
          />
        </div>
      </div>
    </div>
  );
}

export default NewOrderCard;
