import React, { useState, FormEvent } from 'react';
import { } from 'react'
import PageHeader from '../../Components/PageHeader';

import './styles.css';
import TeacherItem, { Teacher } from '../../Components/TeacherItem';
import Input from '../../Components/Input';
import Select from '../../Components/Select';
import api from '../../services/api';



function TeacherList() {

    const [subject, setSubject] = useState('');
    const [week_day, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    const [teachers, setTeachers] = useState([]);


    async function searchTeachers(e: FormEvent) {
        e.preventDefault();

        const response = await api.get('/classes', {
            params: {
                subject,
                week_day,
                time
            }
        });

        setTeachers(response.data);
    }


    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis">

                <form id="search-teachers" onSubmit={searchTeachers}>

                    <Select
                        name="subject"
                        label="Matéria"
                        value={subject}
                        onChange={(e) => (setSubject(e.target.value))}
                        options={
                            [
                                { value: 'Artes', label: 'Artes' },
                                { value: 'Biologia', label: 'Biologia' },
                                { value: 'Ciências', label: 'Ciências' },
                                { value: 'Educação Física', label: 'Educação Física' },
                                { value: 'Física', label: 'Física' },
                                { value: 'Geografia', label: 'Geografia' },
                                { value: 'História', label: 'História' },
                                { value: 'Matemática', label: 'Matemática' },
                                { value: 'Português', label: 'Português' },
                                { value: 'Química', label: 'Química' },

                            ]
                        } />

                    <Select name="week_day"
                        label="Dia da Semana"
                        value={week_day}
                        onChange={(e) => (setWeekDay(e.target.value))}

                        options={
                            [
                                { value: '0', label: 'Domingo' },
                                { value: '1', label: 'Segunda-Feira' },
                                { value: '2', label: 'Terça-Feira' },
                                { value: '3', label: 'Quarta-Feira' },
                                { value: '4', label: 'Quinta-Feira' },
                                { value: '5', label: 'Sexta-Feira' },
                                { value: '6', label: 'Sábado' },


                            ]
                        } />

                    <Input
                        name="time"
                        type="time"
                        label="Hora"
                        value={time}
                        onChange={(e) => (setTime(e.target.value))
                        } />

                    <button type="submit">Buscar</button>

                </form>

            </PageHeader>


            <main>

                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />
                })}


                {teachers.length <= 0 && (
                    <div className="result">
                      
                        <p>
                            Nenhum proffy encontrado.
                     </p>
                    </div>
                )}



            </main>
        </div>
    )
}

export default TeacherList;