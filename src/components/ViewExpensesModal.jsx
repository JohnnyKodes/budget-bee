import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MdClose } from "react-icons/md";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import { useTheme } from "../contexts/ThemeContext";
import { currencyFormatter } from "../utils";

const ViewExpensesModal = ({ budgetId, handleClose }) => {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudgets();
  const { isDark } = useTheme();
  const expenses = getBudgetExpenses(budgetId).sort((a, b) => {
    return b.amount - a.amount;
  });
  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find((b) => b.id === budgetId);

  console.log(expenses);

  return (
    <Transition appear show={budgetId != null} as={Fragment}>
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
                  <div className="flex items-center justify-between gap-2">
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 dark:text-white"
                    >
                      {budget?.name} - Expenses
                    </Dialog.Title>
                    {budgetId !== UNCATEGORIZED_BUDGET_ID && (
                      <button
                        className="warningButton"
                        onClick={() => {
                          deleteBudget(budget);
                          handleClose();
                        }}
                      >
                        Delete Budget
                      </button>
                    )}
                  </div>

                  <MdClose className="smallIcon" onClick={handleClose} />
                </div>
                <div className="mt-2 flex flex-col gap-3">
                  {expenses.map((expense) => (
                    <div key={expense.id} className="flex justify-between">
                      <p className="dark:text-white text-lg">
                        {expense.description}
                      </p>
                      <div className="flex justify-around gap-2">
                        <p className="text-green-600 font-bold text-lg">
                          {currencyFormatter.format(expense.amount)}
                        </p>
                        <button
                          onClick={() => deleteExpense(expense)}
                          className="warningButton px-1 py-1 text-lg rounded-lg"
                        >
                          <MdClose />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ViewExpensesModal;
