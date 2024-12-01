/**
 * starting IQR bench
 * avarage time part 2:
 */

const DS = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
];

const key = (p) => p[0] + '_' + p[1];
const addVect = (a, b) => a.map((v, c) => v + b[c]);

export default function solve(input) {
    const map = input.split('\n').map((line, y) => line.split(''));
    const startPos = [1, 0];
    const endPos = [map[0].length - 2, map.length - 1];

    return part2(map, startPos, endPos);
}

function getGraph(map, startPos, endPos) {
    const validPos = (p) =>
        map[p[1]] !== undefined && map[p[1]][p[0]] !== undefined && map[p[1]][p[0]] !== '#';

    const addConnectNode = (cur) => {
        // try to locate existing one
        let newJuncId = nodes.findIndex((n) => n.p[0] == cur.p[0] && n.p[1] == cur.p[1]);

        if (newJuncId == cur.lastJuncId) return newJuncId;

        if (newJuncId == -1) newJuncId = nodes.push({ p: cur.p.slice(), connections: [] }) - 1;

        // we need to connect cur.lastJuncId and newJuncId
        if (nodes[cur.lastJuncId].connections.findIndex((conn) => conn.id == newJuncId) == -1)
            nodes[cur.lastJuncId].connections.push({
                id: newJuncId,
                distance: cur.steps - cur.stepsToLastJunc,
            });

        if (nodes[newJuncId].connections.findIndex((conn) => conn.id == cur.lastJuncId) == -1)
            nodes[newJuncId].connections.push({
                id: cur.lastJuncId,
                distance: cur.steps - cur.stepsToLastJunc,
            });

        return newJuncId;
    };

    let stack = [{ p: startPos.slice(), steps: 0, lastJuncId: 0, stepsToLastJunc: 0 }],
        nodes = [{ p: [1, 0], connections: [] }],
        seen = {};

    while (stack.length) {
        let cur = stack.pop(),
            k = key(cur.p),
            moves = DS.map((d) => addVect(cur.p, d)).filter(validPos);

        if (moves.length > 2) {
            cur.lastJuncId = addConnectNode(cur);
            cur.stepsToLastJunc = cur.steps;
        }

        if (seen[k] !== undefined) continue;
        seen[k] = 1;

        if (cur.p[0] == endPos[0] && cur.p[1] == endPos[1]) {
            addConnectNode(cur);
            continue;
        }

        moves.forEach((np) =>
            stack.push({
                p: np,
                steps: cur.steps + 1,
                lastJuncId: cur.lastJuncId,
                stepsToLastJunc: cur.stepsToLastJunc,
            })
        );
    }

    return nodes;
}

function part2(map, startPos, endPos) {
    let nodes = getGraph(map, startPos, endPos);

    let stack = [{ p: 0, steps: 0, seen: {} }],
        endNodeId = nodes.length - 1,
        maxSteps = 0;

    while (stack.length) {
        let cur = stack.pop();

        let k = cur.p;
        cur.seen[k] = 1;

        if (cur.p == endNodeId) {
            maxSteps = Math.max(cur.steps, maxSteps);
            continue;
        }

        nodes[k].connections
            .filter((n) => cur.seen[n.id] === undefined)
            .forEach((n) =>
                stack.push({
                    p: n.id,
                    steps: cur.steps + n.distance,
                    seen: { ...cur.seen },
                })
            );
    }

    return maxSteps;
}
