import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, SafeAreaView, TextInput, Button} from "react-native";
import { useRoute, useNavigation} from "@react-navigation/native";
import { VITE_API } from "@env";
import styles from '../styles';
import Menu from '../composants/Menu';

const ModifierOeuvre = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { oeuvreId, titre: titreInitial, description: descriptionInitial, date: dateInitial, auteur: auteurInitial } = route.params;

    const [titre, setTitre] = useState(titreInitial);
    const [description, setDescription] = useState(descriptionInitial);
    const [date, setDate] = useState(dateInitial);
    const [auteur, setAuteur] = useState(auteurInitial);

    const handleSave = async () => {
        const nouvellesValeurs = {
            titre: titre || titreInitial,
            description: description || descriptionInitial,
            date: date || dateInitial,
            auteur: auteur || auteurInitial,
        };
        try {
            const response = await fetch(`${VITE_API}/oeuvres/${oeuvreId}.json`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(nouvellesValeurs),
            });
        
            if (response.ok) {
              console.log('Mise à jour réussie !');
              navigation.navigate('Backoffice')
            } else {
              console.error('Erreur lors de la mise à jour de l\'oeuvre.');
            }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'oeuvre :', error);
          }
    };

    return (
<SafeAreaView style={{ flex: 1, backgroundColor: '#ede5de', paddingHorizontal: 20, paddingTop: 20 }}>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ marginBottom: 10 }}>Titre :</Text>
    <TextInput
      style={{ width: '100%', padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 20, backgroundColor: 'white' }}
      value={titre}
      onChangeText={setTitre}
      placeholder="Titre de l'oeuvre"
    />
    <Text style={{ marginBottom: 10 }}>Description :</Text>
    <TextInput
      style={{ width: '100%', padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 20, backgroundColor: 'white' }}
      value={description}
      onChangeText={setDescription}
      placeholder="Description de l'oeuvre"
    />
    <Text style={{ marginBottom: 10 }}>Date :</Text>
    <TextInput
      style={{ width: '100%', padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 20, backgroundColor: 'white' }}
      value={date}
      onChangeText={setDate}
      placeholder="Date de l'oeuvre"
    />
    <Text style={{ marginBottom: 10 }}>Auteur :</Text>
    <TextInput
      style={{ width: '100%', padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 20, backgroundColor: 'white' }}
      value={auteur}
      onChangeText={setAuteur}
      placeholder="Auteur de l'oeuvre"
    />
    <Button title="Sauvegarder" onPress={handleSave} />
  </View>
</SafeAreaView>

    );
};
  
  
  export default ModifierOeuvre;
  