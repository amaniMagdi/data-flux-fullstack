const Header = ({title}) => {
  return (
    <>
      <header>
        <div className="mx-auto max-w-7xl px-2 py-1 sm:px-6 lg:px-8">
          <h6 className="text-xl font-bold tracking-tight text-gray-600">
            {title}
          </h6>
        </div>
      </header>
    </>
  );
};

export default Header;
