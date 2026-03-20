import { Stack } from "expo-router/stack";

export default function NewStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "New", headerLargeTitle: true }} />
    </Stack>
  );
}
