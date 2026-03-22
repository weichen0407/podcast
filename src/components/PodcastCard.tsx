import { Image, Pressable, Text, View } from "react-native";
import { Feed } from "@/types";
import { Link } from "expo-router";

interface PodcastCardProps{
  podcast:Feed
}

export function PodcastCard({ podcast }: PodcastCardProps) {
  return (
    <Link href={`/(home)/${podcast.id}`} className="flex-1" asChild>
    <Pressable className="flex-1 rounded-2xl overflow-hidden bg-white shadow-sm">
      <Image
        source={{ uri: podcast.artwork || podcast.image || undefined }}
        className="w-full aspect-square bg-gray-200"
        resizeMode="cover"
      />
      <View className="p-2 gap-1">
        <Text className="text-sm font-semibold text-gray-900 leading-tight" numberOfLines={2}>
          {podcast.title}
        </Text>
        {podcast.author ? (
          <Text className="text-xs text-gray-500" numberOfLines={1}>
            {podcast.author}
          </Text>
        ) : null}
        <View className="flex-row items-center gap-1 mt-1">
          <Text className="text-xs text-indigo-500 font-medium">
            {podcast.episodeCount} eps
          </Text>
          {podcast.explicit && (
            <Text className="text-xs text-red-400 font-medium">· E</Text>
          )}
          {podcast.language ? (
            <Text className="text-xs text-gray-400">· {podcast.language.toUpperCase()}</Text>
          ) : null}
        </View>
      </View>
      </Pressable>
      </Link>
  );
}
