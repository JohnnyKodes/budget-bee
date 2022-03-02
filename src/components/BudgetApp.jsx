import { useState } from "react";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import AddBudgetModal from "./AddBudgetModal";
import AddExpenseModal from "./AddExpenseModal";
import BudgetCard from "./BudgetCard";
import TotalBudgetCard from "./TotalBudgetCard";
import UncategorizedBudgetCard from "./UncategorizedBudgetCard";
import ViewExpensesModal from "./ViewExpensesModal";

const BudgetApp = ({ enabled }) => {
  const { budgets, getBudgetExpenses } = useBudgets();
  const [addBudgetModal, setAddBudgetModal] = useState(false);
  const [addExpenseModal, setAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  const handleExpenseModalOpen = (budgetId) => {
    setAddExpenseModalBudgetId(budgetId);
    setAddExpenseModal(true);
  };

  return (
    <main>
      <h1 className="text-center text-4xl my-4">Budgets</h1>
      <div className="flex items-center justify-center gap-2">
        <button
          className="button dark:darkButton"
          onClick={() => setAddBudgetModal(true)}
        >
          Add Budget
        </button>
        <button
          className="button dark:darkButton"
          onClick={handleExpenseModalOpen}
        >
          Add Expense
        </button>
      </div>
      <div className="flex w-full items-center justify-center mt-5">
        <TotalBudgetCard />
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 px-10 py-5">
        {budgets.map((budget) => {
          const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount,
            0
          );
          return (
            <BudgetCard
              key={budget.id}
              id={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              onAddExpenseClick={() => handleExpenseModalOpen(budget.id)}
              onViewExpensesClick={() =>
                setViewExpensesModalBudgetId(budget.id)
              }
            />
          );
        })}
        <UncategorizedBudgetCard
          onAddExpenseClick={addExpenseModal}
          onViewExpensesClick={() =>
            viewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)
          }
        />
      </div>
      <AddBudgetModal
        show={addBudgetModal}
        handleClose={() => setAddBudgetModal(false)}
      />
      <AddExpenseModal
        show={addExpenseModal}
        handleClose={() => setAddExpenseModal(false)}
        defaultBudgetId={addExpenseModalBudgetId}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
    </main>
  );
};

export default BudgetApp;
