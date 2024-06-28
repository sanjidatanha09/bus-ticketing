import { Vortex } from "react-loader-spinner";

const BtnLoader = () => {
    return (
        <div className="flex justify-center">
            <Vortex
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="vortex-loading"
                  wrapperStyle={{}}
                  wrapperClass="vortex-wrapper"
                  colors={[
                    "red",
                    "green",
                    "blue",
                    "yellow",
                    "orange",
                    "purple",
                  ]}
                />
        </div>
    );
};

export default BtnLoader;