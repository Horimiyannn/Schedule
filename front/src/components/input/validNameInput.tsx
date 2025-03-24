import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  type: "text" | "number" | "email" | "password";
  value: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  errors: (e: boolean) => void;
};

const ValidInput = (props: Props) => {
  const [error, setError] = useState("");

  useEffect(() => {
    if (props.max && props.min && props.value.length == 0) {
      setError("Іде?");
      props.errors(true);
    } else if (props.max && props.value.length >= props.max) {
      setError("Великий");
      props.errors(true);
    } else if (props.min && props.value.length <= props.min) {
      setError("Маленький");
      props.errors(true);
    } else {
      setError("");
      props.errors(false);
    }
  }, [props.value, props.min, props.max, props.errors, props]);

  return (
    <div>
      <input {...props} />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default ValidInput;
