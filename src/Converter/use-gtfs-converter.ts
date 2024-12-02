import { Entry, TextWriter } from "@zip.js/zip.js";
import { useCallback, useState } from "react";
import { utils, writeFile } from "xlsx";
import { parse } from "csv/browser/esm";

export function useGtfsConverter(zipEntries: Entry[]) {
  const [converting, setConverting] = useState<boolean>(false);
  const convert = useCallback(async () => {
    setConverting(true);
    const workbook = utils.book_new();
    for (const entry of zipEntries) {
      if (!entry.getData) continue;

      const textContent = await entry.getData(new TextWriter());
      const parser = parse({
        trim: true,
        skip_empty_lines: true,
      });

      const sheet = utils.sheet_new();
      let addedFirstBatch = false;
      parser.on("readable", () => {
        let record;
        const records = [];
        while ((record = parser.read()) !== null) {
          records.push(record);
        }

        utils.sheet_add_aoa(sheet, records, {
          origin: addedFirstBatch ? -1 : "A1",
        });
        addedFirstBatch = true;
      });
      parser.end(textContent);

      utils.book_append_sheet(workbook, sheet, entry.filename);
    }

    writeFile(workbook, "gtfs.xlsx", { compression: true });
    setConverting(false);
  }, [zipEntries]);

  return {
    convert,
    converting,
  };
}
