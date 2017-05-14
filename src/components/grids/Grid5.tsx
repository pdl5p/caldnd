import * as React from 'react';
import ContentDiv from './ContentDiv';
import * as Rx from 'rxjs';

const { fromEvent } = Rx.Observable;

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
    [[100, 0], [200, 100]],
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

    draggy;

    componentDidMount() {

        const target = this.draggy;

        const mousedown: any = fromEvent(target, 'mousedown');
        const mouseup = fromEvent(window, "mouseup");
        const mousemove = fromEvent(window, "mousemove");

        const mousedrag = mousedown.switchMap((md) => {

            const startX = md.clientX + window.scrollX,
                startY = md.clientY + window.scrollY,
                startLeft = parseInt(target.style.left, 10) || 0,
                startTop = parseInt(target.style.top, 10) || 0;

            console.log("MD");

            return mousemove.map((mm: any) => {
                //mm.preventDefault();

                // let t = Math.floor(mm.clientY/150) * 150;
                // console.log(t)

                return {
                    left: startLeft + mm.clientX - startX,
                    top: startTop + mm.clientY - startY
                };
            }).takeUntil(mouseup);
        });

        const subscription = mousedrag.subscribe((pos) => {
            target.style.top = pos.top + 'px';
            target.style.left = pos.left + 'px';
        }, (e) => {},
        () => {console.log("DONE")});


        // var mouseDrag$ = mouseDown$.switchMap((v) => mouseMove$.map((m: any) => ({x: m.clientX})).takeUntil(mouseUp$));
        // mouseDrag$.subscribe(v => console.log(v), e => console.log(e), () => console.log("done"));
    }

    render() {
        const { object, index, row } = this.props;

        const style = {
            width: `${object.width}px`,
            left: `${object.left}px`
        }

        const classy = object.dragging ? "dragging" : "";

        return <div ref={(d) => this.draggy = d} key={index} style={style} className={"gri"}><div className={classy}>{`Item ${row}.${index}`}</div></div>
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

        return <Cell key={index} {...props} />
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