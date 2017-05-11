import * as React from 'react';
import * as _ from 'lodash-es';

const    generateDay = (r, d) => {
        return {
            width: _.random(60, 200),
            row: r,
            cell: d
        }
    }

   const generateRow = (rid) => {
        const n = _.fill(new Array(_.random(2, 8)), 0);
        return n.map((k, i) => generateDay(rid, i));
    }

   const generateData = () => {
        const n = _.fill(new Array(_.random(2, 8)), 0);
        return n.map((k, i) => generateRow(i));
    }

class DayCalendar extends React.Component<any, any> {

    renderDay = (item, i) => {
        const s = {
            width: item.width
        }
        
        return <div key={i} className="day-item"><div style={s}>
            {`${item.row}.${item.cell}`}
        </div></div>
    }

    renderRow = (r, i) => {
        return (
            <div key={i} className="day-row">
                {r.map((d, i) => this.renderDay(d, i))}
            </div>
        )
    }

    render() {

        const data = generateData();

        return (
            <div className="day-cal">
                {data.map((d, i) => this.renderRow(d, i))}
            </div>
        )
    }
}

export default DayCalendar;
export { DayCalendar }
