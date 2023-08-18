import React, { useState, useEffect, useReducer } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

import { actionCreators, initialState, reducer } from './reducer'
import { api } from './api'
import { data } from './data'
import * as items from './creature_quest_data'


function CreatureQuest({ navigation, route }){ 
const url = (api.creature_quest ?? "creature_quest/") + (route?.params?.id ?? '')
const [state, dispatch] = useReducer(reducer, initialState)

const { item, history, loading, error } = state

const onPressStartQuest = () => {}
const onPressDiscoverCreatures = () => {}
const onPressShareExperience = () => {}

async function getItem() {
      dispatch(actionCreators.loading())

      try {
        if (url in history){
           dispatch(actionCreators.local(history[url]))
        } else if (url.indexOf('http') > -1){
          const response = await fetch(url)
          const json = await response.json()
          if(json){
            dispatch(actionCreators.success(route.params?.id ? json : json[0], url))
          }   
        } else {
          const json = route.params?.id ? data[route.params?.id] : items.item
          dispatch(actionCreators.success(json, url))
        }
      } catch (e) {
        dispatch(actionCreators.failure())
      }
    }

useEffect(() => {
    getItem();
}, []);
  
if (loading) {
    return (
        <View style={styles.center}>
        <ActivityIndicator animating={true} />
        </View>
    )
}

return(
<ScrollView style={styles.creature_quest} showsVerticalScrollIndicator={false}>
<TouchableOpacity onPress = {() => {navigation.navigate("VirtualTimeTravel", { id: item.id })}}>
<Image
    style={styles.background_image}
    source={{uri: item.background_image}}
    />
</TouchableOpacity>
<Text style={styles.description}>{item.description}</Text>
<View style={{flexDirection: 'row'}}>
<TouchableOpacity  onPress={onPressStartQuest}>
    <View style={styles.start_quest}>{'Start Quest'}</View>
</TouchableOpacity>
<TouchableOpacity  onPress={onPressDiscoverCreatures}>
    <View style={styles.discover_creatures}>{'Discover Creatures'}</View>
</TouchableOpacity>
</View>
<TouchableOpacity  onPress={onPressShareExperience}>
    <View style={styles.share_experience}>{'Share Experience'}</View>
</TouchableOpacity>
</ScrollView>
)}

export default CreatureQuest;

const styles = StyleSheet.create({
    "center": {
        "flex": 1,
        "justifyContent": "center",
        "alignItems": "center"
    },
    "background_image": {
        "width": "100vw",
        "height": "80vw",
        "marginTop": 5
    },
    "description": {
        "fontSize": 12,
        "fontWeight": "250",
        "paddingHorizontal": 2,
        "marginHorizontal": 10,
        "marginTop": 5
    },
    "start_quest": {
        "flex": 1,
        "padding": 10,
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "color": "white",
        "borderRadius": 5
    },
    "discover_creatures": {
        "flex": 1,
        "padding": 10,
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "color": "white",
        "borderRadius": 5
    },
    "share_experience": {
        "flex": 1,
        "padding": 10,
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "color": "white",
        "borderRadius": 5
    }
});