import Image from 'next/image';
import { Fragment } from 'react';

function CockpitItem(props) {
    const { name, img } = props
    const cssClassName = `cockpit__${name}`.toLowerCase();

    return (<div ref={props.myRef} id={props.id} className={cssClassName}>
        <div className={`cockpit__card__container `}>
            <Image className="cockpit__card__image" src={img} alt={name} layout="fill" />
            <h3 className="cockpit__card__header">{name}</h3>
            <div className="cockpit__card">
                <div className="cockpit__card__content">
                    {props.address && <Fragment><h5>Localisation :</h5>
                        <p className="">{props.address}</p></Fragment>
                    }
                    {props.immat && <Fragment>
                        <h5>Immatriculation :</h5>
                        <p>{props.immat}</p>
                    </Fragment>}

                    {props.mdv && <Fragment>
                        <h5>Moment de vie :</h5>
                        <p>{props.mdv}</p>
                    </Fragment>}

                    {props.sentiment && <Fragment>
                        <h5>Sentiment :</h5>
                        <p>{props.sentiment}</p>
                    </Fragment>}

                </div>
            </div>
        </div>
    </div>)
}

export default CockpitItem;