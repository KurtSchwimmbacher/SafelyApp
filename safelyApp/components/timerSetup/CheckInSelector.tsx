import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from '../../styles/timerSetupStyles/CheckInSelector.styles';
import { Colors, Shadows } from '../../styles/GlobalStyles';
import { CheckInSelectorProps } from '../../types/timerSetupTypes/CheckInSelector.types';



const CheckInSelector: React.FC<CheckInSelectorProps> = ({ checkIns, setCheckIns }) => {
  const maxCheckIns = 5;

  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        {[...Array(maxCheckIns)].map((_, index) => {
          const isSelected = index + 1 <= checkIns;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.iconWrapper, Shadows.subtle]}
              onPress={() => 
                setCheckIns(checkIns === index + 1 ? 0 : index + 1)
              }
              activeOpacity={0.7}
            >
              <MaterialCommunityIcons
                name={isSelected ? 'checkbox-marked-circle' : 'circle-outline'}
                size={32}
                color={isSelected ? Colors.base : Colors.light}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default CheckInSelector;

