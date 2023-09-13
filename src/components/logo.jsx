import tv from "../assets/tv.png";

const LogoComponent = ({ type }) => {
  return (
    <div className="flex items-center gap-4">
      <img src={tv} alt="movie app logo" />
      <h1 className="font-bold md:text-2xl">Movie Box</h1>
    </div>
  );
};

export default LogoComponent;
