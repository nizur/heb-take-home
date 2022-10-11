import Image from 'next/image';
import cancelIcon from '../../public/x.svg';

interface CancelButtonProps {
  onClick: () => void;
}

function CancelButton({ onClick }: CancelButtonProps): JSX.Element {
  return (
    <span role="button"
      className="group flex items-center gap-2 flex-none text-red-600 text-sm font-semibold cursor-pointer"
      onClick={onClick}>
      <span className="text-transparent group-hover:text-red-600 transition-all ease-in-out">Cancel</span>
      <Image
        {...cancelIcon}
        width="12"
        height="12"
        alt="Cancel order"
      />
    </span>
  );
}

export default CancelButton;
