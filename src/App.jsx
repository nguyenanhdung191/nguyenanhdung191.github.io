import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import { pull } from "./utils/fetch";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const result = await pull("/api/programs/lxAQ7Zs9VYR?fields=id,name");
      setData(result);
    })();
  }, []);
  return <div className="App">{JSON.stringify(data)}</div>;
}

export default App;
