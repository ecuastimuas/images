id: 27
source: 1
name: cacheBustParam
properties: 'a:0:{}'

-----

if (file_exists($file)) {
    return $file . '?=' . filemtime($file);
}