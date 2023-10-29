import Text from "components/Text";
import colors from "configs/colors";
import React from "react";

interface HightlightedTextProps {
  text: string;
  search: string;
  color?: string;
}

const HightlightedText = ({
  text,
  search,
  color = colors.brandBlue,
}: HightlightedTextProps) => {
  const parts = text.split(new RegExp(`(${search})`, "gi"));
  return (
    <Text>
      {parts.map((part, index) =>
        part.toLowerCase() === search.toLowerCase() ? (
          <Text key={index} color={color} size={14} lineHeight={23}>
            {part}
          </Text>
        ) : (
          <Text key={index} size={14} lineHeight={23}>
            {part}
          </Text>
        ),
      )}
    </Text>
  );
};

export default HightlightedText;
