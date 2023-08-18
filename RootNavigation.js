import React from 'react'
import { Button, Text, View, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

import CreatureQuest from './CreatureQuest'
import VirtualTimeTravel from './VirtualTimeTravel'

const Root = createStackNavigator()

export default function App() {
return (
<NavigationContainer>
<Root.Navigator
    initialRouteName="CreatureQuest"
    screenOptions={{
        headerMode:'screen',
        headerStyle: { backgroundColor: 'whitesmoke', height: 40 },
        title: null,
        cardOverlayEnabled:true,
        cartStyle:{flex:1},
        animationEnabled:true,
        gestureEnabled:true
    }}
    >
<Root.Screen name="CreatureQuest" component={CreatureQuest} />
<Root.Screen name="VirtualTimeTravel" component={VirtualTimeTravel} />
</Root.Navigator>
<Text style={{height: 1}}>.</Text>
</NavigationContainer>
)}

const styles = StyleSheet.create({
  screen: {
    marginTop: 40,
    alignItems: 'center',
  },
})