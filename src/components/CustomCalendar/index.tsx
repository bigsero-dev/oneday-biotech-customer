import Text from "components/Text";
import colors from "configs/colors";
import moment from "moment";
import React, { useState } from "react";
import { View } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { Theme } from "react-native-calendars/src/types";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";

LocaleConfig.locales.kr = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["월", "화", "수", "목", "금", "토", "일"],
};
LocaleConfig.defaultLocale = "kr";
const CustomCalendar = () => {
  const [dateEvent, setDateEvent] = useState({
    "2023-10-22": {
      selected: true,
      marked: true,
      //disableTouchEvent: true,
      //selectedColor: "orange",
      dotColor: colors.mediumChampagne,
      customStyles: {
        container: {
          backgroundColor: colors.darkBlue,
          borderRadius: 10,
        },
        text: {
          color: colors.white,
          fontWeight: "bold",
        },
      },
    },

    "2023-10-10": { marked: true, dotColor: colors.mediumChampagne },
    "2023-10-11": { marked: true, dotColor: colors.mediumChampagne },
  } as any);
  //const [selectedDate, setSelectedDate] = useState("2023-10-22");

  return (
    <View>
      <Calendar
        renderArrow={() => null}
        renderHeader={date => {
          return (
            <View
              style={{
                alignSelf: "flex-start",
              }}
            >
              <Text textAlign="left">
                {moment(date).year()}.
                {moment(date).month() < 10
                  ? "0" + moment(date).month()
                  : moment(date).month()}
              </Text>
            </View>
          );
        }}
        disableArrowLeft
        disableArrowRight
        hideExtraDays
        enableSwipeMonths
        //current={selectedDate}
        onDayPress={day => {
          const newSelectedDate = day.dateString; // New selected date

          // Create a copy of dateEvent to update
          const updatedDateEvent = { ...dateEvent };

          // Iterate over dateEvent to find the previously selected date and update it
          for (const date in updatedDateEvent) {
            if (Object.hasOwnProperty.call(updatedDateEvent, date)) {
              const dateEntry = updatedDateEvent[date];
              if (dateEntry.selected) {
                // Deselect the previously selected date
                dateEntry.selected = false;
                dateEntry.customStyles = null;
              }
            }
          }
          updatedDateEvent[newSelectedDate] = {
            ...(updatedDateEvent[newSelectedDate] || {}),
            selected: true,
            customStyles: {
              container: {
                backgroundColor: colors.darkBlue,
                borderRadius: 10,
              },
              text: {
                color: colors.white,
                fontWeight: "bold",
              },
            },
          };

          setDateEvent(updatedDateEvent);
        }}
        theme={
          {
            arrowColor: colors.darkBlue,
            arrowStyle: { opacity: 0.3 },
            textDayHeaderFontSize: 14,
            textDayFontSize: 14,
            textDayStyle: {
              color: colors.raisinBlack,
              fontWeight: "900",
              lineHeight: 20,
            },
            arrowWidth: 7,
            arrowHeight: 12.5,
            textMonthFontSize: 22,
            textMonthFontWeight: "900",
            textDayFontFamily: "NanumGothic",
            textMonthFontFamily: "NanumGothic",
            dotColor: colors.mediumChampagne,
            dotStyle: { marginTop: 12, height: 5, width: 5 },
            "stylesheet.calendar.header": {
              dayHeader: {
                textAlign: "center",
                fontSize: 16,
                color: colors.darkGray,
              },
            },
            "stylesheet.calendar.main": {
              week: {
                marginTop: 15,
                flexDirection: "row",
                justifyContent: "space-around",
              },
            },
            "stylesheet.day.basic": {
              todayText: {
                fontWeight: "600",
                color: colors.darkBlue,
              },
            },
            textDisabledColor: colors.white,
          } as Theme
        }
        markingType="custom"
        markedDates={dateEvent}
        monthFormat={"yyyy.MM"}
        style={{
          marginTop: -100,
          height: scaledVertical(200),
        }}
      />
    </View>
  );
};

export default CustomCalendar;
