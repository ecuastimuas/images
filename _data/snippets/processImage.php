id: 28
source: 1
name: processImage
properties: 'a:0:{}'

-----

$filename = $_FILES['file']['tmp_name'];
$destinationFile = 'X:/xampp/htdocs/images/assets/uploads/' . $_FILES['file']['name'];


if (move_uploaded_file($filename, $destinationFile)) {
    $imgSize = getimagesize($destinationFile);
    $imgProp = $imgSize[0] / $imgSize[1];
    
    $options = 'w=600&h=600&zc=1&q=80';
    $class = '';
    
    if ($imgProp < (4/3) && $imgProp > (3/4)) {
        $options = 'w=600&h=600&zc=1&q=80';
    } else if ($imgProp < (16/9) && $imgProp > (9/16)) {
        $options = 'w=600&h=338&zc=1&q=80';
        $class = 'grid-item--width2';
    } else if ($imgProp < (9/16)) {
        $options = 'w=338&h=600&zc=1&q=80';
        $class = '';
    }
    
    $thumbnail = $modx->runSnippet('pThumb', array(
        'input' => $destinationFile,
        'options' => $options
    ));
    
    return json_encode([
        'thumbnail' => $thumbnail,
        'class' => $class,
        'original' => $destinationFile
    ]);
    
    
} else {
    http_response_code(403);
}