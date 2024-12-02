interface EmptyProps {
  onSelectFile?: (file: File) => void;
}

export function Empty({ onSelectFile }: EmptyProps) {
  return (
    <div>
      <p>This page doesn't upload your file to any servers, it's all local</p>
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
