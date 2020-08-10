import React, { useState, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
 
import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';

function Favorites() {

    const [favorites, setFavorite] = useState([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites')
        .then((response) => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
               
                setFavorite(favoritedTeachers);
            }
        }
        )
    }

    // diferente do useEffects o useFocusEffect
    // irá executar sempre que a tela entrar em foco
    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
      )


    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" />


            <ScrollView style={styles.teacherList}
            contentContainerStyle={{
                paddingHorizontal: 16,
                paddingBottom: 24
            }}>
                {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem key={teacher.id} teacher={teacher} favorited/>
                    )
                })}
            </ScrollView>

        </View>
      

    )
}

export default Favorites;