// STYLES
import styles from "../styles/Node.module.css";
import utilsStyles from "../../utils.module.css";
// LIBRARIES
import cx from "classnames";
import { useMatch } from "react-router-dom";
import {
  ChangeEvent,
  MouseEventHandler,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
// TYPES
import { NodeProps } from "../../types/types";
// STATE
import { useAppState } from "../../state/AppStateContext";
// COMPONENTS
import { FileImage } from "../../components/FileImage";
// UTILS
import { uploadImage } from "../../Page/utils/uploadImage";
import ImageNodeArrow from "../utils/ImageNodeArrow.svg";

export const ImageNode = ({ node, index }: NodeProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    removeNodeByIndex,
    focusedNodeIndex,
    changeNodeValue,
    changeNodeType,
    setFocusedNodeIndex,
  } = useAppState();

  const isFocused = index === focusedNodeIndex;

  const [isUploading, setIsUploading] = useState(false);

  const matchStartDemo = useMatch("/start-demo");
  const matchUntitledDemo = useMatch("/untitled-demo");
  const isDemo = !!matchStartDemo || !!matchUntitledDemo;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event;
      if (key === "Backspace" || key === "Delete") {
        event.preventDefault();
        removeNodeByIndex(index);
      }
    };
    if (isFocused) window.addEventListener("keydown", handleKeyDown);
    else window.removeEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, node, removeNodeByIndex]);

  const onImageUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ): Promise<void> => {
    if (node.value) return setIsUploading(false);
    try {
      setIsUploading(true);
      const { target } = event;
      if (!target.files) throw new Error("No image file selected");
      const result = await uploadImage(target.files?.[0]);
      if (result?.filePath) changeNodeValue(index, result.filePath);
      else throw new Error("Image upload failed");
    } catch (error) {
      changeNodeType(index, "text");
    } finally {
      setIsUploading(false);
    }
  };

  const handleButtonUploadClick: MouseEventHandler = (
    event: MouseEvent
  ): void => {
    event.stopPropagation();
    if (isDemo) {
      setIsUploading(false);
      return changeNodeValue(index, "0.6990788632294302.jpg");
    }
    fileInputRef.current?.click();
  };

  const handleFocusNode: MouseEventHandler = (): void =>
    setFocusedNodeIndex(index);

  return (
    <div
      className={cx(styles.node, styles.image, utilsStyles["cursor-default"], {
        [styles.focused]: isFocused,
      })}
      onClick={handleFocusNode}
    >
      {!isUploading && !node.value ? (
        <>
          <img
            src={ImageNodeArrow}
            alt="Image Node Arrow"
            className={styles["image-arrow"]}
          />
          <button
            onClick={handleButtonUploadClick}
            className={styles["upload-button"]}
          >
            Upload image
          </button>
          <input
            type="file"
            className={utilsStyles.none}
            ref={fileInputRef}
            onChange={onImageUpload}
            accept=".png,.jpg,.jpeg,.gif,.webp" // image/jpeg, image/png, image/gif, image/webp
          />
        </>
      ) : (
        <FileImage filePath={node.value} className={styles["image-img"]} />
      )}
    </div>
  );
};
