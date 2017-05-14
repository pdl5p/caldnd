import * as React from 'react';
import ContentDiv from './ContentDiv';

function wipos(item){
    return ({
        width: item[0],
        left: item[1],
        dragging: false
    });
}

function rpos(items){
    return items.map(wipos);
}

const data = [
    [[100, 0], [100, 100], [100, 170]], 
    [[100, 50], [100, 170], [300, 350]], 
    [[100, 0], [100, 200]],
    [[100, 50], [80, 260], [150, 300]]
];

function doState() {
    let rows = data.map(rpos);

    rows[1][1].dragging = true;
    return {
        dragging: {
            width: 100,
            left: 105,
            top: 48
        },
        rows
    }
}

class Grid4 extends React.Component<any, any> {

    constructor(props) {
        super(props);

        this.state = doState();
    }

    renderCells = (object, index, row) => {

        const style={
            width: `${object.width}px`,
            left: `${object.left}px`
        }

        const classy = object.dragging ? "dragging" : "";

        return <div key={index} style={style} className={"gri"}><div className={classy}>{`Item ${row}.${index}`}</div></div>
    }

    renderRow = (object, index) => {       
        return (<div key={index} className="grx"><div>
            {object.map((o, i) => this.renderCells(o, i, index))}
        </div></div>)
    }

    renderDragging = ({dragging}) => {

        const style={
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
            <ContentDiv name={"grid4"} >
                <div className="centered">
                    {this.renderDragging(this.state)}
                    {this.state.rows.map((r, i) => this.renderRow(r, i))}
                </div>
            </ContentDiv>
        )
    }
}

export default Grid4;