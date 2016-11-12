Dropzone.autoDiscover = false;

$(function() {

    var $grid = $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'masonry',
        masonry: {
            columnWidth: 200,
            gutter: 20
        }
    });

    var $previewTemplate = $('#preview-template').find('.grid-item');

    var $newItem = null;
    var $itemArray = [];

    $("body").dropzone({
        url: 'api/process-image',
        parallelUploads: 2,
        maxFilesize: 20,
        addRemoveLinks: false,
        acceptedFiles: 'image/*',
        maxFiles: 50,
        dictDefaultMessage: null,
        previewTemplate: document.getElementById('preview-template').innerHTML,
        createImageThumbnails: false,

        success: function(response) {
            console.log(response);

            var img = JSON.parse(response.xhr.response);

            var $newItem = $previewTemplate.clone();
            $newItem.find('.dz-thumbnail').attr('src', img.thumbnail);

            if (Math.random() > 0.5) {
                $newItem.addClass('grid-item--width2');
            }

            if (Math.random() > 0.5) {
                $newItem.addClass('grid-item--height2');
            }

            $grid.isotope()
                .append( $newItem )
                .isotope( 'appended', $newItem )
                .isotope('layout');
        }
    });

});