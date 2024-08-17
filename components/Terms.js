import * as React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const Terms = props => {
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} overScrollMode="never">
        <View style={styles.main}>
          <Text style={styles.term}>
            {' '}
            Terms & Conditions for Hemeoloy At Homeoloy , accessible from
            http://www.homeoloy.com one of our main priorities is the privacy of
            our visitors. This Privacy Policy document contains types of
            information that is collected and recorded by and how we use it. If
            you have additional questions or require more information about our
            Privacy Policy, do not hesitate to contact us. This Privacy Policy
            applies only to our online activities and is valid for visitors to
            our website with regards to the information that they shared and/or
            collect in . This policy is not applicable to any information
            collected offline or via channels other than this website. Our
            Privacy Policy was created with the help of the Free Privacy Policy
            Generator. Consent By using our website, you hereby consent to our
            Privacy Policy and agree to its terms. Information we collect The
            personal information that you are asked to provide, and the reasons
            why you are asked to provide it, will be made clear to you at the
            point we ask you to provide your personal information. If you
            contact us directly, we may receive additional information about you
            such as your name, email address, phone number, the contents of the
            message and/or attachments you may send us, and any other
            information you may choose to provide. When you register for an
            Account, we may ask for your contact information, including items
            such as name, company name, address, email address, and telephone
            number. How we use your information We use the information we
            collect in various ways, including to: Provide, operate, and
            maintain our website Improve, personalize, and expand our website
            Understand and analyze how you use our website Develop new products,
            services, features, and functionality Communicate with you, either
            directly or through one of our partners, including for customer
            service, to provide you with updates and other information relating
            to the website, and for marketing and promotional purposes Send you
            emails Find and prevent fraud Log Files follows a standard procedure
            of using log files. These files log visitors when they visit
            websites. All hosting companies do this and a part of hosting
            services' analytics. The information collected by log files include
            internet protocol (IP) addresses, browser type, Internet Service
            Provider (ISP), date and time stamp, referring/exit pages, and
            possibly the number of clicks. These are not linked to any
            information that is personally identifiable. The purpose of the
            information is for analyzing trends, administering the site,
            tracking users' movement on the website, and gathering demographic
            information. Cookies and Web Beacons Like any other website, uses
            'cookies'. These cookies are used to store information including
            visitors' preferences, and the pages on the website that the visitor
            accessed or visited. The information is used to optimize the users'
            experience by customizing our web page content based on visitors'
            browser type and/or other information. For more general information
            on cookies, please read the Cookies article on Generate Privacy
            Policy website. Google DoubleClick DART Cookie Google is one of a
            third-party vendor on our site. It also uses cookies, known as DART
            cookies, to serve ads to our site visitors based upon their visit to
            www.website.com and other sites on the internet. However, visitors
            may choose to decline the use of DART cookies by visiting the Google
            ad and content network Privacy Policy at the following URL –
            https://policies.google.com/technologies/ads Our Advertising
            Partners Some of advertisers on our site may use cookies and web
            beacons. Our advertising partners are listed below. Each of our
            advertising partners has their own Privacy Policy for their policies
            on user data. For easier access, we hyperlinked to their Privacy
            Policies below. Google https://policies.google.com/technologies/ads
            Advertising Partners Privacy Policies You may consult this list to
            find the Privacy Policy for each of the advertising partners of .
            Third-party ad servers or ad networks uses technologies like
            cookies, JavaScript, or Web Beacons that are used in their
            respective advertisements and links that appear on , which are sent
            directly to users' browser. They automatically receive your IP
            address when this occurs. These technologies are used to measure the
            effectiveness of their advertising campaigns and/or to personalize
            the advertising content that you see on websites that you visit.
            Note that has no access to or control over these cookies that are
            used by third-party advertisers. Third Party Privacy Policies 's
            Privacy Policy does not apply to other advertisers or websites.
            Thus, we are advising you to consult the respective Privacy Policies
            of these third-party ad servers for more detailed information. It
            may include their practices and instructions about how to opt-out of
            certain options. You can choose to disable cookies through your
            individual browser options. To know more detailed information about
            cookie management with specific web browsers, it can be found at the
            browsers' respective websites. CCPA Privacy Rights (Do Not Sell My
            Personal Information) Under the CCPA, among other rights, California
            consumers have the right to: Request that a business that collects a
            consumer's personal data disclose the categories and specific pieces
            of personal data that a business has collected about consumers.
            Request that a business delete any personal data about the consumer
            that a business has collected. Request that a business that sells a
            consumer's personal data, not sell the consumer's personal data. If
            you make a request, we have one month to respond to you. If you
            would like to exercise any of these rights, please contact us.
          </Text>

        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  term: {
    fontFamily: 'Poppins Medium',
    fontSize: 14,
    color: '#192608',
    marginTop: 10,
    marginHorizontal: 10,
    textAlign: 'left'
  },

  btmnav: {
    width: 360,
    height: 70,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#B0B0B040',
    top: 40,
  },

  btnavbar: {
    top: 9,
    left: 10,
    margin: 10,
  },
});
export default Terms;
