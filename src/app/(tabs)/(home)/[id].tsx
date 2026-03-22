import { useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { fetchFeedById, fetchEpisodesByFeedId } from "@/services/podcast-index";
import { useQuery } from "@tanstack/react-query";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import type { Episode } from "@/types";

const C = {
  bg: "#0F0F13",
  surface: "#1A1A22",
  border: "#2A2A36",
  accent: "#7C5CFC",
  text: "#F0F0F5",
  muted: "#8888A4",
};

function formatDuration(seconds: number | null): string {
  if (!seconds) return "";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

function EpisodeRow({ episode }: { episode: Episode }) {
  return (
    <Pressable className="flex-row items-center py-3.5 border-t border-[#2A2A36] gap-3.5 active:opacity-70">
      <Image
        source={{ uri: episode.image || episode.feedImage || undefined }}
        className="w-[60px] h-[60px] rounded-[10px] bg-[#1A1A22]"
      />
      <View className="flex-1 gap-1.5">
        <Text className="text-sm font-semibold text-[#F0F0F5] leading-5" numberOfLines={2}>
          {episode.title}
        </Text>
        <View className="flex-row items-center gap-1.5">
          {episode.datePublishedPretty ? (
            <Text className="text-xs text-[#8888A4]">{episode.datePublishedPretty}</Text>
          ) : null}
          {episode.duration ? (
            <>
              <View className="w-[3px] h-[3px] rounded-[1.5px] bg-[#55556A]" />
              <Text className="text-xs text-[#8888A4]">{formatDuration(episode.duration)}</Text>
            </>
          ) : null}
          {episode.explicit === 1 ? (
            <>
              <View className="w-[3px] h-[3px] rounded-[1.5px] bg-[#55556A]" />
              <View className="w-4 h-4 rounded bg-[#55556A] items-center justify-center">
                <Text className="text-[10px] font-bold text-[#F0F0F5]">E</Text>
              </View>
            </>
          ) : null}
        </View>
      </View>
      <View className="w-9 h-9 rounded-[18px] bg-[rgba(124,92,252,0.18)] border border-[rgba(124,92,252,0.4)] items-center justify-center">
        <Text className="text-[#7C5CFC] text-xs ml-0.5">▶</Text>
      </View>
    </Pressable>
  );
}

export default function PodcastDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [descExpanded, setDescExpanded] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const { data: feedData, isLoading: feedLoading, error: feedError } = useQuery({
    queryKey: ["feed", id],
    queryFn: () => fetchFeedById(id),
  });

  const { data: episodesData, isLoading: episodesLoading } = useQuery({
    queryKey: ["episodes", id],
    queryFn: () => fetchEpisodesByFeedId(id),
    enabled: !!id,
  });

  const podcast = feedData?.feed;
  const episodes = episodesData?.items ?? [];
  const categories = podcast?.categories ? Object.values(podcast.categories) : [];

  if (feedLoading) {
    return (
      <View className="flex-1 bg-[#0F0F13] items-center justify-center gap-4" style={{ paddingTop: insets.top }}>
        <StatusBar barStyle="light-content" />
        <ActivityIndicator size="large" color={C.accent} />
      </View>
    );
  }

  if (feedError || !podcast) {
    return (
      <View className="flex-1 bg-[#0F0F13] items-center justify-center gap-4" style={{ paddingTop: insets.top }}>
        <StatusBar barStyle="light-content" />
        <Text className="text-[#8888A4] text-base">Could not load podcast</Text>
        <Pressable className="px-5 py-2.5 bg-[#1A1A22] rounded-[20px]" onPress={() => router.back()}>
          <Text className="text-[#F0F0F5] text-sm">Go back</Text>
        </Pressable>
      </View>
    );
  }

  const artworkUri = podcast.artwork || podcast.image || undefined;

  return (
    <View className="flex-1 bg-[#0F0F13]">
      <StatusBar barStyle="light-content" />

      {/* Floating back button */}
      <View className="absolute top-0 left-0 right-0 z-10 px-4" style={{ paddingTop: insets.top + 8 }}>
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 rounded-[20px] bg-black/50 items-center justify-center active:opacity-70"
          hitSlop={12}
        >
          <Text className="text-white text-[28px] font-light leading-8 -mt-0.5">‹</Text>
        </Pressable>
      </View>

      <ScrollView
        className="flex-1"
        contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Artwork */}
        <View className="w-full aspect-square">
          <Image
            source={{ uri: artworkUri }}
            className="w-full h-full"
            resizeMode="cover"
          />
        </View>

        {/* Main content */}
        <View className="px-5">
          {/* Title & author */}
          <Text className="text-2xl font-bold text-[#F0F0F5] tracking-tight mt-2">{podcast.title}</Text>
          {podcast.author ? (
            <Text className="text-[15px] text-[#7C5CFC] font-medium mt-1">{podcast.author}</Text>
          ) : null}

          {/* Category tags */}
          {categories.length > 0 && (
            <View className="flex-row flex-wrap gap-2 mt-3.5">
              {categories.slice(0, 4).map((cat) => (
                <View key={cat} className="bg-[rgba(124,92,252,0.18)] rounded-[20px] px-3 py-1 border border-[rgba(124,92,252,0.3)]">
                  <Text className="text-[#7C5CFC] text-xs font-medium">{cat}</Text>
                </View>
              ))}
            </View>
          )}

          {/* Stats row */}
          <View className="flex-row items-center bg-[#1A1A22] rounded-2xl p-4 mt-5">
            <View className="flex-1 items-center gap-1">
              <Text className="text-[17px] font-bold text-[#F0F0F5]">{podcast.episodeCount}</Text>
              <Text className="text-[11px] text-[#8888A4] uppercase tracking-wide">Episodes</Text>
            </View>
            <View className="w-[1px] h-8 bg-[#2A2A36]" />
            <View className="flex-1 items-center gap-1">
              <Text className="text-[17px] font-bold text-[#F0F0F5]">
                {podcast.language?.toUpperCase() || "—"}
              </Text>
              <Text className="text-[11px] text-[#8888A4] uppercase tracking-wide">Language</Text>
            </View>
            {podcast.explicit && (
              <>
                <View className="w-[1px] h-8 bg-[#2A2A36]" />
                <View className="flex-1 items-center gap-1">
                  <Text className="text-[17px] font-bold text-[#FF453A]">18+</Text>
                  <Text className="text-[11px] text-[#8888A4] uppercase tracking-wide">Explicit</Text>
                </View>
              </>
            )}
          </View>

          {/* Action buttons */}
          <View className="flex-row gap-3 mt-5">
            <Pressable
              className={`flex-1 h-12 rounded-[24px] items-center justify-center active:opacity-85 ${
                subscribed ? "bg-[#1A1A22] border border-[#2A2A36]" : "bg-[#7C5CFC]"
              }`}
              onPress={() => setSubscribed((s) => !s)}
            >
              <Text className={`text-[15px] font-semibold tracking-wide ${subscribed ? "text-[#8888A4]" : "text-white"}`}>
                {subscribed ? "✓  Following" : "+ Follow"}
              </Text>
            </Pressable>

            <Pressable className="w-12 h-12 bg-[#1A1A22] rounded-[24px] items-center justify-center border border-[#2A2A36] active:opacity-70">
              <Text className="text-[#F0F0F5] text-xl font-medium">↗</Text>
            </Pressable>
          </View>

          {/* About / Description */}
          {podcast.description ? (
            <View className="mt-7">
              <Text className="text-lg font-bold text-[#F0F0F5] tracking-tight mb-3">About</Text>
              <Text
                className="text-sm leading-[22px] text-[#8888A4]"
                numberOfLines={descExpanded ? undefined : 4}
              >
                {podcast.description}
              </Text>
              <Pressable onPress={() => setDescExpanded((e) => !e)}>
                <Text className="text-[#7C5CFC] text-sm font-medium mt-2">
                  {descExpanded ? "Show less" : "Show more"}
                </Text>
              </Pressable>
            </View>
          ) : null}

          {/* Episodes */}
          <View className="mt-7">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-lg font-bold text-[#F0F0F5] tracking-tight mb-3">Episodes</Text>
              <Text className="text-[13px] text-[#8888A4]">{podcast.episodeCount} total</Text>
            </View>

            {episodesLoading ? (
              <ActivityIndicator color={C.accent} className="mt-4" />
            ) : episodes.length === 0 ? (
              <Text className="text-[#8888A4] text-sm">No episodes found</Text>
            ) : (
              episodes.map((ep) => <EpisodeRow key={ep.id} episode={ep} />)
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
