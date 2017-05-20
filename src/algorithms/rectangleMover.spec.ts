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

const runningSum = (input) => {
    return input.reduce((a, x, i) => [...a, x + (a[i-1] || 0)], []);
}

describe("accumulate", () => {

    it('accumulates correctly', () => {
        expect(runningSum([100, 100])).to.deep.eq([100, 200]);
        expect(runningSum([50, 100, 50, 120])).to.deep.eq([50, 150, 200, 320]);
    });
});

describe("basics", () => {

    let data;
    beforeEach(() => {
        data = [100, 100].map((d, i) => ({i, x: (i * d), w: d }));

    });

    it("stays in place", () => {
        const expected = [{i: 0, x: 0, w: 100}, {i: 1, x: 100, w: 100}];
        expect(layout(data, {i: 0, x: 0, w: 100})).to.deep.equal(expected);
    });

    it('stays when only moved a little', () => {
        const expected = [{i: 0, x: 0, w: 100}, {i: 1, x: 100, w: 100}];
        expect(layout(data, {i: 0, x: 10, w: 100})).to.deep.eq(expected);
    });
    
    // it('moves when moved full width', () => {
    //     const expected = [{i: 1, x: 100, w: 100}, {i: 0, x: 0, w: 100}];
    //     expect(layout(data, {i: 0, x: 100, w: 100})).to.deep.eq(expected);
    // });


});
