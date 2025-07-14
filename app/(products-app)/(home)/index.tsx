import { ThemedText } from '@/presentation/theme/components/ThemedText';
import { ThemedView } from '@/presentation/theme/components/ThemedView';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';

const HomeScreen = () => {
  const primary = useThemeColor({}, 'primary');
  const background = useThemeColor({}, 'background');

  return (
    <ThemedView style={{ paddingTop: 100, paddingHorizontal: 20, flex: 1, backgroundColor: background }}>
      <ThemedText style={{ fontFamily: 'KanitBold', color: primary }}>
        HomeScreen
      </ThemedText>
      <ThemedText style={{ fontFamily: 'KanitRegular' }}>HomeScreen</ThemedText>
      <ThemedText style={{ fontFamily: 'KanitThin' }}>HomeScreen</ThemedText>
      <ThemedText>HomeScreen</ThemedText>
    </ThemedView>
  );
};
export default HomeScreen;