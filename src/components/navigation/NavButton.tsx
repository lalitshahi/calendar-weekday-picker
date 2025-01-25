export interface NavButtonProps {
  onClick: () => void;
  label: string;
}

export const NavButton = ({ onClick, label }: Readonly<NavButtonProps>) => {
  return (
    <button
      onClick={onClick}
      className="w-10 h-10 text-xl pb-1 bg-gray-100 rounded-full flex justify-center items-center"
      aria-label={label}
    >
      {label}
    </button>
  );
};
