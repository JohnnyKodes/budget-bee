import { Fragment, useState, useRef } from "react";
import {
  useBugets,
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import { Dialog, Transition } from "@headlessui/react";
import { useTheme } from "../contexts/ThemeContext";
import { MdClose } from "react-icons/md";

const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {
  const descriptionRef = useRef();
  const amountRef = useRef();
  const budgetIdRef = useRef();
  const { addExpense, budgets } = useBudgets();
  const { isDark } = useTheme();

  function handleSubmit(e) {
    e.preventDefault();
    addExpense({
      description: descriptionRef.current.value,
      amount: parseFloat(amountRef.current.value),
      budgetId: budgetIdRef.current.value,
    });
    handleClose();
  }

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
                    New Expense
                  </Dialog.Title>
                  <MdClose className="smallIcon" onClick={handleClose} />
                </div>

                <form className="mt-2" onSubmit={handleSubmit}>
                  <div className="flex flex-col gap-0.5">
                    <label htmlFor="" className="text-md dark:text-white">
                      Description
                    </label>
                    <input
                      type="text"
                      ref={descriptionRef}
                      required
                      className="p-1 rounded-md bg-yellow-100 dark:bg-slate-500 outline-none dark:text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 mt-2">
                    <label
                      htmlFor=""
                      className="text-md dark:text-white flex items-center gap-1"
                    >
                      Amount <p className="text-xs text-red-500">(in USD)</p>
                    </label>
                    <input
                      type="number"
                      required
                      ref={amountRef}
                      min={0}
                      step={1}
                      className="p-1 rounded-md bg-yellow-100 dark:bg-slate-500 outline-none dark:text-white"
                    />
                  </div>
                  <div className="flex flex-col gap-0.5 mt-2">
                    <label
                      htmlFor=""
                      className="text-md dark:text-white flex items-center gap-1"
                    >
                      Budget
                    </label>
                    <select
                      defaultValue={defaultBudgetId}
                      ref={budgetIdRef}
                      className="p-2 rounded-md bg-yellow-100 dark:bg-slate-500 outline-none dark:text-white"
                    >
                      <option id={UNCATEGORIZED_BUDGET_ID}>
                        Uncategorized
                      </option>
                      {budgets.map((budget) => (
                        <option
                          key={budget.id}
                          value={budget.id}
                          className="p-2 bg-yellow-50 dark:bg-slate-600 hover:bg-yellow-100 dark:hover:bg-slate-500"
                        >
                          {budget.name}
                        </option>
                      ))}
                    </select>
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

export default AddExpenseModal;
