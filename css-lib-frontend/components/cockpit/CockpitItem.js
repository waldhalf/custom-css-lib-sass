import Image from 'next/image';

function CockpitItem(props) {
    const { name, img } = props
    const cssClassName = `cockpit__${name}`.toLowerCase();

    return (<div ref={props.myRef} id={props.id} className={cssClassName}>
        <div className={`cockpit__card__container `}>
            <Image className="cockpit__card__image" src={img} alt={name} layout="fill" />
            <h3 className="cockpit__card__header">{name}</h3>
            <div className="cockpit__card">
                <div className="cockpit__card__content">
                    <p className=""></p>
                </div>
            </div>
        </div>
    </div>)
}

export default CockpitItem;