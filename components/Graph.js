//@format
//@flow

import React from "react";
import styled, {
  useWindowDimensions,
  useTheme,
  useLengthAttribute,
} from "styled-native-components";
import { Paragraph } from "../components/Text";
import {
  differenceInCalendarWeeks,
  addWeeks,
  parseISO,
  format,
} from "date-fns";
import { LineChart } from "react-native-chart-kit";
import { times } from "lodash";

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

const interpolateData = (
  data: { id: string, dateTime: string, monthlyListeners: number }[]
) => {
  if (!data.length) return null;

  const addWeeksToDateString = (string, weeks) => {
    return format(addWeeks(parseISO(string), weeks), "yyyy-MM-dd");
  };
  const formatYYYMMDD = (string) => format(parseISO(string), "yyyy-MM-dd");
  const oldestDate = data[0].dateTime;
  const newestDate = data[data.length - 1].dateTime;
  const nWeeks = Math.abs(
    differenceInCalendarWeeks(parseISO(oldestDate), parseISO(newestDate))
  );
  const intervalled = times(nWeeks + 1).map((week) => {
    const startOfWeek = addWeeksToDateString(oldestDate, week);
    return {
      dateTime: startOfWeek,
      monthlyListeners: data.find(
        ({ dateTime }) => formatYYYMMDD(dateTime) === startOfWeek
      )?.monthlyListeners,
    };
  });

  let first = undefined;
  let chunked = [];
  let interpolated = [];

  intervalled.map((interval) => {
    if (interval.monthlyListeners && !first) {
      first = interval;
      interpolated.push(interval);
    } else if (!interval.monthlyListeners) {
      chunked.push(interval);
    } else if (interval.monthlyListeners && first) {
      const last = interval;
      const firstLastDifference =
        last.monthlyListeners - first.monthlyListeners;
      chunked = chunked.map((interval2, indeX) => ({
        ...interval2,
        monthlyListeners: Number(
          (
            first.monthlyListeners +
            ((indeX + 1) / chunked.length) * firstLastDifference
          ).toFixed(0)
        ),
      }));
      interpolated = [...interpolated, ...chunked, last];
      first = interval;
      chunked = [];
    }
  });
  const selectedInterval = Math.ceil(intervalled.length / 10);
  const interPolatedSelected = interpolated
    .reverse()
    .filter((_, index) => index % selectedInterval === 0)
    .reverse();
  return interPolatedSelected;
};

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
  const pxChartWidth = React.useMemo(
    () => pxWidth - pxMarginRight - pxMarginLeft,
    [pxMarginLeft, pxMarginRight, pxWidth]
  );

  const suffix = React.useMemo(
    () => getSuffix(data?.[data.length - 1]?.monthlyListeners),
    [data]
  );
  const today = React.useMemo(() => new Date(), []);
  const interpolatedData = React.useMemo(() => interpolateData(data), [data]);
  const decimalPlaces = React.useMemo(
    () =>
      interpolatedData?.length
        ? 3 -
          Number(
            correctNumberForSuffix(
              interpolatedData?.[0]?.monthlyListeners,
              suffix
            )
          ).toFixed().length
        : 0,
    [interpolatedData, suffix]
  );

  return !interpolatedData ? (
    <Wrapper margin={margin}>
      <Paragraph color="$neutral3">No history data available</Paragraph>
    </Wrapper>
  ) : (
    <>
      <LineChart
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
        data={{
          labels: interpolatedData.map(({ dateTime }) =>
            differenceInCalendarWeeks(new Date(dateTime), today)
          ),
          datasets: [
            {
              data: interpolatedData.map(({ monthlyListeners }) =>
                correctNumberForSuffix(monthlyListeners, suffix)
              ),
            },
          ],
        }}
        width={pxChartWidth}
        height={pxHeight}
        withDots={false}
        yAxisSuffix={suffix}
        xAxisInteval={0}
        // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
        chartConfig={{
          backgroundGradientFrom: theme.colors.background0,
          backgroundGradientTo: theme.colors.background0,
          decimalPlaces,
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
      />
      <Paragraph margin="-2rem 0 0 0">Weeks</Paragraph>
    </>
  );
};

export default Graph;
