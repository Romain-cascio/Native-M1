import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles';
import Menu from '../composants/Menu';
import { VITE_API } from "@env";

const API_URL = VITE_API;

const Accueil = () => {
    const navigation = useNavigation();
    const [oeuvres, setOeuvres] = useState([]);
    
    const fetchOeuvres = async () => {
        const response = await fetch(API_URL+"/oeuvres.json");
        const data = await response.json();
        const oeuvresArray = Object.values(data);
        setOeuvres(oeuvresArray);
    };

  useEffect(() => {
    fetchOeuvres();
  }, []);

  return (
    <SafeAreaView contentContainerStyle={styles.scrollViewContent}>
        <Menu />
        <ScrollView>
            {oeuvres.map((oeuvre) => (
              <View>
                <TouchableOpacity key={oeuvre.id} onPress={() => navigation.navigate('Single', { oeuvreId: oeuvre.id })}>
                    <Image source={{ uri: oeuvre.image }} style={styles.image} />
                </TouchableOpacity>
                <View style={styles.container}>
                    <Text>{oeuvre.titre}</Text>
                    <Text>{oeuvre.auteur}</Text>
                    <Text>{oeuvre.description}</Text>
                    <Text>{oeuvre.date}</Text>
                </View>
              </View>
            ))}
        </ScrollView>
    </SafeAreaView>

);
};


export default Accueil;
