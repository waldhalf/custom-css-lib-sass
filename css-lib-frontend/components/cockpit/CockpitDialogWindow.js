import { useRef, useEffect } from 'react';

function CockpitDialogWindow(props) {
    const { name, historyRecognition } = props
    const cssClassName = `cockpit__${name}`.toLowerCase();

    const text = historyRecognition.reverse().join('\n').trim();
    // let textInverse = "";
    // var startingIndex = historyRecognition.length - 1;
    // for (startingIndex; startingIndex > 0; startingIndex--) {
    //     textInverse += historyRecognition[startingIndex].trim() + '\n';
    // }

    // useEffect(() => {
    //     console.log('La conversation change');
    //     textArea.current.scrollTop = textArea.current.scrollHeight;
    // }, [historyRecognition]);


    return (<div className={cssClassName} id={props.id} ref={props.myRef}>
        <textarea
            className="cockpit__dialog-window--area"
            value={text}
            placeholder="Remember, be nice!"
            cols="30"
            rows="2"
            readOnly
        ></textarea>
    </div>)
}

export default CockpitDialogWindow;