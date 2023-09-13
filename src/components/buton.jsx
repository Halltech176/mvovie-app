const ButtonComponent = ({ children, style, type }) => {
  const mode = {
    dark: "text-white font-bold",
    light: "border-primary font-bold bg-red-100 ",
  };
  return (
    <button
      className={`bg-primary w-fit px-3 rounded-md  py-2 ${mode[type]} ${style}`}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
