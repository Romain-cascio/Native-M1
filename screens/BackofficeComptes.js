import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Modal, TextInput, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Menu from '../composants/Menu';
import { VITE_API } from "@env";

const API_URL = VITE_API;

const BackofficeComptes = () => {
    const navigation = useNavigation();
    const [clients, setClients] = useState([]);

    const fetchClients = async () => {
        const response = await fetch(API_URL+"/clients.json");
        const data = await response.json();
        const clientsArray = Object.values(data);
        setClients(clientsArray);
    };

    const handleDelete = async (clientId) => {
        try {
            const response = await fetch(`${API_URL}/clients/${clientId}.json`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchClients();
            } else {
                console.error('Erreur lors de la suppression de l\'oeuvre.');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'oeuvre :', error);
        }
    };

    useEffect(() => {
      fetchClients();
    }, [clients]);

    return (
      <SafeAreaView contentContainerStyle={styles.scrollViewContent}>
          <Menu />
          <ScrollView>
          {clients.filter((client) => client && typeof client === 'object' && client.user_Id).map((client) => {
            if (!client || typeof client !== 'object' || !client.user_Id) {
                return null; // Ignorer les clients invalides
            }
  return (
    <View style={{backgroundColor: '#ede5de'}} key={client.user_Id}>
      <View style={styles.container}>
        <Text>{client.firstName}</Text>
        <View style={{ marginTop: 10, flexDirection: 'row' }}>
          <TouchableOpacity style={{ backgroundColor: '#f0ad4e', padding: 10, borderRadius: 5 }} onPress={() => navigation.navigate('ModifierCompte', { clientId: client.user_Id, firstName: client.firstName, email: client.email, password: client.password })}>
            <Text>Modifier</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ marginLeft: 15, backgroundColor: '#FF0000', padding: 10, borderRadius: 5 }} onPress={() => handleDelete(client.user_Id)}>
            <Text>Supprimer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
})}


          </ScrollView>
      </SafeAreaView>
    );
};

export default BackofficeComptes;
