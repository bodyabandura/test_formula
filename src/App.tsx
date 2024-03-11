import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import FormulaInput from "./components/FormulaInput";

const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="p-20">
        <h1 className="font-bold text-3xl">Formula Editor</h1>
        <FormulaInput />
      </div>
    </QueryClientProvider>
  );
};

export default App;
