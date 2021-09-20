import Image from 'next/image';

import { Fragment } from 'react';

function Modal(props) {

    return (
        <Fragment>
            <div className="container popup">
                <Fragment>
                    <Image src={props.img} alt="image de la modal" width="1500" height="900" />
                    <button className="popup__button " onClick={props.handlerShowModal}>Commencer!</button>
                </Fragment>

            </div>
        </Fragment>)
}

export default Modal;