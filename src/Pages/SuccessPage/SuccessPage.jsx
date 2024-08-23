import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { BusProvider } from "../../Provider/BusContext";

const SuccessPage = () => {
    const location = useLocation();
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const grantToken = localStorage.getItem('grantToken')
    const {setTrxId} = useContext(BusProvider);

    useEffect(() => {
        const executePayment = async() => {
            const query = new URLSearchParams(location.search);
            const paymentID = query.get('paymentID');
    
            if (paymentID) {
                const res = await axiosPublic.post('/api/bkash/payment/execute', {grantToken, paymentID})
                if(res.data.paymentID){
                    setTrxId(res.data.trxID)
                    localStorage.removeItem('grantToken')
                    navigate('/invoice')
                }
            }
        } 
        executePayment()
    }, [location, grantToken]);

    return <div className="text-2xl text-center font-semibold my-10">Your payment is being processing...</div>;
};

export default SuccessPage;