import { useBudgets } from "../contexts/BudgetsContext";
import { currencyFormatter } from "../utils";
import ProgressBar from "./ProgressBar";

const BudgetCard = ({
  id,
  name,
  amount,
  max,
  gray,
  totalCard,
  onAddExpenseClick,
  onViewExpensesClick,
}) => {
  const progressBarClassNames = [];
  const classNames = [];
  const { getBudgetExpenses } = useBudgets();
  const ratio = (amount / max) * 100;
  const expenses = getBudgetExpenses(id).sort((a, b) => {
    return b.amount - a.amount;
  });

  if (gray) {
    classNames.push("border-gray-600 dark:border-gray-400");
  } else if (ratio <= 25) {
    classNames.push("border-green-500");
    progressBarClassNames.push("bg-green-500", "text-green-900");
  } else if (ratio <= 50) {
    classNames.push("border-blue-500");
    progressBarClassNames.push("bg-blue-500", "text-blue-900");
  } else if (ratio <= 75) {
    classNames.push("border-yellow-500");
    progressBarClassNames.push("bg-yellow-500", "text-yellow-900");
  } else {
    classNames.push("border-red-500");
    progressBarClassNames.push("bg-red-500", "text-red-900");
  }

  return (
    <div
      className={`${classNames.join(" ")} ${
        totalCard
          ? "w-[600px] h-fit"
          : "w-[300px] h-[350px] dark:bg-slate-800 p-3 rounded-md border-4 bg-yellow-100"
      } `}
    >
      <div className="flex flex-col h-full">
        <div className="w-full flex justify-between items-baseline flex-wrap">
          <h2 className="text-xl font-bold">{name}</h2>
          <div className="flex items-baseline mb-2">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="ml-1 text-gray-600">
                {" "}
                /{currencyFormatter.format(max)}
              </span>
            )}
          </div>
          {max && (
            <ProgressBar
              max={max}
              amount={amount}
              ratio={ratio}
              classNames={progressBarClassNames}
              totalCard={totalCard}
            />
          )}
        </div>
        {!totalCard && (
          <div className="flex flex-col h-full w-ful items-center justify-between">
            <div className="w-full flex flex-col gap-2">
              <h3 className="underline underline-offset-2 text-center">
                Top 3 Expenses
              </h3>
              {expenses.slice(0, 3).map((expense) => (
                <div className="flex justify-between items-center p-2 border-2 border-yellow-300  dark:border-slate-700">
                  <p className="text-lg">{expense.description}</p>
                  <p className={`text-lg font-bold text-green-500`}>
                    {currencyFormatter.format(expense.amount)}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 justify-center w-full">
              <button
                className="button dark:darkButton"
                onClick={onAddExpenseClick}
              >
                Add Expense
              </button>
              <button
                className="button dark:darkButton"
                onClick={onViewExpensesClick}
              >
                View Expenses
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetCard;
