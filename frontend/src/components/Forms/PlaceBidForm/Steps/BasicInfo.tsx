import { forwardRef } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { CalendarIcon } from "../../../../assets/icons";
import Button, { ButtonStyles } from "../../../Button/Button";
import DatePicker from "../../../Inputs/DatePicker/DatePicker";
import { MediaInput } from "../../../Inputs/MediaInput/MediaInput";
import TextArea from "../../../Inputs/TextArea/TextArea";

const MAX_FILE_SIZE = 10000000;
const allowedFileTypes = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/jpg",
  "application/pdf",
];

interface DateButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value?: string;
}

const DateButton = forwardRef<HTMLButtonElement, DateButtonProps>(
  ({ value, onClick }, ref) => (
    <Button
      buttonStyle={ButtonStyles.SECONDARY}
      LeftIcon={CalendarIcon}
      onClick={onClick}
      ref={ref}
      text={value}
    />
  )
);

const BasicInfoElement = () => {
  const {
    control,
    setError,
    clearErrors,
    setValue,
    register,
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
    <>
      <TextArea
        id="basic-info-description"
        label="Brief Description"
        rows={3}
        placeholder={"Enter a description for your bid"}
        {...register("description")}
      />
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
            title="Detailed Proposal"
          />
        )}
      />
      <Controller
        control={control}
        name={"availability"}
        render={({ field }) => (
          <DatePicker
            id={"availability"}
            selected={field.value as Date}
            onChange={(date: Date | null) => field.onChange(date)}
            customInput={<DateButton />}
            label={"Availability Range"}
          />
        )}
      />
      <p>Cost Table Breakdown</p>
    </>
  );
};

export const BasicInfo = {
  title: "Basic Info",
  Element: BasicInfoElement,
  description: "Please enter some basic details about your bid.",
};
