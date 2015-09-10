for lang in en es ca; do
    make -C $lang html
    xdg-open $lang/_build/html/index.html
done
