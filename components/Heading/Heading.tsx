interface HeadingProps {
  children: any;
}

function Heading({ children }: HeadingProps) {
  return (
    <h1 className="text-3xl font-bold">
      {children}
    </h1>
  );
}

export default Heading;
