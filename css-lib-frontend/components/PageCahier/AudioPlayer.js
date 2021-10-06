import ReactPlayer from "react-player";
import React from "react";

class AudioPlayer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            aArray: [],
            src: '',
            type: '',
        }
        this.setAudio = this.setAudio.bind(this)
    }

    componentDidMount() {
        const monaudio = this.props.audioArray.pop()
        this.setState({
            aArray: this.props.audioArray,
            src: monaudio.src,
            type: monaudio.type,
        })
    }

    setAudio() {
        if (this.state.aArray.length - 1 < 0)
            return
        const monaudio = this.state.aArray.pop()
        this.setState({
            aArray: this.state.aArray,
            src: monaudio.src,
            type: monaudio.type,
        })
    }

    render() {
        const { src, type } = this.state;
        return (
            <>
                <ReactPlayer onEnded={this.setAudio} playing controls url={[{ src: src, type: type }]} />
            </>
        )
    }
}

export default AudioPlayer;
