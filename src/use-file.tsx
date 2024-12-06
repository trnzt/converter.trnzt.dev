import { createContext, useCallback, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";

export const FileContext = createContext(null);

declare global {
  interface Window {
    plausible: any;
  }
}

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

  const plausible = useCallback(function (...rest: any) {
    (window.plausible.q = window.plausible.q || []).push(...rest);
  }, []);

  const eventedSetSelectedFile = useCallback(
    (value: File | undefined) => {
      plausible("Load file");
      setSelectedFile(value);
    },
    [setSelectedFile, plausible]
  );

  return {
    dropTargetRef,
    selectedFile,
    setSelectedFile: eventedSetSelectedFile,
  };
}
