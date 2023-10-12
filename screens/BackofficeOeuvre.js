import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Modal, TextInput, Button } from 'react-native';
import { DarkTheme, useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Menu from '../composants/Menu';
import { VITE_API } from "@env";

const API_URL = VITE_API;

const BackofficeOeuvre = () => {
    const navigation = useNavigation();
    const [oeuvres, setOeuvres] = useState([]);

    const fetchOeuvres = async () => {
        const response = await fetch(API_URL+"/oeuvres.json");
        const data = await response.json();
        const oeuvresArray = Object.values(data);
        setOeuvres(oeuvresArray);
    };

    const handleDelete = async (oeuvreId) => {
        try {
            const response = await fetch(`${API_URL}/oeuvres/${oeuvreId}.json`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchOeuvres();
            } else {
                console.error('Erreur lors de la suppression de l\'oeuvre.');
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'oeuvre :', error);
        }
    };

    useEffect(() => {
      fetchOeuvres();
    }, []);

    return (
      <SafeAreaView contentContainerStyle={styles.scrollViewContent}>
          <Menu />
          <ScrollView>
              {oeuvres.map((oeuvre) => (
                <View style={{backgroundColor: '#ede5de'}} key={oeuvre.id}>
                      <Image source={{ uri: oeuvre.image }} style={styles.image} />
                  <View style={styles.container}>
                      <Text>{oeuvre.titre}</Text>
                      <View style={{ marginTop: 10, flexDirection: 'row' }}>
                          <TouchableOpacity style={{ backgroundColor: '#f0ad4e', padding: 10, borderRadius: 5 }} onPress={() => navigation.navigate('ModifierOeuvre', {oeuvreId: oeuvre.id, titre: oeuvre.titre, description: oeuvre.description, date: oeuvre.date, auteur: oeuvre.auteur})}>
                              <Text>Modifier</Text>
                          </TouchableOpacity>
                          <TouchableOpacity style={{ marginLeft: 15, backgroundColor: '#FF0000', padding: 10, borderRadius: 5 }} onPress={() => handleDelete(oeuvre.id)}>
                              <Text>Supprimer</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
                </View>
              ))}
                <View style={{ marginTop: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: '#00FF00', padding: 10, borderRadius: 5 }} onPress={() => navigation.navigate('NouvelleOeuvre')}>
                        <Text style={{ textAlign: 'center' }}>Nouvelle Oeuvre</Text>
                    </TouchableOpacity>
                </View>

          </ScrollView>
      </SafeAreaView>
    );
};

export default BackofficeOeuvre;
