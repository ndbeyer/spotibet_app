// @flow
import chroma from "chroma-js";

export const colorDefs = ({
  accentColor = "#34eb46",
  gradientStrength = 0,
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

  const accentDark = accent.set("lch.l", 7); // a darkened accent color

  const neutrals = chroma
    .scale([accentDark, "white"])
    .correctLightness()
    .colors(6);

  const background1 = accentDark.set("lch.l", 95); // a bright version of the accentColor
  const background0 = chroma(neutrals[5]); // white in our case

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
