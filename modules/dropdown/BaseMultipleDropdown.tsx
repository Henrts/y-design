import React, { PropsWithChildren, useMemo } from "react";
import { WithStylesProps, ThemeStyleSheetFactory } from "@diana-ui/types";
import { extendStyles, withStyles } from "@diana-ui/base";
import { IPopoverProps, usePopoverRef } from "@diana-ui/popover";
import { useRegistryWithStyles } from "@diana-ui/hooks";
import { IItem, DropdownHeader, styleSheet, IProps } from "./Dropdown";

export interface IMultipleProps<T extends IItem> extends IProps<T> {
  onItemsSelected: (items: T[]) => void;
  selectedItems: T[];
  selectAllText?: string;
  selectAllItem?: (checked: boolean) => React.ReactNode;
  onClose?: () => void;
  renderAllSelectedHeader?: (visible: boolean, isAllButtonChecked: boolean) => JSX.Element;
}

export interface IBaseMultipleDropdownOptions {
  onItemClicked: (item: IItem, selectedItems: IItem[]) => void;
  onAllButtonClicked: () => void;
  isAllButtonChecked: boolean;
}

export interface IRenderItem<T extends IItem> {
  renderItem?: (
    item: T,
    selected: boolean,
    isAllSelected: boolean,
    index?: number
  ) => React.ReactNode;
}

export const styleSheetPopover: ThemeStyleSheetFactory = () => ({
  container: {
    maxWidth: "100%",
    minWidth: 220
  }
});

export type IBaseMultipleDropdownProps<T extends IItem> = PropsWithChildren<
  IMultipleProps<IItem> & WithStylesProps & IBaseMultipleDropdownOptions & IRenderItem<T>
>;

const BaseMultipleDropdown: React.FC<IBaseMultipleDropdownProps<IItem>> = props => {
  const {
    className,
    disabled,
    items,
    selectedItems,
    styles,
    cx,
    selectAllText,
    selectAllItem,
    label,
    placeholder,
    text,
    renderItem,
    renderHeader,
    wrappedRef,
    isAllButtonChecked,
    onItemClicked,
    onAllButtonClicked,
    onClose,
    renderAllSelectedHeader
  } = props;

  const ref = usePopoverRef(wrappedRef);
  const StyledPopover = useRegistryWithStyles<IPopoverProps>("Popover", styleSheetPopover);

  const renderFinalHeader = useMemo(
    () =>
      renderHeader ||
      (() => (
        <DropdownHeader
          text={
            text ?? (selectedItems.length ? selectedItems.map(i => i.text).join(", ") : placeholder)
          }
          cx={cx}
          styles={styles}
        />
      )),
    [renderHeader, text, selectedItems, placeholder, cx, styles]
  );

  return (
    <div className={cx("diana-multiple-dropdown", styles.wrapper, className)}>
      {label && <div className={cx(styles.label)}>{label}</div>}
      <StyledPopover
        wrappedRef={ref}
        {...props}
        disabled={disabled || items.length === 0}
        renderHeader={(isOpen: boolean) =>
          isAllButtonChecked && renderAllSelectedHeader
            ? renderAllSelectedHeader(isOpen, isAllButtonChecked)
            : renderFinalHeader(isOpen)
        }
        useParentWidth
        onHide={onClose}
      >
        <ul className={cx(styles.list)}>
          <li
            className={cx(styles.item, styles.itemAll, isAllButtonChecked && "selected")}
            onClick={onAllButtonClicked}
            role="presentation"
          >
            {selectAllItem?.(isAllButtonChecked) ?? selectAllText}
          </li>
          {items.map((item: IItem, index: number) => (
            <li
              className={cx(styles.item, selectedItems?.find(i => i.id === item.id) && "selected")}
              key={item.id}
              onClick={() => onItemClicked(item, selectedItems)}
              role="presentation"
              title={item.text}
            >
              {renderItem?.(
                item,
                selectedItems.find(i => i.id === item.id) !== undefined,
                isAllButtonChecked,
                index
              ) ?? <span className={cx(styles.itemText)}>{item.text}</span>}
            </li>
          ))}
        </ul>
      </StyledPopover>
    </div>
  );
};

export const multipleStylesheet: ThemeStyleSheetFactory = extendStyles(styleSheet, () => ({
  itemAll: {},
  itemAllSelected: {}
}));

export default withStyles(multipleStylesheet)(BaseMultipleDropdown);
