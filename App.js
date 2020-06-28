//@format
//@flow

import "react-native-gesture-handler";
import React from "react";
import { ThemeProvider, setStaticVariables } from "styled-native-components";
import { ApolloProvider } from "@apollo/react-hooks";
import { Platform } from "react-native";
import { times } from "lodash";
import chroma from "chroma-js";

import Navigator from "./screens/Navigator";
import client from "./util/client";

const UNIT = 8;

export const colorDefs = ({
  accentColor = "#34eb46",
  gradientStrength = 20,
}: {
  accentColor: string,
  gradientStrength: number,
}) => {
  const accent = chroma(accentColor);
  let error = accent
    .set("lch.l", Math.max(Math.min(accent.get("lch.l"), 60), 35))
    .set("lch.h", 55 - (accent.get("lch.h") / 360) * 40)
    .set("lch.c", `+${10 + 1000 / accent.get("lch.c")}`);
  if (chroma.deltaE(error, accent) <= 10) error = accent;

  const accentDark = accent.set("lch.l", 7);

  const neutrals = chroma
    .scale([accentDark, "white"])
    .correctLightness()
    .colors(6);

  const background1 = accentDark.set("lch.l", 95);
  const background0 = chroma(neutrals[5]);

  const makeGradient = (color) => [
    color.set("lch.l", `-${gradientStrength}`).hex(),
    color.hex(),
    color.set("lch.l", `+${gradientStrength}`).hex(),
  ];
  const isLightThreshold = 60;
  return {
    overlayText: "#ffffff",
    overlayBackground: "#00000059",

    error: error.hex(),
    errorGradient: makeGradient(error),

    accent0: accent.hex(),
    accentText0:
      accent.get("lch.l") > isLightThreshold ? accentDark.hex() : "#ffffff",
    accentGradient0: makeGradient(accent),

    neutral0: neutrals[0],
    neutral1: neutrals[1],
    neutral2: neutrals[2],
    neutral3: neutrals[3],
    neutral4: neutrals[4],

    background0: background0.hex(),
    border0: background1.set("lch.l", "-5").hex(),
    background1: background1.hex(),
    blurTint: background0.alpha(0.4).hex(),
  };
};

export const typoDefs = () => {
  const fontFamily = { ios: "System", android: "sans-serif" }[Platform.OS];
  const remFontSizes = [10, 12, 14, 16, 18, 24, 32, 38].map((s) => s / UNIT);

  return {
    ...Object.assign(
      ...remFontSizes.map((size, i) => ({ [`fontSize${i}`]: size }))
    ),

    paragraph1: `${remFontSizes[1]}rem/2rem ${fontFamily}`,
    paragraph1Bold: `bold ${remFontSizes[1]}rem/2rem ${fontFamily}`,
    paragraph2: `${remFontSizes[2]}rem/3rem ${fontFamily}`,
    paragraph2Bold: `bold ${remFontSizes[2]}rem/3rem ${fontFamily}`,
    paragraph3: `${remFontSizes[4]}rem/3rem ${fontFamily}`,
    paragraph3Bold: `bold ${remFontSizes[4]}rem/3rem ${fontFamily}`,

    label0: `700 ${remFontSizes[0]}rem/1.5rem ${fontFamily}`,
    label0Light: `500 ${remFontSizes[0]}rem/1.5rem ${fontFamily}`,
    label1: `800 ${remFontSizes[1]}rem/2rem ${fontFamily}`,
    label1Light: `600 ${remFontSizes[1]}rem/2rem ${fontFamily}`,
    label2: `800 ${remFontSizes[2]}rem/2.5rem ${fontFamily}`,
    label2Light: `600 ${remFontSizes[2]}rem/2.5rem ${fontFamily}`,
    label3: `800 ${remFontSizes[3]}rem/2.5rem ${fontFamily}`,
    label3Light: `600 ${remFontSizes[3]}rem/2.5rem ${fontFamily}`,
    label4: `600 ${remFontSizes[4]}rem/3rem ${fontFamily}`,

    heading0: `800 ${remFontSizes[2]}rem/2.5rem ${fontFamily}`,
    heading1: `800 ${remFontSizes[4]}rem/3rem ${fontFamily}`,
    heading2: `800 ${remFontSizes[5]}rem/4rem ${fontFamily}`,
    heading3: `900 ${remFontSizes[6]}rem/4.5rem ${fontFamily}`,
    heading4: `900 ${remFontSizes[7]}rem/8rem ${fontFamily}`,
  };
};

export const createVariables = ({ baseBorderRadius = 0.25 }) => {
  return {
    ...Object.assign(
      ...times(5, (i) => ({
        [`borderRadius${i}`]: baseBorderRadius * Math.pow(2, i) + "rem",
      }))
    ),
    ...typoDefs(),
  };
};

// it is crucial that this get's called before anything is required that depends on styled-native-components
setStaticVariables(createVariables({}));

const theme = {
  rem: UNIT,
  colors: colorDefs({ accentColor: "#34eb46" }),
  elevation: (value) => ({
    shadowColor: "black",
    shadowOffset: { width: 0, height: value },
    shadowRadius: value * 2.5,
    shadowOpacity: 0.3,
    elevation: value,
    zIndex: value,
  }),
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Navigator />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default App;
