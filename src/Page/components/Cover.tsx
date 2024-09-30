// STYLES
import styles from "../styles/Cover.module.css";
import utilsStyles from "../../utils.module.css";
// LIBRARIES
import {
  ChangeEventHandler,
  useRef,
  MouseEventHandler,
  ChangeEvent,
} from "react";
import cx from "classnames";
// STATE
import { useAppState } from "../../state/AppStateContext";
// COMPONENTS
import { FileImage } from "../../components/FileImage";
// UTILS
import { uploadImage } from "../utils/uploadImage";

export const Cover = () => {
  const { setCoverImage, cover, coverColor, setCoverColor } = useAppState();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorInputRef = useRef<HTMLInputElement>(null);

  const onChangeCoverImageClick: MouseEventHandler = () =>
    fileInputRef.current?.click();

  const onCoverImageUpload: ChangeEventHandler<HTMLInputElement> = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.target;
    const result = await uploadImage(target?.files?.[0]);
    if (result?.filePath) setCoverImage(result.filePath);
  };

  const onChangeColorClick: MouseEventHandler = () =>
    colorInputRef.current?.click();

  return (
    <div
      className={styles.cover}
      style={{ backgroundColor: `${coverColor || "#fff"}` }}
    >
      {cover ? (
        <FileImage
          filePath={cover}
          className={styles.image}
          loaderProps={{
            style: {
              height: "min(20vh, 200px)", // 15vh might be better
            },
          }}
        />
      ) : (
        <img src="/dnote.jpg" alt="Cover" className={styles.image} />
      )}
      <button
        className={cx(styles.button, styles["change-cover"])}
        onClick={onChangeCoverImageClick}
      >
        Change cover
      </button>
      {!!cover && (
        <button
          className={cx(styles.button, styles["remove-cover"])}
          onClick={() => setCoverImage("")}
        >
          Remove cover
        </button>
      )}
      <input
        type="color"
        className={styles["color-picker"]}
        ref={colorInputRef}
        onChange={(event) => setCoverColor(event.target.value)}
      />
      <button className={styles.button} onClick={onChangeColorClick}>
        Change color
      </button>
      <input
        className={utilsStyles.none}
        type="file"
        ref={fileInputRef}
        onChange={onCoverImageUpload}
        accept=".png,.jpg,.jpeg,.gif,.webp"
      />
    </div>
  );
};
