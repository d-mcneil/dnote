import { HTMLAttributes } from "react";
import cx from "classnames";
import styles from "./Loader.module.css";
import utilStyles from "../utils.module.css";

// https://loading.io/css/

export const Loader = (props: HTMLAttributes<HTMLDivElement> = {}) => {
  const wrapperProps = { ...props, className: undefined };
  return (
    <div
      {...wrapperProps}
      className={cx(utilStyles.centeredFlex, {
        ...(props.className
          ? {
              [props.className as string]: !!props.className,
            }
          : {}),
      })}
    >
      <div className={styles.loader}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
