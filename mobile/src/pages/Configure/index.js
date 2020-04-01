import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { colors } from '../../styles';
import logoImg from '../../assets/logo.png';
import styles from './styles';

export default function Configure() {
  const navigation = useNavigation();
  const [server, setServer] = useState('');

  async function getServerIp() {
    try {
      const server = await AsyncStorage.getItem('@redingProduct/serverIp');
      if (server) {
        setServer(server);
      }
    } catch (e) {
      Alert('Erro buscando endereço servidor.');
    }
  }

  useEffect(() => {
    getServerIp();
  }, []);

  async function onHandleSave() {
    await AsyncStorage.setItem('@redingProduct/serverIp', server);
    navigation.navigate('Main');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.Os === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Image source={logoImg} />
          <Text style={styles.headerTitle}>Configuração Servidor</Text>
          <TouchableOpacity onPress={navigation.goBack}>
            <Icon name="arrow-left" size={28} color={colors.secundary} />
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
          <Text style={styles.textLabel}>Endereço IP servidor:</Text>
          <TextInput
            style={styles.textInput}
            value={server}
            onChangeText={(v) => setServer(v)}
          />
          <TouchableOpacity style={styles.button} onPress={onHandleSave}>
            <Text style={styles.buttonText}>Configurar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
