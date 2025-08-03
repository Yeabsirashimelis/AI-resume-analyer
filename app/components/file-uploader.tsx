import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { formatSize } from "~/lib/utils";

interface FileUPloaderProps {
  onFileSelect?: (file: File | null) => void;
}

export default function FileUploader({ onFileSelect }: FileUPloaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0] || null;
      setSelectedFile(file);
      onFileSelect?.(file);
    },
    [onFileSelect],
  );

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedFile(null);
    onFileSelect?.(null);
  };
  const maxFileSize = 20 * 1024 * 1024;

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      multiple: false,
      accept: { "application/pdf": [".pdf"] },
      maxSize: maxFileSize,
    });

  const file = acceptedFiles[0] || null;

  return (
    <div className="gradient-border w-full">
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="cursor-pointer space-y-4">
          {selectedFile ? (
            <div
              className="uploader-selected-file"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="flex items-center space-x-3">
                <img src="/images/pdf.png" alt="pdf" className="size-10" />
                <div>
                  <p className="max-w-xs truncate text-sm font-medium text-gray-700">
                    {selectedFile?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatSize(selectedFile?.size)}
                  </p>
                </div>
              </div>

              <button
                className="cursor-pointer p-2"
                type="button"
                onClick={handleRemoveFile}
              >
                <img src="/icons/cross.svg" alt="remove" className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div>
              <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center">
                <img src="/icons/info.svg" alt="upload" className="size-20" />
              </div>
              <p className="text-lg text-gray-500">
                <span className="font-semibold">Click to upload</span>
                or drag and drop
              </p>
              <p className="text-lg text-gray-500">
                PDF (max {formatSize(maxFileSize)})
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
