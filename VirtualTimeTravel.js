import React, { useState, useEffect, useReducer } from 'react'
import { ActivityIndicator, ScrollView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'

import { actionCreators, initialState, reducer } from './reducer'
import { api } from './api'
import { data } from './data'
import * as items from './virtual_time_travel_data'


function VirtualTimeTravel({ navigation, route }){ 
const url = (api.virtual_time_travel ?? "virtual_time_travel/") + (route?.params?.id ?? '')
const [state, dispatch] = useReducer(reducer, initialState)

const { item, history, loading, error } = state

const onPressStartTimeTravel = () => {}
const onPressExploreMap = () => {}
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
<ScrollView style={styles.virtual_time_travel} showsVerticalScrollIndicator={false}>
<Image
    style={styles.background_image}
    source={{uri: item.background_image}}
    />
<Text style={styles.description}>{item.description}</Text>
<View style={{flexDirection: 'row'}}>
<TouchableOpacity  onPress={onPressStartTimeTravel}>
    <View style={styles.start_time_travel}>{'Start Time Travel'}</View>
</TouchableOpacity>
<TouchableOpacity  onPress={onPressExploreMap}>
    <View style={styles.explore_map}>{'Explore Map'}</View>
</TouchableOpacity>
</View>
<TouchableOpacity  onPress={onPressShareExperience}>
    <View style={styles.share_experience}>{'Share Experience'}</View>
</TouchableOpacity>
</ScrollView>
)}

export default VirtualTimeTravel;

const styles = StyleSheet.create({
    "center": {
        "flex": 1,
        "justifyContent": "center",
        "alignItems": "center"
    },
    "background_image": {
        "width": "100vw",
        "height": "100vw",
        "marginTop": 5
    },
    "description": {
        "fontSize": 12,
        "fontWeight": "250",
        "paddingHorizontal": 2,
        "marginHorizontal": 10,
        "marginTop": 5
    },
    "start_time_travel": {
        "flex": 1,
        "padding": 10,
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "color": "white"
    },
    "explore_map": {
        "flex": 1,
        "padding": 10,
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "color": "white"
    },
    "share_experience": {
        "flex": 1,
        "padding": 10,
        "margin": 5,
        "textAlign": "center",
        "backgroundColor": "#1ACDA5",
        "color": "white"
    }
});