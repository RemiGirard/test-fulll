import React, { forwardRef } from "react";
import styles from "./StyledCheckbox.module.css";

type Props = React.InputHTMLAttributes<HTMLInputElement>;

const StyledCheckbox = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <input
      type="checkbox"
      {...props}
      ref={ref}
      className={`${styles.checkbox} ${props.className}`}
    />
  );
});

export default StyledCheckbox;
