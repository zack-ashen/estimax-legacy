import { Controller, useFormContext } from "react-hook-form";
import { MediaInput } from "../../../Inputs/MediaInput/MediaInput";

const MAX_FILE_SIZE = 10000000;
const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/jpg",
  "application/pdf",
];

const UploadMediaElement = () => {
  const {
    control,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useFormContext();

  const handleFilesChange = (fileList: File[]) => {
    let isValid = true;
    const validFiles: File[] = [];

    fileList.forEach((file) => {
      if (!allowedFileTypes.includes(file.type)) {
        setError("media", {
          type: "manual",
          message: `${file.name}: Invalid file type`,
        });
        isValid = false;
      } else if (file.size > MAX_FILE_SIZE) {
        setError("media", {
          type: "manual",
          message: `${file.name}: File too large`,
        });
        isValid = false;
      } else {
        validFiles.push(file);
      }
    });

    if (isValid) {
      clearErrors("media");
    }

    setValue("media", validFiles, { shouldValidate: true });
  };

  return (
    <Controller
      name="media"
      control={control}
      defaultValue={[]}
      rules={{
        validate: {
          checkNoErrors: () => {
            return !errors.media || (errors.media.message as string);
          },
          checkFileCount: (files: File[]) => {
            return (
              files.length <= 10 ||
              "You can only upload a maximum of 10 files at a time"
            );
          },
        },
      }}
      render={({ field: { value } }) => (
        <MediaInput
          id="media-input"
          label="Upload PDFs, JPGs, or PNGs relating to your property."
          onChange={(files) => handleFilesChange(files)}
          value={value}
          error={errors.media?.message as string}
        />
      )}
    />
  );
};

export const UploadMedia = {
  title: "Upload Attachments",
  Element: UploadMediaElement,
  description:
    "Please upload any relevant attachments or media for this property.",
};
