import { ActivityIndicator, FlatList, Text } from "react-native";

import { fetchTrending } from "@/services/podcast-index";
import { useQuery } from "@tanstack/react-query";
import { PodcastCard } from "@/components/PodcastCard";

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
      contentContainerClassName="gap-2 p-2"
      columnWrapperClassName="gap-2"
      renderItem={({ item }) => <PodcastCard item={item} />}
      contentInsetAdjustmentBehavior="automatic"
      numColumns={2}
    ></FlatList>
  );
}
