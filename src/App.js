import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import BudgetApp from "./components/BudgetApp";
import useLocalStorage from "./hooks/useLocalStorage";
import { useTheme } from "./contexts/ThemeContext";

function App() {
  const { isDark } = useTheme();

  return (
    <main className={isDark && "dark"}>
      <div className="text-yellow-900 bg-stone-50 dark:text-white dark:bg-slate-900 min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<BudgetApp />} />
        </Routes>
      </div>
    </main>
  );
}

export default App;
