//@format
//@flow

import React from "react";
import styled, { useTheme } from "styled-native-components";
import Slider from "@react-native-community/slider";
import { debounce } from "lodash";

import { Paragraph } from "./Text";

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 1rem;
`;

const Column = styled.View`
  flex-direction: column;
  align-items: center;
`;

const Slide = styled(Slider)`
  flex: 1;
  height: 5rem;
  margin: 0rem 2.5rem;
`;

const ListenersSlider = ({
  type,
  initialValue = 0,
  step = 1,
  minSliderVal = -100,
  maxSliderVal = 100,
  delay = 500,
  monthlyListeners,
  onChange,
}) => {
  const theme = useTheme();
  const [sliderVal, setSliderVal] = React.useState(initialValue);

  const handleSliderChange = debounce(
    React.useCallback((newSliderVal) => {
      setSliderVal(newSliderVal);
    }, []),
    delay
  );

  React.useEffect(() => {
    if (!monthlyListeners) return;
    onChange({
      monthlyListeners: Math.floor(
        monthlyListeners + (sliderVal / 100) * monthlyListeners
      ),
    });
  }, [monthlyListeners, sliderVal, onChange, type]);

  return (
    <>
      <Row>
        <Slide
          minimumValue={minSliderVal}
          maximumValue={maxSliderVal}
          value={sliderVal}
          step={step}
          onValueChange={handleSliderChange}
          minimumTrackTintColor={theme.colors.background1}
          maximumTrackTintColor={theme.colors.neutral5}
        />
      </Row>
      <Row>
        <Column>
          <Paragraph>
            {sliderVal}%{" "}
            {sliderVal === 0 ? null : sliderVal > 0 ? "increase" : "decrease"}
          </Paragraph>
          <Paragraph>
            {sliderVal === 0 ? "=" : sliderVal > 0 ? ">" : "<"}
            {Math.floor(
              monthlyListeners + (sliderVal / 100) * monthlyListeners
            )}{" "}
            Monthly Listeners
          </Paragraph>
        </Column>
      </Row>
    </>
  );
};

export default ListenersSlider;
