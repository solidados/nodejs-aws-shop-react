import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";

type CSVFileImportProps = {
  url: string;
  title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
  const [file, setFile] = React.useState<File>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const files: FileList | null = e.target.files;
    if (files && files.length > 0) {
      const file: File = files[0];
      console.log(`File upload: ${file}`);
      setFile(file);
    }
  };

  const removeFile = (): void => {
    setFile(undefined);
  };

  const uploadFile = async (): Promise<void> => {
    console.log(`uploadFile to: ${url}`);

    // Get the pre-signed URL
    if (file) {
      const response = await axios({
        method: "GET",
        url,
        params: {
          name: encodeURIComponent(file.name),
        },
      });
      console.log(`File to upload: ${file.name}`);
      console.log(`Uploading to: ${response.data}`);

      const result: Response = await fetch(response.data, {
        method: "PUT",
        body: file,
      });
      console.log(`Result: ${result}`);
      setFile(undefined);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {!file ? (
        <input type="file" onChange={onFileChange} />
      ) : (
        <div>
          <button onClick={removeFile}>Remove file</button>
          <button onClick={uploadFile}>Upload file</button>
        </div>
      )}
    </Box>
  );
}
