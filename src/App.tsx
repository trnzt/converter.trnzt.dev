import "water.css";
import "./App.css";
import { Empty } from "./Empty";
import { useFile } from "./use-file";
import { Converter } from "./Converter";

function App() {
  const { dropTargetRef, selectedFile, setSelectedFile } = useFile();

  function onReset() {
    setSelectedFile(undefined);
  }

  return (
    <div className="App" ref={dropTargetRef}>
      <header>
        <img
          src="/apple-touch-icon.png"
          alt="trnzt logo; icons of a bus, boat, bike, and train"
          style={{ display: "block", margin: "auto" }}
          className="invertable"
        />
        <h1>GTFS to spreadsheet converter</h1>
      </header>
      {selectedFile ? (
        <Converter selectedFile={selectedFile} onReset={onReset} />
      ) : (
        <Empty onSelectFile={setSelectedFile} />
      )}
      <footer>
        Made by <a href="https://thzinc.com">thzinc</a>
      </footer>
    </div>
  );
}

export default App;
