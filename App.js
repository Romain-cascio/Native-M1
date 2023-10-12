import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AuthContextProvider } from './context/Authcontext';
import Accueil from './screens/Accueil';
import SingleOeuvre from './screens/Single';
import Connexion from './screens/Connexion'
import Backoffice from './screens/Backoffice'
import NouvelleOeuvre from './screens/Nouvelleoeuvre'
import ModifierOeuvre from './screens/Modifieroeuvre'
import ModifierCompte from './screens/ModifierComptes'
import BackofficeOeuvre from './screens/BackofficeOeuvre'
import BackofficeComptes from './screens/BackofficeComptes'


const Stack = createStackNavigator();

export default function App() {


  return (
    <AuthContextProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Accueil">
        <Stack.Screen name="Accueil" component={Accueil} options={{ headerShown: false }} />
        <Stack.Screen name="Single" component={SingleOeuvre} options={{ headerShown: false }} />
        <Stack.Screen name="Connexion" component={Connexion} options={{ headerShown: false }} />
        <Stack.Screen name="Backoffice" component={Backoffice} options={{ headerShown: false }} />
        <Stack.Screen name="NouvelleOeuvre" component={NouvelleOeuvre} options={{ headerShown: false }} />
        <Stack.Screen name="ModifierOeuvre" component={ModifierOeuvre} options={{ headerShown: false }} />
        <Stack.Screen name="BackofficeOeuvre" component={BackofficeOeuvre} options={{ headerShown: false }} />
        <Stack.Screen name="BackofficeCompte" component={BackofficeComptes} options={{ headerShown: false }} />
        <Stack.Screen name="ModifierCompte" component={ModifierCompte} options={{ headerShown: false }} />

      </Stack.Navigator>
    </NavigationContainer>
    </AuthContextProvider>
  );
}
