import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const SuccessPage = () => {
    const location = useLocation();
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const paymentID = query.get('paymentID');

        console.log(paymentID);

        if (paymentID) {
            axiosPublic.post('/api/bkash/payment/execute', {paymentID})
            .then(res => {
                console.log(res.data);
            })
        }
    }, [location]);

    return <div className="text-2xl text-center font-semibold mt-10">Processing payment...</div>;
};

export default SuccessPage;