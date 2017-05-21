import * as React from 'react';
import ContentDiv from './ContentDiv';
import * as Rx from 'rxjs';

import { initialPositioning, objectify, layout } from '../../algorithms/rectangleMover';

const { fromEvent } = Rx.Observable;

function wipos(item, index) {
    return ({
        id: item.i,
        index: index,
        width: item.w,
        left: item.x
    });
}

const data = [
    { i: 'A', w: 100},
    { i: 'B', w: 30},
    { i: 'C', w: 50},
    { i: 'D', w: 200},
    { i: 'E', w: 120},
    { i: 'F', w: 100}
    ];

function doState() {

    return {
        dragging: false,
        rows: data,
        guide: data
    }
}

function styleit(target, transform, transition) {
    target.style.webkitTransform = target.style.transform = transform;
    target.style.webkitTransition = target.style.transition = transition;
}

class Cell extends React.Component<any, any> {

    draggy;
    originalLeft;
    originalTop;
    left;
    top;

    componentDidMount() {

        const target = this.draggy;

        this.left = parseInt(target.style.left, 10) || 0;
        this.top = parseInt(target.style.top, 10) || 0;

        this.originalLeft = this.left;
        this.originalTop = this.top;

        const mouseEventToCoordinate = mouseEvent => {
            mouseEvent.preventDefault();
            return { clientX: mouseEvent.clientX, clientY: mouseEvent.clientY }
        };

        const touchEventToCoordinate = touchEvent => {
            touchEvent.preventDefault();
            return { clientX: touchEvent.touches[0].clientX, clientY: touchEvent.touches[0].clientY };
        };

        const mousedown: any = fromEvent(target, 'mousedown').map(mouseEventToCoordinate);
        const mouseup = fromEvent(window, "mouseup");
        const mousemove = fromEvent(window, "mousemove").map(mouseEventToCoordinate);

        const touchStarts = fromEvent(target, "touchstart").map(touchEventToCoordinate);
        const touchMoves = fromEvent(target, "touchmove").map(touchEventToCoordinate);
        const touchEnds = fromEvent(window, "touchend");

        const dragStarts = mousedown.merge(touchStarts);
        const dragMoves = mousemove.merge(touchMoves);
        const dragEnds = mouseup.merge(touchEnds);

        const mousedrag = dragStarts.switchMap((md: any) => {

            const startX = md.clientX + window.scrollX;
            const startY = md.clientY + window.scrollY;
            const startLeft = this.left;
            const startTop = this.top;

            return dragMoves.map((mm: any) => {

                let top = startTop;

                return {
                    left: startLeft + mm.clientX - startX,
                    top: top //+ top - startY
                };
            }).takeUntil(dragEnds);
        });

        const sharedMouseDrag = mousedrag.share();

        const mousedragstart = dragStarts.switchMapTo(dragMoves.takeUntil(dragEnds).take(1));
        const mousedragstop = mousedragstart.mergeMapTo(dragEnds.take(1));

        sharedMouseDrag.subscribe((pos) => {

            this.top = pos.top;
            this.left = pos.left;

            target.style.zIndex = 1000;
            styleit(target,
                `translate(${this.left - this.originalLeft}px, ${this.top - this.originalTop}px)`,
                `transform 0s linear`);
        });

        sharedMouseDrag.debounceTime(300).subscribe((x) => {

           const dragData = {
                i: this.props.object.id,
                //index: this.props.index,
                x: x.left,
                //w: this.props.object.width
            };
            this.props.dragPause(dragData);

        });

        sharedMouseDrag.throttleTime(200).subscribe((pos) => {
            this.props.drag();
        })

        mousedragstart.subscribe(() => {
            this.props.dragStart();
        });

        mousedragstop.subscribe((x) => {

            styleit(target, `translate(${0}px, ${0}px)`, `transform 0.3s ease-out`);

            this.left = this.originalLeft;
            this.top = this.originalTop;

            this.props.dragEnd();
        });

    }

    render() {
        const { object, index, row } = this.props;

        const style = {
            width: `${object.width}px`,
            left: `${object.left}px`,
            top: `0px`,
        }

        const classy = object.dragging ? "dragging" : "";

        return <div ref={(d) => this.draggy = d} key={index} style={style} className={"gri"}><div className={classy}>{`${object.id} Item ${row}.${index}`}</div></div>
    }
}

class Grid7 extends React.Component<any, any> {

    constructor(props) {
        super(props);
        this.state = doState();
    }

    itemDragStart = () => {
        console.log("started dragging");
        this.setState({dragging: true});
    }

    itemDragEnd = () => {
        console.log("finished dragging");
        this.setState({rows: this.state.guide, dragging: false});
    }

    itemDrag = () => {
        //console.log("dragging");
    }

    itemDragPause = (data) => {
        if(!this.state.dragging){
            return;
        }
        //console.log("dragging paused", this.state.rows, data);

        const newLayout = layout(this.state.rows, data);

        console.log("guides", this.state.guide.map(x => x.i));
        console.log("new layout", newLayout.map(x => x.i));

        this.setState({guide: newLayout, rows: newLayout});
    }


    renderCell = (object, index, row) => {

        const props = {
            object,
            index,
            row,
            dragPause: this.itemDragPause,
            dragStart: this.itemDragStart,
            dragEnd: this.itemDragEnd,
            drag: this.itemDrag
        }

        return <Cell key={index} {...props} />
    }

    renderRow = (object, index) => {
        return (<div key={index} className="grx"><div>
            {object.map((o, i) => this.renderCell(o, i, index))}
        </div></div>)
    }

    renderGuideCell = (object, index) => {

        //console.log(object);

        const style = {
            border: "1px solid blue",
            width: object.width,
            left: object.left,
            height: "60px",
            color: "black"
        }

        return <div style={style} className="gri" key={index}>{object.id} {index}</div> 
    }

    renderGuideRow = (object, index) => {
        return (<div key={index} className="grx"><div>
            {object.map((o, i) => this.renderGuideCell(o, i))}
        </div></div>)
    }

    render() {

        const rows = [initialPositioning((this.state.rows)).map(wipos)];
        const guides = [initialPositioning((this.state.guide)).map(wipos)];
        return (
            <ContentDiv name={"grid7"} >
                <div className="centered">
                    {rows.map((r, i) => this.renderRow(r, i))}
                    {guides.map((r, i) => this.renderGuideRow(r, i))}
                    
                </div>
            </ContentDiv>
        )
    }
}

export default Grid7;