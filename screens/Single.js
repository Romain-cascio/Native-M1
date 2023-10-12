import React, { useEffect, useState } from "react";
import { View, Text, Image, ScrollView, SafeAreaView } from "react-native";
import { useRoute } from "@react-navigation/native";
import { VITE_API } from "@env";
import styles from '../styles';
import Menu from '../composants/Menu';

const API_URL = VITE_API;

const SingleOeuvre = () => {
  const route = useRoute();
  const { oeuvreId } = route.params;
  console.log(oeuvreId)
  const [oeuvre, setOeuvre] = useState(null);

  useEffect(() => {
    const fetchOeuvreData = async (oeuvreId) => {
      try {
        const response = await fetch(`${API_URL}/oeuvres/${oeuvreId}.json`);
        const data = await response.json();
        setOeuvre(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de l'œuvre :", error);
      }
    };

    fetchOeuvreData(oeuvreId);
  }, [oeuvreId]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Menu />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {oeuvre ? (
                    <View style={[styles.container, { margin: 10 }]}>
                        <Image source={{ uri: oeuvre.image }} style={styles.imageOeuvreSingle} />
                        <Text style={styles.title}>{oeuvre.titre}</Text>
                        <Text>{oeuvre.auteur}</Text>
                        <Text>{oeuvre.description}</Text>
                        <Text>{oeuvre.date}</Text>
                    </View>
                    ) : (
                        <Text>Chargement en cours...</Text>
                    )}
            </View>
    </SafeAreaView>
  );
};


export default SingleOeuvre;
