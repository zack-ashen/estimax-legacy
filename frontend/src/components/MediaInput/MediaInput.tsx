import { useState } from 'react';
import { ReactComponent as ImageAddIcon } from '../../assets/ImageAddIcon.svg';
import { ReactComponent as CloseIcon } from '../../assets/CloseIcon.svg';
import styles from './MediaInput.module.scss'

interface MediaInputProps {
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function MediaInput({ setFiles }: MediaInputProps) {
  const [ error, setError ] = useState<string | undefined>();
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = Array.from(event.target.files!);
    const maxSizeInBytes = 1048576; // 1MB
    const allowedFileTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];


    for (const file of files) {
      if (file.size > maxSizeInBytes) {
        setError('File is too big! Please select a file that is under 1MB.')
        return;
      } else if (!allowedFileTypes.includes(file.type)) {
        setError('Invalid file type! Please select a file that is a png, jpeg, or gif.')
        return;
      }
    }

    if (selectedImages.length >= 10) {
      setError('You can only upload 10 images!')
      return;
    }

    const filesArray = files.map((file) =>
      URL.createObjectURL(file)
    );

    setSelectedImages((prevImages) => prevImages.concat(filesArray));

  
    setFiles((prevFiles: File[]) => prevFiles.concat(files));

    setError(undefined);

    if (event.target) event.target.value = '';
  };

  const removeImage = (imageIndex: number) => {
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(imageIndex, 1);
      return newImages;
    })
    setFiles((prevFiles) => {
      const newFiles = [...prevFiles];
      newFiles.splice(imageIndex, 1);
      return newFiles;
    })
}

  return (
    <div className={styles.MediaInputContainer}>
      <div className={`${styles.MediaInput} ${styles[error ? 'error' : '']}`}>
        <div className={styles.iconContainer}>
          <ImageAddIcon className={styles.icon}/>
        </div>
        <p>Click to upload an image.</p>
        <input 
          type='file'
          onChange={handleFileChange}
          multiple
        />
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
      <div className={styles.imgPreviewContainer}>
        {selectedImages && selectedImages.map((image, index) => (
          <div className={styles.imgContainer} key={`Container ${index}`}>
            <img 
              className={styles.imgPreview}
              src={image} 
              alt={`Project preview ${index}`} 
              key={index} />
            <button className={styles.deleteImage} onClick={() => removeImage(index)} key={`Remove button ${index}`}>
              <CloseIcon className={styles.closeIcon} key={`Close Icon ${index}`}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}