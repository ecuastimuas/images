Dropzone.autoDiscover = false;

$(function() {
    $("#image-dropzone").dropzone({
        url: 'api/process-image',
        parallelUploads: 2,
        maxFilesize: 20,
        addRemoveLinks: false,
        acceptedFiles: 'image/*',
        maxFiles: 50,
        dictDefaultMessage: ''
    });
});