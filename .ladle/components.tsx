import type { GlobalProvider } from "@ladle/react";
import "../src/styles/app.css";

export const Provider: GlobalProvider = ({ children, globalState }) => {
  return (
    <div className={globalState.theme === "dark" ? "dark" : ""}>
      {children}
    </div>
  );
};
