import Image from 'next/image';

function OverviewCard(props) {
    const { imageMedia, icon } = props;

    return (<div className="overview_card">
        <div className="card-grid-2-X-2">
            <div className="overview_card__page card-grid-2-X-2__justify-left">
                Page View
            </div>
            <div className="card-grid-2-X-2__justify-right">
                <Image
                    src={imageMedia.image}
                    alt={imageMedia.alt}
                    width={24}
                    height={24} />
            </div>
            <div className="overview_card__number card-grid-2-X-2__justify-left">
                117
            </div>
            <div className="overview_card__change overview_card__change--up card-grid-2-X-2__justify-right card-grid-2-X-2__align-center">
                <Image src={icon.image} alt={icon.alt} width={8} height={8} />
                <div className="overview_card__change--number">3%</div>
            </div>
        </div>
    </div>)
}

export default OverviewCard;