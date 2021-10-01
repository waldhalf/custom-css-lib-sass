function PageCahier(props) {
    return (<div className="paper">
        <div className="holes"></div>
        <textarea className="paper__textarea" placeholder={props.placeholder}></textarea>
    </div>);
}

export default PageCahier;