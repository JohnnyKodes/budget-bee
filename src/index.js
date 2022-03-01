import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { BudgetsProvider } from "./contexts/BudgetsContext";
import { ThemeProvider } from "./contexts/ThemeContext";

ReactDOM.render(
  <ThemeProvider>
    <Router>
      <BudgetsProvider>
        <App />
      </BudgetsProvider>
    </Router>
  </ThemeProvider>,
  document.getElementById("root")
);
