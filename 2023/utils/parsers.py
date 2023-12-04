import re

class Parsable:
    def __init__(self, chars):
        self.chars = chars

    def __str__(self):
        return self.chars

    def categorize(self, capture, lb_patrn=(), la_patrn=()):
        pattern = ""
        b=""
        group_names = []
        for i, a in enumerate(la_patrn):
            lb = rf"(?<={b})" if b else ""
            la = fr"(?={a})" if a else ""
            pattern = rf"{pattern}(?={lb}(?P<{chr(97+i)}>{capture}){la})*"
            group_names.append(chr(97+i))
        r = re.compile(pattern)
        matches = [m.groupdict() for m in r.finditer(self.chars)]
        matches = {k: [d[k] for d in matches if d[k]] for k in matches[0]}
        empty_matches = {k: 0 for k in group_names}
        matches = empty_matches|{k: int(v[0]) for k, v in matches.items() if v}

        return matches
