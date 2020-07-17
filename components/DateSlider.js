//@format
//@flow

import React from "react";
import styled, { useTheme } from "styled-native-components";
import Slider from "@react-native-community/slider";
import { debounce } from "lodash";

import { format } from "date-fns";
import BetTimer from "../util/BetTimer";
import { Paragraph } from "./Text";
import Button from "./Button";

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
`;

const DateSlider = ({
  initialValue = 0,
  step = 1,
  minSliderVal = 0,
  maxSliderVal = 52,
  delay = 500,
  onChange,
}) => {
  const theme = useTheme();
  const [sliderVal, setSliderVal] = React.useState(initialValue);

  const betTimer = React.useMemo(() => new BetTimer(0, sliderVal), [sliderVal]);

  const handleSliderChange = debounce(
    React.useCallback((newSliderVal) => {
      setSliderVal(newSliderVal);
    }, []),
    delay
  );

  React.useEffect(() => {
    onChange({
      dateTime: betTimer.ends("iso"),
    });
  }, [sliderVal, onChange, betTimer]);

  const handleIncrement = React.useCallback(() => {
    setSliderVal((b) => b + 1);
  }, []);

  const handleDecrement = React.useCallback(() => {
    setSliderVal((b) => b - 1);
  }, []);

  return (
    <>
      <Row>
        <Button
          backgroundColor="$background0"
          label="-"
          onPress={handleDecrement}
          outline
          margin="0 0.5rem 0 0"
          textColor="$neutral3"
        />
        <Slide
          minimumValue={minSliderVal}
          maximumValue={maxSliderVal}
          value={sliderVal}
          step={step}
          onValueChange={handleSliderChange}
          minimumTrackTintColor={theme.colors.background1}
          maximumTrackTintColor={theme.colors.neutral5}
        />
        <Button
          backgroundColor="$background0"
          label="+"
          onPress={handleIncrement}
          outline
          margin="0 0 0 0.5rem"
          textColor="$neutral3"
        />
      </Row>

      <Row>
        <Column>
          {/* <Paragraph>
            {formatDistanceToNow(new Date(betTimer.ends()))}
          </Paragraph> */}
          <Paragraph color="$neutral3" margin="0" size="s">
            {format(new Date(betTimer.ends()), "yyyy-MM-dd")}
          </Paragraph>
        </Column>
      </Row>
    </>
  );
};

export default DateSlider;
