import React, { useState } from 'react';
import {
  Alert,
  Text,
  View,
  Vibration,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../../styles';
import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function ScanQrcode() {
  const [scanning, setScanning] = useState(true);
  const [cameraType] = useState(RNCamera.Constants.Type.back);
  const [useFlash, setUseFlash] = useState(false);

  const navigation = useNavigation();

  function handleBarCodeRead(e) {
    Vibration.vibrate();
    setScanning(false);
    navigation.navigate('Main', { qrCodeValue: e.data });
  }

  if (scanning) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={logoImg} />
          <Text style={styles.headerTitle}>Posicione o QR Code</Text>
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name="arrow-left" size={28} color={colors.secundary} />
          </TouchableOpacity>
        </View>
        <View style={styles.rectangleContainer}>
          <RNCamera
            style={styles.camera}
            type={cameraType}
            onBarCodeRead={handleBarCodeRead}
            zoom={0.2}
            flashMode={
              useFlash
                ? RNCamera.Constants.FlashMode.torch
                : RNCamera.Constants.FlashMode.off
            }
          >
            <View style={styles.rectangleContainer}>
              <View style={styles.rectangle} />
            </View>
          </RNCamera>
        </View>
        <View style={styles.buttonContent}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setUseFlash(!useFlash)}
          >
            <Text style={styles.buttonText}>
              {useFlash ? (
                <Icon name="zap-off" size={28} color={colors.lighter} />
              ) : (
                <Icon name="zap" size={28} color={colors.lighter} />
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Barcode Scanner</Text>
      <Text style={styles.instructions}>
        Double tap R on your keyboard to reload,{'\n'}
      </Text>
    </View>
  );
}
