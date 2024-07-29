import * as React from 'react';
import {Dimensions, ImageBackground, Text, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-reanimated-carousel';

function BannerCarousel() {
  const width = Dimensions.get('window').width;
  const quoteImage = require('../assets/dashboard/quote.png');
  return (
    <ImageBackground
      source={quoteImage}
      resizeMode="cover"
      style={{
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 10,
        marginTop: 20,
      }}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={[...new Array(6).keys()]}
        scrollAnimationDuration={3000}
        onSnapToItem={index => console.log('current index:', index)}
        renderItem={({index}) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 10,
            }}>
            <Text style={{textAlign: 'center', fontSize: 30}}>{index}</Text>
          </View>
        )}
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        pagingEnabled
        snapEnabled
        mode="parallax"
      />
    </ImageBackground>
  );
}

export default BannerCarousel;
