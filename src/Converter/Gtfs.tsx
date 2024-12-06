import { Entry } from "@zip.js/zip.js";
import { useGtfsConverter } from "./use-gtfs-converter";

interface GtfsProps {
  zipEntries: Entry[];
}

export function Gtfs({ zipEntries }: GtfsProps) {
  const { convert, converting } = useGtfsConverter(zipEntries);

  return (
    <div>
      <h2>Convert GTFS to Excel</h2>
      <p>Found the following files in the given file:</p>
      <ul>
        {zipEntries.map((entry) => (
          <li key={entry.filename}>{entry.filename}</li>
        ))}
      </ul>
      <button
        onClick={convert}
        disabled={converting}
        className="plausible-event-name=Convert+to+Excel+workbook"
      >
        Convert to Excel workbook
      </button>
      {converting && <>Converting...</>}
    </div>
  );
}
