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
            bar1: [], bar2: [], bar3:[],
            labelData1: [], labelData2: [], labelData3:[]
        }
    }
    componentDidMount() {
        const { data } = this.props;
        let bar1 = data.map(d => {
            return { x: d.name, y: d.bar1 }
        })

        let bar2 = data.map(d => {
            return { x: d.name, y: d.bar2 }
        })

        let bar3 = data.map(d => {
            return { x: d.name, y: d.bar3 }
        })
        let labelData1 = bar1.map((d, idx) => ({
            x: d.x,
            y: d.y,
            label: d.y.toString(),
            yOffset: 0,
            xOffset: -37
        }));
        let labelData2 = bar2.map((d, idx) => ({
            x: d.x,
            y: d.y,
            label: d.y.toString(),
            yOffset:5
        }));
        let labelData3 = bar3.map((d, idx) => ({
            x: d.x,
            y: d.y,
            label: d.y.toString(),
            yOffset: 0,
            xOffset: 35
        }));
        this.setState({
            bar1,
            bar2,
            bar3,
            labelData1,
            labelData2,
            labelData3
        })
    }
    render() {
        const { useCanvas, width, bar1, bar2, bar3, labelData1, labelData2,labelData3 } = this.state;
        const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
        const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
        
        return (
            <div className="my-5 mx-2">

                <XYPlot xType="ordinal" width={width} height={350} xDistance={100}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <BarSeries barWidth="0.75" data={bar1} color="#214460" />
                    <BarSeries barWidth="0.75" data={bar2} color="#77dacf" />
                    <BarSeries barWidth="0.75" data={bar3} color="#b860b9" />
                    <LabelSeries data={labelData1} labelAnchorX="middle" />
                    <LabelSeries data={labelData2} labelAnchorX="middle" labelAnchorY="text-after-edge" />
                    <LabelSeries data={labelData3} labelAnchorX="middle" />

                </XYPlot>
                <div className="my-3" style={{display: 'flex', justifyContent: 'center'}}>
                    <p className="mx-1">
                        <span className="px-3 py-1 mr-2" style={{backgroundColor: "#214460" }} /> <strong className="mx-1">Aceleración Baja Int.</strong> <br/> <span className="ml-5">1 a 2 m/s2</span>
                    </p>
                    <p className="mx-1">
                        <span className="px-3 py-1 mr-2" style={{backgroundColor: "#77dacf" }} /> <strong className="mx-1">Aceleración Media Int.</strong> <br/> <span className="ml-5">2 a 3 m/s2</span>
                    </p>
                    <p className="mx-1">
                        <span className="px-3 py-1 mr-2" style={{backgroundColor: "#b860b9" }} /> <strong className="mx-1">Aceleración Alta Int.</strong> <br/> <span className="ml-5">+3 m/s2</span>
                    </p>
                </div>
                <button onClick={this}></button>
            </div>
        );
    }
}