id: 28
source: 1
name: processImage
properties: 'a:0:{}'

-----

$filename = $_FILES['file']['tmp_name'];
$destinationFile = 'X:/xampp/htdocs/images/assets/uploads/' . $_FILES['file']['name'];

if (move_uploaded_file($filename, $destinationFile)) {
    
    $thumbnail = $modx->runSnippet('pThumb', array(
        'input' => $destinationFile,
        'options' => 'w=300'
    ));
    
    return json_encode([
        'thumbnail' => $thumbnail,
        'original' => $destinationFile
    ]);
    
    
} else {
    http_response_code(403);
}