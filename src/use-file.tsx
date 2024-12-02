import { BlobReader, TextWriter, ZipReader } from "@zip.js/zip.js";
import { parse } from "csv/browser/esm";
import { createContext, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";

export const FileContext = createContext(null);

interface NativeFiles {
  files: File[];
  items: DataTransferItem[];
}
export function useFile() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const [, dropTargetRef] = useDrop<NativeFiles, Promise<void>, any>(() => ({
    accept: [NativeTypes.FILE],
    async drop(item) {
      const {
        files: [file],
      } = item;
      setSelectedFile(file);
    },
  }));

  useEffect(() => {
    console.debug({ selectedFile });
  }, [selectedFile]);

  return {
    dropTargetRef,
    selectedFile,
    setSelectedFile,
  };
}
