import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  ScrollView,
  Modal,
  Alert,
  TouchableHighlight,
  ImageBackground,
  TextInput
} from 'react-native';
import StarRating from 'react-native-star-rating';


import { RectButton } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Feather, FontAwesome } from '@expo/vector-icons';
import styles from './styles';

import api from '../../services/api';
import * as MailComposer from 'expo-mail-composer';

interface Params {
  point_id: number;
}

interface Avaliacao {
  id: number,
    point_id: number,
    name: string,
    descricao: string,
    rating: number,
}

interface Data {
  point: {
    id: number,
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
  avaliacoes: [Avaliacao];
}

const Detail = () => {
  const [data, setData] = useState<Data>({} as Data);
  const [modalVisible, setModalVisible] = useState(false);

  const [name, setName] = useState('');
  const [descricao, setDescricao] = useState('');

  const [rating, setRating] = useState(3);

  const [ratingGeral, setRatingGeral] = useState(3);


  const navigation = useNavigation();
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    api.get(`/points/${routeParams.point_id}`).then((response) => {
      setData(response.data);
      let avaliacoes: [Avaliacao] = response.data.avaliacoes;
      if(avaliacoes){
        let r = avaliacoes.map(v => v.rating).reduce((a, b)=> {
          return (a + b)
        }, 0);
        setRatingGeral(r/avaliacoes.length);
      }else{
        setRatingGeral(0);
      }
    });
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${'55' + data.point.whatsapp.replace('.0', '')}&text=Tenho interesse em ajudar`
    );
  }

  function onStarRatingPress(valor: number) {
    setRating(valor)
  }

  async function handleSalvarAvaliacao() {

    const body = {name, descricao, rating, point_id: routeParams.point_id};
   // data.append('items', items.join(','));
    console.log('data', body)
    
    try {
      await api.post('/avaliacao', body );
      alert('Avaliação salva com sucesso');
      setModalVisible(false);
      handleNavigateBack();
    } catch (error) {
      alert('Erro ao salvar avaliação');
    }
  }


  if (!data.point) {
    return null;
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Feather name="arrow-left" color="#76448A" size={24} />
        </TouchableOpacity>

        <Modal
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Seu nome"
                  value={name}
                  onChangeText={setName}
                  autoCorrect={false}
                  autoCapitalize="characters"
                />
              </View>

              <View>
                <TextInput
                  multiline={true}
                  numberOfLines={4}
                  style={styles.input}
                  placeholder="Comentário"
                  value={descricao}
                  onChangeText={setDescricao}
                  autoCorrect={false}
                />
              </View>
              <StarRating
                containerStyle={styles.star}
                maxStars={5}
                rating={rating}
                fullStarColor={'#8E44AD'}
                selectedStar={(rating: number) => onStarRatingPress(rating)}
              />

            </View>
            <View style={styles.footer}>
              <RectButton style={styles.buttonAvaliacao} onPress={()=>setModalVisible(false)}>
                <FontAwesome name="arrow-left" size={10} color="#fff" />
                <Text style={styles.buttonText}>Cancelar</Text>
              </RectButton>

              <RectButton style={styles.buttonAvaliacao} onPress={handleSalvarAvaliacao}>
                <Feather name="star" size={10} color="#fff" />
                <Text style={styles.buttonText}>Salvar</Text>
              </RectButton>

            </View>
          </View>
        </Modal>

        <Image
          style={styles.pointImage}
          source={{
            uri: data.point.image_url,
          }}
        />
        <StarRating
          containerStyle={styles.star}
          disabled={true}
          maxStars={5}
          rating={ratingGeral}
          fullStarColor={'#8E44AD'}
        // selectedStar={(rating) => this.onStarRatingPress(rating)}
        />
        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>
          {data.items.map((item) => item.title).join(', ')}
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço:</Text>
          <Text style={styles.addressContent}>
            {data.point.city}, {data.point.uf}
          </Text>
        </View>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Whatsapp:</Text>
          <Text style={styles.addressContent}>
            {data.point.whatsapp}
          </Text>
        </View>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>E-mail:</Text>
          <Text style={styles.addressContent}>
            {data.point.email}
          </Text>
        </View>
        <Text style={styles.addressTitle}>Avaliações:</Text>
        <ScrollView >
         
          {data.avaliacoes.map((item, key) => {
            return (<View key={key}>
              <View style={styles.address}>
                <Text style={styles.addressContent}>
                  {item.name + ': ' + item.descricao}
                </Text>
              </View>
            </View>)
          })}
        </ScrollView>

      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleWhatsapp}>
          <FontAwesome name="whatsapp" size={10} color="#fff" />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={()=>setModalVisible(true)}>
          <Feather name="star" size={10} color="#fff" />
          <Text style={styles.buttonText}>Avaliação</Text>
        </RectButton>

      </View>
    </SafeAreaView>
  );
};

export default Detail;
