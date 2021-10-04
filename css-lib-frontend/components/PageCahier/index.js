function PageCahier(props) {
    const { text } = props
    const textTmp = text.reverse().join('\n').trim();

    return (<div className="paper">
        <div className="holes"></div>
        <textarea className="paper__textarea" placeholder={props.placeholder} value={textTmp} readOnly></textarea>
    </div>);
}

export default PageCahier;