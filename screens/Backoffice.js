import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, SafeAreaView, Modal, TextInput, Button, StyleSheet } from 'react-native';
import { DarkTheme, useNavigation } from '@react-navigation/native';
import Menu from '../composants/Menu';
import { VITE_API } from "@env";

const API_URL = VITE_API;

const Backoffice = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
        <Menu />
        <View style={styles.content}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BackofficeOeuvre')}>
            <Text style={styles.buttonText}>Gestion des Oeuvres</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BackofficeCompte')}>
            <Text style={styles.buttonText}>Gestion des Comptes</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ede5de',
    },
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#f0ad4e',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
    },
    buttonText: {
      textAlign: 'center',
    },
  });

export default Backoffice;
