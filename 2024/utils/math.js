export function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

export function gcd(a, b) {
    return a ? gcd(b % a, a) : b;
}

// Berechnung des GCD und der Koeffizienten (erweiterter euklidischer Algorithmus)
// <https://de.wikipedia.org/wiki/Erweiterter_euklidischer_Algorithmus>
// ggT(a, b) = s * a + t * b
export function extended_gcd(a, b) {
    // 	1  wenn b = 0
    // 2      dann return (a,1,0)
    if (b === 0) return [a, 1, 0];

    // 3  (d',s',t') ← extended_euclid(b, a mod b)
    const [di, si, ti] = extended_gcd(b, a % b);

    // 4  (d,s,t) ← (d',t',s' – (a div b)t')
    // 5  return (d,s,t)
    return [di, ti, si - Math.floor(a / b) * ti];
}
