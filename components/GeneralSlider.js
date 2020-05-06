//@format
//@flow

import React from "react";
import styled, { useTheme } from "styled-native-components";
import Slider from "@react-native-community/slider";
import { debounce } from "lodash";
import { format, addDays } from "date-fns";
import { getStartOfNthDay } from "../util/dateHelpers";

import Text from "./Text";

const Row = styled.View`
  flex-direction: row;
  justify-content: center;
  padding: 2rem;
`;

const Column = styled.View`
  flex-direction: column;
  align-items: center;
`;

const Slide = styled(Slider)`
  flex: 1;
  height: 10rem;
  margin: 0rem 5rem;
`;

const GeneralSlider = ({
  type,
  initialValue = 0,
  step = 1,
  minSliderVal = -100,
  maxSliderVal = 100,
  delay = 100,
  monthlyListeners,
  money = 0,
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
    switch (type) {
      case "LISTENERS":
        if (!monthlyListeners) {
          console.log(
            "Slider: type is 'LISTENERS' but monthlyListeners is falsy"
          );
          return;
        }
        onChange({
          listeners: Math.floor(
            monthlyListeners + (sliderVal / 100) * monthlyListeners
          ),
        });
        break;
      case "DATE":
        onChange({
          endDate: addDays(getStartOfNthDay(3), sliderVal).toISOString(),
        });
        break;
      case "AMOUNT":
        onChange({ amount: sliderVal });
        break;
      default:
        break;
    }
  }, [monthlyListeners, sliderVal, onChange, type]);

  const renderText = React.useCallback(() => {
    switch (type) {
      case "LISTENERS":
        return (
          <>
            <Text>
              {sliderVal}%{" "}
              {sliderVal === 0 ? null : sliderVal > 0 ? "increase" : "decrease"}
            </Text>
            <Text>
              {sliderVal === 0 ? "=" : sliderVal > 0 ? ">" : "<"}
              {Math.floor(
                monthlyListeners + (sliderVal / 100) * monthlyListeners
              )}{" "}
              Monthly Listeners
            </Text>
          </>
        );
      case "DATE":
        return (
          <>
            <Text>in {sliderVal + 3} days</Text>
            <Text>
              {format(
                addDays(getStartOfNthDay(3), sliderVal),
                "dd.MM.yyyy HH:mm:ss"
              )}
            </Text>
          </>
        );
      case "AMOUNT":
        return (
          <>
            <Text>
              {sliderVal} Money ({money} available)
            </Text>
          </>
        );

      default:
        break;
    }
  }, [monthlyListeners, sliderVal, type, money]);

  return (
    <>
      <Row>
        <Slide
          minimumValue={minSliderVal}
          maximumValue={maxSliderVal}
          value={sliderVal}
          step={step}
          onValueChange={handleSliderChange}
          minimumTrackTintColor={theme.colors.accent}
          maximumTrackTintColor={theme.colors.background1}
        />
      </Row>
      <Row>
        <Column>{renderText()}</Column>
      </Row>
    </>
  );
};

export default GeneralSlider;