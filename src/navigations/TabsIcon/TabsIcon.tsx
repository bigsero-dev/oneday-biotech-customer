import React, { PureComponent } from "react";
import { Image } from "react-native";
import icons from "configs/icons";

import styles from "./TabsStyles";

interface Props {
  focused: boolean;
}

export class IconHome extends PureComponent<Props> {
  render() {
    const { focused } = this.props;

    return (
      <Image
        source={icons.home}
        style={[styles(focused).icon, { height: 22, width: 22 }]}
      />
    );
  }
}

export class IconCalendar extends PureComponent<Props> {
  render() {
    const { focused } = this.props;

    return (
      <Image
        source={icons.calendar}
        style={[styles(focused).icon, { height: 22, width: 22 }]}
      />
    );
  }
}

export class IconTooth extends PureComponent<Props> {
  render() {
    const { focused } = this.props;

    return (
      <Image
        source={icons.tooth}
        style={[styles(focused).icon, { height: 22, width: 22 }]}
      />
    );
  }
}

export class IconChange extends PureComponent<Props> {
  render() {
    const { focused } = this.props;

    return (
      <Image
        source={icons.profile}
        style={[styles(focused).icon, { height: 22, width: 22 }]}
      />
    );
  }
}
