import React from 'react';
import {
  Animated,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import normalize from 'react-native-normalize';
import {IcSearch, IcUmrella, LabuanBajo, User} from '../../assets';
import Banner from '../../assets/JSON/Banner';
import {Gap, ListDestination} from '../../components';

const Home = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const {width} = useWindowDimensions();
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const slidersRef = React.useRef(null);

  const viewableItemsChanged = React.useRef(({viewableItems}) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;
  const viewConfig = React.useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;
  return (
    <SafeAreaView style={styles.page}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View style={styles.inputSearch}>
            <IcSearch />
            <Gap width={16} />
            <TextInput
              placeholder="Find your destination"
              placeholderTextColor="#D7D7D7"
              style={styles.input}
            />
          </View>
          <Gap width={14} />
          <Image source={User} style={styles.user} />
        </View>
        <Text style={styles.title}>Lets go trip with us</Text>
        <Gap height={16} />
        <View>
          <FlatList
            data={Banner}
            renderItem={({item}) => (
              <Image source={item.image} style={styles.image} />
            )}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            snapToInterval={width * 0.87}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
            ref={slidersRef}
            contentContainerStyle={{paddingLeft: normalize(15)}}
          />
          <Gap height={8} />
          <View style={styles.container}>
            {Banner.map((_, i) => {
              const inputRange = [
                (i - 1) * (width * 0.87),
                i * (width * 0.87),
                (i + 1) * (width * 0.87),
              ];
              const dotWidth = scrollX.interpolate({
                inputRange,
                outputRange: [6, 20, 6],
                extrapolate: 'clamp',
              });
              const opacity = scrollX.interpolate({
                inputRange,
                outputRange: [0.87, 1, 0.87],
              });
              return (
                <Animated.View
                  style={[styles.dot, {width: dotWidth, opacity}]}
                  key={i.toString()}
                />
              );
            })}
          </View>
        </View>
        <Gap height={16} />
        <Text style={styles.label}>Categories</Text>
        <Gap height={8} />
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingLeft: normalize(15)}}>
            <TouchableOpacity activeOpacity={0.7} style={styles.borderActive}>
              <IcUmrella />
              <Gap width={12} />
              <Text style={styles.category}>Beach</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.border}>
              <Text style={styles.category}>Mountains</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7} style={styles.border}>
              <Text style={styles.category}>Village</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <Gap height={16} />
        <Text style={styles.label}>Destination</Text>
        <Gap height={16} />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: normalize(15),
            paddingBottom: normalize(15),
          }}>
          <ListDestination
            thumbnail={<Image source={LabuanBajo} style={styles.thumbnail} />}
            name="Labuan Bajo"
            location="Indonesia"
            bookmark
            onPress={() => navigation.navigate('Detail')}
          />
          <ListDestination
            thumbnail={<Image source={LabuanBajo} style={styles.thumbnail} />}
            name="Raja Ampat"
            location="Indonesia"
          />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    flexDirection: 'row',
    paddingHorizontal: normalize(15),
    paddingVertical: normalize(32),
  },
  inputSearch: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(15),
    borderWidth: 1,
    borderColor: '#D7D7D7',
    borderRadius: normalize(8),
  },
  input: {
    flex: 1,
    fontFamily: 'Montserrat-Regular',
    fontSize: normalize(14),
    color: '#3D3D3D',
  },
  user: {
    width: normalize(48),
    height: normalize(48),
    borderRadius: normalize(8),
  },
  title: {
    paddingHorizontal: normalize(15),
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(24),
    color: '#1E272E',
  },
  image: {
    width: normalize(326),
    height: normalize(140),
    borderRadius: normalize(10),
    marginRight: normalize(15),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    height: normalize(6),
    borderRadius: normalize(8),
    backgroundColor: '#D7D7D7',
    marginHorizontal: normalize(6),
  },
  label: {
    paddingHorizontal: normalize(15),
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(18),
    color: '#1E272E',
  },
  borderActive: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    width: normalize(124),
    height: normalize(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(8),
    marginRight: normalize(15),
  },
  border: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    width: normalize(124),
    height: normalize(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(8),
    marginRight: normalize(15),
  },
  category: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: normalize(14),
    color: '#1E272E',
  },
  thumbnail: {
    width: normalize(174),
    height: normalize(116),
    borderRadius: normalize(8),
  },
});
