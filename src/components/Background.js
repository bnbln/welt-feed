import React, { Component } from 'react';

class Background extends Component {
    constructor(props) {
        super(props)
        this.state = {
            width: null
        }
    }
    componentDidMount() {
        this.setState({ width: window.innerWidth })
        window.addEventListener("resize", () => {
            this.setState({ width: window.innerWidth })
        });
    }
    componentWillUnmount() {
        window.removeEventListener("resize", this.setState({ width: null }), false
        );
    }

    render() {
        return (
            <div className="Background" style={{ position: "fixed", width: "100%", zIndex: -1, top: "-10%" }}>
                <div style={{
                    width: "100%",
                    paddingTop: "200%",
                    backgroundColor: "#282c34"
                }} />
                <div style={{ position: "absolute", top: "-10%", left: "-10px", filter: "blur(" + Math.min(150, Math.max(this.state.width * 0.2, 900)) + "px)", width: "100vw", overflow: "hidden", backgroundColor: "#282c34" }}>
                    <div style={{
                        width: "50%",
                        paddingTop: Math.max(this.state.width * 0.01, 80) + "%",
                        backgroundColor: this.props.colors[0],
                        float: "left",
                        transform: "scale(2) translateY(-10%)",
                        zIndex: 1,
                        position: "relative"
                    }} />
                    <div style={{
                        width: "50%",
                        paddingTop: Math.max(this.state.width * 0.01, 80) + "%",
                        backgroundColor: this.props.colors[1],
                        float: "left",
                        transform: "scale(1.5) translateX(50px) translateY(-10%)",
                        zIndex: 1,
                        position: "relative"
                    }} />
                    <div style={{
                        width: "50%",
                        paddingTop: "30%",
                        backgroundColor: this.props.colors[2],
                        float: "left",
                        transform: "scale(2)",
                        zIndex: 10,
                        position: "relative"
                    }} />
                    <div style={{
                        width: "50%",
                        paddingTop: "30%",
                        backgroundColor: this.props.colors[3],
                        float: "left",
                        transform: "scale(1.5) translateX(50px)",
                        zIndex: 10,
                        position: "relative"
                    }} />
                    <div style={{
                        width: "50%",
                        paddingTop: "100%",
                        backgroundColor: this.props.colors[0],
                        float: "left",
                        transform: "scale(2)"
                    }} />
                    <div style={{
                        width: "50%",
                        paddingTop: "100%",
                        backgroundColor: this.props.colors[1],
                        float: "left",
                        transform: "scale(1.5) translateX(50px) "
                    }} />
                </div>
            </div>
        )
    }
}

export default Background;