"""
Turn Natural Earth's 10m admin-1 boundaries into an inline-SVG map of Mexico,
and project the station cities onto the same canvas.

    python3 scripts/make-map.py ne_10m_admin_1_states_provinces.geojson \
        cities.json src/data/stations.json \
        src/data/mexico-map.ts src/data/stations.json

Run `resolve-cities.py` first; it produces the `cities.json` this reads. Both
of the generated files are committed, so the two downloads are only needed
when the station list or the projection changes.

Natural Earth is public domain; GeoNames is CC BY 4.0. Both are credited on
the page. Output: one TypeScript module of state outlines, and the station
file with `x`/`y` added to every city.
"""
import json, math, sys, unicodedata

ne_path, cities_path, stations_path, out_map, out_stations = sys.argv[1:6]

WIDTH = 1000.0          # viewBox width; the height follows from the aspect
PAD = 6.0               # room for the stroke, in the same units
DP_TOL = 0.9            # Douglas–Peucker tolerance, in viewBox units
MIN_RING_AREA = 1.6     # drop islands smaller than this, in square units

# ── Lambert conformal conic, the projection the INEGI maps of Mexico use ─────
LAT0, LAT1, LAT2, LON0 = 12.0, 17.5, 29.5, -102.0
r = math.radians
n = (math.log(math.cos(r(LAT1)) / math.cos(r(LAT2)))
     / math.log(math.tan(math.pi / 4 + r(LAT2) / 2) / math.tan(math.pi / 4 + r(LAT1) / 2)))
F = math.cos(r(LAT1)) * math.tan(math.pi / 4 + r(LAT1) / 2) ** n / n
RHO0 = F / math.tan(math.pi / 4 + r(LAT0) / 2) ** n

def project(lon, lat):
    rho = F / math.tan(math.pi / 4 + r(lat) / 2) ** n
    theta = n * r(lon - LON0)
    return rho * math.sin(theta), RHO0 - rho * math.cos(theta)

def ring_area(pts):
    a = 0.0
    for i in range(len(pts)):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % len(pts)]
        a += x1 * y2 - x2 * y1
    return abs(a) / 2

def simplify(pts, tol):
    """Douglas–Peucker, iterative so a long coastline cannot blow the stack."""
    if len(pts) < 3:
        return pts[:]
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        lo, hi = stack.pop()
        if hi - lo < 2:
            continue
        ax, ay = pts[lo]
        bx, by = pts[hi]
        dx, dy = bx - ax, by - ay
        span = math.hypot(dx, dy)
        far, best = -1.0, lo
        for i in range(lo + 1, hi):
            px, py = pts[i]
            d = (abs(dx * (ay - py) - (ax - px) * dy) / span if span
                 else math.hypot(px - ax, py - ay))
            if d > far:
                far, best = d, i
        if far > tol:
            keep[best] = True
            stack += [(lo, best), (best, hi)]
    return [p for p, k in zip(pts, keep) if k]

# ── read the boundaries, project them, keep the extent ──────────────────────
raw = []
for f in json.load(open(ne_path))['features']:
    p = f['properties']
    if p.get('adm0_a3') != 'MEX' or not p.get('name'):
        continue
    g = f['geometry']
    polys = g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]
    rings = [[project(x, y) for x, y, *_ in ring] for poly in polys for ring in poly]
    raw.append((p['name'], p.get('iso_3166_2'), rings))

xs = [x for _, _, rings in raw for ring in rings for x, _ in ring]
ys = [y for _, _, rings in raw for ring in rings for _, y in ring]
scale = (WIDTH - 2 * PAD) / (max(xs) - min(xs))
height = round((max(ys) - min(ys)) * scale + 2 * PAD, 1)
to_canvas = lambda x, y: ((x - min(xs)) * scale + PAD,
                          (max(ys) - y) * scale + PAD)

# ── simplify on the canvas, where the tolerance is a visible distance ───────
states, points_in, points_out = [], 0, 0
for name, iso, rings in sorted(raw, key=lambda s: s[0]):
    placed = sorted(([to_canvas(x, y) for x, y in ring] for ring in rings),
                    key=ring_area, reverse=True)
    parts = []
    for i, ring in enumerate(placed):
        if i and ring_area(ring) < MIN_RING_AREA:
            continue
        points_in += len(ring)
        ring = simplify(ring, DP_TOL)
        if len(ring) < 3:
            continue
        points_out += len(ring)
        d = 'M' + ' '.join(f'{x:.1f} {y:.1f}' for x, y in ring) + 'Z'
        parts.append(d.replace('M', 'M', 1))
    states.append({'name': name, 'iso': iso, 'd': ''.join(parts)})

with open(out_map, 'w', encoding='utf-8') as fh:
    fh.write(f"""/**
 * Contorno de los 32 estados de México, listo para un SVG en línea.
 *
 * Generado desde Natural Earth 10m admin-1 (dominio público) con una
 * proyección cónica conforme de Lambert (paralelos 17.5° y 29.5°, meridiano
 * central 102° W) y simplificación de Douglas–Peucker. No se edita a mano:
 * se vuelve a generar con `scripts/make-map.py`.
 */

export const mapViewBox = '0 0 {WIDTH:.0f} {height}';

export const mexicoStates = [
""")
    for s in states:
        fh.write(f"  {{ name: {json.dumps(s['name'], ensure_ascii=False)},"
                 f" iso: {json.dumps(s['iso'])},\n    d: '{s['d']}' }},\n")
    fh.write("] as const;\n")

# ── the same projection for the cities ─────────────────────────────────────
coords = {(c['state'], c['city']): c for c in json.load(open(cities_path))}
stations = json.load(open(stations_path))
for st in stations:
    for city in st['cities']:
        c = coords[(st['state'], city['city'])]
        x, y = to_canvas(*project(c['lon'], c['lat']))
        city['lat'], city['lon'] = c['lat'], c['lon']
        city['x'], city['y'] = round(x, 1), round(y, 1)
json.dump(stations, open(out_stations, 'w', encoding='utf-8'),
          ensure_ascii=False, indent=2)

print(f'states {len(states)}  points {points_in} -> {points_out}')
print(f'viewBox 0 0 {WIDTH:.0f} {height}')
import os
print('map file', os.path.getsize(out_map), 'bytes')
