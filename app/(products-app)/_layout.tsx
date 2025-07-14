import LogoutIconButton from '@/presentation/auth/components/LogoutIconButton';
import { useAuthStore } from '@/presentation/auth/store/useAuthStore';
import { useThemeColor } from '@/presentation/theme/hooks/useThemeColor';
import { Redirect, Stack } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

const CheckAuthenticationLayout = () => {

    const background = useThemeColor({}, 'background');
    const { status, checkStatus } = useAuthStore();

    useEffect(() => {
        checkStatus();
    }, []);

    if (status === 'checking') {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#ff0062" />
            </View>
        );
    }

    if (status === 'unauthenticated') {
       return <Redirect href="/auth/login" />
    }

    return (
        <Stack
            screenOptions={{
                headerStyle: {
                    backgroundColor: background 
                },
                contentStyle: {
                    backgroundColor: background
                },
                headerShadowVisible: false,
                
            }}
        >
            <Stack.Screen name="(home)/index" options={{
                title: 'Productos',
                headerLeft: () => (
                   <LogoutIconButton />
                )
            }}/>
        </Stack>
    )

}

export default CheckAuthenticationLayout