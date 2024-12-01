/**
 * starting IQR bench
 * avarage time part 2:
 */

import z3_pkg from 'z3-solver';
const { init } = z3_pkg;

export default async function solve(input) {
    const hail_vectors = input
        .split('\n')
        .map((lines) => lines.split('@').map((vector_str) => vector_str.split(',').map(Number)));

    const { Context } = await init();
    const { Real, Solver, Eq, GE } = Context('main');

    const solver = new Solver();

    const x = Real.const('x');
    const y = Real.const('y');
    const z = Real.const('z');

    const vx = Real.const('vx');
    const vy = Real.const('vy');
    const vz = Real.const('vz');

    for (let i = 0; i < hail_vectors.length; i++) {
        const t = Real.const(`t_{${i}}`);

        const [point, velocity] = hail_vectors[i];

        solver.add(GE(t, 0));
        solver.add(Eq(x.add(vx.mul(t)), t.mul(velocity[0]).add(point[0])));
        solver.add(Eq(y.add(vy.mul(t)), t.mul(velocity[1]).add(point[1])));
        solver.add(Eq(z.add(vz.mul(t)), t.mul(velocity[2]).add(point[2])));
    }

    await solver.check();

    const model = solver.model();

    const rx = Number(model.eval(x));
    const ry = Number(model.eval(y));
    const rz = Number(model.eval(z));

    console.log(rx + ry + rz);
    return rx + ry + rz;
}
