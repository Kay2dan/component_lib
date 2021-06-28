import { FC } from "react";

interface BtnGenericFCType {
  parentClasses?: string;
  classes?: string;
  disabled?: boolean;
  onClickHandler: () => void;
  type?: "button" | "submit" | "reset"
}

const BtnGeneric: FC<BtnGenericFCType> = ({
  children,
  parentClasses = "",
  classes = "",
  disabled = false,
  onClickHandler,
  type = "button",
}) => {
  return (
    <div className={parentClasses}>
      <button
        className={`${classes}`}
        type={type}
        disabled={disabled}
        onClick={onClickHandler}>
        {children}
      </button>
    </div>
  );
};

export default BtnGeneric;
