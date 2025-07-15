import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useThemeColor } from '../hooks/useThemeColor';

interface Props {
    onPress: () => void;
    icon: keyof typeof Ionicons.glyphMap;
}

const MenuIconButton = ({ onPress, icon }: Props) => {

    const primaryColor = useThemeColor({}, 'primary');

  return (
   <Ionicons name={icon} size={25} onPress={onPress} color={primaryColor} />
  )
}

export default MenuIconButton