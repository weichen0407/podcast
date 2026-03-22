import {
  ActivityIndicator,
  Button,
  FlatList,
  ScrollView,
  Text,
} from "react-native";

import { fetchTrending } from "@/services/podcast-index";
import { useQuery } from "@tanstack/react-query";

export default function HomeScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: [],
    queryFn: () => fetchTrending(),
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    <Text>Failed to fetch trending</Text>;
  }

  return (
    <FlatList
      data={data?.feeds}
      renderItem={({ item }) => <Text>{item.title}</Text>}
      contentInsetAdjustmentBehavior="automatic"
    ></FlatList>
  );
}
