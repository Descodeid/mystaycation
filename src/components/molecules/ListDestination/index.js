import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import normalize from 'react-native-normalize';
import {IcBookmark, IcBookmarkNonActive, IcLocation} from '../../../assets';
import {Button, Gap} from '../../atoms';

const ListDestination = ({name, location, bookmark, thumbnail, onPress}) => {
  return (
    <View style={styles.container}>
      {thumbnail}
      <Gap height={8} />
      <View style={styles.detail}>
        <View>
          <Text style={styles.name}>{name}</Text>
          <Gap height={4} />
          <View style={styles.row}>
            <IcLocation />
            <Gap width={4} />
            <Text style={styles.place}>{location}</Text>
          </View>
        </View>
        {bookmark ? <IcBookmark /> : <IcBookmarkNonActive />}
      </View>
      <Gap height={12} />
      <View style={styles.button}>
        <Button onPress={onPress} text="Visit now" />
      </View>
    </View>
  );
};

export default ListDestination;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: normalize(6),
    marginRight: normalize(12),
    borderRadius: normalize(8),
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 24,
    elevation: 1,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(14),
    color: '#1E272E',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  place: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(12),
    color: '#C4C4C4',
  },
  button: {
    paddingHorizontal: normalize(12),
  },
});
