import { MagnifyingGlass } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center mt-5">
      <MagnifyingGlass
        visible={true}
        height="80"
        width="80"
        ariaLabel="magnifying-glass-loading"
        wrapperStyle={{}}
        wrapperClass="magnifying-glass-wrapper"
        glassColor="#c0efff"
        color="green"
      />
    </div>
  );
};

export default Loader;
