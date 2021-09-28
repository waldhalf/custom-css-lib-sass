function CockpitDialogWindow(props) {
    const { name, currentRecognition, historyRecognition } = props
    const cssClassName = `cockpit__${name}`.toLowerCase();
    const text = historyRecognition.join('\n').trim();


    return (<div className={cssClassName} id={props.id} ref={props.myRef}>
        <textarea className="cockpit__dialog-window--area" value={text} placeholder="Remember, be nice!" cols="30" rows="5" readOnly></textarea>
    </div>)
}

export default CockpitDialogWindow;