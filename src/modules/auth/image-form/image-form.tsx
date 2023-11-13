import React, {
  FormEvent,
  useState,
} from "react";
import { Button, FileInput } from "../../../common/components/exports";
import { saveImageRequest } from "../../../api/auth/save-image";
import styles from './image-form.module.css'

export const SaveImageForm = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileSelect = (data: File) => {
    setFile(data);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      console.error("Файл не выбран");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    saveImageRequest(formData);
  };
  return (
    <div>
      <form
        className={styles.form}
        onSubmit={onSubmit}
      >
        {" "}
        
        <FileInput onFileSelect={handleFileSelect} />
        <p>Перетащите или кликните, чтобы выбрать файл</p>
        <Button htmlType="submit" isPrime>
          Save
        </Button>
      </form>
    </div>
  );
};
