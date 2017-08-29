/**
 * Created by stranger on 28.08.17.
 */
$(document).ready(function () {
    $('#menuBtn').on('click', function (e) {
        e.preventDefault();
        $('.nav-block').toggleClass('visible');
    });

    $('.list-link').on('click', function (e) {
        e.preventDefault();
        $(this).children('.sub-list').toggleClass('visible');
    })
});
