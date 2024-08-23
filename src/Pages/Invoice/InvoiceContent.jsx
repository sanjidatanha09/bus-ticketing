import { useContext, useEffect, useState } from "react";
import { BusProvider } from "../../Provider/BusContext";
import logo from "../../assets/logo/logo2.png";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../../Utils/Loader/Loader";

const InvoiceContent = () => {
  const [invoiceInfo, setInvoiceInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const { searchTicket, trxId } = useContext(BusProvider);
  const axiosPublic = useAxiosPublic();
  const phone = localStorage.getItem("contact_number");
  const pnr = localStorage.getItem("pnr");
  const isUnData = localStorage.getItem("isUn")
  const center_name = localStorage.getItem("center_name")

  const fetchData = async () => {
    setLoading(true);
    const pnrInfo = {
      pnr: pnr || searchTicket.pnr,
      contact_number: phone || searchTicket.contact_number,
    };
    try {
      const res = await axiosPublic.post(
        "/api/get-ticketing-details-with-pnr",
        pnrInfo
      );
      if (res.data.status_code === 201) {
        setLoading(false);
        setInvoiceInfo(res.data.invoiceData);
        localStorage.removeItem("contact_number");
        localStorage.removeItem("pnr");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // Fetch Unlimited Data
  const fetchUnData = async () => {
    setLoading(true);
    const pnrInfo = {
      pnr: pnr || searchTicket.pnr,
      contact_number: phone || searchTicket.contact_number,
    };
    try {
      const res = await axiosPublic.post(
        "/api/get-unlimited-ticketing-details-with-pnr",
        pnrInfo
      );
      if (res.data.status_code === 201) {
        setLoading(false);
        setInvoiceInfo(res.data.invoiceData);
        localStorage.removeItem("contact_number");
        localStorage.removeItem("pnr");
        localStorage.removeItem("isUn");
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUnData) {
      fetchUnData();
    } else {
      fetchData();
    }
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto border bg-primary4 flex relative">
      <section className="w-1/3">
        <div className="py-3 flex justify-center">
          <img src={logo} alt="company-logo" height="100" width="100" />
        </div>
        <p className="absolute top-1 left-[24%] font-semibold text-lg ">
          Agent Copy
        </p>

        <div className="h-[2px] w-full bg-primary3 absolute left-0 z-10"></div>

        <div className="flex gap-3 py-2 px-2 pr-3">
          {invoiceInfo?.single_ticketing_data?.trip_data?.is_unlimited_trip !==
          1 ? (
            <ul className="text-left  w-full">
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Name</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {invoiceInfo?.single_ticketing_data?.contact_name}
                </span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Phone</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {invoiceInfo?.single_ticketing_data?.contact_number}
                </span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Bus Name</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {invoiceInfo?.trip_data?.bus_data?.bus_name}
                </span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Seats</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {invoiceInfo?.ticketing_data?.map((item) => item.seat_no)}
                </span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Journey Date</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">{invoiceInfo?.date}</span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Seat Fare</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {invoiceInfo?.ticketing_data?.map((item) => item.seat_price)}
                </span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Total Fare</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">{invoiceInfo?.ticketing_amount}</span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">PNR</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">{invoiceInfo?.invoice}</span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">From</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {invoiceInfo?.get_boarding_point_data?.map(
                    (item) => item.point_name
                  )}
                </span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">To</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {invoiceInfo?.get_dropping_point_data?.map(
                    (item) => item.point_name
                  )}
                </span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Issued On</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {invoiceInfo?.single_ticketing_data.created_at}
                </span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Issued By</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {invoiceInfo?.single_ticketing_data?.ticketing_by
                    ? invoiceInfo?.single_ticketing_data.ticketing_by
                    : "Online"}
                </span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Serial No</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {invoiceInfo?.ticketing_data?.at(-1).id}
                </span>
              </li>
            </ul>
          ) : (
            <ul className="text-left w-full">
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Name</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {" "}
                  {invoiceInfo?.single_ticketing_data?.contact_name}
                </span>
              </li>

              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Mobile</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {" "}
                  {invoiceInfo?.single_ticketing_data?.contact_number}
                </span>
              </li>

              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Total Seats</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12"> {invoiceInfo?.ticketing_qty}</span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Journey Date</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">{invoiceInfo?.date}</span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Seat Fare</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {invoiceInfo?.trip_data.seat_price}/-
                </span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Total Fare</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {invoiceInfo?.ticketing_amount}/-
                </span>
              </li>

              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Center</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12"> {center_name}-</span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">PNR</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {" "}
                  {invoiceInfo?.single_ticketing_data.pnr_no}
                </span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">From</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {" "}
                  {invoiceInfo?.get_boarding_point_data?.map(
                    (item) => item.point_name
                  )}
                </span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">To</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {" "}
                  {invoiceInfo?.get_dropping_point_data?.map(
                    (item) => item.point_name
                  )}
                </span>
              </li>
              <li className="text-lg font-semibold flex justify-between">
                <span className="w-4/12">Issued On</span>
                <span className="w-1/12">:</span>
                <span className="w-7/12">
                  {invoiceInfo?.single_ticketing_data.created_at}
                </span>
              </li>
            </ul>
          )}
        </div>
        <div className="bg-primary5 w-full py-1 font-semibold text-lg text-center">
          www.admissionbus.com
        </div>
      </section>

      <section className="w-2/3 bg-primary2 pr-3 relative">
        <div className="py-3 flex justify-center gap-2">
          <img src={logo} alt="company-logo" height="100" width="100" />
          <div>
            <h1 className="text-xl font-bold">Masum Computer & Print Zone</h1>
            <h1>
              Concrit Bhaban, (Near Sadias Kitchen), Shop No-03, <br /> 166/68
              No College Road, Chawkbazar, Chittagong, Bangladesh
            </h1>
          </div>
        </div>
        <p className="absolute top-1 right-3 font-semibold text-lg">
          Passenger Copy
        </p>
        <div className="flex gap-3 p-2">
          <div className="flex-1">
            <div className="flex gap-3 justify-center">
              {invoiceInfo?.single_ticketing_data?.trip_data
                ?.is_unlimited_trip !== 1 ? (
                <ul className="text-left space-y-1 w-full ">
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Name</span>
                    <span className="w-1/12">:</span>
                    <span className="w-6/12">
                      {" "}
                      {invoiceInfo?.single_ticketing_data?.contact_name}
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Coach</span>
                    <span className="w-1/12">:</span>
                    <span className="w-6/12">
                      {" "}
                      {invoiceInfo?.trip_data.bus_data?.bus_name}
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Departure Time</span>
                    <span className="w-1/12">:</span>
                    <span className="w-6/12">
                      {" "}
                      {invoiceInfo?.trip_data?.deperture_time}
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Return Time</span>
                    <span className="w-1/12">:</span>
                    <span className="w-6/12">
                      {" "}
                      {invoiceInfo?.trip_data?.return_time}
                    </span>
                  </li>

                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Seat Fare</span>
                    <span className="w-1/12">:</span>
                    <span className="w-6/12">
                      {" "}
                      {invoiceInfo?.ticketing_data?.map(
                        (item) => item.seat_price
                      )}
                    </span>
                  </li>

                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Seats</span>
                    <span className="w-1/12">:</span>
                    <span className="w-6/12">
                      {" "}
                      {invoiceInfo?.ticketing_data?.map((item) => item.seat_no)}
                    </span>
                  </li>

                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Boarding</span>
                    <span className="w-1/12">:</span>
                    <span className="w-6/12">
                      {" "}
                      {invoiceInfo?.get_boarding_point_data?.map(
                        (item) => item.point_name
                      )}{" "}
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Issued on</span>
                    <span className="w-1/12">:</span>
                    <span className="w-6/12">
                      {" "}
                      {invoiceInfo?.single_ticketing_data?.created_at}
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Bkash Trx ID</span>
                    <span className="w-1/12">:</span>
                    <span className="w-6/12">
                      {" "}
                      {trxId}
                    </span>
                  </li>
                </ul>
              ) : (
                <ul className="text-left w-full space-y-1">
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-4/12">Name</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {" "}
                      {invoiceInfo?.single_ticketing_data?.contact_name}
                    </span>
                  </li>

                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-4/12">Mobile</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {" "}
                      {invoiceInfo?.single_ticketing_data?.contact_number}
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-4/12">Total Seat</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">{invoiceInfo?.ticketing_qty}</span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-4/12">Seat Fare</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {" "}
                      {invoiceInfo?.trip_data.seat_price}/-
                    </span>
                  </li>

                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-4/12">Total Fare</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {" "}
                      {invoiceInfo?.ticketing_amount}/-
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-4/12">Center</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {center_name}
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-4/12">Issued On</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {" "}
                      {invoiceInfo?.single_ticketing_data.created_at}
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-4/12">Bkash Trx ID</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {" "}
                      {trxId}
                    </span>
                  </li>
                </ul>
              )}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex gap-3 justify-center">
              {invoiceInfo?.single_ticketing_data?.trip_data
                ?.is_unlimited_trip !== 1 ? (
                <ul className="text-left w-full space-y-1">
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">PNR</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12"> {invoiceInfo?.invoice}</span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Journey Date</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {" "}
                      {invoiceInfo?.trip_data?.deperture_date}
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Total Fare</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {" "}
                      {invoiceInfo?.ticketing_amount}
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Dropping</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {" "}
                      {invoiceInfo?.get_dropping_point_data?.map(
                        (item) => item.point_name
                      )}
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Issued By</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {" "}
                      {invoiceInfo?.single_ticketing_data?.ticketing_by
                        ? invoiceInfo?.single_ticketing_data?.ticketing_by
                        : "Online"}
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Mobile</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {" "}
                      {invoiceInfo?.single_ticketing_data?.contact_number}
                    </span>
                  </li>
                </ul>
              ) : (
                <ul className="text-left w-full space-y-1">
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">PNR</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {" "}
                      {invoiceInfo?.single_ticketing_data.pnr_no}
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Exam Date</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {invoiceInfo?.single_ticketing_data.trip_data.exam_date}
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Journey Date</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12"> {invoiceInfo?.date}</span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Journey Time</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {" "}
                      {
                        invoiceInfo?.single_ticketing_data.trip_data
                          .deperture_time
                      }
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Return Date</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {" "}
                      {invoiceInfo?.single_ticketing_data.trip_data.return_date}
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">Return Time</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {" "}
                      {invoiceInfo?.single_ticketing_data.trip_data.return_time}
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">From</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {" "}
                      {invoiceInfo?.get_boarding_point_data?.map(
                        (item) => item.point_name
                      )}
                    </span>
                  </li>
                  <li className="text-lg font-semibold flex justify-between">
                    <span className="w-5/12">To</span>
                    <span className="w-1/12">:</span>
                    <span className="w-7/12">
                      {" "}
                      {invoiceInfo?.get_dropping_point_data?.map(
                        (item) => item.point_name
                      )}
                    </span>
                  </li>
                </ul>
              )}
              {invoiceInfo?.single_ticketing_data?.trip_data
                ?.is_unlimited_trip !== 1 ? (
                <div className="text-left space-y-1"></div>
              ) : (
                <div className="text-left space-y-1"></div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-8">
          <p className="font-semibold text-xl text-center">
            ঘরে বসে বসের টিকিট কিনুন সহজে, কল করুন +880 1575 690678
          </p>
          <p className="text-center">
            Printed By:{" "}
            <span>
              {invoiceInfo?.single_ticketing_data?.ticketing_by
                ? invoiceInfo?.single_ticketing_data?.ticketing_by
                : "Online"}
            </span>
          </p>
          <div className="bg-primary5 absolute bottom-0 w-full py-1 font-semibold text-lg text-center">
            www.admissionbus.com
          </div>
        </div>
      </section>
    </div>
  );
};

export default InvoiceContent;
