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
            useCanvas: false, width: window.innerWidth
        }
    }

    render() {
        const { useCanvas, width } = this.state;
        const { data } = this.props;
        console.log(this.props)
        const content = useCanvas ? 'TOGGLE TO SVG' : 'TOGGLE TO CANVAS';
        const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
        const bar1 = data.map(d => {
            return { x: d.name, y: d.bar1 }
        })

        const bar2 = data.map(d => {
            return { x: d.name, y: d.bar2 }
        })

        const bar3 = data.map(d => {
            return { x: d.name, y: d.bar3 }
        })
        const labelData = bar1.map((d, idx) => ({
            x: d.x,
            y: Math.max(bar1[idx].y, bar2[idx].y, bar3[idx].y)
        }));
        return (
            <div>

                <XYPlot xType="ordinal" width={width} height={300} xDistance={100}>
                    <VerticalGridLines />
                    <HorizontalGridLines />
                    <XAxis />
                    <YAxis />
                    <BarSeries className="vertical-bar-series-example" data={bar1} color="#214460"
                    />
                    <BarSeries data={bar2} color="#77dacf" />
                    <BarSeries data={bar3} color="#b860b9" />
                    <LabelSeries data={labelData} />
                </XYPlot>
            </div>
        );
    }
}