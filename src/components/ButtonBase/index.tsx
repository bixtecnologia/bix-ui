import classNames from "classnames";

interface ButtonBaseProps {
  onClick?: () => void;
  href?: string;
  label: string;
  theme: "primary" | "secondary";
}

export default function ButtonBase({
  onClick,
  href,
  label,
  theme,
}: ButtonBaseProps) {
  let baseClass = "px-4 py-2 rounded text-white font-semibold";

  const buttonThemes = {
    primary: "bg-blue-500",
    secondary: "bg-gray-500",
  };

  if (href) {
    return (
      <a href={href} className={classNames(baseClass, buttonThemes[theme])}>
        {label}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={classNames(baseClass, buttonThemes[theme])}
    >
      {label}
    </button>
  );
}
