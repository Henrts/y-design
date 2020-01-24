import React, { PropsWithChildren, useMemo } from "react";
import { IItem, DropdownHeader, styleSheet, IProps } from "./Dropdown";
import { WithStylesProps, ThemeStyleSheetFactory, withStyles } from "../..";
import StyledPopover from "../Popover/Popover";
import extendStyles from "../../base/extendStyles";

interface IMultipleProps<T extends IItem> extends IProps<T> {
  onItemsSelected: (items: T[]) => void;
  selectedItems: T[];
  selectAllText?: string;
  selectAllItem?: React.ReactNode;
}

const BaseMultipleDropdown: React.FC<PropsWithChildren<
  IMultipleProps<IItem> & WithStylesProps
>> = props => {
  const {
    items,
    onItemsSelected,
    selectedItems,
    styles,
    cx,
    selectAllText,
    selectAllItem,
    label,
    placeholder,
    text,
    renderItem,
    renderHeader
  } = props;

  const header = useMemo(
    () =>
      renderHeader ? (
        renderHeader()
      ) : (
        <DropdownHeader
          label={label}
          text={
            text ??
            (selectedItems.length
              ? selectedItems.map(i => i.text).join(", ")
              : placeholder)
          }
          cx={cx}
          styles={styles}
        />
      ),
    [renderHeader, label, text, selectedItems, placeholder, cx, styles]
  );

  return (
    <StyledPopover {...props} header={header}>
      <div className={cx(styles.list)}>
        <div
          className={cx(
            styles.item,
            styles.itemAll,
            selectedItems.length === items.length && styles.selected,
            selectedItems.length === items.length && styles.itemAllSelected
          )}
          onClick={() => onItemsSelected([...items])}
        >
          {selectAllItem ?? selectAllText}
        </div>
        {items.map((item: IItem, index: number) => (
          <div
            className={cx(
              styles.item,
              selectedItems?.find(i => i.id === item.id) ? styles.selected : {}
            )}
            key={item.id}
            onClick={() => {
              let newItems = [...selectedItems];
              const selected =
                newItems.find(i => i.id === item.id) !== undefined;
              if (selected) {
                newItems = newItems.filter(i => i.id !== item.id);
              } else {
                newItems.push(item);
              }
              onItemsSelected(newItems);
            }}
          >
            {renderItem ? (
              renderItem(
                item,
                selectedItems.find(i => i.id === item.id) !== undefined,
                index
              )
            ) : (
              <span className={cx(styles.itemText)}>{item.text}</span>
            )}
          </div>
        ))}
      </div>
    </StyledPopover>
  );
};

const multipleStylesheet: ThemeStyleSheetFactory = extendStyles(
  styleSheet,
  () => ({
    itemAll: {},
    itemAllSelected: {}
  })
);

export const MultipleDropdown = withStyles(multipleStylesheet)(
  BaseMultipleDropdown
);
export default MultipleDropdown;
