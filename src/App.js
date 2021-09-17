import logo from "./logo.svg";
import "./App.css";
import ResponsiveChart from "./components/ResponsiveChart";

function App() {
  const dataArray = [3000, 2000, 1000];
  const dataLabel = ["January", "February", "March"];

  return (
    <div className="App">
      <h1>Demo Of How to Customize Chart JS</h1>
      <ResponsiveChart dataArray={dataArray} dataLabel={dataLabel} />
    </div>
  );
}

export default App;
