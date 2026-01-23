import "./App.css";
import { Button } from "@/components/ui/button";

function App() {
  return (
    <>
      <Button>hello</Button>
      <div className="size-10 bg-dot [--dot-color:theme(colors.slate.800)] [--dot-size:0.2rem]"></div>
    </>
  );
}

export default App;
