"""
Measure every playable stream's loudness and write a per-station `gain` into
the station file, so one station is not 17 dB louder than the next.

    python3 scripts/measure-loudness.py src/data/stations.json

Needs ffmpeg on the PATH. Each stream is sampled for SECONDS and measured
with the EBU R128 integrated loudness (LUFS) that broadcast uses. The gain is
the attenuation that brings the stream to TARGET; it never exceeds 1.0,
because an HTML audio element can lower a signal but not raise it, so the
quietest station sets the ceiling for everyone.

Live radio moves: a song and an ad break are six decibels apart, and a single
sample of one station disagreed with itself by that much between two runs. So
each stream is sampled PASSES times and the median is kept. It is still an
approximation — re-run it when the station list changes, or when a station
sounds out of step with the rest.
"""
import concurrent.futures, json, re, statistics, subprocess, sys

TARGET = -18.0  # LUFS. Quieter than streaming's usual -14: this is a page.
SECONDS = 25
PASSES = 3

stations_path = sys.argv[1]
data = json.load(open(stations_path))

playable = [
    station
    for state in data
    for city in state['cities']
    for station in city['stations']
    if station.get('audio')
]


def loudness(url):
    """Integrated loudness of a stream in LUFS, or None if it cannot be read."""
    try:
        done = subprocess.run(
            ['ffmpeg', '-nostdin', '-hide_banner', '-i', url, '-t', str(SECONDS),
             '-af', 'ebur128=peak=true', '-f', 'null', '-'],
            # Los títulos ICY que la emisora anuncia no siempre son UTF-8.
            capture_output=True, text=True, errors='replace', timeout=SECONDS * 4,
        )
    except subprocess.TimeoutExpired:
        return None
    # ffmpeg prints the summary last, as "    I:         -14.5 LUFS".
    found = re.findall(r'^\s+I:\s+(-?[\d.]+) LUFS', done.stderr, re.MULTILINE)
    return float(found[-1]) if found else None


# Las tres pasadas de cada emisora van a la misma cola, así que caen en
# momentos distintos del programa y no las promedia todas sobre la misma
# canción.
jobs = [station for _ in range(PASSES) for station in playable]
with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    measured = list(pool.map(lambda s: loudness(s['audio']), jobs))

samples = {station['callSign']: [] for station in playable}
for station, lufs in zip(jobs, measured):
    if lufs is not None:
        samples[station['callSign']].append(lufs)

for station in playable:
    taken = sorted(samples[station['callSign']])
    if not taken:
        print(f'{station["callSign"]:<12} sin medición — se deja como está')
        continue
    lufs = statistics.median(taken)
    gain = min(1.0, round(10 ** ((TARGET - lufs) / 20), 2))
    station['gain'] = gain
    spread = f'±{(taken[-1] - taken[0]) / 2:.1f}' if len(taken) > 1 else '  n/d'
    print(
        f'{station["callSign"]:<12} {lufs:>7.1f} LUFS {spread:>6} dB  '
        f'({len(taken)}/{PASSES})  →  gain {gain:.2f}'
    )

with open(stations_path, 'w') as out:
    json.dump(data, out, ensure_ascii=False, indent=2)
    out.write('\n')
