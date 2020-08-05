import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './styles.css';


function TeacherItem() {
    return (
        <article className="teacher-item">
            <header>
                <img src="https://avatars1.githubusercontent.com/u/27026831?s=460&u=0218cc3cd4b7c0a3f294a2dbb2bff6e438e9ad98&v=4" alt="Profile" />
                <div>
                    <strong> Karine Rocha </strong>
                    <span> Química </span>
                </div>
            </header>

            <p>
                Entusiasta das melhores tecnologias de química avançada.

                    <br /><br />
                    Apaixonado por explodir coisas em laboratório e por mudar
                    a vida das pessoas através de experiências. Mais de 200.000
                    pessoas já passaram por uma das minhas explosões.
                    </p>

            <footer>
                <p>
                    Preço/hora
                            <strong> R$ 80,00</strong>
                </p>

                <button type="button">
                    <img src={whatsappIcon} alt="Whatsapp" />
                            Entrar em Contato
                        </button>
            </footer>
        </article>
    )
}

export default TeacherItem;