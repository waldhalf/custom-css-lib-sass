import Image from 'next/image';

function SocialCard(props) {

    const { imageMedia, icon } = props;

    return (<div className={`social-card ${imageMedia.border}`}>
        <div className="social-card__platform">
            <div className="mr-10">
                <Image className="social-card__icon" src={imageMedia.image} alt={imageMedia.alt} width={24} height={24} />
            </div>
            <div className="social-card__username">John Doe</div>
        </div>
        <div className="social-card__followers">
            <div className="social-card__count--big">
                1978</div>
            <div className="social-card__label">Followers</div>
        </div>
        <div className={`social-card__change ${icon.style}`}>
            <Image src={icon.image} alt={icon.alt} width={8} height={8} />
            <div className="social-card__number">
                69 Aujourd&apos;hui
            </div>
        </div>
    </div >)
}

export default SocialCard;