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
    [[100, 0], [100, 100], [150, 200]],
    [[100, 0], [120, 100], [150, 220]],
];

function doState() {
    let rows = data.map(rpos);

    //rows[1][1].dragging = true;
    return {
        dragging: null,
        rows
    }
}

function prioritisingClone(stream$) {
    const first = new Rx.Subject();
    const second = stream$.do(x => first.next(x)).share();

    return [
        Rx.Observable.using(
            () => second.subscribe(() => { }),
            () => first
        ),
        second,
    ];
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

        const mousedown: any = fromEvent(target, 'mousedown');
        const mouseup = fromEvent(window, "mouseup");
        const mousemove = fromEvent(window, "mousemove");

        const mousedrag = mousedown.switchMap((md) => {

            const startX = md.clientX + window.scrollX;
            const startY = md.clientY + window.scrollY;
            const startLeft = this.left;
            const startTop = this.top;

            return mousemove.map((mm: any) => {
                mm.preventDefault();

                return {
                    left: startLeft + mm.clientX - startX,
                    top: startTop + mm.clientY - startY
                };
            }).takeUntil(mouseup);
        });

        const sharedMouseDrag = mousedrag;//.share();

        const mousedragstart = mousedown.switchMapTo(mousemove.takeUntil(mouseup).take(1));
        const mousedragstop = mousedragstart.mergeMapTo(mouseup.take(1));

        sharedMouseDrag.subscribe((pos) => {

            let top = Math.floor(pos.top / 70) * 70;

            this.top = top;
            this.left = pos.left;

            target.style.zIndex = 1000;
            styleit(target, 
                `translate(${this.left - this.originalLeft}px, ${this.top - this.originalTop}px)`, 
                `transform 0s linear`);
        });

        sharedMouseDrag.throttleTime(200).subscribe((pos) => {

        })

        mousedragstart.subscribe(() => {

        });

        mousedragstop.subscribe((x) => {

            styleit(target, `translate(${0}px, ${0}px)`, `transform 0.3s ease-out`);

            this.left = this.originalLeft;
            this.top = this.originalTop;
        });

    }

    render() {
        const { object, index, row } = this.props;

        const style = {
            width: `${object.width}px`,
            left: `${object.left}px`,
            top: `0px`,
        }

        const classy = object.dragging ? "dragging" : "abc";

        return <div ref={(d) => this.draggy = d} key={index} style={style} className={"gri"}><div className={classy}>{`Item ${row}.${index}`}</div></div>
    }
}

class Grid6 extends React.Component<any, any> {

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
            <ContentDiv name={"grid6"} >
                <div className="centered">
                    {this.renderDragging(this.state)}
                    {this.state.rows.map((r, i) => this.renderRow(r, i))}
                </div>
            </ContentDiv>
        )
    }
}

export default Grid6;