import { createRef, useState } from "react";
import onTouchMoveImage from '../../assets/onTouchMove.jpg';
import onTouchStartImage from '../../assets/onTouchStart.jpg';
import onTouchEndImage from '../../assets/onTouchEnd.jpg';

import './events.css';


export default function Events(data) {

    const { socket } = data;

    const noticeDivRef = createRef();

    const [eventInfo, setEventInfo] = useState('');

    socket.on('updateEventInfo', updateEventInfo);

    function hiddenDivEvent(elem) {
        setTimeout(function () {
            if (elem) {
                elem.className = 'hidden';
            }
        }, 2000)
    }

    function updateEventInfo(data) {
        setEventInfo('Сработало событие: ' + data.event_name);

        if (noticeDivRef.current) {
            noticeDivRef.current.className = ' ';
            hiddenDivEvent(noticeDivRef.current)
        }
    }

    return (
        <div>
            <p className="description">Перед началом убедись, что ты сидишь с телефона или в мобильном режиме браузера</p>
            <div className="hidden" ref={noticeDivRef} style={{ position: 'fixed', top: '30vh', width: '80vw', marginLeft: '10vw', backgroundColor: '#ffffffa4', border: 'solid 3px #61dafb' }}>
                <p className="notice" >{eventInfo}</p>
            </div>
            <div className="divButtons">
                <div>
                    <p className="description" >Нажми на котика</p>
                    <div
                        className="interactiveElem" style={{ content: `url(${onTouchEndImage})` }}
                        onTouchStart={(event) => { socket.emit('sendEvent', event._reactName) }} />
                </div>
                <div>
                    <p className="description">Он тоже хочет, чтобы ты на него тыкнул</p>
                    <div
                        className="interactiveElem" style={{ content: `url(${onTouchStartImage})` }}
                        onTouchEnd={(event) => { socket.emit('sendEvent', event._reactName) }} />
                </div>
                <div>
                    <p className="description">Зажми и поводи по киске</p>
                    <div className="interactiveElem" style={{ content: `url(${onTouchMoveImage})` }}
                        onTouchMove={(event) => { socket.emit('sendEvent', event._reactName) }} />
                </div>
                <div>
                    <p className="description">Нажми на поле ввода или выдели в нем текст</p>
                    <input
                        className="interactiveElem interactiveInput"
                        onSelect={(event) => {
                            socket.emit('sendEvent', event._reactName)
                        }} defaultValue='Привет' />
                </div>
            </div>
        </div>
    );
}