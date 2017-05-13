import * as React from 'react';
import ContentDiv from './ContentDiv';

const data = [
    [[100, 0], [100, 100], [100, 200]], 
    [[100, 100], [100, 200]], 
    [[100, 100], [100, 200]],
    [[100, 100], [100, 200], []]
];

function doRows() {
    return [null, null, null, null,  null].map((k, i) => ({
        width: (1000 - (100 * i + 1)),
        left: (i === 3 ? 200 : 0)
    }));
}

function doState() {
    return {
        x: "yo",
        rows: data
    }
}

class Grid3 extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = doState();
    }

    renderCells = (object, index, row) => {
        return <div key={index} className="gri"><div>{`Item ${row}.${index}`}</div></div>
    }

    renderRow = (object, index) => {
       
        return (<div key={index} className="grx"><div >
            {object.map((o, i) => this.renderCells(o, i, index))}
        </div></div>)
    }

    render() {
        return (
            <ContentDiv name={"grid3"} >
                <div className="centered">
                    {this.state.rows.map((r, i) => this.renderRow(r, i))}
                </div>
            </ContentDiv>
        )
    }
}

export default Grid3;