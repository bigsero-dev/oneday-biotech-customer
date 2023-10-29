import BaseModal from "components/BaseModal";
import React from "react";
import { Image } from "react-native";
import { scaledHorizontal } from "utils/ScaledService";

interface ImageModalProps {
  imageModal: { showModal: boolean; image: string };
  onCloseModal: () => void;
}

const ImageModal = ({ imageModal, onCloseModal }: ImageModalProps) => {
  return (
    <BaseModal
      showModal={imageModal?.showModal}
      onBackButtonPress={onCloseModal}
      onBackdropPress={onCloseModal}
      containerStyle={{
        marginHorizontal: scaledHorizontal(-25),
      }}
      contentStyle={{ backgroundColor: "transparent" }}
    >
      <Image
        source={{ uri: imageModal?.image }}
        style={{ height: "100%", resizeMode: "contain" }}
      />
    </BaseModal>
  );
};

export default ImageModal;
