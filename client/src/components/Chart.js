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

const data = [{
    username: "andrada",
    name: "Andrada",
    acc6: 112,
    'acc6%': 5.8,
    acc7: 13,
    'acc7%': 0.7,
    acc8: 0,
    'acc8%': 9.32,
    bar1: 11,
    bar2: 33,
    bar3: 9,
}, {
    username: "mas",
    name: "Más",
    acc6: 112,
    'acc6%': 5.8,
    acc7: 13,
    'acc7%': 0.7,
    acc8: 0,
    'acc8%': 9.32,
    bar1: 11,
    bar2: 33,
    bar3: 9,
}, {
    username: "buffarini",
    name: "Buffarini",
    acc6: 112,
    'acc6%': 5.8,
    acc7: 13,
    'acc7%': 0.7,
    acc8: 0,
    'acc8%': 9.32,
    bar1: 11,
    bar2: 33,
    bar3: 9,
}, {
    username: "lopez",
    name: "Lopez",
    acc6: 112,
    'acc6%': 5.8,
    acc7: 13,
    'acc7%': 0.7,
    acc8: 0,
    'acc8%': 9.32,
    bar1: 11,
    bar2: 33,
    bar3: 9,
}, {
    username: "izquierdoz",
    name: "Izquierdoz",
    acc6: 112,
    'acc6%': 5.8,
    acc7: 13,
    'acc7%': 0.7,
    acc8: 0,
    'acc8%': 9.32,
    bar1: 11,
    bar2: 33,
    bar3: 9,
}, {
    username: "Marcone",
    name: "Marcone",
    acc6: 112,
    'acc6%': 5.8,
    acc7: 13,
    'acc7%': 0.7,
    acc8: 0,
    'acc8%': 9.32,
    bar1: 11,
    bar2: 33,
    bar3: 9,
}, {
    username: "Benedetto",
    name: "Benedetto",
    acc6: 112,
    'acc6%': 5.8,
    acc7: 13,
    'acc7%': 0.7,
    acc8: 0,
    'acc8%': 9.32,
    bar1: 11,
    bar2: 33,
    bar3: 9,
}, {
    username: "Nandez",
    name: "Nandez",
    acc6: 112,
    'acc6%': 5.8,
    acc7: 13,
    'acc7%': 0.7,
    acc8: 0,
    'acc8%': 9.32,
    bar1: 11,
    bar2: 33,
    bar3: 9,
}, {
    username: "Campuzano",
    name: "Campuzano",
    acc6: 112,
    'acc6%': 5.8,
    acc7: 13,
    'acc7%': 0.7,
    acc8: 0,
    'acc8%': 9.32,
    bar1: 11,
    bar2: 33,
    bar3: 9,
}]

let greenData = data.map(d => {
    return { x: d.name, y: d.bar1 }
})

let blueData = data.map(d => {
    return { x: d.name, y: d.bar2 }
})

let bar3 = data.map(d => {
    return { x: d.name, y: d.bar3 }
})

//const greenData = [{x: 'A', y: 10}, {x: 'B', y: 5}, {x: 'C', y: 15}];

//const blueData = [{x: 'A', y: 12}, {x: 'B', y: 2}, {x: 'C', y: 11}];

const labelData = greenData.map((d, idx) => ({
    x: d.x,
    y: Math.max(greenData[idx].y, blueData[idx].y)
}));

export default class Chart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            useCanvas: false,
            width: 0, height: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }



    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    render() {
        const { useCanvas, width } = this.state;
        const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
        const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
        return (
            <div>

                <XYPlot xType="ordinal" width={width - 200} height={500} xDistance={100}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <BarSeries className="vertical-bar-series-example" data={greenData} color="#214460"
                    />
                    <BarSeries data={blueData} color="#77dacf" />
                    <BarSeries data={bar3} color="#b860b9" />
                    <LabelSeries data={labelData} />
                </XYPlot>
            </div>
        );
    }
}