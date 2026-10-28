"""
Resolve each Firmesa city to a lat/long, from GeoNames, inside its own state.

    curl -LO https://download.geonames.org/export/dump/MX.zip && unzip MX.zip
    curl -LO https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_1_states_provinces.geojson
    python3 scripts/resolve-cities.py ne_10m_admin_1_states_provinces.geojson \
        MX.txt src/data/stations.json cities.json

Writes `cities.json`, which `make-map.py` reads. The GeoNames dump is
CC BY 4.0 and Natural Earth is public domain; both are credited on the page.
"""
import json, sys, unicodedata

ne_path, geonames_path, stations_path = sys.argv[1:4]

def norm(s):
    s = unicodedata.normalize('NFD', str(s))
    return ''.join(c for c in s if unicodedata.category(c) != 'Mn').lower().strip()

# ── state polygons, for the containment test ──────────────────────────────────
ne = json.load(open(ne_path))
states = {}
for f in ne['features']:
    p = f['properties']
    if p.get('adm0_a3') != 'MEX' or not p.get('name'):
        continue
    g = f['geometry']
    polys = g['coordinates'] if g['type'] == 'MultiPolygon' else [g['coordinates']]
    states[norm(p['name'])] = polys

def in_ring(x, y, ring):
    inside = False
    j = len(ring) - 1
    for i in range(len(ring)):
        xi, yi = ring[i][0], ring[i][1]
        xj, yj = ring[j][0], ring[j][1]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi) + xi:
            inside = not inside
        j = i
    return inside

def in_state(lon, lat, state):
    for poly in states[state]:
        if in_ring(lon, lat, poly[0]) and not any(in_ring(lon, lat, h) for h in poly[1:]):
            return True
    return False

# ── candidate places ─────────────────────────────────────────────────────────
places = {}
with open(geonames_path, encoding='utf-8') as fh:
    for line in fh:
        c = line.rstrip('\n').split('\t')
        if len(c) < 15 or c[6] != 'P':
            continue
        lat, lon, pop = float(c[4]), float(c[5]), int(c[14] or 0)
        names = {c[1], c[2], *(c[3].split(',') if c[3] else ())}
        for n in names:
            if n:
                places.setdefault(norm(n), []).append((pop, lat, lon, c[1]))

def variants(city):
    out = [city]
    for prefix in ('Ciudad ', 'San Juan Bautista '):
        if city.startswith(prefix):
            out.append(city[len(prefix):])
    if ' de ' in city:
        out.append(city.split(' de ')[0])
    parts = city.split()
    if len(parts) > 1:
        out += [parts[-1], parts[0]]
    return out

stations = json.load(open(stations_path))
resolved = []
for st in stations:
    state = norm(st['state'])
    for city in st['cities']:
        best = None
        # Inside the state's own polygon first. A handful of towns sit on a
        # river border that Natural Earth draws a few kilometres off, so a
        # second pass drops the containment test and takes the largest place
        # of that name anywhere in the country.
        for strict in (True, False):
            for v in variants(city['city']):
                for pop, lat, lon, name in places.get(norm(v), ()):
                    if strict and not in_state(lon, lat, state):
                        continue
                    if best is None or pop > best[0]:
                        best = (pop, lat, lon, name, v, strict)
                if best:
                    break
            if best:
                break
        resolved.append({
            'state': st['state'], 'city': city['city'],
            'stations': len(city['stations']),
            'lat': round(best[1], 4) if best else None,
            'lon': round(best[2], 4) if best else None,
            'via': f"{best[4]} -> {best[3]} (pop {best[0]}){'' if best[5] else ' [sin prueba de estado]'}" if best else 'MISS',
        })

for r in resolved:
    print('%-22s %-28s %-9s %-10s %s' % (r['state'], r['city'], r['lat'], r['lon'], r['via']))
json.dump(resolved, open(sys.argv[4], 'w'), ensure_ascii=False, indent=1)
