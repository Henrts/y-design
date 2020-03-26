import React, { useState } from "react";
import { withStyles } from "@diana-ui/base";
import { ThemeStyleSheetFactory, WithStylesProps } from "@diana-ui/types";
import { Icon } from "@diana-ui/icon";
import Slider, { ISliderProps } from "./Slider";

export interface ILockedSliderProps extends ISliderProps {
  startLocked?: boolean;
  lockedIcon?: string;
  unlockedIcon?: string;
  disabledIcon?: string;
  className?: string;
  onLockChange?: (locked: boolean) => void;
}

const styleSheet: ThemeStyleSheetFactory = theme => ({
  lockWrapper: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1
  },
  iconWrapper: {
    marginLeft: theme.spaceUnit.md
  },
  icon: {},
  disabledIcon: {}
});

const StyledSlider = Slider.extendStyles(theme => ({}));

const LockedSlider: React.FC<ILockedSliderProps & WithStylesProps> = ({
  cx,
  styles,
  onValueChange,
  onLockChange,
  startLocked = false,
  lockedIcon,
  unlockedIcon,
  disabledIcon,
  className = "",
  disabled,
  ...props
}) => {
  const [isLocked, setIsLocked] = useState(startLocked);
  const icon = disabled ? disabledIcon : isLocked ? lockedIcon : unlockedIcon;
  return (
    <div className={cx(styles.lockWrapper, className)}>
      <StyledSlider
        disabled={isLocked || disabled}
        inputClassName={cx(isLocked && !disabled && "locked")}
        onValueChange={(!isLocked && onValueChange) || (() => {})}
        {...props}
      />
      <div
        className={cx(styles.iconWrapper, disabled && styles.disabledIcon)}
        onClick={() => {
          if (disabled) {
            return;
          }
          // eslint-disable-next-line mdx/no-unused-expressions
          onLockChange?.(!isLocked);
          setIsLocked(!isLocked);
        }}
      >
        <Icon className={cx(styles.icon)} name={icon as any} />
      </div>
    </div>
  );
};

export default withStyles(styleSheet)(LockedSlider);
