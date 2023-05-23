import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Slider,
  Dimensions,
  SafeAreaView,
  Button,
  Alert,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const {height, width} = Dimensions.get('window');
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import DeviceInfo from 'react-native-device-info';
import storage from './utils/storage';

type Props = {};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerBlock: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 20,
  },
  colorContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  heading: {
    color: '#000',
    fontSize: 20,
    marginBottom: 20,
  },
  sliders: {
    flex: 1,
    flexDirection: 'column',
    paddingTop: 20,
    alignItems: 'center',
  },
  currentColorBlock: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  currentColorHeading: {
    color: '#000',
    fontSize: 20,
  },
  similarHeadig: {
    color: '#000',
    fontSize: 20,
    padding: 5,
    textAlign: 'center',
    marginBottom: 20,
  },
  colorCode: {
    textAlign: 'center',
    padding: 5,
  },
  currentColor: {
    width: width * 0.8,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    lineHeight: 30,
    marginTop: 20,
    borderRadius: 10,
    borderColor: 'transparent',
  },
  colorBlock: {
    width: width * 0.39,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 30,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  saveButton: {
    // width: width * 0.39,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: 30,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
  },
});
const toHex = d => {
  return ('0' + Number(d).toString(16)).slice(-2).toUpperCase();
};
export default class TermScreen extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {red: 0, green: 0, blue: 0};
  }
  getVal(val) {
    console.log(val);
  }
  getHexaValue = val => {
    const valArr = val.split('(')[1].split(')')[0].split(',');
    const red = toHex(valArr[0]);
    const green = toHex(valArr[1]);
    const blue = toHex(valArr[2]);

    let alpha = toHex(valArr[3] * 256);
    return `#${red}${green}${blue}${alpha}`;
  };

  onPressSaveHexColor = async () => {
    const {red, green, blue} = this.state;

    DeviceInfo.getUniqueId().then(async uniqueId => {
      console.log('click onPressSaveHexColor');

      Alert.prompt('Enter Color name', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Ok',

          onPress: password => console.log('OK Pressed, password: ' + password),
        },
      ]);

      // await firestore()
      //   .collection('colors')
      //   .doc(uniqueId)
      //   .update({
      //     hexString: firestore.FieldValue.arrayUnion(colorObject),
      //   });
    });
  };

  render() {
    const {red, green, blue} = this.state;
    return (
      // <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View
          style={[
            styles.container,
            {
              backgroundColor: `rgba(${red},${green},${blue}, ${0.5})`,
            },
          ]}>
          <View style={styles.innerBlock}>
            <View style={styles.sliders}>
              <Text style={styles.heading}>CHOOSE YOUR COLOR</Text>
              <Slider
                step={1}
                minimumValue={0}
                maximumValue={255}
                value={red}
                minimumTrackTintColor="#ff0000"
                maximumTrackTintColor="#f2b1b1"
                thumbTintColor="#ff0000"
                trackStyle={{
                  height: 15,
                }}
                style={{
                  width: 300,
                }}
                onValueChange={val => this.setState({red: val})}
                onSlidingComplete={val => this.getVal(val)}
              />
              <Slider
                style={{width: 300}}
                step={1}
                minimumValue={0}
                maximumValue={255}
                minimumTrackTintColor="#008000"
                maximumTrackTintColor="#3CB371"
                thumbTintColor="#008000"
                trackStyle={{
                  height: 15,
                }}
                value={green}
                onValueChange={val => this.setState({green: val})}
                onSlidingComplete={val => this.getVal(val)}
              />
              <Slider
                style={{width: 300}}
                step={1}
                minimumValue={0}
                maximumValue={255}
                minimumTrackTintColor="#0000FF"
                maximumTrackTintColor="#87CEFA"
                thumbTintColor="#0000FF"
                value={blue}
                trackStyle={{
                  height: 15,
                }}
                onValueChange={val => this.setState({blue: val})}
                onSlidingComplete={val => this.getVal(val)}
              />
              <View style={styles.currentColorBlock}>
                <Text style={styles.currentColorHeading}>CURRENT COLOR</Text>
                <View
                  style={[
                    styles.currentColor,
                    {
                      backgroundColor: `rgba(${red},${green},${blue}, ${1})`,
                    },
                  ]}>
                  <Text style={styles.colorCode}>
                    {this.getHexaValue(`rgba(${red},${green},${blue}, ${1})`)}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={styles.similarHeadig}>SIMILAR COLOR OPTIONS</Text>
            <View style={styles.colorContainer}>
              <View
                style={[
                  styles.colorBlock,
                  {
                    backgroundColor: `rgba(${red},${green},${blue}, ${0.1})`,
                  },
                ]}>
                <Text>
                  {this.getHexaValue(`rgba(${red},${green},${blue}, ${0.1})`)}
                </Text>
              </View>
              <View
                style={[
                  styles.colorBlock,
                  {
                    backgroundColor: `rgba(${red},${green},${blue}, ${0.2})`,
                  },
                ]}>
                <Text>
                  {this.getHexaValue(`rgba(${red},${green},${blue}, ${0.2})`)}
                </Text>
              </View>
              <View
                style={[
                  styles.colorBlock,
                  {
                    backgroundColor: `rgba(${red},${green},${blue}, ${0.3})`,
                  },
                ]}>
                <Text>
                  {this.getHexaValue(`rgba(${red},${green},${blue}, ${0.3})`)}
                </Text>
              </View>
              <View
                style={[
                  styles.colorBlock,
                  {
                    backgroundColor: `rgba(${red},${green},${blue}, ${0.4})`,
                  },
                ]}>
                <Text>
                  {this.getHexaValue(`rgba(${red},${green},${blue}, ${0.4})`)}
                </Text>
              </View>
              <View
                style={[
                  styles.colorBlock,
                  {
                    backgroundColor: `rgba(${red},${green},${blue}, ${0.5})`,
                  },
                ]}>
                <Text>
                  {this.getHexaValue(`rgba(${red},${green},${blue}, ${0.5})`)}
                </Text>
              </View>
              <View
                style={[
                  styles.colorBlock,
                  {
                    backgroundColor: `rgba(${red},${green},${blue}, ${0.6})`,
                  },
                ]}>
                <Text>
                  {this.getHexaValue(`rgba(${red},${green},${blue}, ${0.6})`)}
                </Text>
              </View>
              <View
                style={[
                  styles.colorBlock,
                  {
                    backgroundColor: `rgba(${red},${green},${blue}, ${0.7})`,
                  },
                ]}>
                <Text>
                  {this.getHexaValue(`rgba(${red},${green},${blue}, ${0.7})`)}
                </Text>
              </View>
              <View
                style={[
                  styles.colorBlock,
                  {
                    backgroundColor: `rgba(${red},${green},${blue}, ${0.8})`,
                  },
                ]}>
                <Text>
                  {this.getHexaValue(`rgba(${red},${green},${blue}, ${0.8})`)}
                </Text>
              </View>
              <View
                style={[
                  styles.colorBlock,
                  {
                    backgroundColor: `rgba(${red},${green},${blue}, ${0.9})`,
                  },
                ]}>
                <Text>
                  {this.getHexaValue(`rgba(${red},${green},${blue}, ${0.9})`)}
                </Text>
              </View>
            </View>
            <View style={styles.saveButton}>
              <TextInput placeholder="Enter color name" onChange={text => {}} />
            </View>
            <View
              style={[
                styles.saveButton,
                {
                  backgroundColor: `rgba(${red},${green},${blue}, ${0.9})`,
                },
              ]}>
              <Button
                title="Save hex color"
                onPress={this.onPressSaveHexColor}
              />
              {/* <Text>
              {this.getHexaValue(`rgba(${red},${green},${blue}, ${0.9})`)}
            </Text> */}
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
      // </SafeAreaView>
    );
  }
}

// import React, {Component} from 'react';
// import {BackHandler} from 'react-native';
// import {WebView} from 'react-native-webview';

// export default class TermScreen extends Component {
//   WEBVIEW_REF = React.createRef();

//   state = {
//     canGoBack: false,
//   };

//   componentDidMount() {
//     BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
//   }

//   componentWillUnmount() {
//     BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
//   }

//   handleBackButton = () => {
//     if (this.state.canGoBack) {
//       this.WEBVIEW_REF.current.goBack();
//       return true;
//     }
//   };

//   onNavigationStateChange = navState => {
//     this.setState({
//       canGoBack: navState.canGoBack,
//     });
//   };

//   render() {
//     return (
//       <WebView
//         source={{uri: 'https://mywinbox.xyz/privacy-policy/'}}
//         ref={this.WEBVIEW_REF}
//         onNavigationStateChange={this.onNavigationStateChange}
//       />
//     );
//   }
// }

// @flow
