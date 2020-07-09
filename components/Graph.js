//@format
//@flow

import React from "react";
import styled, {
  useWindowDimensions,
  useTheme,
  useLengthAttribute,
} from "styled-native-components";
import { Paragraph } from "../components/Text";
import { differenceInCalendarWeeks } from "date-fns";
import { LineChart } from "react-native-chart-kit";

import { getSuffix, correctNumberForSuffix } from "../util/suffix";

const Wrapper = styled.View`
  margin: ${(p) => p.margin};
  border: 1px solid $neutral4;
  border-radius: $borderRadius2;
  height: 8rem;
  max-width: 100%;
  align-self: stretch;
  justify-content: center;
  align-items: center;
`;

const Graph = ({
  data = [],
  margin = "2rem 2rem",
  pxHeight = 220,
}: {
  data: { id: string, dateTime: string, monthlyListeners: number }[],
  margin: string,
  pxHeight: number,
}) => {
  const theme = useTheme();
  const { width: pxWidth } = useWindowDimensions();
  const [
    pxMarginTop,
    pxMarginRight,
    pxMarginBottom,
    pxMarginLeft,
  ] = useLengthAttribute(margin);
  const pxChartWidth = pxWidth - pxMarginRight - pxMarginLeft;

  const suffix = getSuffix(data?.[data.length - 1]?.monthlyListeners);

  const today = new Date();

  return data.length < 2 ? (
    <Wrapper margin={margin}>
      <Paragraph color="$neutral3">No history data available</Paragraph>
    </Wrapper>
  ) : (
    <LineChart
      // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
      data={{
        labels: data?.map(({ dateTime }) =>
          differenceInCalendarWeeks(today, new Date(dateTime))
        ),
        datasets: [
          {
            data: data?.map(({ monthlyListeners }) =>
              correctNumberForSuffix(monthlyListeners, suffix)
            ),
          },
        ],
      }}
      width={pxChartWidth}
      height={pxHeight}
      withDots={false}
      yAxisSuffix={" " + suffix}
      // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
      chartConfig={{
        backgroundGradientFrom: theme.colors.background0,
        backgroundGradientTo: theme.colors.background0,
        decimalPlaces: 0,
        color: (opacity = 1) => theme.colors.neutral1,
        labelColor: (opacity = 1) => theme.colors.neutral1,
        fillShadowGradient: theme.colors.accent0,
        strokeWidth: 0.5,
        propsForBackgroundLines: {
          strokeWidth: "0",
        },
        propsForLabels: {},
      }}
      // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
      style={{
        marginTop: pxMarginTop,
        marginBottom: pxMarginBottom,
      }}
      bezier
    />
  );
};

export default Graph;
