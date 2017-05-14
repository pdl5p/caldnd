import * as React from 'react';
import ContentDiv from './ContentDiv';

function wipos(item) {
    return ({
        width: item[0],
        left: item[1],
        dragging: false
    });
}

function rpos(items) {
    return items.map(wipos);
}

const data = [
    [[100, 0]],
];

function doState() {
    let rows = data.map(rpos);

    //rows[1][1].dragging = true;
    return {
        dragging: null,
        rows
    }
}

class Cell extends React.Component<any, any> {

    

    render() {
        const { object, index, row } = this.props;

        const style = {
            width: `${object.width}px`,
            left: `${object.left}px`
        }

        const classy = object.dragging ? "dragging" : "";

        return <div key={index} style={style} className={"gri"}><div className={classy}>{`Item ${row}.${index}`}</div></div>
    }
}

class Grid5 extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = doState();
    }

    renderCell = (object, index, row) => {

        const props = {
            object,
            index,
            row
        }

        return <Cell {...props} />
    }

    renderRow = (object, index) => {
        return (<div key={index} className="grx"><div>
            {object.map((o, i) => this.renderCell(o, i, index))}
        </div></div>)
    }

    renderDragging = ({ dragging }) => {
        if (!dragging) {
            return null;
        }
        const style = {
            width: `${dragging.width}px`,
            top: `${dragging.top}px`,
            left: `${dragging.left}px`
        }

        return (
            <div className="moving" style={style}><div>MOVING</div></div>
        )
    }


    render() {
        return (
            <ContentDiv name={"grid5"} >
                <div className="centered">
                    {this.renderDragging(this.state)}
                    {this.state.rows.map((r, i) => this.renderRow(r, i))}
                </div>
            </ContentDiv>
        )
    }
}

export default Grid5;