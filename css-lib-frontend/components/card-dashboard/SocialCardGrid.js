// OWN
import SocialCard from "./SocialCard";

function SocialCardGrid() {

    function imageMedia(media) {
        return {
            image: `/images/icon-${media}.svg`,
            alt: `image de ${media}`,
            border: `social-card--${media}`
        }
    }

    function icon(direction) {
        return {
            direction: `icon ${direction}`,
            style: `social-card__change--${direction}`,
            image: `/images/icon-${direction}.svg`
        }
    }

    return (<section className="container card-grid">
        <SocialCard
            imageMedia={imageMedia('facebook')}
            icon={icon('up')} />
        <SocialCard
            imageMedia={imageMedia('instagram')}
            icon={icon('down')} />
        <SocialCard
            imageMedia={imageMedia('twitter')}
            icon={icon('down')} />
        <SocialCard
            imageMedia={imageMedia('youtube')}
            icon={icon('up')} />
    </section>)
}

export default SocialCardGrid;