import {
  useState,
  FC,
  useCallback,
  ChangeEvent,
  useRef,
  DragEvent,
} from "react";
import { useMobileMediaQuery } from "../../hooks/useMobileMediaQuery";
import styles from "./FileInput.module.css";
import classNames from "classnames";

type TFileInput = {
  onFileSelect: (file: File) => void;
  error?: string;
  onBlurProp?:  (e?: React.FocusEvent<HTMLInputElement>) => void,
  defaultImageUrl?: string;
  [x: string]: any;
};

export const FileInput: FC<TFileInput> = ({
  onFileSelect,
  onBlurProp,
  error,
  defaultImageUrl,
  ...rest
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDrag, setDrad] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState<boolean>(false);

  const isMobile = useMobileMediaQuery();

  const inputClasses = classNames(styles.label, {
    [styles.labelMobile]: isMobile,
    [styles.labelDesctop]: !isMobile,
    [styles.focus]: focus,
    [styles.error]: Boolean(error),
    [styles.dragged]: isDrag,
  });

  const imageClasses = classNames(styles.image);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      onFileSelect(selectedFile);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDrad(true);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDrad(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      setFile(droppedFile);
      onFileSelect(droppedFile);
    }
  };

  const handleInputFocus = useCallback(
    (e?: React.FocusEvent<HTMLInputElement>) => {
      setFocus(true);
    },
    [setFocus]
  );

  const handleInputBlur = useCallback(
    (e?: React.FocusEvent<HTMLInputElement>) => {
      setFocus(false);
      if (typeof onBlurProp === 'function') {
        onBlurProp(e)
      }
    },
    [setFocus]
  );

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`${styles.wrapper}`}>
      <div
        onClick={openFileDialog}
        onDragLeave={() => setDrad(false)}
        onDragEnd={() => setDrad(false)}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className={inputClasses}
      >
        {file ? (
          <img className={imageClasses} src={URL.createObjectURL(file)} />
        ) : defaultImageUrl ? (
          <img className={imageClasses} src={defaultImageUrl} />
        ) : null}

        <input
          type="file"
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className={styles.input}
          ref={fileInputRef}
          onChange={handleFileChange}
          {...rest}
        />
      </div>
      <p className={styles.errorMessage}>{error || ""}</p>
    </div>
  );
};
