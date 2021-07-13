import React, {useRef, useState} from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import {IcClock, IcStar, IcWeather} from '../../assets';
import ProductDetail from '../../assets/JSON/ProductDetail';
import {Button, Gap} from '../../components';

const {width} = Dimensions.get('window');

const Detail = ({navigation}) => {
  const topRef = useRef(null);
  const thumbRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToActiveIndex = index => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width * 0.927,
      animated: true,
    });
    if (index * (60 + 10) - 60 / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (60 + 10) - width / 2 + 10 / 2,
        animated: true,
      });
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <View style={styles.containerCarousel}>
          <FlatList
            data={ProductDetail}
            renderItem={({item}) => {
              return (
                <Image source={item.image} style={styles.imagesContainer} />
              );
            }}
            keyExtractor={item => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            snapToInterval={width * 0.927}
            ref={topRef}
          />
        </View>
        <View>
          <FlatList
            ref={thumbRef}
            data={ProductDetail}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={styles.thumbnail}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity onPress={() => scrollToActiveIndex(index)}>
                  <Image source={item.image} style={styles.images} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <Gap height={24} />
        <View style={styles.featuresContainer}>
          <View>
            <View style={styles.row}>
              <IcStar />
              <Gap width={8} />
              <Text style={styles.label}>4.5</Text>
            </View>
            <Gap height={5} />
            <Text style={styles.detail}>4,5 k Review</Text>
          </View>
          <View style={styles.line} />
          <View>
            <View style={styles.row}>
              <IcClock />
              <Gap width={8} />
              <Text style={styles.label}>4h</Text>
            </View>
            <Gap height={5} />
            <Text style={styles.detail}>Duration</Text>
          </View>
          <View style={styles.line} />
          <View>
            <View style={styles.row}>
              <IcWeather />
              <Gap width={8} />
              <Text style={styles.label}>28 C</Text>
            </View>
            <Gap height={5} />
            <Text style={styles.detail}>Sunny</Text>
          </View>
        </View>
        <Gap height={16} />
        <View style={styles.containerDesc}>
          <Text style={styles.labelDesc}>Description</Text>
          <Gap height={16} />
          <Text style={styles.text}>
            Welcome to Labuan Bajo Beach, a beach that has the best photo
            spots... <Text style={styles.more}>View more</Text>
          </Text>
        </View>
        <Gap height={16} />
        <View style={styles.button}>
          <Button fontSize={16} text="Book now" paddingVertical={12} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  containerCarousel: {
    margin: normalize(15),
  },
  imagesContainer: {
    width: normalize(349),
    height: normalize(428),
    borderRadius: normalize(15),
  },
  thumbnail: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingVertical: normalize(8),
    paddingHorizontal: normalize(15),
  },
  images: {
    width: 120,
    height: 80,
    borderRadius: normalize(10),
  },
  containerDesc: {
    paddingHorizontal: normalize(24),
    paddingVertical: normalize(8),
  },
  labelDesc: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(18),
    color: '#1E272E',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(14),
    color: '#1E272E',
  },
  more: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(14),
    color: '#1775F9',
  },
  featuresContainer: {
    flexDirection: 'row',
    paddingHorizontal: normalize(35),
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  detail: {
    fontFamily: 'Montserrat-Medium',
    fontSize: normalize(10),
    color: '#C4C4C4',
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(16),
    color: '#1E272E',
  },
  line: {
    width: 1,
    height: 30,
    backgroundColor: '#C4C4C4',
  },
  button: {
    paddingHorizontal: normalize(24),
    paddingBottom: normalize(24),
  },
  name: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(18),
    color: '#FFFFFF',
  },
  location: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(15),
    color: '#FFFFFF',
  },
});
