/**
 * starting IQR bench
 * avarage time part 1:
 */

export default function solve(input) {
    const wiring_diagram = input
        .split('\n')
        .map((line) => line.split(':'))
        .reduce((obj, line) => ({ ...obj, [`${line[0]}`]: line[1].trim().split(' ') }), {});

    // Object.values(wiring_diagram).forEach((val) => translator.add(...val));
    const vals = Object.values(wiring_diagram).flat();
    const translator = new Set(vals);
    Object.keys(wiring_diagram).forEach((key) => translator.add(key));
    const s2i = [...translator].reduce((a, b, i) => ({ ...a, [`${b}`]: i }), {});

    const adjacency_matrix = Array.from({ length: translator.size }, () =>
        Array(translator.size).fill(0)
    );
    for (const key in wiring_diagram) {
        wiring_diagram[key].forEach((edge) => {
            const a = s2i[key];
            const b = s2i[edge];
            adjacency_matrix[a][b] = 1;
            adjacency_matrix[b][a] = 1;
        });
    }

    const degree_matrix = gen_degree_matrix(adjacency_matrix);

    // 1. Laplace Matrix berechnen
    const laplace_matrix = gen_laplace_matrix(
        adjacency_matrix,
        degree_matrix,
        adjacency_matrix.length
    );

    // 2. Eigenwerte und Eigenvektoren der Laplace-Matrix berechnen
    const qrs = qr_iteration(laplace_matrix);

    // 3. Eigenvektor zum zweitkleinsten Eigenwert suchen
    const fiedler = find_fiedler(qrs);

    // 4. Teile den Graphen entlang der Komponenten dieses Eigenvektors auf.
    const group_size = fiedler.filter((f) => f > 0).length;
    // const result = divide_graph(fiedler, adjacency_matrix.length);

    return group_size * (adjacency_matrix.length - group_size);
}

function divide_graph(fiedler, length) {
    return Array.from({ length: length }, (_, i) => (fiedler[i] >= 0 ? 0 : 1));
}

function find_fiedler({ eigenvalues, eigenvectors }) {
    // Sortiere die Eigenwerte und erhalte die 2. kleinste Position
    const sortedIndices = eigenvalues
        .map((_, i) => i)
        .sort((a, b) => eigenvalues[a] - eigenvalues[b]);
    const second_smallest_idx = sortedIndices[1];

    // Extrahiere den Eigenvektor zum zweitkleinsten Eigenwert
    const fiedler = eigenvectors.map((row) => row[second_smallest_idx]);

    return fiedler;
}

function qr_iteration(laplace_matrix, maxIterations = 1000, tolerance = 1e-10) {
    const laplace_len = laplace_matrix.length;

    let Q = Array.from({ length: laplace_len }, (_, i) =>
        Array.from({ length: laplace_len }, (_, j) => (i === j ? 1 : 0))
    );
    let R = laplace_matrix.map((row) => [...row]);

    for (let iteration = 0; iteration < maxIterations; iteration++) {
        // QR decomposition
        for (let i = 0; i < laplace_len - 1; i++) {
            for (let j = i + 1; j < laplace_len; j++) {
                const c = R[i][i] / Math.sqrt(R[i][i] * R[i][i] + R[j][i] * R[j][i]);
                const s = R[j][i] / Math.sqrt(R[i][i] * R[i][i] + R[j][i] * R[j][i]);

                // Update R
                const temp = [...R[i]];
                R[i] = R[i].map((_, k) => c * temp[k] + s * R[j][k]);
                R[j] = R[j].map((_, k) => -s * temp[k] + c * R[j][k]);

                // Update Q
                const tempQ = [...Q[i]];
                Q[i] = Q[i].map((_, k) => c * tempQ[k] + s * Q[j][k]);
                Q[j] = Q[j].map((_, k) => -s * tempQ[k] + c * Q[j][k]);
            }
        }

        // Check convergence
        const offDiagonalSum = R.reduce((acc, row, i) => acc + row[i + 1] || 0, 0);
        if (Math.abs(offDiagonalSum) < tolerance) {
            break;
        }
    }

    // Extract eigenvalues
    const eigenvalues = R.map((row, i) => row[i]);

    return { eigenvalues, eigenvectors: Q };
}

function gen_laplace_matrix(adjacency_matrix, degree_matrix, length) {
    const laplace_matrix = Array.from({ length }, () => Array(length).fill(0));

    for (let i = 0; i < length; i++) {
        for (let j = 0; j < length; j++) {
            laplace_matrix[i][j] = degree_matrix[i][j] - adjacency_matrix[i][j];
        }
    }

    return laplace_matrix;
}

function gen_degree_matrix(adjacency_matrix) {
    const length = adjacency_matrix.length;

    const degree_matrix = Array.from({ length }, () => Array(length).fill(0));

    for (let i = 0; i < length; i++) {
        degree_matrix[i][i] = adjacency_matrix[i].reduce((acc, edge) => acc + edge, 0);
    }

    return degree_matrix;
}
