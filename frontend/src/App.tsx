import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { ProjectsPage } from "./pages/ProjectsPage";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ProjectsPage />
    </QueryClientProvider>
  );
}

export default App;
