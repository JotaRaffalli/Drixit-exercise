import React from 'react';
import ChartWithTable from './ChartWithTable'
class Statistics extends React.Component {
    constructor() {
        super();
        this.state = {
            statistics: []
        }
    }

    // Get data form server endpoint
    componentDidMount() {
        fetch('/statistics')
        .then(res => res.json())
        .then(statistics => this.setState({statistics}, () => console.log('Here are the statistics: ',statistics)))
        .catch(err => console.log('There was an error getting data from API'))
    }

    render() {
        // Pass the data in props to the opther component
        // TODO add a state handler to separate in two components chart and table
        const {statistics} = this.state;
        return (
            <div className="container-flex">
                <ChartWithTable data={statistics}></ChartWithTable>
            </div>
           
        )
    }
}

export default Statistics;
