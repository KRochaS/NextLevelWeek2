import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import PageHeader from '../../Components/PageHeader';
import Input from '../../Components/Input';
import Textarea from '../../Components/Textarea';

import warningIcon from '../../assets/images/icons/warning.svg';

import './styles.css';
import Select from '../../Components/Select';
import api from '../../services/api';

function TeacherForm() {

    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');


    // desestruturação
    const [scheduleItems, setScheduleItems] = useState([
        { week_day: '0', from: '', to: '' }
    ]);

    // + Novo Horário
    function addNewScheduleItem() {
        // ao criar uma variável state 
        // não é possível alterar/manipular a variável diretamente
        // scheduleItems.push({
        //     week_day: 0,
        //     from: '',
        //     to: ''
        // });

        // usando conceito de imutabilidade
        setScheduleItems([
            ...scheduleItems,
            { week_day: '0', from: '', to: '' }
        ])
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updateScheduleItem = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                // [field] = nome da propriedade pegando do parametro
                // week_day: value;
                return { ...scheduleItem, [field]: value }
            }

            return scheduleItem;
        })

        setScheduleItems(updateScheduleItem);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('/classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro realizado com sucesso');
            history.push('/');
        }).catch((error) => {
            alert('Erro no cadastro');
        })
    }


    return (
        <div id="page-teacher-form" className="container">
            <PageHeader title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição" />


            <main>

                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus Dados</legend>
                        <Input
                            name="name"
                            label="Nome Completo"
                            value={name}
                            onChange={(event) => { setName(event.target.value) }}
                        />

                        <Input
                            name="avatar"
                            label="Avatar"
                            value={avatar}
                            onChange={(event) => { setAvatar(event.target.value) }}

                        />
                        <Input
                            name="whatsapp"
                            label="whatsapp"
                            value={whatsapp}
                            onChange={(event) => { setWhatsapp(event.target.value) }}

                        />
                        <Textarea
                            name="bio"
                            label="Biografia"
                            value={bio}
                            onChange={(event) => { setBio(event.target.value) }}
                        />
                    </fieldset>

                    <fieldset>
                        <legend>
                            Sobre aula
                </legend>

                        <Select
                            name="subject"
                            label="Matéria"
                            value={subject}
                            onChange={(event) => setSubject(event.target.value)}
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

                        <Input
                            name="cost"
                            label="Custo da sua hora por aula"
                            value={cost}
                            onChange={(event) => { setCost(event.target.value) }}
                        />

                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis

                        <button type="button" onClick={addNewScheduleItem}> + Novo horário</button>
                        </legend>

                        {scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={scheduleItem.week_day} className="schedule-item">
                                    <Select name="week_day" label="Dia da Semana"
                                        value={scheduleItem.week_day}
                                        onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)} options={
                                            [
                                                { value: '0', label: 'Domingo' },
                                                { value: '1', label: 'Segunda-Feira' },
                                                { value: '2', label: 'Terça-Feira' },
                                                { value: '3', label: 'Quarta-Feira' },
                                                { value: '4', label: 'Quinta-Feira' },
                                                { value: '5', label: 'Sexta-Feira' },
                                                { value: '6', label: 'Sábado' },
                                            ]} />

                                    <Input
                                        name="from"
                                        label="Das"
                                        type="time"
                                        value={scheduleItem.from}
                                        onChange={e => setScheduleItemValue(index, 'from', e.target.value)} />

                                    <Input
                                        name="to"
                                        label="Até"
                                        type="time"
                                        value={scheduleItem.to}
                                        onChange={e => setScheduleItemValue(index, 'to', e.target.value)} />
                                </div>
                            )
                        })
                        }

                    </fieldset>



                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante" />
                                 Importante! <br />
                                 Preencha todos os dados
                         </p>

                        <button type="submit"> Salvar cadastro</button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;