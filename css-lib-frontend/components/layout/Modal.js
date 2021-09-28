// REACT
import { Fragment } from 'react';

// NEXTJS
import Image from 'next/image';


function Modal(props) {
    function onClickHandler() {
        props.handlerShowModal();
        props.hanlerIsAudioOpen(true);
    }

    return (
        <Fragment>
            <div className="popup">
                <Fragment>
                    <Image src={props.img} alt="image de la modale" width="1500" height="900" />
                    <button className="popup__button" onClick={onClickHandler}>Commencer!</button>
                    {/* <VoiceRecognition handlerShowModal={props.handlerShowModal} buttonType="start" /> */}
                </Fragment>

            </div>
        </Fragment>)
}

export default Modal;