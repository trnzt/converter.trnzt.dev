import "water.css";
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
        <h1>GTFS / Excel Converter</h1>
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
