import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import Icon from 'react-native-vector-icons/Feather';
import moment from 'moment';

import api from '../../services/api';

import { colors } from '../../styles';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Main() {
  const navigation = useNavigation();
  const route = useRoute();
  const [reading, setReding] = useState({ product: {} });

  async function readQRCODE(qrcode) {
    try {
      if (qrcode) {
        const info = { device: DeviceInfo.getUniqueId(), value: qrcode };
        const response = await api.post('readings', info);
        setReding(response.data);
      }
    } catch (e) {
      if (e.response.data.error) {
        Alert.alert('Aviso', e.response.data.error);
      } else {
        Alert.alert('Aviso', 'Erro ao pesquisar QRCode, tente novamente.');
      }
    }
  }

  async function getServerIp() {
    try {
      const server = await AsyncStorage.getItem('@redingProduct/serverIp');
      if (!server) {
        navigation.navigate('Configure');
      } else {
        api.defaults.baseURL = `http://${server}:3333`;
      }
    } catch (e) {
      navigation.navigate('Configure');
    }
  }

  useFocusEffect(() => {
    getServerIp();
    if (route.params?.qrCodeValue) {
      readQRCODE(route.params.qrCodeValue);
      route.params.qrCodeValue = null;
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerTitle}>Leitor de Produtos</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Configure')}>
          <Icon name="settings" size={28} color={colors.secundary} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.infoButton}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('ScanQrcode')}
          >
            <Text style={styles.buttonText}>Consultar produto</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.infoProduct}>
          <Text style={styles.textLabel}>Informações do Produto:</Text>
          <Text style={styles.textValue} numberOfLines={1}>
            {reading.product.description}
          </Text>

          <Text style={styles.textLabel}>QRCode lido:</Text>
          <Text style={styles.textValue} numberOfLines={1}>
            {reading.value}
          </Text>

          <Text style={styles.textLabel}>Data consulta:</Text>
          <Text style={styles.textValue}>
            {reading.date
              ? moment(reading.date).format('DD/MM/YYYY hh:mm:ss')
              : ''}
          </Text>

          <TouchableOpacity
            style={styles.linkButton}
            onPress={() =>
              navigation.navigate('Detail', {
                device: DeviceInfo.getUniqueId(),
              })
            }
          >
            <Text style={styles.linkButtonText}>
              Consultas realizadas neste dispositivo
            </Text>
            <Icon name="arrow-right-circle" size={16} color={colors.lighter} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
