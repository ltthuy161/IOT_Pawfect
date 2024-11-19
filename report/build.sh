pandoc \
    -o cover.pdf \
    --pdf-engine xelatex \
    -Vlang=vi \
    cover.md 

pandoc \
    -o o.pdf \
    -M link-citations=true \
    --from=markdown+grid_tables \
    --pdf-engine xelatex \
    --listings \
    --highlight-style pygments \
    --number-sections \
    --citeproc \
    --bibliography=bib1.bib \
    -Vlang=vi \
    header.md \
    final.md

pdfunite cover.pdf o.pdf report.pdf

open report.pdf