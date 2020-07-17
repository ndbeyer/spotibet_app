//@format
//@flow

import React from "react";
import styled, { useTheme } from "styled-native-components";
import Slider from "@react-native-community/slider";
import { debounce } from "lodash";

import { format, formatDistanceToNow } from "date-fns";
import BetTimer from "../util/BetTimer";
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
          {/* <Paragraph>
            {formatDistanceToNow(new Date(betTimer.ends()))}
          </Paragraph> */}
          <Paragraph>
            {format(new Date(betTimer.ends()), "yyyy-MM-dd")}
          </Paragraph>
        </Column>
      </Row>
    </>
  );
};

export default DateSlider;
