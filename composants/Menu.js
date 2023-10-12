import React, { useEffect, useState, useContext } from 'react';
import { View, TouchableOpacity, StatusBar, Text, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/Authcontext';

import styles from '../styles';


export default function Menu() {
    const navigation = useNavigation();
    const [statusBarHeight, setStatusBarHeight] = useState(0);
    const [menuVisible, setMenuVisible] = useState(false);
    const { isAuthenticated, logout, categorie_user_Id} = useContext(AuthContext);
  
    useEffect(() => {
      setStatusBarHeight(StatusBar.currentHeight);
    }, []);
  
    const toggleMenu = () => {
      setMenuVisible(!menuVisible);
    };
  
    return (
        <View style={[styles.menu, { paddingTop: statusBarHeight }]}>
            <TouchableOpacity onPress={() => navigation.navigate('Accueil')}>
                <Text style={styles.modalText}>Accueil</Text>
            </TouchableOpacity>

            {isAuthenticated ?
                <>
                    <TouchableOpacity onPress={() => {logout(); toggleMenu(); navigation.reset({index: 0, routes: [{ name: "Accueil" }],});}}>
                        <Text style={styles.modalText}>Se déconnecter</Text>
                    </TouchableOpacity>
                    {categorie_user_Id === 1 && isAuthenticated ? (
                      <TouchableOpacity onPress={() => {navigation.navigate('Backoffice'); toggleMenu();}}>
                        <Text style={styles.modalText}>Backoffice</Text>
                      </TouchableOpacity>
                  ) : null}
                </>
                :
                <>
                    <TouchableOpacity onPress={() => {navigation.navigate('Connexion'); toggleMenu();}}>
                        <Text style={styles.modalText}>Connexion</Text>
                    </TouchableOpacity>
                  </>
                }
        </View>
    );
  }