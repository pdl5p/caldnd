import * as chai from 'chai';
const { expect } = chai;

const layout = (input, mover) => {

    const clone = [...input];

    const item = clone.find(x => x.i == mover.i);
    const currentIndexOfItem = clone.indexOf(item);

    return clone;
}


const calculatePosition = (input) => {
    return input;
}

const objectify = (d) => d.map((x, i) => ({ i, w: x }));
const newItemIndex = (hotspots, mover) => hotspots.indexOf(hotspots.find(h => h.hs <= mover.x && h.he > mover.x));
const currentItemIndex = (d, m) => d.indexOf(d.find(x => x.i === m.i));
const runningSum = (i) => i.reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], []);
const initialPositioning = (i) => i.reduce((a, x, i) => [...a, { ...x, x: (a.length > 0 ? a[i - 1].x + a[i - 1].w : 0) }], []);
const hotSpots = (d) => d.reduce((a, x, i) => [...a, { ...x, hs: (a.length > 0 ? a[i - 1].he : 0), he: x.x + x.w / 2 }], []);

describe("accumulate", () => {

    it('accumulates correctly', () => {
        expect(runningSum([100, 100])).to.deep.eq([100, 200]);
        expect(runningSum([50, 100, 50, 120])).to.deep.eq([50, 150, 200, 320]);
    });
});

describe('currentItemIndex', () => {

    let data;
    beforeEach(() => {
        data = [100, 100].map((d, i) => ({ i, x: (i * d), w: d }));
    });

    it('returns correct index', () => {
        expect(currentItemIndex(data, { i: 0 })).to.eq(0);
        expect(currentItemIndex(data, { i: 1 })).to.eq(1);
    });
});

describe('current positions', () => {
    it('sets up positions', () => {

        const data = objectify([20, 100, 40, 50]);
        const expected = [
            { i: 0, x: 0, w: 20 },
            { i: 1, x: 20, w: 100 },
            { i: 2, x: 120, w: 40 },
            { i: 3, x: 160, w: 50 },
        ]
        const result = initialPositioning(data);
        expect(result[0]).to.deep.eq(expected[0]);
        expect(result[1]).to.deep.eq(expected[1]);
        expect(result[2]).to.deep.eq(expected[2]);
        expect(result[3]).to.deep.eq(expected[3]);
    });
});

describe("basics", () => {

    let data;
    beforeEach(() => {
        data = objectify([100, 50, 100]);//.map((d, i) => ({i, w: d }));
    });

    it("stays in place", () => {
        const expected = [{ i: 0, w: 100 }, { i: 1, w: 50 }, { i: 2, w: 100 }];
        expect(layout(data, { i: 0, x: 0, w: 100 })).to.deep.equal(expected);
    });

    // it('stays when only moved a little', () => {
    //     const expected = [{i: 0, x: 0, w: 100}, {i: 1, x: 100, w: 100}];
    //     expect(layout(data, {i: 0, x: 10, w: 100})).to.deep.eq(expected);
    // });

    // it('moves when moved full width', () => {
    //     const expected = [{i: 1, x: 100, w: 100}, {i: 0, x: 0, w: 100}];
    //     expect(layout(data, {i: 0, x: 100, w: 100})).to.deep.eq(expected);
    // });


});

describe('hotspots', () => {
    it('creates them', () => {

        const data = initialPositioning(objectify([20, 40, 60]));
        const expected = [{ i: 0, x: 0, w: 20, hs: 0, he: 10 }, { i: 1, x: 20, w: 40, hs: 10, he: 40 }, { i: 2, x: 60, w: 60, hs: 40, he: 90 }]
        expect(hotSpots(data)).to.deep.eq(expected);
    });

    it('has appropriate stuff', () => {

        const data = hotSpots(initialPositioning(objectify([20, 40, 60])));
        const mover = { x: 5}
        expect(newItemIndex(data, {x: 5})).to.eq(0);
        expect(newItemIndex(data, {x: 15})).to.eq(1);
        expect(newItemIndex(data, {x: 10})).to.eq(1);
        expect(newItemIndex(data, {x: 39})).to.eq(1);
        expect(newItemIndex(data, {x: 40})).to.eq(2);
    });
});

