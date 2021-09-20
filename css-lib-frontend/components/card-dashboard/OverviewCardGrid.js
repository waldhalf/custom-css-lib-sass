// OWN
import OverviewCard from "./OverviewCard";

function OverviewCardGrid(props) {
    const { title } = props;

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
    return (
        <div className="container">
            <h2>{title}</h2>
            <section className="card-grid">
                <OverviewCard imageMedia={imageMedia('facebook')} icon={icon("up")} />
                <OverviewCard imageMedia={imageMedia('twitter')} icon={icon("up")} />
                <OverviewCard imageMedia={imageMedia('instagram')} icon={icon("up")} />
                <OverviewCard imageMedia={imageMedia('youtube')} icon={icon("up")} />
                <OverviewCard imageMedia={imageMedia('twitter')} icon={icon("up")} />
                <OverviewCard imageMedia={imageMedia('facebook')} icon={icon("up")} />
                <OverviewCard imageMedia={imageMedia('youtube')} icon={icon("up")} />
                <OverviewCard imageMedia={imageMedia('instagram')} icon={icon("up")} />
            </section></div>)
}

export default OverviewCardGrid;