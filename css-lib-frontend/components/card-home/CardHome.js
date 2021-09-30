import Image from 'next/image';
import Link from 'next/link';

function CardHome(props) {


    return (<div className="card__home--vertical">
        <article className="card__home__box">
            <div className="card__home__image">
                <Image src={props.image} width="1500" height="1368" alt="" />
            </div>
            <div className="card__home__box--content">
                <h1 className="card__home__box--title">{props.title}</h1>

                <p className="card__home__box--desc">{props.desc}</p>

                <Link href={props.url}>
                    <div className="content-flex content-flex__justify-end">
                        {/* <a className="btn btn__rounded">Go&rarr;</a> */}
                        <a className="btn__next-arrow-expand m-10"><span>Go</span></a>
                    </div>
                </Link>



            </div>
        </article>
    </div>);
}

export default CardHome;