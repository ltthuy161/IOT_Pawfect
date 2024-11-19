pandoc \
    -o cover.pdf \
    --pdf-engine xelatex \
    -Vlang=vi\
    1.md 

pandoc \
    -o o.pdf \
    -M link-citations=true \
    --from=markdown+grid_tables \
    --pdf-engine xelatex \
    --listings \
    --highlight-style pygments \
    --number-sections \
    -Vlang=vi\
    --citeproc \
    --bibliography 1.bib \
    header.md \
    2.md \
    3.md \
    4.md \
    5.md 
    
pdftk cover.pdf o.pdf cat output report.pdf
