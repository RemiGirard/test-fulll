import {useEffect, useState} from "react";

type Props = {
  className?: string;
  placeholder?: string;
  onDebounce: (value: string) => void;
};

export default function TextInputDebounced({className, placeholder, onDebounce}: Props) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      onDebounce(value);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [value, onDebounce]);

  return (<input
    className={className ?? ""}
    type="text"
    placeholder={placeholder ?? ""}
    value={value}
    onChange={(e) => setValue(e.target.value)}
  />);
}
