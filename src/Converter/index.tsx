import { BlobReader, Entry, ZipReader } from "@zip.js/zip.js";
import { useEffect, useState } from "react";
import { read, WorkBook } from "xlsx";
import { Gtfs } from "./Gtfs";
import { Workbook } from "./Workbook";
interface ConverterProps {
  selectedFile: File;
  onReset: () => void;
}
enum FileTypes {
  Unknown,
  GTFS,
  Workbook,
}
export function Converter({ selectedFile, onReset }: ConverterProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [fileType, setFileType] = useState<FileTypes>(FileTypes.Unknown);
  const [workbook, setWorkbook] = useState<WorkBook>();
  const [zipEntries, setZipEntries] = useState<Entry[]>();

  useEffect(() => {
    setLoading(true);
    setWorkbook(undefined);
    setZipEntries(undefined);

    (async function () {
      try {
        const ab = await selectedFile.arrayBuffer();
        const wb = read(ab);

        setFileType(FileTypes.Workbook);
        setWorkbook(wb);
      } catch {
        try {
          const zr = new ZipReader(new BlobReader(selectedFile));
          const entries = (await zr.getEntries()).filter(
            (e) => !e.directory && !e.encrypted
          );

          setFileType(FileTypes.GTFS);
          setZipEntries(entries);
        } catch {
          setFileType(FileTypes.Unknown);
        }
      }
      setLoading(false);
    })();
  }, [selectedFile]);

  let content;
  if (loading) {
    content = <>Loading...</>;
  } else {
    switch (fileType) {
      case FileTypes.GTFS:
        content = <Gtfs zipEntries={zipEntries!} />;
        break;
      case FileTypes.Workbook:
        content = <Workbook workbook={workbook!} />;
        break;
      case FileTypes.Unknown:
      default:
        content = (
          <>
            This file doesn't look like either a GTFS file nor a spreadsheet
            workbook.
          </>
        );
    }
  }

  return (
    <div>
      <div>
        <button onClick={onReset} className="plausible-event-name=Start+Over">
          Start over
        </button>
      </div>
      {content}
    </div>
  );
}
