/* eslint-disable react/prop-types */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
import { BusProvider } from "../../Provider/BusContext";
import { useNavigate } from "react-router";
import { FaRegWindowClose } from "react-icons/fa";
import Loader from "../Loader/Loader";

const UnitModal = ({ isOpen, setIsOpen }) => {
  const { setTrip, route, loading } = useContext(BusProvider);
  const navigate = useNavigate();

  const handleSubmit = (id) => {
    if (id === "rnA" || id === "rnB" || id === "rnC") {
      navigate("/routeDetails");
      return setIsOpen(false);
    } else {
      setTrip({ destination_id: route?.destination_id, unit_id: id });
      setIsOpen(false);
      navigate("/bookingPage");
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xl transform overflow-hidden rounded-sm bg-primary3 p-6 text-left align-middle shadow-xl transition-all">
                  <div
                    onClick={() => setIsOpen(false)}
                    className="absolute right-0 -top-1 hover:cursor-pointer"
                  >
                    <FaRegWindowClose className="text-3xl rounded-none text-primary2" />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-2xl text-center font-medium leading-6 text-secondary1"
                  >
                    Choose Your Unit
                  </Dialog.Title>
                  {loading ? (
                    <Loader />
                  ) : (
                    <div className="mt-8 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {route?.unit?.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSubmit(item.id)}
                          className="bg-primary2 px-4 py-1 h-32 w-32 text-3xl font-semibold text-primary3 rounded-sm hover:bg-cardBG duration-300"
                        >
                          {item.unit_name}
                          <h1 className="text-base font-bold text-primary1">
                            {item.group_name || ""}
                          </h1>
                        </button>
                      ))}
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UnitModal;
