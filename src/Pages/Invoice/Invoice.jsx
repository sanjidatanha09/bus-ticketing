// import { useContext, useState } from "react";
// import { BusProvider } from "../../Provider/BusContext";
import { useEffect, useRef } from "react";
import ReactToPrint from "react-to-print";
import InvoiceContent from "./InvoiceContent";
import { FiPrinter } from "react-icons/fi";

const Invoice = () => {
  const componentRef = useRef();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-3">
      <div className="flex justify-end">
      <ReactToPrint
        trigger={() => (
          <div className="mb-1 max-w-fit">
            <button className="bg-primary3 hover:bg-cardBG text-primary4 px-3 font-bold py-2 rounded-sm flex items-center gap-1">
                <FiPrinter />Print Ticket
            
          </button>
          </div>
        )}
        content={() => componentRef.current}
      />
      </div>
      <div ref={componentRef}>
        <InvoiceContent />
      </div>
    </div>
  );
};

export default Invoice;


