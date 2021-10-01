import { useRef } from 'react';



function ButtonPressable(props) {

    return (<div className="btn__pressable--blue">
        <button>{props.text}</button>
    </div>)
}

export default ButtonPressable;