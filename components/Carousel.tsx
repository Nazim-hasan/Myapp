import * as React from 'react';
import {Dimensions, ImageBackground, Text, View} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

function BannerCarousel() {
  const width = Dimensions.get('window').width;
  const quoteImage = require('../assets/dashboard/quote.png');
  return (
    <Carousel
      loop
      width={width}
      height={width / 2}
      autoPlay={true}
      data={[...new Array(2).keys()]}
      scrollAnimationDuration={3000}
      renderItem={({index}) => (
        <ImageBackground
          source={quoteImage}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: 'center',
            marginTop: 20,
          }}>
          <Text
            style={{
              fontFamily: 'Poppins Regular',
              fontSize: 14,
              color: '#212121',
              textAlign: 'center',
            }}>
            The highest ideal of cure is the speedy, gentle, and enduring
            restoration of health by the most trustworthy and least harmful
            way...
          </Text>
          <Text
            style={{
              fontFamily: 'Poppins Regular',
              fontSize: 14,
              color: '#212121',
              textAlign: 'center',
              marginTop: 10,
            }}>
            Samuel Hahnemann
          </Text>
        </ImageBackground>
      )}
      modeConfig={{
        parallaxScrollingScale: 0.9,
        parallaxScrollingOffset: 50,
      }}
      pagingEnabled
      snapEnabled
      mode="parallax"
    />
  );
}

export default BannerCarousel;
