import { useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Stack } from "expo-router/stack";
import { Image, Pressable, Text, View, StyleSheet } from "react-native";

function AvatarButton() {
  const { user } = useUser();
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push("/profile")} style={({ pressed }) => pressed && styles.pressed}>
      {user?.imageUrl ? (
        <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarFallback}>
          <Text style={styles.avatarInitial}>
            {user?.firstName?.[0] ?? user?.emailAddresses[0].emailAddress[0].toUpperCase()}
          </Text>
        </View>
      )}
    </Pressable>
  );
}

export default function HomeStack() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerLargeTitle: true,
          headerRight: () => <AvatarButton />,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  avatarFallback: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#0a7ea4",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitial: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  pressed: {
    opacity: 0.6,
  },
});
