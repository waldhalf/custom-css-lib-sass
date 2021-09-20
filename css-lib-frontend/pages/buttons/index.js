// NEXT
import dynamic from "next/dynamic";
import { Fragment } from "react/cjs/react.production.min";

// OWN
const Header = dynamic(() => import('../../components/layout/Header.js'), {
    ssr: false,
});

function Buttons() {
    return (
        <Fragment>
            <Header title="Ma liste de buttons" subtitle="glanés sur le web..." />


            <div className="container content-flex content-flex--wrap content-flex__justify-around">
                <button className="btn__rounded">Bouton 1</button>

                <div className="btn__thin btn__thin--one m-10">
                    <span>HOVER ME</span>
                </div>

                <div className="btn__thin btn__thin--two m-10">
                    <span>HOVER ME</span>
                </div>

                <div className="btn__thin btn__thin--three m-10">
                    <span>HOVER ME</span>
                </div>

                <div className="btn__pulse btn__pulse--color m-10">Click me</div>

                <div className="btn__border-line__container">
                    <div className="btn__border-line__center">
                        <button className="btn__border-line">
                            <svg width="180px" height="60px" viewBox="0 0 180 60" className="border">
                                <polyline points="179,1 179,59 1,59 1,1 179,1" className="bg-line" />
                                <polyline points="179,1 179,59 1,59 1,1 179,1" className="hl-line" />
                            </svg>
                            <span>HOVER ME</span>
                        </button>
                    </div>
                </div>


                <div className="btn__swipe m-10">
                    <button><span>Swipe Me!</span></button>
                </div>

                <button className="btn__fun-button btn__fun-button--first">Fun button 1</button>
                <button className="btn__fun-button btn__fun-button--second">Fun button 2</button>
                <button className="btn__fun-button btn__fun-button--third">Fun button 3</button>
                <button className="btn__fun-button btn__fun-button--fourth">Fun button 4</button>
                <button className="btn__fun-button btn__fun-button--fifth">Fun button 5</button>
                <button className="btn__fun-button btn__fun-button--sixth">Fun button 6</button>

                <button href="#" className="btn__animated-button">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Button
                </button>

                <div className="btn__pressable">
                    <a href="#">Pressable</a>
                </div>

                <button className="btn__next-arrow-expand m-10"><span>Next</span></button>

                <a href="#" className="btn__flip" data-back="Back" data-front="Front"></a>
            </div>









        </Fragment>
    )
}
export default Buttons;