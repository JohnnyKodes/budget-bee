import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useRef } from "react";
import { useBudgets } from "../contexts/BudgetsContext";
import { useTheme } from "../contexts/ThemeContext";
import { MdClose } from "react-icons/md";

const AddBudgetModal = ({ show, handleClose }) => {
  const nameRef = useRef();
  const maxRef = useRef();
  const { addBudget } = useBudgets();
  const { isDark } = useTheme();

  const handleSubmit = (e) => {
    e.preventDefault();

    addBudget({
      name: nameRef.current.value,
      max: parseFloat(maxRef.current.value),
    });

    handleClose();
  };

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={`${
                isDark && "dark"
              } mt-[200px] text-yellow-900 dark:text-white`}
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-slate-800 shadow-xl rounded-2xl">
                <div className="flex items-center justify-between">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 dark:text-white"
                  >
                    New Budget
                  </Dialog.Title>
                  <MdClose className="smallIcon" onClick={handleClose} />
                </div>

                <form className="mt-2" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="" className="text-md dark:text-white">
                      Name
                    </label>
                    <input
                      type="text"
                      ref={nameRef}
                      required
                      className="p-1 rounded-md bg-yellow-100 dark:bg-slate-500 outline-none dark:text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 mt-2">
                    <label
                      htmlFor=""
                      className="text-md dark:text-white flex items-center gap-1"
                    >
                      Maximum Spending{" "}
                      <p className="text-xs text-red-500">(in USD)</p>
                    </label>
                    <input
                      type="number"
                      ref={maxRef}
                      required
                      min={0}
                      step={1}
                      className="p-1 rounded-md bg-yellow-100 dark:bg-slate-500 outline-none dark:text-white"
                    />
                  </div>
                  <div className="mt-6 flex justify-center items-center">
                    <button
                      type="submit"
                      className="button dark:darkButton w-24"
                    >
                      Add
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AddBudgetModal;
