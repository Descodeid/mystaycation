import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import normalize from 'react-native-normalize';

const Button = ({
  text,
  paddingVertical = normalize(8),
  fontSize = normalize(12),
  onPress,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container(paddingVertical)}
      onPress={onPress}>
      <Text style={styles.text(fontSize)}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: paddingVertical => ({
    backgroundColor: '#1775F9',
    paddingVertical,
    borderRadius: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
  }),
  text: fontSize => ({
    fontFamily: 'Montserrat-SemiBold',
    fontSize,
    color: '#FFFFFF',
  }),
});
