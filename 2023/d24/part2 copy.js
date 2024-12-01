/**
 * starting IQR bench
 * avarage time part 2:
 */

export default function solve(input) {
    const vectors = input
        .split('\n')
        .map((lines) => lines.split('@').map((vector_str) => vector_str.split(',').map(Number)));

    const intersections = [];

    for (let i = 0; i < vectors.length - 1; i++) {
        const [P3, r3] = vectors[i];
        const P = P3.slice(0, 2);
        const r = normalize_vector(r3.slice(0, 2));

        for (let j = i + 1; j < vectors.length; j++) {
            const [Q3, s3] = vectors[j];
            const Q = Q3.slice(0, 2);
            const s = normalize_vector(s3.slice(0, 2));
            const intersection = IntersectLines(P, r, Q, s);

            if (intersection) {
                const [Ox, Oy] = intersection;
                const is_inside_window =
                    Ox >= 200000000000000 &&
                    Ox <= 400000000000000 &&
                    Oy >= 200000000000000 &&
                    Oy <= 400000000000000;
                if (is_inside_window) {
                    // warum sind hier beide gleich??
                    const rtx = (Ox - P[0]) / r[0];
                    // const rty = (Oy - P[1]) / r[1];

                    const stx = (Ox - Q[0]) / s[0];
                    // const sty = (Oy - Q[1]) / s[1];

                    const is_in_past_for_P = rtx < 0;
                    const is_in_past_for_Q = stx < 0;

                    if (!is_in_past_for_P && !is_in_past_for_Q) {
                        intersections.push([Ox, Oy]);
                    }
                }
            }
        }
    }

    return intersections.length;
}

function normalize_vector([x, y]) {
    var length = Math.sqrt(x ** 2 + y ** 2);
    //Then divide the x and y by the length.
    const nx = x / length;
    const ny = y / length;
    return [nx, ny];
}

function IntersectLines(P, r, Q, s) {
    // line1 = P + lambda1 * r
    // line2 = Q + lambda2 * s
    // r and s must be normalized (length = 1)
    // returns intersection point O of line1 with line2 = [ Ox, Oy ]
    // returns null if lines do not intersect or are identical
    var PQx = Q[0] - P[0];
    var PQy = Q[1] - P[1];
    var rx = r[0];
    var ry = r[1];
    var rxt = -ry;
    var ryt = rx;
    var qx = PQx * rx + PQy * ry;
    var qy = PQx * rxt + PQy * ryt;
    var sx = s[0] * rx + s[1] * ry;
    var sy = s[0] * rxt + s[1] * ryt;
    // if lines are identical or do not cross...
    if (sy == 0) return null;
    var a = qx - (qy * sx) / sy;
    return [P[0] + a * rx, P[1] + a * ry];
}
