import React from 'react';

import PageHeader from '../../Components/PageHeader';

import './styles.css';
import TeacherItem from '../../Components/TeacherItem';

function TeacherList() {
    return(
       <div id="page-teacher-list" className="container">
           <PageHeader title="Estes são os proffys disponíveis">
              
              <form id="search-teachers">
                  <div className="input-block">
                      <label htmlFor="subject"> Matéria</label>
                      <input type="text" id="subject"/>
                  </div>

                  <div className="input-block">
                      <label htmlFor="week_day"> Dia da Semana</label>
                      <input type="text" id="week_day"/>
                  </div>

                  <div className="input-block">
                      <label htmlFor="subject"> Hora </label>
                      <input type="text" id="time"/>
                  </div>
              </form>
           </PageHeader>


           <main>
                
                <TeacherItem />

           </main>
       </div>
    )
}

export default TeacherList;