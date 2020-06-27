import React, { useState, useEffect } from 'react';
import {
  View,
  ImageBackground,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Picker
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


  const [uf, setUf] = useState('');
  const [city, setCity] = useState('');

  const [selectedItems, setSelectedItems] = useState('left');

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

    const data = {selectedItems, name, email, whatsapp, uf: 'DF', city: 'Brasília', latitude: String(latitude), longitude: String(longitude) };
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginBottom: 25 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
        style={styles.container}
        source={require('../../assets/home-background.png')}
        imageStyle={{ width: 274, height: 368 }}
      >

        <Text style={styles.title}>
          Cadastro do
          ponto de coleta
          </Text>
        <Text style={styles.title}></Text>

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

        <Text style={styles.description}>
          Doação preferêncial
          </Text>

        <Picker
          selectedValue={selectedItems}
          onValueChange={hand => {setSelectedItems( hand ); console.log(selectedItems)}}
          mode="dialog">
          <Picker.Item label="Alimentos" value={{"item_id":5, item: "Alimentos"}} />
          <Picker.Item label="Álcool em gel" value={{"item_id":2, item: "Álcool em gel"}} />
          <Picker.Item label="Bebidas" value={{"item_id":6, item: "Bebidas"}} />
          <Picker.Item label="Financeiro" value={{"item_id":4, item: "Financeiro"}} />
          <Picker.Item label="Produtos" value={{"item_id":1, item: "Alimentos"}} />
          <Picker.Item label="Serviço" value={{"item_id":3, item: "Serviço"}} />
        </Picker>
          <RectButton style={styles.button} onPress={handleSubmit}>
            <View style={styles.buttonIcon}>
              <Feather name="arrow-right" color="#fff" size={24} />
            </View>
            <Text style={styles.buttonText}>Cadastrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Home;
