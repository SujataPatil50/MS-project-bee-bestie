import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <Oval
      height={40}
      width={40}
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export default Loader;
