import ImageStar from "components/ImageStar";
import Line from "components/Line";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import images from "configs/images";
import React from "react";
import { View, Image } from "react-native";
import type { ProductListReview } from "types/ProductTypes";
import { scaledHorizontal, scaledVertical } from "utils/ScaledService";
import { convertStringSecret, convertUnixTime } from "utils/Utils";

interface CommentReviewProps {
  index?: number;
  item: ProductListReview;
  withImage?: boolean;
}

const CommentReview = ({ index, item, withImage }: CommentReviewProps) => {
  return (
    <View
      key={index}
      style={{
        marginTop: index === 0 ? scaledVertical(20) : scaledVertical(50),
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Image
          source={
            item?.hospitalMember?.image !== null
              ? { uri: item?.hospitalMember?.image }
              : images.placeholderImage
          }
          style={{ width: 37.5, height: 37.5, borderRadius: 37.5 / 2 }}
          resizeMode="cover"
        />
        <View style={{ marginHorizontal: scaledHorizontal(20) }}>
          <Text size={13} numberOfLines={1}>
            {convertStringSecret(item?.hospitalMember?.name)}
          </Text>
          <Space height={5} />
          <View style={{ flexDirection: "row" }}>
            <ImageStar type="tiny" totalStar={Math.floor(item.rate)} />
            <Text size={13} color={colors.spanishGray}>
              {"  "}| {"  "}
              {convertUnixTime(item?.createdAt)}
            </Text>
          </View>
        </View>
      </View>
      <Space height={10} />
      <Text
        size={13}
        color={colors.spanishGray}
        numberOfLines={2}
        style={{ lineHeight: 18 }}
      >
        [{item?.productGroup?.name}]
      </Text>
      <Space height={3} />
      <Text
        size={13}
        color={colors.black}
        numberOfLines={withImage ? 8 : 99}
        style={{ lineHeight: 18 }}
      >
        {item?.contents}
      </Text>

      {item?.images && withImage ? (
        <>
          <View
            style={{
              marginTop: scaledVertical(20),
              marginBottom: scaledVertical(60),
              flexDirection: "row",
            }}
          >
            {item?.images?.map((image, idx) => {
              return (
                <Image
                  key={idx}
                  source={{ uri: image }}
                  style={{
                    width: 34.8,
                    height: 34.8,
                    borderRadius: 2,
                    marginRight: 5,
                  }}
                  resizeMode="cover"
                />
              );
            })}
          </View>
          <Line style={{ height: 1, backgroundColor: colors.flashWhite }} />
        </>
      ) : null}
    </View>
  );
};

export default CommentReview;
