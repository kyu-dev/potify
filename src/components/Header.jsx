import "../../public/style.css";

const Header = () => {
  return (
    <div className="header">
      <div className="logo-container flex justify-center items-center bg-[var(--secondary-color)] p-12 gap-2">
        <img src="./public/logo.svg" className="w-10 h-10"  alt="Logo" />
        <h1 className="text-2xl font-bold text-[var(--primary-color)]">
          Potify <span className="text-sm">®</span>
        </h1>
      </div>
    </div>
  );
};

export default Header;
