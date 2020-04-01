import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import { colors } from '../../styles';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const [readings, setReadings] = useState([]);

  useEffect(() => {
    async function findReadings() {
      try {
        const { device } = route.params;
        const response = await api.get(`readings/${device}`);
        setReadings(response.data);
      } catch {
        Alert.alert(
          'Aviso',
          'Erro ao pesquisar consultas realizadas por esse dispositivo.'
        );
      }
    }
    findReadings();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerTitle}>Consultas do dispositivo</Text>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" size={28} color={colors.secundary} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <FlatList
          style={styles.list}
          data={readings}
          keyExtractor={(reading) => String(reading.id)}
          renderItem={({ item: reading }) => (
            <View style={styles.itemList}>
              <Text style={styles.textValue} numberOfLines={1}>
                {reading.barcode.product.description}
              </Text>
              <View style={styles.groupText}>
                <Text style={styles.textLabel}>QRCode:</Text>
                <Text style={styles.textValue} numberOfLines={1}>
                  {reading.barcode.value}
                </Text>
              </View>
              <View style={styles.groupText}>
                <Text style={styles.textLabel}>Data:</Text>
                <Text style={styles.textValue}>
                  {moment(reading.date).format('DD/MM/YYYY hh:mm:ss')}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.linkButton}
                onPress={() =>
                  navigation.navigate('ProductDetail', {
                    productId: reading.barcode.product.id,
                  })
                }
              >
                <Text style={styles.linkButtonText}>Detalhes do Produto</Text>
                <Icon
                  name="arrow-right-circle"
                  size={16}
                  color={colors.lighter}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
