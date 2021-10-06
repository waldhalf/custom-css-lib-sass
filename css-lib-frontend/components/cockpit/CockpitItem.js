import Image from 'next/image';
import { Fragment } from 'react';

function CockpitItem(props) {
    const { name, img } = props
    const cssClassName = `cockpit__${name}`.toLowerCase();

    if (props.weather) {
        console.log('___WEATHER___');
        console.log(props.weather);
    }

    return (<div ref={props.myRef} id={props.id} className={cssClassName}>
        <div className={`cockpit__card__container `}>
            <Image className="cockpit__card__image" src={img} alt={name} layout="fill" />
            {/*<h3 className="cockpit__card__header">{name}</h3>*/}
            <div className="cockpit__card">
                <div className="cockpit__card__content">
                    {props.address && <Fragment><h4>Localisation :</h4>
                        <p className="">{props.address}</p></Fragment>
                    }
                    {props.panne && <Fragment><h4>Panne :</h4>
                        <p className="">{props.panne}</p></Fragment>
                    }
                    {props.immat && <Fragment>
                        <h4 className="cockpit__card__title">Immatriculation :</h4>
                        <p>{props.immat}</p>
                        <h4 className="cockpit__card__title">Conducteur :</h4>
                        <p>{props.conducteur}</p>
                        <h4 className="cockpit__card__title">Assureur :</h4>
                        <p>{props.assureur}</p>
                        <h4 className="cockpit__card__title">Pneumatiques :</h4>
                        <p>{props.tires}</p>
                    </Fragment>}

                    {props.mdv && <Fragment>
                        <h4>Moment de vie :</h4>
                        <p>{props.mdv}</p>
                    </Fragment>}

                    {props.sentiment && <Fragment>
                        <h4>Sentiment :</h4>
                        <p>{props.sentiment}</p>
                    </Fragment>}

                    {props.weather && <Fragment>
                        <h4>Météo</h4>
                        <p>{props.weather.name}</p>
                        <p>{props.weather.main.temp} °C</p>
                        <p>{props.weather.weather[0].description}</p>
                    </Fragment>}


                </div>
            </div>
        </div>
    </div>)
}

export default CockpitItem;
