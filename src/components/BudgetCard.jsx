import { currencyFormatter } from "../utils";
import ProgressBar from "./ProgressBar";

const BudgetCard = ({
  name,
  amount,
  max,
  gray,
  hideButtons,
  onAddExpenseClick,
  onViewExpensesClick,
}) => {
  const progressBarClassNames = [];
  const classNames = [];
  const ratio = (amount / max) * 100;

  if (ratio <= 25) {
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
      className={`${classNames.join(
        " "
      )} w-[300px] h-[350px]  dark:bg-slate-800 p-3 rounded-md border-8 bg-yellow-100`}
    >
      <div className="flex flex-col h-full">
        <div className="w-full flex justify-between items-baseline flex-wrap">
          <h2 className="text-xl font-bold">{name}</h2>
          <div className="flex items-baseline mb-2">
            {currencyFormatter.format(amount)}
            {max && (
              <span className="ml-1 text-gray-900">
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
              classNames={classNames}
            />
          )}
        </div>

        <div className="flex flex-col h-full w-ful items-center justify-between">
          <div>
            <h3>Top 3 Expenses</h3>
          </div>
          {!hideButtons && (
            <div className="flex gap-2 justify-center w-full">
              <button className="button dark:darkButton">Add Expense</button>
              <button className="button">View Expenses</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
