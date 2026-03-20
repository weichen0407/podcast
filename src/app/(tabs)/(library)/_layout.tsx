import { Stack } from "expo-router/stack";

export default function LibraryStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Library", headerLargeTitle: true }} />
    </Stack>
  );
}
