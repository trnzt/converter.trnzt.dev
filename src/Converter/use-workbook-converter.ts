import { BlobWriter, TextReader, ZipWriter } from "@zip.js/zip.js";
import { useCallback, useState } from "react";
import { utils, WorkBook } from "xlsx";

export function useWorkbookConverter(workbook: WorkBook) {
  const [converting, setConverting] = useState<boolean>(false);
  const convert = useCallback(async () => {
    setConverting(true);
    const writer = new BlobWriter("application/zip");
    const zip = new ZipWriter(writer);
    for (const sheetName of workbook.SheetNames) {
      const sheet = workbook.Sheets[sheetName];
      const csv = utils.sheet_to_csv(sheet, {
        blankrows: false,
        rawNumbers: true,
        forceQuotes: false,
      });

      zip.add(sheetName, new TextReader(csv));
    }
    zip.close();

    const a = document.createElement("a");
    a.href = URL.createObjectURL(await writer.getData());
    a.setAttribute("download", "gtfs.zip");

    document.body.appendChild(a);
    a.click();
    a.parentNode?.removeChild(a);

    setConverting(false);
  }, [workbook]);

  return {
    convert,
    converting,
  };
}
