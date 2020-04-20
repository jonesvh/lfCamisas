import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import React from 'react';
import { TextInput, View, Text } from 'react-native';

import Destaques from './screens/Destaques'
import Categorias from './screens/Categorias'
import MeusDados from './screens/MeusDados'
//import Fonts from './../fonts'

Icon.loadFont();

const DestaquesScreen = createStackNavigator({
    Destaques: {
        screen: Destaques,
    },
});

const CategoriasScreen = createStackNavigator({

    Categorias: {
        screen: Categorias,
    },
});

const MeusDadosScreen = createStackNavigator({

    MeusDados: {
        screen: MeusDados,
        navigationOptions: {
            headerTitle: 'Meus Dados',
            headerStyle: {
                backgroundColor: '#4169E1'
            },
            headerTintColor: '#111',
            headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'GeezaPro-Bold',
                fontSize: 25
            },
        }
    },
});

const AppNavigator = createMaterialBottomTabNavigator(
    {
        Destaques: {
            screen: DestaquesScreen,
            navigationOptions: () => ({
                tabBarIcon: ({ focused }) => (
                    <Icon name="home" size={20} color={focused ? '#4169E1' : '#111'} />
                )
            }),
        },
        Categorias: {
            screen: CategoriasScreen,
            navigationOptions: () => ({
                tabBarIcon: ({ focused }) => (
                    <Icon name="star" size={20} color={focused ? '#4169E1' : '#111'}></Icon>
                )
            }),
        },
        //Fonts,
        MeusDados: {
            screen: MeusDadosScreen,
            navigationOptions: () => ({
                tabBarIcon: ({ focused }) => (
                    <Icon name="user" size={20} color={focused ? '#4169E1' : '#111'}></Icon>
                )
            }),
        },
    },
    {
        barStyle: {
            backgroundColor: '#FFF',
            color: '#111'
        },
    },
);

export default createAppContainer(AppNavigator);

