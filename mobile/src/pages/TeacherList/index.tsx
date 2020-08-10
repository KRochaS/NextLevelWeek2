import React, { useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import PageHeader from '../../components/PageHeader';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import styles from './styles';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { TextInput, BorderlessButton, RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList() {

    const [teachers, setTeachers] = useState([]);

    const [favorites, setFavorite] = useState<number[]>([]);

    const [isfiltersVisible, setIsFiltersVisible] = useState(false);

    const [subject, setSubjet] = useState('');

    const [week_day, setWeekDay] = useState('');

    const [time, setTime] = useState('');





    function loadFavorites() {

        AsyncStorage.getItem('favorites')
        .then((response) => {
            if (response) {
                const favoritedTeachers = JSON.parse(response);
                const favoritedTeachersId = favoritedTeachers.map((teacher: Teacher) => {
                        return teacher.id
                })
                setFavorite(favoritedTeachersId);
            }
        }
        )
    }


    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [])
      )

    async function handleFiltersSubmit() {

        loadFavorites();

        const response = await api.get('/classes', {
            params: {
                subject,
                week_day,
                time
            }
        });


        setIsFiltersVisible(false);
        setTeachers(response.data);
    }

    function handleToogleFilterVisible() {
        setIsFiltersVisible(!isfiltersVisible);
    }
    return (

        <View style={styles.container}>
            <PageHeader
                title="Proffys disponíveis"
                headerRight={(
                    <BorderlessButton onPress={handleToogleFilterVisible}>
                        <Feather name="filter" size={20} color='#FFF' />
                    </BorderlessButton>
                )}>
                {isfiltersVisible && (<View style={styles.searchForm}>
                    <Text style={styles.label}>
                        Matéria
                    </Text>

                    <TextInput value={subject}
                        onChangeText={text => setSubjet(text)}
                        style={styles.input}
                        placeholderTextColor="#C1BCCC"
                        placeholder="Qual a matéria"

                    />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>
                                Dia da Semana
                                </Text>
                            <TextInput
                                value={week_day}
                                onChangeText={week_day => setWeekDay(week_day)}
                                style={styles.input}
                                placeholderTextColor="#C1BCCC"
                                placeholder="Qual o dia?"

                            />

                        </View>


                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>
                                Horário
                                </Text>
                            <TextInput
                                value={time}
                                onChangeText={time => setTime(time)}
                                style={styles.input}
                                placeholderTextColor="#C1BCCC"
                                placeholder="Qual o horário?"

                            />

                        </View>
                    </View>


                    <RectButton onPress={handleFiltersSubmit} style={styles.submitButton}>
                        <Text style={styles.submitButtonText}>
                            Filtrar
                        </Text>

                    </RectButton>
                </View>
                )}
            </PageHeader>


            <ScrollView style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 24
                }}>
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })

                }
            </ScrollView>

        </View>

    );
}

export default TeacherList;