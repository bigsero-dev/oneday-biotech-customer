import React, { memo } from "react";
import { View } from "react-native";

interface Props {
  height: number;
  width: number;
}

const Space = ({ width, height }: Props) => <View style={{ height, width }} />;

Space.defaultProps = {
  height: 0,
  width: 0,
};

export default memo(Space);
