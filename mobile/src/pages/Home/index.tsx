import React, { useState } from 'react';
import {
  View,
  ImageBackground,
  Image,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';

import styles from './styles';

const Home = () => {
  const navigation = useNavigation();

  const [uf, setUf] = useState('DF');
  const [city, setCity] = useState('Brasília');

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf,
      city,
    });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, marginBottom: 15 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ImageBackground
        style={styles.container}
        source={require('../../assets/home-background.png')}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Text style={styles.title}>
            Liveforever
          </Text>

          <View>
            <Text style={styles.title}>
              Seu aplicativo para ajudar pessoas.
            </Text>
            <Text style={styles.description}>
              Encontre estabelecimentos para realizar doações, receber ajuda, cadastrar um novo estabelecimento, 
              entrar em contato instituições de ajuda, deixar sua avaliação com comentário ou verificar a pontuação do estabelecimento.
            </Text>
          </View>
        </View>
  
        <View style={styles.footer}>
          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Feather name="arrow-right" color="#fff" size={24} />
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
       
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default Home;
