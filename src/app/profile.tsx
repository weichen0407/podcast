import { useAuth, useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function ProfileModal() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.dismissAll();
  };

  return (
    <View style={styles.container}>
      {user?.imageUrl ? (
        <Image source={{ uri: user.imageUrl }} style={styles.avatar} />
      ) : (
        <View style={styles.avatarFallback}>
          <Text style={styles.avatarInitial}>
            {user?.firstName?.[0] ?? user?.emailAddresses[0].emailAddress[0].toUpperCase()}
          </Text>
        </View>
      )}

      <Text style={styles.name}>
        {user?.fullName ?? user?.emailAddresses[0].emailAddress}
      </Text>
      <Text style={styles.email}>{user?.emailAddresses[0].emailAddress}</Text>

      <Pressable
        style={({ pressed }) => [styles.signOutButton, pressed && styles.pressed]}
        onPress={handleSignOut}
      >
        <Text style={styles.signOutText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 48,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: 16,
  },
  avatarFallback: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: "#0a7ea4",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarInitial: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "600",
  },
  name: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginBottom: 40,
  },
  signOutButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: "#ff3b30",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
  signOutText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
