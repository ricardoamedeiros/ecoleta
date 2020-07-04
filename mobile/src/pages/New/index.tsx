import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Picker,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import * as Location from 'expo-location';

import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import styles from './styles';

const Home = () => {
  const navigation = useNavigation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');


  const [uf, setUf] = useState('DF');
  const [city, setCity] = useState('Brasília');

  const [selectedItems, setSelectedItems] = useState();

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf,
      city,
    });
  }

  async function handleSubmit() {
    //event.preventDefault();

    //const uf = selectedUf;
    //const city = selectedCity;
    const [latitude, longitude] = initialPosition;
    //const items = selectedItems;

    const data = {selectedItems, name, email, whatsapp, uf, city, latitude: String(latitude), longitude: String(longitude) };
   // data.append('items', items.join(','));
    console.log('data', data)
    
    await api.post('/points', data );

    alert('Ponto de coleta criado');

    handleNavigateToPoints();
  }


  useEffect(() => {
    async function loadPosition() {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert(
          'Oops!',
          'Precisamos da sua permissão para obter a localização'
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      console.log(latitude, longitude);

      setInitialPosition([latitude, longitude]);
    }

    loadPosition();
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginBottom: 25 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Feather name="arrow-left" color="#76448A" size={24} />
        </TouchableOpacity>
      <ImageBackground
        style={styles.container}
        source={require('../../assets/home-background.png')}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nome entidade"
            value={name}
            onChangeText={setName}
            autoCorrect={false}
            autoCapitalize="characters"
          />

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            value={email}
            onChangeText={setEmail}
            autoCorrect={false}
          />

          <TextInput
            style={styles.input}
            placeholder="Whatzap"
            value={whatsapp}
            onChangeText={setWhatsapp}
            autoCorrect={false}
            autoCapitalize="characters"
          />
        <Text style={styles.description}>Ajuda preferencial:</Text>
        <Picker
          selectedValue={selectedItems}
          onValueChange={(hand) => {setSelectedItems( hand ); console.log(hand)}}
          mode="dropdown">
          <Picker.Item label="Alimentos" value={5} />
          <Picker.Item label="Álcool em gel" value={2} />
          <Picker.Item label="Bebidas" value={6} />
          <Picker.Item label="Financeiro" value={4} />
          <Picker.Item label="Produtos" value={1} />
          <Picker.Item label="Serviço" value={3} />
        </Picker>
          <RectButton style={styles.button} onPress={handleSubmit}>
            <View style={styles.buttonIcon}>
              <Feather name="arrow-right" color="#fff" size={24} />
            </View>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
      </View>
    </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default Home;
