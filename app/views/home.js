import { StatusBar } from 'expo-status-bar'; 
import { Text, Image, View, TouchableOpacity, ScrollView, TextInput, FlatList } from 'react-native';
import Banner from '../Components/Banner';
import EStyleSheet from 'react-native-extended-stylesheet';
import { useState } from 'react';

EStyleSheet.build();

export default function Home({ navigation, route }){
    const [popularRecs, setPopularRecs] = useState([]);
    const [dessertRecs, setDessertRecs] = useState([]);

    const API_BASE = "https://recipe-api-maamobyhea-uc.a.run.app/"+process.env.REACT_APP_API_TOKEN

    const getRecipes = async () => {
        const response = await fetch(API_BASE+"/recipe/get/all")
        .then(res => res.json())
        .then(data => {
            setPopularRecs(data.slice(0,8));
            console.log(data.slice(0,8));
        })
        .catch(error => console.error(error));
    }
    
    useState(() => {
        getRecipes();
    }, []);

    return(
        <View>
            <Banner title="Home" />
            <View>
                <View style={styles.popular}>
                    <Text style={styles.categoryTitle}>Popular Recipes</Text>
                    <FlatList nestedScrollEnabled = {true}
                    data={popularRecs}
                    renderItem={({ item }) => (
                        <View style={styles.imageView}>
                            {/* image title link */}
                            <Image style={styles.imageThumbnail} source={{ uri: item.image }} /> 
                            <Text>{item.title}</Text>
                        </View>
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    />
                    <Text>View more</Text>
                </View>
                <View style={styles.desserts}>
                    <Text style={styles.categoryTitle}>Top Desserts</Text>
                    <FlatList nestedScrollEnabled = {true}
                    data={dessertRecs}
                    renderItem={({ item }) => (
                        <View style={styles.imageView}>
                            <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
                            <Text>{item.id}</Text>
                        </View>
                    )}
                    numColumns={2}
                    keyExtractor={(item, index) => index}
                    />
                    <Text>View more</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Login")
                }}
                >
                <Text>Go Back</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("Skills")
                }}
                >
                <Text>Skills page</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => {
                    navigation.navigate("RecipePages")
                }}
                >
                <Text>Recipe page</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = EStyleSheet.create({
    welcomeText: {
        textAlign: 'center',
        fontSize: '1.2rem',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    imageView: {
        flex: 1,
        flexDirection: 'column',
        margin: '1rem',
    },
    imageThumbnail: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '5rem',
    },
    popular: {
        padding: '1rem',
        backgroundColor: '#eee',
    },
    categoryTitle: {
        textAlign: 'center',
        fontSize: '1.5rem',
        fontWeight: 'bold'
    },
    desserts: {
        padding: '1rem',
        backgroundColor: '#eee',
    }
});