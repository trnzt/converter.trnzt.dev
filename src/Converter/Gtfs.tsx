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
      <table>
        <thead>
          <tr>
            <th>GTFS file name</th>
            <th>Action</th>
            <th>Excel sheet name</th>
          </tr>
        </thead>
        <tbody>
          {zipEntries.map((entry, i) => (
            <tr key={entry.filename}>
              <td>{entry.filename}</td>
              <td>tbd</td>
              <td>{entry.filename}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={convert} disabled={converting}>
        Convert to Excel workbook
      </button>
      {converting && <>Converting...</>}
    </div>
  );
}
