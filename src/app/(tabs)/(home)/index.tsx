import { Button, ScrollView, Text } from "react-native";

import { fetchTrending } from "@/services/podcast-index";

export default function HomeScreen() {
  const onPress = async () => {
    const data = await fetchTrending();
    console.log(JSON.stringify(data, null, 2));
  };
  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <Text>Home</Text>

      <Button title="Fetch trending" onPress={onPress} />
    </ScrollView>
  );
}
