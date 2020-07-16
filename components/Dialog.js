//@format
//@flow

import React from "react";
import styled from "styled-native-components";
import { Label, Paragraph } from "./Text";
import Button from "./Button";

const BackgroundWrapper = styled.View`
  width: 100%;
  height: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
`;

const BackgroundOverlay = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: $neutral1;
  opacity: 0.5;
`;

const ContentWrapper = styled.View`
  width: 80%;
  background-color: $background0;
  border-radius: 2rem;
  padding: 3rem;
`;

const PositionWrapper = styled.TouchableOpacity`
  position: absolute;
  right: 0;
  top: 0;
  margin: 2rem;
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 1rem;
`;

const Dialog = ({
  closePortal,
  title = "",
  description = "",
  closeIcon,
  buttons = [
    {
      label: "Ok",
      onPress: closePortal,
    },
  ],
  children,
}: {
  closePortal: () => void,
  title?: string,
  description?: string,
  closeIcon?: boolean,
  buttons?: {
    label?: string,
    onPress?: () => void,
    disabled?: boolean,
    loading?: boolean,
  }[],
  children?: React.Node | React.Node[],
}) => {
  return (
    <BackgroundWrapper>
      <BackgroundOverlay onPress={closePortal} />
      <ContentWrapper>
        {children ? (
          children
        ) : (
          <>
            <Label size="xl">{title}</Label>
            <Paragraph margin="2rem 0rem">{description}</Paragraph>
            <Row>
              {buttons.map(({ label, onPress, disabled, loading }, index) => (
                <Button
                  margin="0 0 0 1rem"
                  key={`DialogButton${index}`}
                  label={label}
                  onPress={onPress}
                  backgroundColor={
                    buttons.length > 1 && index === 0
                      ? "$background1"
                      : "$background0"
                  }
                  disabled={disabled}
                  loading={loading}
                />
              ))}
            </Row>
          </>
        )}

        {closeIcon ? (
          <PositionWrapper onPress={closePortal}>
            <Paragraph size="l">x</Paragraph>
          </PositionWrapper>
        ) : null}
      </ContentWrapper>
    </BackgroundWrapper>
  );
};

export default Dialog;