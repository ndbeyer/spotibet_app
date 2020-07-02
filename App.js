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
  chromaticity = 0,
}: {
  accentColor: string,
  gradientStrength: number,
  chromaticity: number,
} = {}) => {
  const accent = chroma(accentColor);
  let error = accent
    .set("lch.l", Math.max(Math.min(accent.get("lch.l"), 60), 35))
    .set("lch.h", 55 - (accent.get("lch.h") / 360) * 40)
    .set("lch.c", `+${10 + 1000 / accent.get("lch.c")}`);
  if (chroma.deltaE(error, accent) <= 10) error = accent;

  const accentDark = accent.set("lch.c", chromaticity).set("lch.l", 7);

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

const pathDefs = (): { [name: string]: string } => ({
  profile:
    "M9.10853607,13.641457 C9.09012782,13.6079875 6.75227988,10.5093767 6.07017049,9.27769734 C5.91888813,9.00391643 5.85998173,8.69097616 5.88809615,8.37970936 C5.99051296,7.25613663 6.47080098,4.32788585 8.71593827,3.45098369 C8.96060067,3.35559548 9.14300971,3.15310471 9.21296106,2.89974023 C9.3732802,2.3167007 9.89105411,1.34574911 11.5548254,1.52079485 C13.8719222,1.76478785 17.7269447,2.19252868 18.4803443,4.9688277 C18.5074546,5.06756287 18.4120664,6.03014708 18.3859601,6.12888224 C18.2832086,6.52415761 17.9839909,7.59451376 17.6338994,8.18759415 C17.5498908,8.33050912 17.5087233,8.49116295 17.5217764,8.65650252 C17.5592623,9.13110072 17.6017686,10.148575 17.3725022,10.9284155 C17.0632436,11.9803634 16.3279176,13.8847806 16.3279176,13.8847806 C16.3279176,13.8847806 16.1642515,14.4035586 15.5199627,14.3376236 C15.1809162,14.3028153 14.8686453,14.5622043 14.772253,14.8888671 C14.7702448,14.8965651 14.7682367,14.9042631 14.7662285,14.9119611 C14.6574525,15.3159385 14.9051271,15.7296221 15.3024107,15.8608228 C15.4011458,15.8936229 15.4948606,15.9291007 15.5912529,15.9632396 C14.6862363,16.9753587 13.4254384,17.6065944 12.0294235,17.6065944 C10.7043641,17.6065944 9.50180326,17.0362733 8.60883572,16.1115097 C9.06100931,15.9130353 10.017569,15.2764445 9.10853607,13.641457 Z M21.431689,19.8229479 C21.9508017,20.7078827 21.3048394,21.8210799 20.2789978,21.8210799 L3.49167649,21.8210799 C2.56256184,21.8210799 1.96379162,20.8377446 2.38985897,20.0120508 C2.99231084,18.8456371 4.41175437,17.3666177 7.72691312,16.3762538 C8.79057537,17.6427415 10.3221419,18.4433331 12.0294235,18.4433331 C13.7812197,18.4433331 15.3485986,17.6005699 16.4152731,16.2758452 C19.3331484,17.4790754 21.0531484,19.1769856 21.431689,19.8229479 Z",
  play:
    "M22.2625642,10.6821233 C23.2552333,11.2613552 23.2363453,12.2099523 22.2625642,12.7786908 L7.79855691,21.2174275 C6.80588781,21.7966594 6,21.3055715 6,20.1680944 L6,3.29271975 C6,2.13425603 6.82477581,1.67464813 7.79855691,2.24338667 L22.2625642,10.6821233 Z",
  gear:
    "M12,16.5725806 C9.47458065,16.5725806 7.42741935,14.5254194 7.42741935,12 C7.42741935,9.47458065 9.47458065,7.42741935 12,7.42741935 C14.5254194,7.42741935 16.5725806,9.47458065 16.5725806,12 C16.5725806,14.5254194 14.5254194,16.5725806 12,16.5725806 L12,16.5725806 Z M22.5,13.9540161 L22.5,9.90406452 L19.614871,9.73064516 C19.4445,9.15720968 19.2104516,8.60646774 18.9164516,8.08824194 L20.8064516,5.95708065 L17.9423226,3.09295161 L15.7786452,5.01174194 C15.2533065,4.7268871 14.6988387,4.50333871 14.1247258,4.34414516 L13.9540161,1.5 L9.90406452,1.5 L9.73064516,4.38512903 C9.1578871,4.5555 8.60748387,4.78954839 8.08824194,5.08320968 L5.95708065,3.19354839 L3.09295161,6.05767742 L5.01174194,8.22135484 C4.7268871,8.74669355 4.50333871,9.30116129 4.34414516,9.87527419 L1.5,10.0459839 L1.5,14.0959355 L4.38512903,14.2693548 C4.5555,14.8421129 4.78954839,15.3928548 5.08354839,15.9117581 L3.19354839,18.0429194 L6.05767742,20.9070484 L8.22135484,18.9882581 C8.74669355,19.2731129 9.30116129,19.4966613 9.87527419,19.6558548 L10.0459839,22.5 L14.0959355,22.5 L14.2693548,19.614871 C14.8421129,19.4445 15.3928548,19.2104516 15.9117581,18.9164516 L18.0429194,20.8064516 L20.9070484,17.9423226 L18.9882581,15.7786452 C19.2731129,15.2533065 19.4966613,14.6988387 19.6558548,14.1247258 L22.5,13.9540161 Z",
  graph:
    "M20.9999197,3.58761005 C21.0016272,3.36582 20.8773623,3.16226452 20.679308,3.06242345 C20.4812537,2.96258238 20.2437063,2.98374481 20.06642,3.11702392 L14.7288479,7.00191707 L12.2378105,5.21164373 C12.0191493,5.05601736 11.7225019,5.06974126 11.5191436,5.24489166 L7.18668209,8.98400542 L3.76726,7.82288528 C3.5895996,7.7637561 3.39435173,7.79353792 3.24239861,7.90294417 C3.09044549,8.01235042 3.00027347,8.18807091 3,8.37531248 L3,14.9558458 C3.41379159,14.8334056 3.85549012,14.843241 4.26342147,14.9839787 L6.85164522,15.8637701 L10.519148,12.707774 C11.2562191,12.0688131 12.3344132,12.0160122 13.1303896,12.5798973 L14.7211753,13.7154421 L19.1712834,10.487835 C19.6974314,10.1014888 20.3739003,9.98322503 20.9999197,10.1681434 L20.9999197,3.58761005 Z M20.9999197,21.1578642 L20.9999197,12.2064974 C21.0036063,11.9837865 20.8800971,11.7784305 20.6816381,11.677298 C20.483179,11.5761654 20.2444436,11.5969254 20.06642,11.7307962 L14.7288479,15.6182469 L12.2378105,13.8279736 C12.0191493,13.6723472 11.7225019,13.6860711 11.5191436,13.8612215 L7.18668209,17.5977777 L3.76726,16.4366576 C3.5895996,16.3775284 3.39435173,16.4073102 3.24239861,16.5167165 C3.09044549,16.6261227 3.00027347,16.8018432 3,16.9890848 L3,21.1553066 C3,21.4773536 3.26107064,21.7384242 3.5831176,21.7384242 L20.4168021,21.7384242 C20.7388491,21.7384242 20.9999197,21.4773536 20.9999197,21.1553066 L20.9999197,21.1578642 Z",
});

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
  iconPaths: pathDefs(),
  colors: colorDefs({ accentColor: "#34eb46", chromaticity: 50 }),
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
