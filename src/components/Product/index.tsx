import BaseCard from "components/BaseCard";
import ModalAlert from "components/ModalAlert";
import Space from "components/Space";
import Text from "components/Text";
import colors from "configs/colors";
import images from "configs/images";
import { useAuth } from "hooks/useAuth";
import React, { useState } from "react";
import { View, TouchableOpacity, ImageBackground } from "react-native";
import type { ModalAlertProps } from "types/AppTypes";
import type { ProductCategoryType } from "types/CategoryTypes";
import NavigationService from "utils/NavigationService";
import {
  scaledVertical,
  scaledHorizontal,
  widthPercentage,
} from "utils/ScaledService";
import { convertPrice } from "utils/Utils";

interface ProductProps {
  item: ProductCategoryType;
  index: number;
  isBest?: boolean;
  isNew?: boolean;
}

const Product = ({ item, index, isBest, isNew }: ProductProps) => {
  const { token } = useAuth();
  const [showModal, setShowModal] = useState({} as ModalAlertProps);
  const onPress = () => {
    if (token === "") {
      setShowModal({
        showModal: true,
        title: `자세한 서비스는 로그인 혹은 ${"\n"}회원가입 후에 이용이 가능하십니다.`,
        leftText: "취소",
        leftFunction: () => setShowModal({ showModal: false, title: "" }),
        rightText: "로그인 이동",
        rightFunction: () => {
          setShowModal({ showModal: false, title: "" });
          NavigationService.navigate("BeforeLoginScreen");
        },
      });
    } else {
      NavigationService.navigate("ProductScreen", {
        id: item?.id,
      });
    }
  };
  return (
    <View
      key={index}
      style={{
        width: "48%",
        marginRight: index % 2 === 0 ? scaledHorizontal(16) : 0,
        marginTop: scaledVertical(40),
      }}
    >
      <TouchableOpacity onPress={onPress}>
        <BaseCard
          style={{
            backgroundColor: colors.white,
            borderRadius: 5,
          }}
        >
          <ImageBackground
            source={
              item?.mainImage ? { uri: item?.mainImage } : images.productExample
            }
            imageStyle={{
              borderRadius: 5,
              width: "100%",
            }}
            style={{
              height: 130,
              width: "100%",
              flex: 1,

              alignItems: "center",
              borderRadius: 5,
            }}
            resizeMode="cover"
          >
            {isBest ? (
              <View
                style={{
                  backgroundColor: colors.carBlue,
                  padding: 1,
                  left: 0,
                  width: widthPercentage(12),
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                }}
              >
                <Text size={12} color={colors.white} textAlign="center">
                  Best
                </Text>
              </View>
            ) : null}
            {isNew ? (
              <View
                style={{
                  left: 0,
                  backgroundColor: colors.safetyOrange,
                  padding: 1,
                  width: widthPercentage(12),
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                }}
              >
                <Text size={12} color={colors.white} textAlign="center">
                  New
                </Text>
              </View>
            ) : null}
          </ImageBackground>
        </BaseCard>
        <Text
          size={13}
          style={{
            paddingTop: scaledVertical(18),
            fontWeight: "normal",
            letterSpacing: -0.26,
          }}
        >
          {item?.name}
        </Text>
        <Space height={10} />
        {item?.discountRate !== 0 ? (
          <Text
            size={10}
            style={{
              paddingTop: scaledVertical(5),
              opacity: 0.4,
              letterSpacing: -0.26,
              textDecorationLine: "line-through",
            }}
          >
            {convertPrice(item?.oriPrice - item?.price)}
          </Text>
        ) : null}

        <View style={{ flexDirection: "row", paddingTop: scaledVertical(5) }}>
          {item?.discountRate !== 0 ? (
            <Text
              size={16}
              type="bold"
              color={colors.cinnabar}
              style={{
                marginRight: scaledHorizontal(8),
                letterSpacing: -0.26,
              }}
            >
              {item?.discountRate}%
            </Text>
          ) : null}

          <Text
            size={16}
            type="bold"
            style={{
              letterSpacing: -0.26,
            }}
          >
            {convertPrice(item?.price)}{" "}
            <Text type="reguler" size={12} style={{ opacity: 0.6 }}>
              원
            </Text>
          </Text>
        </View>

        <Text
          size={12}
          type="reguler"
          style={{
            paddingTop: scaledVertical(18),
            opacity: 0.6,
            letterSpacing: -0.26,
          }}
        >
          리뷰 {item?.reviewsQnt} {" | "} 평점 {item?.reviewsRate}
        </Text>
      </TouchableOpacity>
      <ModalAlert
        onHide={() => setShowModal({ showModal: false, title: "" })}
        showModal={showModal?.showModal}
        animation={"zoom"}
        title={showModal?.title}
        leftFunction={showModal.leftFunction}
        rightFunction={showModal.rightFunction}
        leftText={showModal.leftText}
        rightText={showModal.rightText}
      />
    </View>
  );
};

export default Product;
