import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import React from "react";
import { View } from "react-native";
import { scaledHorizontal } from "utils/ScaledService";

interface BarChartProps {
  totalStar: number;
  starFive: number;
  starFour: number;
  starThree: number;
  starTwo: number;
  starOne: number;
}

const BarChart = ({
  totalStar,
  starFive,
  starFour,
  starThree,
  starTwo,
  starOne,
}: BarChartProps) => {
  const fiveHeight = starFive === 0 ? 0 : (starFive / totalStar) * 100;
  const fourHeight = starFour === 0 ? 0 : (starFour / totalStar) * 100;
  const threeHeight = starThree === 0 ? 0 : (starThree / totalStar) * 100;
  const twoHeight = starTwo === 0 ? 0 : (starTwo / totalStar) * 100;
  const oneHeight = starOne === 0 ? 0 : (starOne / totalStar) * 100;

  return (
    <View style={{ flex: 1, flexDirection: "row" }}>
      <View
        style={{
          justifyContent: "center",
          //backgroundColor: "blue",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <View
          style={{
            width: 5,
            height: 70,
            borderRadius: 2.5,
            backgroundColor: "#dddddd",
            marginHorizontal: scaledHorizontal(15),
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: scaledHorizontal(-15),
              width: 5,
              height: (fiveHeight * 70) / 100,
              borderRadius: 2.5,
              backgroundColor: colors.black,
              marginHorizontal: scaledHorizontal(15),
              transform: [{ rotateX: "180deg" }, { rotateZ: "180deg" }],
            }}
          />
        </View>
        <Space height={10} />
        <Text size={13} color={colors.spanishGray}>
          5점
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          //backgroundColor: "blue",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <View
          style={{
            width: 5,
            height: 70,
            borderRadius: 2.5,
            backgroundColor: "#dddddd",
            marginHorizontal: scaledHorizontal(15),
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: scaledHorizontal(-15),
              width: 5,
              height: (fourHeight * 70) / 100,
              borderRadius: 2.5,
              backgroundColor: colors.black,
              marginHorizontal: scaledHorizontal(15),
              transform: [{ rotateX: "180deg" }, { rotateZ: "180deg" }],
            }}
          />
        </View>
        <Space height={10} />
        <Text size={13} color={colors.spanishGray}>
          4점
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          //backgroundColor: "blue",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <View
          style={{
            width: 5,
            height: 70,
            borderRadius: 2.5,
            backgroundColor: "#dddddd",
            marginHorizontal: scaledHorizontal(15),
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: scaledHorizontal(-15),
              width: 5,
              height: (threeHeight * 70) / 100,
              borderRadius: 2.5,
              backgroundColor: colors.black,
              marginHorizontal: scaledHorizontal(15),
              transform: [{ rotateX: "180deg" }, { rotateZ: "180deg" }],
            }}
          />
        </View>
        <Space height={10} />
        <Text size={13} color={colors.spanishGray}>
          3점
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          //backgroundColor: "blue",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <View
          style={{
            width: 5,
            height: 70,
            borderRadius: 2.5,
            backgroundColor: "#dddddd",
            marginHorizontal: scaledHorizontal(15),
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: scaledHorizontal(-15),
              width: 5,
              height: (twoHeight * 70) / 100,
              borderRadius: 2.5,
              backgroundColor: colors.black,
              marginHorizontal: scaledHorizontal(15),
              transform: [{ rotateX: "180deg" }, { rotateZ: "180deg" }],
            }}
          />
        </View>
        <Space height={10} />
        <Text size={13} color={colors.spanishGray}>
          2점
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          //backgroundColor: "blue",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <View
          style={{
            width: 5,
            height: 70,
            borderRadius: 2.5,
            backgroundColor: "#dddddd",
            marginHorizontal: scaledHorizontal(15),
          }}
        >
          <View
            style={{
              position: "absolute",
              bottom: 0,
              left: scaledHorizontal(-15),
              width: 5,
              height: (oneHeight * 70) / 100,
              borderRadius: 2.5,
              backgroundColor: colors.black,
              marginHorizontal: scaledHorizontal(15),
              transform: [{ rotateX: "180deg" }, { rotateZ: "180deg" }],
            }}
          />
        </View>

        <Space height={10} />
        <Text size={13} color={colors.spanishGray}>
          1점
        </Text>
      </View>
    </View>
  );
};

export default BarChart;
