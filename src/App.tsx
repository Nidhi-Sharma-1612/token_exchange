import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import TokenContextProvider from "./components/TokenContext";

function App() {
  return (
    <div style={{ height: 100 }}>
      <TokenContextProvider>
        <Navbar />
        <Home />
      </TokenContextProvider>
    </div>
  );
}

export default App;
