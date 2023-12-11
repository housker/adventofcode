# Advent of Code

## About
Solutions for toy problems from 2022 to present

## Get started
- Download the repo
- The outermost directories are the year. The subdirectories are the days.
- 2022 was done in Javascript. 2023 was done in Python.
- Run each submission file separately for solutions. You'll need to run 2023 files with Python 3.11+

## Usage
- You may need to add a cell at the top with the following in order to run 2023's notebooks
```python
from pathlib import Path
import sys

current_dir = Path.cwd()
parent_dir = current_dir.parent
sys.path.append(str(parent_dir))
```

## Resources
[Advent of Code's website](https://adventofcode.com/)
[Stripping Jupyter notebooks of output prior to committing](https://gist.github.com/33eyes/431e3d432f73371509d176d0dfb95b6e)
