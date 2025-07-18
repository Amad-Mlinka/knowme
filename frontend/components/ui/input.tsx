import React from "react";
import clsx from "clsx";
import styles from "./Input.module.scss";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return <input className={clsx(styles.input, className)} {...props} />;
};

export default Input; 