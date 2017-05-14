import * as React from 'react';
import ContentDiv from './ContentDiv';

function doRows() {
    return [null, null, null, null,  null].map((k, i) => ({
        width: (1000 - (100 * i + 1)),
        left: (i === 3 ? 200 : 0)
    }));
}

function doState() {
    return {
        x: "yo",
        rows: doRows()
    }
}

class Grid2 extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = doState();
    }

    renderRow = (object, index) => {
        const s = { width: `${object.width}px`, left: `${object.left}px` }
        return (<div key={index} className="grx"><div style={s}>
            <div className="gri"><div>{"item"}</div></div>
        </div></div>)
    }

    render() {
        return (
            <ContentDiv name={"grid2"} >
                <div className="centered">
                    {this.state.rows.map((r, i) => this.renderRow(r, i))}
                </div>
            </ContentDiv>
        )
    }
}

export default Grid2;