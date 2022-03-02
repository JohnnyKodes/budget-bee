import React from "react";
import { useBudgets } from "../contexts/BudgetsContext";
import BudgetCard from "./BudgetCard";

const TotalBudgetCard = () => {
  const { expenses, budgets } = useBudgets();

  const amount = expenses.reduce((total, expense) => total + expense.amount, 0);
  const max = budgets.reduce((total, budget) => total + budget.max, 0);

  if (amount === 0) return null;

  return (
    <div className="w-full flex justify-center px-10 md:px-0">
      <BudgetCard name="Total" amount={amount} totalCard max={max} />
    </div>
  );
};

export default TotalBudgetCard;
