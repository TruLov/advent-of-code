export function part1(data) {
    const connections = parse_connections(data);
    const graph = build_graph(connections);
    const sets = get_triple_sets(graph);
    return sets.filter((set) => set.some((computer) => computer.startsWith('t'))).length;
}

export function part2(data) {
    const connections = parse_connections(data);
    const graph = build_graph(connections);
    const sets = get_triple_sets(graph);

    const triangle_count_map = Object.keys(graph).map((key) => ({
        key,
        tcount: sets.filter((set) => set.includes(key)).length,
    }));

    const sorted = triangle_count_map.sort((a, b) => b.tcount - a.tcount);
    const max_triples = sorted[0].tcount;
    const clique_options = sorted
        .filter((item) => item.tcount === max_triples)
        .map((item) => item.key);

    const cliques = [];
    const visited = new Set();

    for (const key of clique_options) {
        if (!visited.has(key)) {
            const clique = new Set();
            dfs(key, graph, visited, clique, clique_options);
            cliques.push(clique);
        }
    }

    const largest_clique = cliques.sort((a, b) => b.size - a.size)[0];
    return [...largest_clique].sort((a, b) => a.localeCompare(b)).join(',');
}

function dfs(node, graph, visited, clique, clique_options) {
    visited.add(node);
    clique.add(node);

    for (const neighbor of graph[node]) {
        if (visited.has(neighbor) || !clique_options.includes(neighbor)) continue;
        dfs(neighbor, graph, visited, clique, clique_options);
    }

    return clique;
}

function get_triple_sets(graph) {
    const sets = [];
    for (const n1 of Object.keys(graph)) {
        for (const n2 of graph[n1]) {
            if (n2 <= n1) continue;
            for (const n3 of graph[n2]) {
                if (n3 <= n2 || !graph[n3].has(n1)) continue;
                sets.push([n1, n2, n3]);
            }
        }
    }
    return sets;
}

function build_graph(connections) {
    const graph = {};
    for (const [a, b] of connections) {
        if (!graph[a]) graph[a] = new Set();
        if (!graph[b]) graph[b] = new Set();

        graph[a].add(b);
        graph[b].add(a);
    }
    return graph;
}

function parse_connections(data) {
    return data
        .trim()
        .split('\n')
        .map((line) => line.split('-'));
}
