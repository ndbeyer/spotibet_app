//@format
//@flow

import React from "react";
import styled, {
  useWindowDimensions,
  useTheme,
} from "styled-native-components";

import Image from "../components/Image";
import Gradient from "../components/Gradient";
import { Heading } from "../components/Text";

const ArtistName = styled(Heading)`
  position: absolute;
  bottom: 0;
  left: 0;
`;

const ImageWrapper = styled.View`
  height: ${(p) => p.height}px;
  width: ${(p) => p.width}px;
`;

const StyledGradient = styled(Gradient).attrs((p) => ({
  opacities: [0.1, 0.2, 0.4],
  colors: [
    p.theme.colors.background0,
    p.theme.colors.background0,
    p.theme.colors.neutral2,
  ],
}))``;

const ArtistImage = ({ artist, heightFactor = 1 }) => {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const widthRem = width / theme.rem + "rem";
  const heightRem = (width / theme.rem) * heightFactor + "rem";

  return (
    <ImageWrapper width={widthRem} height={heightRem}>
      <Image
        width="100%"
        height="100%"
        source={artist.image}
        resizeMode={heightFactor ? "cover" : null}
      />
      <StyledGradient />
      <ArtistName size="l" margin="1rem 1.5rem" color="$background0">
        {artist.name}
      </ArtistName>
    </ImageWrapper>
  );
};

export default ArtistImage;
