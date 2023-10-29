import ArrowSheet from "components/ArrowSheet";
import React from "react";
import ActionSheet from "react-native-actions-sheet";

interface BaseActionSheetProps {
  children: React.ReactNode;
  actionSheetRef: any;
  onPressHeader: () => void;
  setClose: () => void;
}

const BaseActionSheet = ({
  children,
  actionSheetRef,
  onPressHeader,
  setClose,
}: BaseActionSheetProps) => {
  return (
    <ActionSheet
      id={"base-action"}
      ref={actionSheetRef}
      containerStyle={{
        backgroundColor: "transparent",
        backfaceVisibility: "hidden",
        elevation: 0,
      }}
      closeOnPressBack
      overdrawEnabled
      onClose={setClose}
      isModal={false}
      zIndex={0}
      drawUnderStatusBar={false}
      closeOnTouchBackdrop={false}
      overlayColor="transparent"
      gestureEnabled={true}
      elevation={0}
      defaultOverlayOpacity={0}
      useBottomSafeAreaPadding={false}
      indicatorStyle={{ backgroundColor: "transparent", opacity: 0 }}
      headerAlwaysVisible={false}
      CustomHeaderComponent={<ArrowSheet type="down" onPress={onPressHeader} />}
    >
      {children}
    </ActionSheet>
  );
};

export default BaseActionSheet;
