import { MediaInput } from "../../../Inputs/MediaInput/MediaInput";

const UploadMediaElement = () => {
  return (
    <MediaInput
      id="property-media-input"
      label="Please upload any PNGs, JPGs, or PDFs related to your property."
    />
  );
};

export const UploadMedia = {
  title: "Upload Attachments",
  Element: UploadMediaElement,
  description:
    "Please upload any relevant attachments or media for this property.",
};
