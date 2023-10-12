import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Menu from '../composants/Menu';
import { VITE_API } from "@env";

const API_URL = VITE_API;

const NouvelleOeuvre = () => {
  const navigation = useNavigation();
  const [nouveauId, setNouveauId] = useState('');
  const [nouveauTitre, setNouveauTitre] = useState('');
  const [nouvelleDescription, setNouvelleDescription] = useState('');
  const [nouvelleDate, setNouvelleDate] = useState('');
  const [nouveauAuteur, setNouveauAuteur] = useState('');
  const [nouvelleImage, setNouvelleImage] = useState('');

  const handleAddOeuvre = async () => {
    try {
      const newOeuvre = {
        id: nouveauId,
        titre: nouveauTitre,
        description: nouvelleDescription,
        date: nouvelleDate,
        auteur: nouveauAuteur,
        image: nouvelleImage,
      };
      
      const idPerso = nouveauId;
  
      const response = await fetch(`${API_URL}/oeuvres/${idPerso}.json`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newOeuvre),
      });
  
      if (response.ok) {
        navigation.navigate('Backoffice');
      } else {
        console.error('Erreur lors de l\'ajout de l\'oeuvre.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'oeuvre :', error);
    }
  };
  

  return (
    <SafeAreaView contentContainerStyle={styles.scrollViewContent}>
      <Menu />
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.subTitle}>Nouvelle Œuvre</Text>
          <TextInput
            style={styles.input}
            placeholder="Id"
            value={nouveauId}
            onChangeText={(text) => setNouveauId(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Titre"
            value={nouveauTitre}
            onChangeText={(text) => setNouveauTitre(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={nouvelleDescription}
            onChangeText={(text) => setNouvelleDescription(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={nouvelleDate}
            onChangeText={(text) => setNouvelleDate(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Auteur"
            value={nouveauAuteur}
            onChangeText={(text) => setNouveauAuteur(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Image URL"
            value={nouvelleImage}
            onChangeText={(text) => setNouvelleImage(text)}
          />
          <Button
            title="Ajouter Œuvre"
            onPress={handleAddOeuvre}
            color="#BDA18A"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NouvelleOeuvre;
