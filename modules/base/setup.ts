import aestheticDefault, { Aesthetic } from "aesthetic";
import { defaultTheme } from "@diana-ui/tokens";
import AphroditeAdapter from "./aphroditeAdapter";
import { selfExtension } from "./aphroditeExtensions";

export function initDefaultTheme(aesthetic = aestheticDefault) {
  if (!aesthetic.themes[defaultTheme.name]) {
    aesthetic.registerTheme(defaultTheme.name, defaultTheme, theme => ({
      "@global": {
        html: {
          fontSize: theme.fontSize
        }
      },
      "@font-face": theme.fonts,
      "@keyframes": theme.animations
    }));
  }
  aesthetic.configure({
    adapter: new AphroditeAdapter([selfExtension]),
    theme: defaultTheme.name,
    rtl: false,
    extendable: true,
    passThemeProp: true
  });
}

export function initTheme(themeObj = defaultTheme, aesthetic: Aesthetic = aestheticDefault) {
  if (!aesthetic.themes[defaultTheme.name]) {
    aesthetic.registerTheme(defaultTheme.name, defaultTheme, theme => ({
      "@global": {
        html: {
          fontSize: theme.fontSize
        }
      },
      "@font-face": theme.fonts,
      "@keyframes": theme.animations
    }));
  }
  const result = aesthetic.registerTheme(themeObj.name, themeObj, theme => ({
    "@global": {
      html: {
        fontSize: theme.fontSize
      }
    },
    "@font-face": theme.fonts,
    "@keyframes": theme.animations
  }));
  aesthetic.configure({
    adapter: new AphroditeAdapter([selfExtension]),
    theme: themeObj.name,
    rtl: false,
    extendable: true,
    passThemeProp: true
  });
  return result;
}

export function registerTheme(themeObj = defaultTheme, aesthetic: Aesthetic = aestheticDefault) {
  aesthetic.registerTheme(themeObj.name, themeObj, theme => ({
    "@global": {
      html: {
        fontSize: theme.fontSize
      }
    },
    "@font-face": theme.fonts,
    "@keyframes": theme.animations
  }));

  aesthetic.configure({
    theme: themeObj.name
  });
}

export function changeTheme(theme: string, aesthetic: Aesthetic = aestheticDefault) {
  aesthetic.changeTheme(theme);
}
