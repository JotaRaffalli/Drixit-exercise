import React from 'react';
import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    VerticalBarSeries,
    VerticalBarSeriesCanvas,
    LabelSeries
} from 'react-vis';

export default class Chart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            useCanvas: false, width: window.innerWidth,
            bar1: [], bar2: [], bar3: [],
            labelData1: [], labelData2: [], labelData3: [],
            toolTip1: {}, toolTip2: {}, toolTip3: {}
        }
    }
    componentDidUpdate(prevProps) {
        const { data } = this.props;
        const { bar1, bar2, bar3, labelData1, labelData2, labelData3 } = this.prepareData(data)
        if (this.props.data !== prevProps.data) {
            this.setState({
                bar1,
                bar2,
                bar3,
                labelData1,
                labelData2,
                labelData3
            })
        }

    }
    prepareData(data) {
        const bar1 = data.map(d => {
            return { x: d.name, y: d.bar1 }
        })

        const bar2 = data.map(d => {
            return { x: d.name, y: d.bar2 }
        })

        const bar3 = data.map(d => {
            return { x: d.name, y: d.bar3 }
        })
        const labelData1 = bar1.map((d) => ({
            x: d.x,
            y: d.y,
            label: d.y.toString(),
            yOffset: 0,
            xOffset: -37
        }));
        const labelData2 = bar2.map((d) => ({
            x: d.x,
            y: d.y,
            label: d.y.toString(),
            yOffset: 5
        }));
        const labelData3 = bar3.map((d) => ({
            x: d.x,
            y: d.y,
            label: d.y.toString(),
            yOffset: 0,
            xOffset: 35
        }));
        return { bar1, bar2, bar3, labelData1, labelData2, labelData3 }
    }
    render() {
        const { useCanvas, width, bar1, bar2, bar3, labelData1, labelData2, labelData3 } = this.state;
        //const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
        const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;

        return (
            <div className="my-5 mx-2">

                <XYPlot xType="ordinal" width={width} height={350} xDistance={100}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <BarSeries data={bar1} color="#214460" onNearestXY={(val) => this.setState({ toolTip1: val })} /><LabelSeries data={labelData1} labelAnchorX="middle" />
                    <BarSeries data={bar2} color="#77dacf" onNearestXY={(val) => this.setState({ toolTip2: val })} /><LabelSeries data={labelData2} labelAnchorX="middle" labelAnchorY="text-after-edge" />
                    <BarSeries data={bar3} color="#b860b9" onNearestXY={(val) => this.setState({ toolTip3: val })} /><LabelSeries data={labelData3} labelAnchorX="middle" />

                </XYPlot>
                <div className="my-3" style={{ display: 'flex', justifyContent: 'center' }}>
                    <p className="mx-1">
                        <span className="px-3 py-1 mr-2" style={{ backgroundColor: "#214460" }} /> <strong className="mx-1">Aceleración Baja Int.</strong> <br /> <span className="ml-5">1 a 2 m/s2</span>
                    </p>
                    <p className="mx-1">
                        <span className="px-3 py-1 mr-2" style={{ backgroundColor: "#77dacf" }} /> <strong className="mx-1">Aceleración Media Int.</strong> <br /> <span className="ml-5">2 a 3 m/s2</span>
                    </p>
                    <p className="mx-1">
                        <span className="px-3 py-1 mr-2" style={{ backgroundColor: "#b860b9" }} /> <strong className="mx-1">Aceleración Alta Int.</strong> <br /> <span className="ml-5">+3 m/s2</span>
                    </p>
                </div>
                <div className="row">
                    <div className="container-flex mx-auto">
                        <span>{this.state.toolTip1.x ? this.state.toolTip1.x+'\'s data is ' : "Please hover chart to see specific data: "} {this.state.toolTip1.y} , {this.state.toolTip2.y} and {this.state.toolTip3.y} respectively</span>
                    </div>
                </div>
                <button onClick={
                    () => {

                        this.setState({
                            bar1: bar1.filter((b) => {
                                return b.x === "Lopez"
                            }
                            ),
                            bar2: bar2.filter((b) => {
                                return b.x === "Lopez"
                            }),
                            bar3: bar3.filter((b) => {
                                return b.x === "Lopez"
                            })
                        })

                        this.setState({
                            labelData1: [],
                            labelData2: [],
                            labelData3: []
                        })
                    }
                }></button>
            </div>
        );
    }
}