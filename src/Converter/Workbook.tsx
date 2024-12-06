import { WorkBook } from "xlsx";
import { useWorkbookConverter } from "./use-workbook-converter";

interface WorkbookProps {
  workbook: WorkBook;
}

export function Workbook({ workbook }: WorkbookProps) {
  const { convert, converting } = useWorkbookConverter(workbook);
  return (
    <div>
      <h2>Convert Excel to GTFS</h2>
      <p>Found the following spreadsheets in the given file:</p>
      <ul>
        {workbook.SheetNames.map((sheet) => (
          <li key={sheet}>{sheet}</li>
        ))}
      </ul>
      <button
        onClick={convert}
        disabled={converting}
        className="plausible-event-name=Convert+to+GTFS+file"
      >
        Convert to GTFS file
      </button>
      {converting && <>Converting...</>}
    </div>
  );
}
