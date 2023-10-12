import React, { useState, useContext, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Menu from '../composants/Menu';
import useLoginValidation from '../verif/useLoginValidation';
import { AuthContext }  from '../context/Authcontext';
import { useNavigation } from '@react-navigation/native';

export default function Connexion() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const isLoginValid = useLoginValidation(formData.email, formData.password);
  const { isValid, firstName, categorie_user_Id, user_Id} = isLoginValid;

  const [errorMessage, setErrorMessage] = useState('');
  const { isAuthenticated, login } = useContext(AuthContext);

  const handleInputChange = (name, value) => {
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = () => {
    if (!isValid) {
      setErrorMessage("L'adresse e-mail ou le mot de passe est incorrecte.");
    } else {
      login(firstName, categorie_user_Id, user_Id);
      console.log(user_Id)
      navigation.navigate('Accueil')
    }
  };

  useEffect(() => {
  }, [isAuthenticated]);

  return (
<SafeAreaView style={{ flex: 1, backgroundColor: '#ede5de' }}>
  <Menu />
  <View style={styles.container}>
    <Text style={styles.subTitle}>Connexion</Text>
    <TextInput
      style={styles.input}
      placeholder="Email"
      value={formData.email}
      onChangeText={(text) => handleInputChange('email', text)}
    />
    <TextInput
      style={styles.input}
      placeholder="Mot de passe"
      secureTextEntry={true}
      value={formData.password}
      onChangeText={(text) => handleInputChange('password', text)}
    />
    <Button
      title="Se Connecter"
      onPress={handleSubmit}
      color="#BDA18A"
    />
    {errorMessage && (
      <View style={styles.errorMessage}>
        <Text style={styles.errorText}>{errorMessage}</Text>
      </View>
    )}
  </View>
</SafeAreaView>

  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  subTitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    padding: 10,
    backgroundColor: 'white',
  },
  spacer: {
    height: 10,
  },
  errorMessage: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'white',
  },
});

