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
import Icon from 'react-native-vector-icons/Feather';

import api from '../../services/api';

import { colors } from '../../styles';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function ProductDetail() {
  const navigation = useNavigation();
  const route = useRoute();

  const [product, setProduct] = useState({ barcodes: [] });

  useEffect(() => {
    async function findProduct() {
      try {
        const { productId } = route.params;
        const response = await api.get(`products/${productId}`);
        setProduct(response.data);
      } catch {
        Alert.alert('Aviso', 'Erro ao buscar o produto.');
      }
    }
    findProduct();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerTitle}>Detalhes do Produto</Text>
        <TouchableOpacity onPress={navigation.goBack}>
          <Icon name="arrow-left" size={28} color={colors.secundary} />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.groupText}>
          <Text style={styles.textValue} numberOfLines={1}>
            {product.description}
          </Text>
        </View>
        <FlatList
          style={styles.list}
          data={product.barcodes}
          keyExtractor={(barcode) => String(barcode.id)}
          renderItem={({ item: barcode }) => (
            <View style={styles.itemList}>
              <View style={styles.groupText}>
                <Text style={styles.textLabel}>QRCode:</Text>
                <Text style={styles.textValue} numberOfLines={1}>
                  {barcode.value}
                </Text>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
