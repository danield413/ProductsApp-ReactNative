import { ThemedText } from '@/presentation/theme/components/ThemedText'
import React from 'react'
import { View } from 'react-native'

const HomeScreen = () => {
  return (
    <View style={{paddingTop: 100, paddingHorizontal: 20}}>
      <ThemedText style={{fontFamily: 'KanitBold', fontSize: 24}}>HomeScreen</ThemedText>
      <ThemedText style={{fontFamily: 'KanitRegular', fontSize: 16, marginTop: 10}}>
        This is the home screen of the app. You can navigate to other screens from here.
      </ThemedText>
      <ThemedText style={{fontFamily: 'KanitThin', fontSize: 14, marginTop: 5}}>
        Explore the app and enjoy the features.
      </ThemedText>
    </View>
  )
}

export default HomeScreen