import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ThemeStyleSheetFactory,
  StandardProps,
  WithStylesProps
} from "@diana-ui/types";
import { withStyles } from "@diana-ui/base";
import { ButtonText } from "@diana-ui/typography";

// @ts-ignore
export interface IProps extends StandardProps<"input"> {
  min?: number;
  max?: number;
  step?: number;
  value?: number;
  onChange?: (value: number) => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  container: {
    boxSizing: "border-box",
    margin: 0,
    "@selectors": {
      "&:hover :not(.disabled).value": {}
    }
  },
  button: {
    outline: "none",
    cursor: "pointer",
    "@selectors": {
      "&.disabled": {
        cursor: "initial"
      }
    }
  },
  buttonMin: {},
  buttonMax: {},
  value: {
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "center",
    "@selectors": {
      "&.disabled": {},
      "&.focus:not(.disabled)": {}
    }
  }
});

const InputSpinner: React.FC<IProps & WithStylesProps> = ({
  styles,
  cx,
  className,
  value,
  onChange,
  min,
  max,
  step,
  disabled
}) => {
  const [_value, setValue] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const containerStyle = cx("container", styles.container, className);
  const buttonStyle = cx("button", styles.button, disabled && "disabled");
  const valueStyle = cx(
    "value",
    styles.value,
    disabled && "disabled",
    isFocused && "focus"
  );

  useEffect(() => {
    if (value) {
      setValue(value);
    }
  }, [value]);

  const fixedValue = useMemo(() => {
    const valueState = value ?? _value;
    if (!valueState) {
      return "00";
    }
    if (valueState < 10 && valueState > 0) {
      return `0${valueState}`;
    }
    return valueState;
  }, [_value, value]);

  const changeValue = useCallback(
    newValue => {
      if (disabled) return;

      setValue(newValue);
      return onChange?.(newValue);
    },
    [onChange, disabled]
  );

  const increase = useCallback(() => {
    const newValue = max
      ? Math.min(max, _value + (step ?? 1))
      : _value + (step ?? 1);
    changeValue(newValue);
  }, [_value, step, max, changeValue]);

  const decrease = useCallback(() => {
    const newValue = min
      ? Math.max(min, _value - (step ?? 1))
      : _value - (step ?? 1);
    changeValue(newValue);
  }, [_value, step, min, changeValue]);

  return (
    <div className={containerStyle}>
      <button
        type="button"
        className={cx(buttonStyle, styles.buttonMin)}
        onClick={decrease}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      >
        <ButtonText>-</ButtonText>
      </button>
      <span className={valueStyle}>{fixedValue}</span>
      <button
        type="button"
        className={cx(buttonStyle, styles.buttonMax)}
        onClick={increase}
        onBlur={() => setIsFocused(false)}
        onFocus={() => setIsFocused(true)}
      >
        <ButtonText>+</ButtonText>
      </button>
    </div>
  );
};

export default withStyles(styleSheet)(InputSpinner);
