import * as chai from 'chai';
const { expect } = chai;

import {
    layout, objectify, deobjectify, insert,
    move, newItemIndex, currentItemIndex, runningSum,
    initialPositioning, hotSpots
} from './rectangleMover';

describe('insert', () => {
    it('works inserting 25 at 2', () => {
        const data = [10, 20, 30, 40];
        const expected = [10, 20, 25, 30, 40];
        expect(insert(data, 2, 25)).to.deep.eq(expected);
    });
    it('works inserting 5 at 0', () => {
        const data = [10, 20, 30, 40];
        const expected = [5, 10, 20, 30, 40];
        expect(insert(data, 0, 5)).to.deep.eq(expected);
    });
    it('works inserting 45 at 4', () => {
        const data = [10, 20, 30, 40];
        const expected = [10, 20, 30, 40, 45];
        expect(insert(data, 4, 45)).to.deep.eq(expected);
    });
});

describe('move', () => {

    let data;
    beforeEach(() => data = [10, 20, 30, 40, 50, 60]);

    it('moves 0 -> 3', () => {
        const expected = [20, 30, 40, 10, 50, 60];
        expect(move(data, 0, 3)).to.deep.eq(expected);
    });

    it('moves 3 -> 0', () => {
        const expected = [40, 10, 20, 30, 50, 60];
        expect(move(data, 3, 0)).to.deep.eq(expected);
    });
    it('moves 5 -> 2', () => {
        const expected = [10, 20, 60, 30, 40, 50];
        expect(move(data, 5, 2)).to.deep.eq(expected);
    });
});

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

describe('hotspots', () => {
    it('creates them', () => {

        const data = initialPositioning(objectify([20, 40, 60]));
        const expected = [{ i: 0, x: 0, w: 20, hs: 0, he: 10 }, { i: 1, x: 20, w: 40, hs: 10, he: 40 }, { i: 2, x: 60, w: 60, hs: 40, he: 90 }]
        expect(hotSpots(data)).to.deep.eq(expected);
    });

    it('has appropriate stuff', () => {

        const data = hotSpots(initialPositioning(objectify([20, 40, 60])));
        const mover = { x: 5 }
        expect(newItemIndex(data, { x: 5 })).to.eq(0);
        expect(newItemIndex(data, { x: 15 })).to.eq(1);
        expect(newItemIndex(data, { x: 10 })).to.eq(1);
        expect(newItemIndex(data, { x: 39 })).to.eq(1);
        expect(newItemIndex(data, { x: 40 })).to.eq(2);
    });
});

describe('deobjectify', () => {
    it('works', () => {

        const data = hotSpots(initialPositioning(objectify([50, 100, 50, 150])));
        const newData = [data[3], data[0], data[2]];
        const expected = [150, 50, 50];

        expect(deobjectify(newData)).to.deep.eq(expected);

    });
});

describe('layout', () => {

    it('calculates the correct item indexes', () => {

        const data = hotSpots(initialPositioning(objectify([50, 100, 50, 150])));
        const mover = { i: 1, x: 25 }
        const cii = currentItemIndex(data, mover);
        const nii = newItemIndex(data, mover);

        expect(nii).to.eq(cii);
    });

    it('returns if no movement', () => {

        const data = [{ i: 'A', w: 50 }, { i: 'B', w: 150 }, { i: 'C', w: 100 }];
        const mover = { i: 'A', x: 5 }
        const expected = [{ i: 'A', w: 50 }, { i: 'B', w: 150 }, { i: 'C', w: 100 }];

        expect(layout(data, mover)).to.deep.eq(expected);
    });

    it('calculates layout correctly', () => {

        const data = [{ i: 'A', w: 50 }, { i: 'B', w: 150 }, { i: 'C', w: 100 }];
        const mover = { i: 'A', x: 100 }
        const expected = [{ i: 'B', w: 150 }, { i: 'A', w: 50 }, { i: 'C', w: 100 }];
        expect(layout(data, mover)).to.deep.eq(expected);
    });
});

