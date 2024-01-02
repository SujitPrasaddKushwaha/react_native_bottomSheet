import { StyleSheet, TouchableOpacity } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import BottomSheet, { BottomSheetRefProps } from "../../components/BottomSheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useCallback, useRef } from "react";

export default function TabOneScreen() {
  const ref = useRef<BottomSheetRefProps>(null);
  const onPress = useCallback(() => {
    ref?.current?.scrollTo(-300);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.title}>Tab One</Text>
        <TouchableOpacity style={styles.separator} onPress={onPress} />
        <BottomSheet ref={ref} />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 50,
    aspectRatio: 1,
    borderRadius: 30,
    backgroundColor: "orange",
  },
});
