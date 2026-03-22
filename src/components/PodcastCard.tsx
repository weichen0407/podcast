import { Image, Text, View } from "react-native";
import { Feed } from "@/types";

type Props = {
  item: Feed;
};

export function PodcastCard({ item }: Props) {
  return (
    <View className="flex-1 rounded-2xl overflow-hidden bg-white shadow-sm">
      <Image
        source={{ uri: item.artwork || item.image }}
        className="w-full aspect-square bg-gray-200"
        resizeMode="cover"
      />
      <View className="p-2 gap-1">
        <Text className="text-sm font-semibold text-gray-900 leading-tight" numberOfLines={2}>
          {item.title}
        </Text>
        {item.author ? (
          <Text className="text-xs text-gray-500" numberOfLines={1}>
            {item.author}
          </Text>
        ) : null}
        <View className="flex-row items-center gap-1 mt-1">
          <Text className="text-xs text-indigo-500 font-medium">
            {item.episodeCount} eps
          </Text>
          {item.explicit && (
            <Text className="text-xs text-red-400 font-medium">· E</Text>
          )}
          {item.language ? (
            <Text className="text-xs text-gray-400">· {item.language.toUpperCase()}</Text>
          ) : null}
        </View>
      </View>
    </View>
  );
}
