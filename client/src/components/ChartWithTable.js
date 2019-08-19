import React from "react";
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalBarSeriesCanvas,
  LabelSeries
} from "react-vis";
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class ChartWithTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      useCanvas: false,
      width: window.innerWidth,
      bar1: [],
      bar2: [],
      bar3: [],
      labelData1: [],
      labelData2: [],
      labelData3: [],
      toolTip1: {},
      toolTip2: {},
      toolTip3: {},
      selected: {},
      selectAll: 0,
      data: []
    };
    this.toggleRow = this.toggleRow.bind(this);
  }

  toggleRow(name) {
    const newSelected = Object.assign({}, this.state.selected);
    newSelected[name] = !this.state.selected[name];
    this.setState({
      selected: newSelected,
      selectAll: 2
    });
  }

  toggleSelectAll() {
    let newSelected = {};

    if (this.state.selectAll === 0) {
      this.state.data.forEach(x => {
        newSelected[x.name] = true;
      });
    }

    this.setState({
      selected: newSelected,
      selectAll: this.state.selectAll === 0 ? 1 : 0
    });
  }

  async filterBars() {
    await this.resetView()
    let { bar1, bar2, bar3, selected } = this.state;
    const selectedNames = []
    for(const key in selected) {
      if (selected.hasOwnProperty(key))
        if (selected[key]) selectedNames.push(key)
    }
    let b1 = []
    let b2 = []
    let b3 = [];

    for (const key of selectedNames) {
      b1.push(bar1.filter(b => b.x === key)[0]);
      b2.push(bar2.filter(b => b.x === key)[0]);
      b3.push(bar3.filter(b => b.x === key)[0]);
    }

    this.setState({
      bar1: b1,
      bar2: b2,
      bar3: b3,
      labelData1: [],
      labelData2: [],
      labelData3: []
    });
  }

  resetView() {
    const {
      bar1,
      bar2,
      bar3,
      labelData1,
      labelData2,
      labelData3
    } = this.prepareData(this.state.data);
    this.setState({
      bar1,
      bar2,
      bar3,
      labelData1,
      labelData2,
      labelData3,
    });
  }

  componentDidUpdate(prevProps) {
    const { data } = this.props;
    const {
      bar1,
      bar2,
      bar3,
      labelData1,
      labelData2,
      labelData3
    } = this.prepareData(data);
    if (this.props.data !== prevProps.data) {
      this.setState({
        bar1,
        bar2,
        bar3,
        labelData1,
        labelData2,
        labelData3,
        data
      });
    }
  }
  prepareData(data) {
    const bar1 = data.map(d => {
      return { x: d.name, y: d.bar1 };
    });

    const bar2 = data.map(d => {
      return { x: d.name, y: d.bar2 };
    });

    const bar3 = data.map(d => {
      return { x: d.name, y: d.bar3 };
    });
    const labelData1 = bar1.map(d => ({
      x: d.x,
      y: d.y,
      label: d.y.toString(),
      xOffset: -45
    }));
    const labelData2 = bar2.map(d => ({
      x: d.x,
      y: d.y,
      label: d.y.toString(),
      yOffset: 5
    }));
    const labelData3 = bar3.map(d => ({
      x: d.x,
      y: d.y,
      label: d.y.toString(),
      yOffset: 0,
      xOffset: 40
    }));
    return { bar1, bar2, bar3, labelData1, labelData2, labelData3 };
  }
  render() {
    const {
      useCanvas,
      width,
      bar1,
      bar2,
      bar3,
      labelData1,
      labelData2,
      labelData3
    } = this.state;
    const BarSeries = useCanvas ? VerticalBarSeriesCanvas : VerticalBarSeries;
    const columns = [
      {
        id: "checkbox",
        accessor: "",
        Cell: ({ original }) => {
          return (
            <input
              type="checkbox"
              className="checkbox"
              checked={this.state.selected[original.name] === true}
              onChange={() => this.toggleRow(original.name)}
            />
          );
        },
        Header: "   ",
        sortable: false,
        width: 45
      },
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "% de Tiempo Ac 6",
        id: "acc6%",
        accessor: d => d["acc6%"]
      },
      {
        Header: "Acc B6 Total Eff# ",
        id: "acc6",
        accessor: d => d["acc6"]
      },
      {
        Header: "% de Tiempo Ac 7",
        id: "acc7%",
        accessor: d => d["acc7%"]
      },
      {
        Header: "Acc B7 Total Eff# ",
        id: "acc7",
        accessor: d => d["acc7"]
      },
      {
        Header: "% de Tiempo Ac 8",
        id: "acc8%",
        accessor: d => d["acc8%"]
      },
      {
        Header: "Acc B8 Total Eff# ",
        id: "acc8",
        accessor: d => d["acc8"]
      },
      {
        Header: " Promedio",
        id: "prom",
        accessor: d => (d["acc8"] + d["acc7"] + d["acc6"]) / 3
      }
    ];

    return (
      <div className="my-5 mx-2">
        <XYPlot xType="ordinal" width={width} height={350} xDistance={100}>
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          <BarSeries
            data={bar1}
            color="#214460"
            onNearestXY={val => this.setState({ toolTip1: val })}
          />
          <LabelSeries data={labelData1} labelAnchorX="middle" />
          <BarSeries
            data={bar2}
            color="#77dacf"
            onNearestXY={val => this.setState({ toolTip2: val })}
          />
          <LabelSeries
            data={labelData2}
            labelAnchorX="middle"
            labelAnchorY="text-after-edge"
          />
          <BarSeries
            data={bar3}
            color="#b860b9"
            onNearestXY={val => this.setState({ toolTip3: val })}
          />
          <LabelSeries data={labelData3} labelAnchorX="middle" />
        </XYPlot>
        <div
          className="my-3"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <p className="mx-1">
            <span
              className="px-3 py-1 mr-2"
              style={{ backgroundColor: "#214460" }}
            />{" "}
            <strong className="mx-1">Aceleración Baja Int.</strong> <br />{" "}
            <span className="ml-5">1 a 2 m/s2</span>
          </p>
          <p className="mx-1">
            <span
              className="px-3 py-1 mr-2"
              style={{ backgroundColor: "#77dacf" }}
            />{" "}
            <strong className="mx-1">Aceleración Media Int.</strong> <br />{" "}
            <span className="ml-5">2 a 3 m/s2</span>
          </p>
          <p className="mx-1">
            <span
              className="px-3 py-1 mr-2"
              style={{ backgroundColor: "#b860b9" }}
            />{" "}
            <strong className="mx-1">Aceleración Alta Int.</strong> <br />{" "}
            <span className="ml-5">+3 m/s2</span>
          </p>
        </div>
        <div className="row">
          <div className="container-flex mx-auto">
            <span>
              {this.state.toolTip1.x
                ? `${this.state.toolTip1.x}'s data is ${this.state.toolTip1.y} , ${this.state.toolTip2.y}, ${this.state.toolTip3.y} respectively`: "Please hover chart to see specific data."}
            </span>
          </div>
        </div>
        <div className="my-2 container">
        <button className="btn btn-primary mx-1 my-2" disabled={Object.entries(this.state.selected).length === 0} onClick={()=>this.filterBars()}>Filter</button>
        <button className="btn btn-outline-warning mx-1 my-2" onClick={()=>this.resetView()}>Reset</button>
          <ReactTable
            data={this.state.data}
            columns={columns}
            defaultSorted={[{ id: "name", desc: false }]}
          />
        </div>
      </div>
    );
  }
}
