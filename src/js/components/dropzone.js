Dropzone.autoDiscover = false;

$(function() {

    var $previewTemplate = $('#preview-template > .grid-item');

    var $grid = $('.grid').masonry({
        gutter: 24,
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true
    });

    $grid.on( 'click', '.grid-item', function() {
        $(this).toggleClass('gigante');
        // trigger layout after item size changes
        $grid.masonry('layout');
    });

    $("#image-dropzone").dropzone({
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

            var $preview = $(response.previewElement);
            $preview.find('.dz-thumbnail').attr('src', img.thumbnail);
            $preview.addClass(img.class);

            $grid.masonry( 'appended', $preview );
            $grid.masonry('layout');

            /*if (Math.random() > 0.5) {
                $newItem.addClass('grid-item--width2');
            }

            if (Math.random() > 0.5) {
                $newItem.addClass('grid-item--height2');
            }

            $grid.isotope()
                .append( $newItem )
                .isotope( 'appended', $newItem )
                .isotope('layout');*/
        }
    });

});