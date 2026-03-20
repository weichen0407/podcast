import { Stack } from "expo-router/stack";

export default function HomeStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home", headerLargeTitle: true }} />
    </Stack>
  );
}
