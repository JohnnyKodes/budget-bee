import { useState } from "react";
import {
  UNCATEGORIZED_BUDGET_ID,
  useBudgets,
} from "../contexts/BudgetsContext";
import AddBudgetModal from "./AddBudgetModal";
import BudgetCard from "./BudgetCard";

const BudgetApp = ({ enabled }) => {
  const { budgets, getBudgetExpenses } = useBudgets();
  const [addBudgetModal, setAddBudgetModal] = useState(false);
  const [addExpenseModal, setAddExpenseModal] = useState(false);
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState();
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();

  const handleExpenseModalOpen = (budgetId) => {
    setAddExpenseModal(true);
    setAddExpenseModalBudgetId(budgetId);
  };

  return (
    <main>
      <h1 className="text-center text-4xl mb-4">Budgets</h1>
      <div className="flex items-center justify-center gap-2 mb-4">
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
      <div className="grid gird-cols-3 gap-4 items-start p-10">
        {budgets.map((budget) => {
          const amount = getBudgetExpenses(budget.id).reduce(
            (total, expense) => total + expense.amount,
            0
          );
          return (
            <BudgetCard
              key={budget.id}
              name={budget.name}
              amount={amount}
              max={budget.max}
              onAddExpenseClick={() => setAddExpenseModal(budget.id)}
              onViewExpensesClick={() =>
                setViewExpensesModalBudgetId(budget.id)
              }
            />
          );
        })}
      </div>
      <AddBudgetModal
        show={addBudgetModal}
        handleClose={() => setAddBudgetModal(false)}
      />
    </main>
  );
};

export default BudgetApp;
