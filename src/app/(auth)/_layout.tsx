import { useAuth } from '@clerk/expo'
import { Redirect, Stack } from 'expo-router'

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth()

  if (!isLoaded) {
    return null
  }

  if (isSignedIn) {
    return <Redirect href={'/(tabs)/(home)'} />
  }

  return <Stack>
    <Stack.Screen name='sign-in' options={{ title: "Sign In" }}></Stack.Screen>
    <Stack.Screen name='sign-up' options={{title:"Sign Up"}}></Stack.Screen>
  </Stack>
}