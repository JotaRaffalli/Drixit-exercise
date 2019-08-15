import React from 'react';
import Chart from './Chart'
class Statistics extends React.Component {
    constructor() {
        super();
        this.state = {
            Statistics: []
        }
    }

    componentDidMount() {
        fetch('/statistics')
        .then(res => res.json())
        .then(statistics => this.setState({statistics}, () => console.log('Here are the statistics: ',statistics)))
        .catch(err => console.log('There was an error getting data from API'))
    }

    render() {
        const {statistics} = this.state;
        return (
            <Chart data={statistics}></Chart>
        )
    }
}

export default Statistics;
