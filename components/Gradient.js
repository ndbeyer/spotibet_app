// @flow
import * as React from "react";
import { View } from "react-native";
import { useTheme, useStyle } from "styled-native-components";
import Svg, {
  Defs as Definitions,
  LinearGradient,
  Stop,
  Rect,
} from "react-native-svg";

const orientations = {
  HORIZONTAL: { x1: "0", y1: "0", x2: "0", y2: "1" },
  VERTICAL: { x1: "0", y1: "0", x2: "1", y2: "0" },
  DIAGUP: { x1: "0", y1: "1", x2: "1", y2: "0" },
  DIAGDOWN: { x1: "1", y1: "1", x2: "0", y2: "0" },
};

const GradientDefinition = ({
  id,
  colors,
  orientation,
}: {
  id: string,
  colors: string[],
  orientation: "HORIZONTAL" | "VERTICAL" | "DIAGUP" | "DIAGDOWN",
}) => {
  return (
    <Definitions>
      <LinearGradient id={`grad${id}`} {...orientations[orientation]}>
        {colors.map((color, i) => (
          <Stop
            key={i}
            offset={colors.length === 1 ? "0" : String(i / (colors.length - 1))}
            stopColor={color}
            stopOpacity="1"
          />
        ))}
      </LinearGradient>
    </Definitions>
  );
};

let gradIdCounter = 0;

const Gradient = ({ orientation = "HORIZONTAL", colors, reverse }) => {
  const theme = useTheme();
  const gradId = React.useRef(String(gradIdCounter++)).current;

  colors = !colors ? theme.colors.accentGradient0 : colors;
  colors = reverse ? colors.reverse() : colors;

  const backgroundStyle = useStyle(`
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        
    `);
  return (
    <View style={backgroundStyle}>
      <Svg width="100%" height="100%">
        <GradientDefinition
          id={gradId}
          colors={colors}
          orientation={orientation}
        />
        <Rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#grad${gradId})`}
        />
      </Svg>
    </View>
  );
};

export default Gradient;
