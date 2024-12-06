interface EmptyProps {
  onSelectFile?: (file: File) => void;
}

export function Empty({ onSelectFile }: EmptyProps) {
  return (
    <div>
      <p>
        If you have a GTFS file that you would like to edit in a spreadsheet,
        use this page to convert the GTFS file to an Excel workbook. This also
        works in reverse: use this page to convert an Excel workbook into a GTFS
        file.
      </p>
      <p>
        This page performs the conversion in your browser without uploading your
        files to any server.
      </p>
      <p>
        Choose a file (or drag the file here)
        <input
          type="file"
          onChange={(ev) => {
            if (!onSelectFile) return;

            const files = ev.target.files || [];
            if (files.length === 0) return;

            onSelectFile(files[0]);
          }}
        />
      </p>
    </div>
  );
}
