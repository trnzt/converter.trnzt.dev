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
      <ul>
        {workbook.SheetNames.map((sheet) => (
          <li key={sheet}>{sheet}</li>
        ))}
      </ul>
      <button onClick={convert} disabled={converting}>
        Convert to GTFS file
      </button>
      {converting && <>Converting...</>}
    </div>
  );
}
