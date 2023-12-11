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
    


class Parsable2D:
    def __init__(self, chars):
        self.chars = chars

    def __str__(self):
        return self.chars
    
    def adjacents(self, match, periphery):
        indices = []
        before = match.start()-1
        after = match.end()
        line_length = self.chars.index("\n") + 1

        # inline
        if before >= 0 and (self.chars[before] != "\n"):
            indices.append(before)
        else:
            before += 1
        if after < len(self.chars) and (self.chars[after] != "\n"):
            indices.append(after)
        else:
            after -= 1
        # above
        if before - line_length >= 0:
            indices.extend(range(before - line_length, after - line_length + 1))
        # below
        if after + line_length < len(self.chars):
            indices.extend(range(before + line_length, after + line_length + 1))

        p_matches = re.finditer(periphery, self.chars)
        overlaps = filter(lambda pm: set(range(*pm.span())) & set(indices), p_matches)
        
        return {
            "match": match.group(),
            "indices": list(range(*match.span())),
            "adjacents": indices,
            "overlaps": [o.group() for o in overlaps],
        }
    


    def categorize(self, center, periphery):
        c_matches = re.finditer(center, self.chars)
        match_adjacents = [self.adjacents(cm, periphery) for cm in c_matches]

        return match_adjacents
