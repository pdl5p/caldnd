
export const layout = (i, m) => {
    let d = hotSpots(initialPositioning((i)));
    //console.log("d", d);
    const c = currentItemIndex(d, m);
    const n = newItemIndex(d, m);
    if(c !== n){
        d = move(d, c, n);
    }
    return d.map(x => ({ i: x.i, w: x.w}));
}

export const objectify = (d) => d.map((x, i) => ({ i, w: x }));
export const deobjectify = (d) => d.map(d => d.w);
export const insert = (a, i, x) => [...a.slice(0, i), x, ...a.slice(i)];
export const move = (a, o, n) => insert(a.filter((x, i) => i != o), n, a[o]);
export const newItemIndex = (h, m) => h.indexOf(h.find(h => h.hs <= m.x && h.he > m.x));
export const currentItemIndex = (d, m) => d.indexOf(d.find(x => x.i === m.i));
export const runningSum = (i) => i.reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], []);
export const initialPositioning = (i) => i.reduce((a, x, i) => [...a, { ...x, x: (a.length > 0 ? a[i - 1].x + a[i - 1].w : 0) }], []);
export const hotSpots = (d) => d.reduce((a, x, i) => [...a, { ...x, hs: (a.length > 0 ? a[i - 1].he : 0), he: x.x + x.w / 2 }], []);