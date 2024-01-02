import React, { useCallback, useImperativeHandle } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

type BottomSheetProps = {};

export type BottomSheetRefProps = {
  scrollTo: (destination: number) => void;
};

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
  ({}, ref) => {
    const translateY = useSharedValue(0);
    const context = useSharedValue({ y: 0 });

    const scrollTo = useCallback((destination: number) => {
      "worklet";
      translateY.value = withSpring(destination, {
        damping: 50,
      });
    }, []);

    useImperativeHandle(ref, () => ({ scrollTo }), [scrollTo]);

    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        translateY.value = event.translationY + context.value.y;
        translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
      })
      .onEnd(() => {
        if (translateY.value < -SCREEN_HEIGHT / 1.5) {
          scrollTo(MAX_TRANSLATE_Y);
        } else if (translateY.value > -SCREEN_HEIGHT / 2.5) {
          scrollTo(0);
        }
      });

    const rBottomSheetStyles = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP
      );

      return {
        transform: [{ translateY: translateY.value }],
        borderRadius,
      };
    });

    return (
      <GestureDetector gesture={gesture}>
        <Animated.View
          style={[styles.bottomSheetContainer, rBottomSheetStyles]}
        >
          <View style={styles.line} />
        </Animated.View>
      </GestureDetector>
    );
  }
);

export default BottomSheet;

const styles = StyleSheet.create({
  bottomSheetContainer: {
    position: "absolute",
    top: SCREEN_HEIGHT,
    height: SCREEN_HEIGHT,
    width: "100%",
    backgroundColor: "#d4d4d4",
    borderRadius: 25,
  },
  line: {
    width: 75,
    height: 4,
    alignSelf: "center",
    backgroundColor: "black",
    marginVertical: 15,
    borderRadius: 5,
  },
});
