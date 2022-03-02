import { Switch } from "@headlessui/react";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import logo from "../assets/BudgetbeeLogo.png";
import darkLogo from "../assets/BudgetbeeLogoWhite.png";
import { useTheme } from "../contexts/ThemeContext";
const Navbar = () => {
  const { isDark, setIsDark } = useTheme();

  return (
    <>
      <nav className="w-full h-[70px] bg-yellow-200 border-b-2 border-yellow-300 dark:bg-slate-800 dark:border-slate-700 flex justify-between px-4">
        <div className="flex items-center h-full">
          <img
            src={isDark ? darkLogo : logo}
            alt="budgetbee logo"
            className="h-full w-auto py-2"
          />
          <h1 className="ml-2 text-2xl">Budget Bee</h1>
        </div>
        <div className="flex items-center h-full">
          <div className="mr-2">
            <MdOutlineLightMode
              className={`${isDark && "hidden"} w-8 h-8 text-yellow-500`}
            />
            <MdOutlineDarkMode
              className={`${!isDark && "hidden"} w-8 h-8 text-white`}
            />
          </div>

          <Switch
            checked={isDark}
            onChange={setIsDark}
            className={`${isDark ? "bg-slate-700" : "bg-yellow-500"}
          relative inline-flex flex-shrink-0 h-[30px] w-[64px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span className="sr-only">Use setting</span>
            <span
              aria-hidden="true"
              className={`${isDark ? "translate-x-[2.125rem]" : "translate-x-0"}
            pointer-events-none inline-block h-[26px] w-[26px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
            />
          </Switch>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
