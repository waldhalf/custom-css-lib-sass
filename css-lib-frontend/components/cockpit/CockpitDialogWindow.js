function CockpitDialogWindow(props) {
    const { name } = props
    const cssClassName = `cockpit__${name}`.toLowerCase();

    return (<div className={cssClassName} id={props.id} ref={props.myRef}>
        <textarea className="cockpit__dialog-window--area" value="" placeholder="Remember, be nice!" cols="30" rows="5" readOnly></textarea>
    </div>)
}

export default CockpitDialogWindow;