import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import normalize from 'react-native-normalize';
import {IcBookmark, IcHome, IcProfile} from '../../../assets';
import {Gap} from '../../../components';

const Icon = ({label, active}) => {
  switch (label) {
    case 'Home':
      return active ? <IcHome /> : <IcHome />;
    case 'Bookmark':
      return active ? <IcBookmark /> : <IcBookmark />;
    case 'Profile':
      return active ? <IcProfile /> : <IcProfile />;

    default:
      <IcHome />;
  }
  return <IcHome />;
};

const BottomNavigation = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.menu}
              key={index}>
              <Icon label={label} active={isFocused} />
              <Gap height={8} />
              <View style={styles.line(isFocused)} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default BottomNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingVertical: normalize(22),
    paddingHorizontal: normalize(88),
    borderTopLeftRadius: normalize(20),
    borderTopRightRadius: normalize(20),
    elevation: 10,
  },
  menu: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: isFocused => ({
    backgroundColor: '#1775F9',
    width: isFocused ? 16 : 0,
    height: isFocused ? 4 : 0,
    borderRadius: normalize(4),
  }),
});
