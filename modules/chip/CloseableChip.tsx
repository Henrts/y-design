import React from "react";
import { Icon } from "@diana-ui/icon";
import { withStyles } from "@diana-ui/base";
import { useRegistryWithStyles } from "@diana-ui/hooks";
import { Theme, WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { IProps as BaseChipProps } from "./BaseChip";

export interface IProps extends BaseChipProps {
  onClose: () => void;
}

const styleSheet: ThemeStyleSheetFactory = (theme: Theme) => ({
  chip: {
    justifyContent: "space-between"
  },
  deleteIcon: {
    display: "flex",
    justifyContent: "center",
    padding: `0 ${theme.spaceUnit.xxs}`,
    marginLeft: theme.spaceUnit.xs,
    cursor: "pointer",
    ":hover": {
      stroke: theme.colors.black
    }
  }
});

const CloseableChip: React.FC<IProps & WithStylesProps> = ({
  onClose = () => {},
  renderRightIcon,
  styles,
  cx,
  ...props
}) => {
  const CloseableChipStyle = useRegistryWithStyles<BaseChipProps>("BaseChip", styleSheet);
  return (
    <CloseableChipStyle
      {...props}
      renderRightIcon={() => (
        <div
          onClick={e => {
            onClose();
            e.stopPropagation();
          }}
          className={cx(styles.deleteIcon)}
        >
          {renderRightIcon ? renderRightIcon() : <Icon name="close" size={8} />}
        </div>
      )}
    />
  );
};

CloseableChip.displayName = "CloseableChip";

export default withStyles(styleSheet, { register: true })(CloseableChip);
