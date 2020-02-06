import React, { useState, useEffect } from "react";
import Icon, { IconNames } from "./Icon";
import "../../stories/style.scss";
import { ButtonText } from "../Typography";
import { useTheme } from "aesthetic-react";
import TextInput from "../TextInput/TextInput";

export const IconGallery: React.FC = () => {
  const theme = useTheme();
  const [searchString, setSearchString] = useState("");
  const [icons, setIcons] = useState<string[]>([]);

  useEffect(() => {
    if (theme.icons) {
      if (!searchString || searchString.length === 0) {
        setIcons(Object.keys(theme.icons));
      } else {
        setIcons(
          Object.keys(theme.icons).filter((f: string) =>
            f.includes(searchString)
          )
        );
      }
    }
  }, [theme.icons, searchString]);

  return (
    icons && (
      <>
        <TextInput
          label="Search Icons"
          onChange={e => setSearchString(e.target.value)}
        />
        <div className="icon-gallery">
          {icons.map((d: string) => (
            <div className="icon-container" key={d}>
              <Icon name={d as IconNames} size={20} />
              <ButtonText>{d}</ButtonText>
            </div>
          ))}
        </div>
      </>
    )
  );
};