import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, SafeAreaView } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { VITE_API } from "@env";

const API_URL = VITE_API;

const ModifierClient = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { clientId, firstName: firstNameInitial, email: emailInitial, password: passwordInitial } = route.params;

  const [firstName, setFirstName] = useState(firstNameInitial);
  const [email, setEmail] = useState(emailInitial);
  const [password, setPassword] = useState(passwordInitial);

  const handleSave = async () => {
    const nouvellesValeurs = {
      firstName: firstName || firstNameInitial,
      email: email || emailInitial,
      password: password || passwordInitial,
    };

    try {
      const response = await fetch(`${API_URL}/clients/${clientId}.json`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nouvellesValeurs),
      });

      if (response.ok) {
        console.log('Mise à jour réussie !');
        navigation.navigate('Backoffice');
      } else {
        console.error('Erreur lors de la mise à jour du client.');
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du client :', error);
    }
  };

  return (
<SafeAreaView style={{ flex: 1, backgroundColor: '#ede5de', paddingHorizontal: 20, paddingTop: 20 }}>
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text style={{ marginBottom: 10 }}>Prénom :</Text>
    <TextInput
      style={{ width: '100%', padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 20, backgroundColor: 'white' }}
      value={firstName}
      onChangeText={setFirstName}
      placeholder="Prénom du client"
    />
    <Text style={{ marginBottom: 10 }}>Email :</Text>
    <TextInput
      style={{ width: '100%', padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 20, backgroundColor: 'white' }}
      value={email}
      onChangeText={setEmail}
      placeholder="Email du client"
    />
    <Text style={{ marginBottom: 10 }}>Mot de passe :</Text>
    <TextInput
      style={{ width: '100%', padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 5, marginBottom: 20, backgroundColor: 'white' }}
      value={password}
      onChangeText={setPassword}
      placeholder="Mot de passe du client"
    />
    <Button title="Sauvegarder" onPress={handleSave} />
  </View>
</SafeAreaView>

  );
};

export default ModifierClient;
