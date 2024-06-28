import React from 'react';
import body_img from "../../../assets/search/body_img.svg";

const NoBus = () => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <img src={body_img} className="w-96" alt="" />
            <p className="mt-4 text-center">
              No bus found for selected dates or cities. Please try different
              dates or cities. For support call our call centre @ 16374 and we
              might arrange the tickets for you.
            </p>
        </div>
    );
};

export default NoBus;