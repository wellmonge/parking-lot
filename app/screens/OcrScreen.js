import React, { Component } from 'react';
import { Text, View, StyleSheet, WebView, TouchableOpacity } from 'react-native';
import { Camera, Permissions, Constants } from 'expo';

const styles = {
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: Constants.statusBarHeight,
      backgroundColor: '#ecf0f1',
    },
    paragraph: {
      margin: 24,
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#34495e',
    },
  };

const HTML = `
<div id="thediv">yooo</div>
<div id="imagediv">image here</div>

<script src='https://cdn.rawgit.com/naptha/tesseract.js/1.0.10/dist/tesseract.js'></script>
<script>
var base64 = "";
var output = "";
function resetImage() {
  base64 = "";
}
function addImageData(data) {
  base64 = base64 + data;
}
function writeResult(text) {
  output = output + '<br/>' + text;
  document.getElementById('thediv').innerHTML = output;
}

function run(width, height) {
  width = 500;
  height = 500;
  document.getElementById('imagediv').innerHTML = "<img id='theimage' src='" + base64 + "' width=" + width + " height=" + height + "/>";
  
  setTimeout(function () {
    var theimage = document.getElementById('theimage');
    writeResult('loading: ' + theimage);
    Tesseract.recognize(theimage)
         .progress(function  (p) { writeResult('progress ' + JSON.stringify(p))    })
         .catch(function (e) {  writeResult('error ' + JSON.stringify(e)) })
         .then(function (result) { writeResult('result ' + JSON.stringify(result)) });
  }, 500);
}
</script>
`;

export default class OcrScreen extends Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }
  
  
  render() {
    
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <WebView
            javaScriptEnabled={true}
            ref={ref => {this.webview = ref; }}
            //source={{html: HTML}}
            source={{uri: 'http://192.168.0.129:8000/ocrtest.html'}}
            style={{marginTop: 20, flex: 1}}
          />
          <Camera ref={ref => { this.camera = ref; }} style={{ flex: 1 }} type={this.state.type}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'transparent',
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => {
                  this.setState({
                    type: this.state.type === Camera.Constants.Type.back
                      ? Camera.Constants.Type.front
                      : Camera.Constants.Type.back,
                  });
                }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Flip{' '}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={{
                  flex: 0.1,
                  alignSelf: 'flex-end',
                  alignItems: 'center',
                }}
                onPress={() => this._takePhoto()}>
                <Text
                  style={{ fontSize: 18, marginBottom: 10, color: 'white' }}>
                  {' '}Take{' '}
                </Text>
              </TouchableOpacity>
              
            </View>
          </Camera>
        </View>
      );
    }
  }
  
  _takePhoto = async () => {
    let photo = await this.camera.takePictureAsync({
      base64: true,
      quality: 0,
    });
    //console.log(photo.base64.substring(0, 20));
    //"data:image/jpg;base64,' + photo.base64 + '", 
    //' + photo.width + ', ' + photo.height + '
    //this.webview.injectJavaScript('run("data:image/jpg;base64,' + photo.base64.substring(0, 20) + '", ' + photo.width + ', ' + photo.height + ')');
    
    this.webview.injectJavaScript('resetImage()');
    
    let data = "data:image/jpg;base64," + photo.base64;
    let index = 0;
    const BUFFER_SIZE = 10000;
    while (index < data.length) {
      this.webview.injectJavaScript('addImageData("' + data.substring(index, Math.min(index + BUFFER_SIZE, data.length)) + '")');
      index += BUFFER_SIZE;
    }
    
    this.webview.injectJavaScript('run(' + photo.width + ', ' + photo.height + ')');
  }
}
