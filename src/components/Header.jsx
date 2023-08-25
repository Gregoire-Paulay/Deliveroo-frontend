import logo from "../assets/logo.png";

const Header = () => {
  return (
    <header>
      <div className="container">
        <img src={logo} alt="Logo deliveroo" />
      </div>
    </header>
  );
};

export default Header;
