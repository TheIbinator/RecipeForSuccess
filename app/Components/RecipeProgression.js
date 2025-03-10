import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Touchable } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import CheckBox from '@react-native-community/checkbox';
import { useState, useContext } from 'react';
import { Context } from '../App'

const RecipeProgression = ({ingredients, directions}) => {
    const [stepNum, setStepNum] = useState(0);
    const [checkValue, setCheckValue] = useState(0);
    const [toggleCheck, setToggleCheck] = useState(false);
    const { recipePageState, setRecipePageState } = useContext(Context);

    function steps() {
        if(stepNum == 0) {
            return (
                <View>
                    <Text style={styles.heading}>First, prepare the ingredients:</Text>
                    <FlatList
                        data={ingredients}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.ingredientList}>
                                <Text style={styles.ingredientItem}>{item}</Text>
                                {/* <CheckBox style={styles.checkbox}
                                    disabled={false}
                                    value={toggleCheck}
                                    onValueChange={(newValue) => {
                                        setToggleCheck(newValue)
                                        if(newValue) {
                                            setCheckValue(checkValue + 1)
                                        } else {
                                            setCheckValue(checkValue - 1)
                                        }
                                    }}
                                /> */}
                            </View>
                        )}
                    />
                    <View>
                        {checkValue == ingredients.length ?
                            <TouchableOpacity
                                onPress={() => {{setStepNum(stepNum + 1)}}}
                                style={styles.nextButton}>
                                    <Text style={styles.buttonText}>Let's Begin!</Text>
                            </TouchableOpacity>
                            :<TouchableOpacity
                                onPress={() => {}}
                                style={styles.grayButton}>
                                    <Text style={styles.buttonText}>Let's Begin!</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
            );
        } else {
            return (
                <View>
                    <Text style={styles.header}>Step {stepNum}:</Text>
                    <Text style={styles.step}>{directions[stepNum]}</Text>
                    {() => {
                        if(stepNum != directions.length) {
                            return (
                                <TouchableOpacity
                                    onPress={() => {setRecipePageState('survey')}}
                                    style={styles.nextButton}>
                                        <Text style={styles.buttonText}>Next</Text>
                                </TouchableOpacity>
                            );
                        } else {
                            return (
                                <TouchableOpacity
                                    onPress={() => {setStepNum(stepNum + 1)}}
                                    style={styles.nextButton}>
                                        <Text style={styles.buttonText}>Finish!</Text>
                                </TouchableOpacity>
                            );
                        }
                    }}
                </View>
            );
        }
    }

    return (
        <View style={styles.container}>
            {steps()}
        </View>
    )
}

export default RecipeProgression;

const styles=EStyleSheet.create({
    heading: {
        fontSize: '2rem',
        alignSelf: 'center',
        justifyContent: 'center',
    },
    ingredientList: {
        flexDirection: 'row',
        margin: '0.7rem'
    },
    ingredientItem: {
        flex: 7,
    },
    checkbox: {
        flex: 1,
    },
    nextButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'red',
        borderRadius: '2rem',
        marginBottom: '1rem',
        width: '13rem',
        height: '3rem',
        alignSelf:  'center'
    },
    grayButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#bbb',
        borderRadius: '2rem',
        marginBottom: '1rem',
        width: '13rem',
        height: '3rem',
        alignSelf:  'center'
    },
    buttonText: {
        color: 'white',
        fontSize: '1rem',
    },
    step: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#eee'
    }
})