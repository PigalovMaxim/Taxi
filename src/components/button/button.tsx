import classNames from "classnames";
import { ButtonProps } from "./button.options";

function Button({ title, className, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "bg-yellow-300 hover:bg-yellow-500 transition-colors rounded-lg",
        className
      )}
    >
      {title}
    </button>
  );
}

export default Button;
