$(document).ready(function () {

    //  $('#newEmbargo').modal('show');

    var didScroll;
    var lastScrollTop = 0;
    var delta = 100;
    var navbarHeight = $('.head').outerHeight();

    $(window).scroll(function (event) {
        didScroll = true;
    });
    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 0);
    function hasScrolled() {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta)
            return;
        if (st > lastScrollTop && st > navbarHeight) {
            $('.head').removeClass('down').addClass('up');
        } else {
            if (st + $(window).height() < $(document).height()) {
                $('.head').removeClass('up').addClass('down');
            }
        }
        lastScrollTop = st;
    }

    //CHECKS
    $('.check').on('change', function () {
        var checkbox = $(this).find('[type=checkbox]');
        if (checkbox.is(':checked')) {
            checkbox.attr('checked', 'checked');
            $(this).find('.checkmark:after').show();
        }
        else {
            checkbox.removeAttr('checked');
            $(this).find('.checkmark:after').hide();
        }
    });

    //SELECT-DROPDOWN
    var list = $('.select-dropdown').find('ul');
    var listItem = $('.select-dropdown').find('li');
    list.hide();
    $('.select-dropdown').on('click', function () {
        list.hide();
        $(this).find(list).toggle();
        $(this).find('.form-search input').val('');
        $(this).find('.form-search input').focus();
        $(this).find('.item-list li').show();
        $(this).find('.no-result').hide();
    });
    $('.select-dropdown').keyup(function (e) {
        if (e.keyCode === 13) {
            list.hide();
            $(this).find(list).toggle();
            $(this).find('.form-search input').val('');
            $(this).find('.form-search input').focus();
            $(this).find('.item-list li').show();
            $(this).find('.no-result').hide();
        }
        else if (e.keyCode === 27) {
            list.hide();
            $(this).find(list).hide();
            $(this).find('.item-list li').hide();
            $(this).find('.no-result').hide();
        }
    });
    $(document).on('click', function (event) {
        var $trigger = $('.select-dropdown button');
        if ($trigger !== event.target && !$trigger.has(event.target).length) {
            $(list).hide();
        }
    });

    $(listItem).on('click', function (ev) {
        var item = $(this).text()
        var itemVal = $(this).val()
        console.log(itemVal);
        $(this).parents('.select-dropdown').find('button').find('p').text(item);
        $(this).parents('.select-dropdown').find('button').val(itemVal);
        $(this).siblings('li').removeClass('active');
        $(this).addClass('active');
        $(this).parents('ul').hide();
        $(this).parents('.item-list').find('li').show();
    });

    $('.form-search input').keyup(function () {
        var filter = $(this).val(),
            count = 0;
        var item = $(this).parents('.item-list').find('li');
        item.each(function () {
            if ($(this).text().search(new RegExp(filter, 'i')) < 0) {
                $(this).hide();
            } else {
                $(this).show();
                count++;
            }
        });
        if (count > 0) {
            $('.no-result').hide();
        } else {
            $('.no-result').show();
        }
    });

    //FORM ERROR FOCUS
    $('.form-control').on('focus', function () {
        if ($(this).hasClass('has-error')) {
            $(this).parents('.form').find('.error-message').hide();
            console.log('1')
        }
    });
    $('.form-control').on('blur', function () {
        if ($(this).hasClass('has-error')) {
            $(this).parents('.form').find('.error-message').show();
            console.log('1')
        }
    });

    $('.spinner').show();
    setTimeout(function () {
        $('.spinner').hide();
        $('#master').fadeIn(100);
        $('#agreement-cards').fadeIn(100);
        $('#city-codes').fadeIn(100);
        $('#list-controls').css('visibility', 'visible');
        $('.counter-codes').css('visibility', 'visible');
    }, 500);


    //BUTTON GROUP - TABS
    $('.btn-group button').click(function () {
        var tab_id = $(this).attr('data-tab');
        $('.tab-content').hide();
        $(this).addClass('selected');
        $('.spinner').show();
        setTimeout(function () {
            $('.spinner').hide();
            $("#" + tab_id).fadeIn(100);
        }, 250);
        $(this).siblings().removeClass('active')
        $(this).addClass('active');
        $('html, body').animate({ scrollTop: 0 }, 50);
        return false;
    });

    //SCROLL TOP
    $('.top').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 50)
    });


    //MAIN NAV
    $('#nav-open').on('mouseup', function () {
        $('nav').show();
        $('body').css('overflow', 'hidden');
    });
    $('#nav-close').on('mouseup', function () {
        $('nav').fadeOut(200);
        $('body').css('overflow', 'auto');
    });

    $('#mask').on('click', function () {
        $('body').css('overflow', 'auto');
        $('.nav').fadeOut(30);
        $(this).fadeOut(30);
        $('#nav-trigger span').text('drag_handle');
    });

    $('.sub-nav-button').on('click', function () {
        $(this).parents('.sub-nav').find('ul').toggle();
        $(this).find('.more_js').toggle();
        $(this).find('.less_js').toggle();
        $(this).toggleClass('active');
    });

    // var prev = 0;
    // var $window = $(window);
    // var nav = $('#nav-trigger');

    // $window.on('scroll', function () {
    //     var scrollTop = $window.scrollTop();
    //     nav.toggleClass('hidden', scrollTop > prev);
    //     prev = scrollTop;
    // });



    //SPECIAL TERMS
    $('#special-switch').on('change', function () {
        if ($(this).is(':checked')) {
            $('#special-form').slideDown();
        }
        else {
            $('#special-form').slideUp();
        }
    });

    //CC AGREEMENTS
    $('#add-cc-agreement').on('click', function () {
        $('#cc-agreements').append('<div class="col-12 mb-5 mb-md-3 cc-agreement"><div class=row><div class=col-11><div class=row><div class="col-12 mb-3 mb-md-0 col-md-5"><div class=input-form><label>Airline Name</label> <input class=form-control></div></div><div class="col-12 mb-3 mb-md-0 col-md-4"><div class=select-dropdown><label>Homeland</label> <button><p>select</p><span class=material-symbols-outlined>expand_more</span></button><ul class=item-list style=display:none><div class=form-search><input class=form-control placeholder="find item"></div><li value=1>Country 1<li value=2>item 2<li value=3>item 3<li value=4>item 4<li value=4>test 01<li value=5>item 5<li value=6>item 6<li value=7>item 7<li value=4>test 02<li value=8>item 8<li value=9>item 9<li value=10>item 10</li><div class=no-result><p>No matching items</div></ul></div></div><div class="col-6 col-md-3 mb-0"><div class=input-form><label>TC</label> <input class=form-control></div></div></div></div><div class="align-items-md-center align-items-start col-1 d-flex justify-content-center"><button class="btn-remove remove-cc-agreement"type=button><span class=material-symbols-outlined>close</span></button></div></div></div>');
        $('.remove-cc-agreement').on('click', function () {
            var item = $(this).parents('.cc-agreement');
            $('#dialogDelete').modal('show');
            $('.confirm_js').on('click', function () {
                $(item).fadeOut(500, function () {
                    $(this).remove();
                });
                $('#dialogDelete').modal('hide');
            });
            $('.cancel_js').on('click', function () {
                $('#dialogDelete').modal('hide');
            });
        });
    });


    //embargo-list
    // if ($('#embargo-list').find('.embargo-item').length <= 0){
    //     $('#embargo-list').find('.no-result').css('display', 'flex');
    // }
    // else{
    //     $('#embargo-list').find('.no-result').css('display', 'none');
    // }


    //cancel Changes
    $('.cancelChanges').on('click', function (ev) {
        var target = $(ev.target);
        var targetSib = $(ev.target).siblings();
        var modal = $('#cancelChanges').modal('show');
        $('.confirm_js').on('click', function () {
            window.location = 'index.html';
            // modal.modal('hide');
            // target.attr('disabled', 'disabled');
            // targetSib.attr('disabled', 'disabled');
        });
        $('.cancel_js').on('click', function () {
            window.location = 'index.html';
            modal.modal('hide');
        });
    });

    //COUNTER
    visCount = $('.agreementCard_js').length;
    $('#agreement-no-total').text(visCount);
    $('#agreement-no').text(visCount);

    //FILTER AGREEMENTS
    $('#filter-items').keyup(function () {
        var filter = $(this).val(),
            count = 0;
        $('.agreementCard_js').each(function () {
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).parents('.a-card').fadeOut(150);
            } else {
                $(this).parents('.a-card').fadeIn(150);
                count++;
            }
            $('#agreement-no').text(count);
        });
        $('.clear').on('click', function () {
            $(this).parents('.search-input').find('#filter-items').val('');
            $(this).hide();
            $('.no-results-message').hide();
            $('.agreementCard_js').parents('.a-card').fadeIn(150);
            $('#filter-items').focus();
            $('#agreement-no').text(visCount);
        });
        if (count > 0) {
            $('.no-results-message').hide();
        } else {
            $('.no-results-message').show();
        }
        if (filter.length >= 2) {
            $('.clear').show();
        }
        else {
            $('.clear').hide();
        }
    });
    $('.loupe-icon').on('click', function () {
        $('#filter-items').focus();
    });

    //COUNTER CODES
    CCount = $('.city-codes tbody tr').length;
    // $('#codes-no-total').text(CCount);
    // $('#codes-no').text(CCount);

    //FILTER CODES
    $('#filter-codes').keyup(function () {
        var filtercode = $(this).val(),
            count = 0;
        var row = $('.city-codes tbody tr')
        $(row).each(function () {
            if ($(this).text().search(new RegExp(filtercode, "i")) < 0) {
                $(this).fadeOut(80);
                $('.no-results-message').show();
            } else {
                $(this).fadeIn(100);
                $('.no-results-message').hide();
                count++;
            }
        });
        $('.clear').on('click', function () {
            $(this).parents('.search-input').find('#filter-codes').val('');
            $(this).hide();
            $('.no-results-message').hide();
            $('#city-codes').find('table').show();
            $(row).show();
            $('#filter-codes').focus();
            $('#codes-no').text(CCount);
        });
        if (count > 0) {
            $('#city-codes').find('table').show();
            $('.no-results-message').hide();
        } else {
            $('#city-codes').find('table').hide();
            $('.no-results-message').show();
        }
        if (filtercode.length >= 2) {
            $('.clear').show();
        }
        else {
            $('.clear').hide();
        }
    });
    $('.loupe-icon').on('click', function () {
        $('#filter-codes').focus();
    });


    //COUNTER AIRPORT CODES
    CCount = $('.airport-codes tbody tr').length;
    // $('#codes-no-total').text(CCount);
    // $('#codes-no').text(CCount);

    //FILTER AIRPORT CODES
    $('#filter-airports').keyup(function () {
        var filtercode = $(this).val(),
            count = 0;
        var row = $('.airport-codes tbody tr')
        $(row).each(function () {
            if ($(this).text().search(new RegExp(filtercode, "i")) < 0) {
                $(this).fadeOut(80);
                $('.no-results-message').hide();
            } else {
                $(this).fadeIn(100);
                $('.no-results-message').hide();
                count++;
            }
            $('#codes-no').text(count);
        });
        $('.clear').on('click', function () {
            $(this).parents('.search-input').find('#filter-airports').val('');
            $(this).hide();
            $('.no-results-message').hide();
            $('#airport-codes').find('table').show();
            $(row).show();
            $('#filter-airports').focus();
            $('#codes-no').text(CCount);
        });
        if (count > 0) {
            $('#airport-codes').find('table').show();
            $('.no-results-message').hide();
        } else {
            $('#airport-codes').find('table').hide();
            $('.no-results-message').show();
        }
        if (filtercode.length >= 2) {
            $('.clear').show();
        }
        else {
            $('.clear').hide();
        }
    });
    $('.loupe-icon').on('click', function () {
        $('#filter-airports').focus();
    });



    $('.btn-group button').on('click', function () {
        setTimeout(function () {
            if ($('#airport-codes').is(':visible')) {
                $('#filter-codes').hide();
                $('#filter-airports').show();
                $('#city-code-new').hide();
                $('#airport-code-new').show();
                $('#city-title').hide();
                $('#airport-title').show();
            }
            else {
                $('#filter-codes').show();
                $('#filter-airports').hide();
                $('#city-code-new').show();
                $('#airport-code-new').hide();
                $('#city-title').show();
                $('#airport-title').hide();
            }
        }, 251)
    });

    //TABLE DELETE ROW
    $('.deleteEmbargo_js').on('click', function () {
        var item = $(this).parents('.embargo-item');
        var itemCount = $('.embargo-item').length;
        //$('#dialogDelete').modal('show');
        $('.cancel_js').on('click', function () {
            $('#dialogDelete').modal('hide');
        });
        $('.confirm_js').on('click', function () {
            $('#dialogDelete').modal('hide');
            $(item).fadeOut(500, function () {
                $(this).remove();
            });
            if (itemCount > 1) {
                $('#embargo-list').find('.no-result').css('display', 'none');
                $('.actions_js').css('display', 'flex');
                //console.log(itemCount)
            }
            else if (itemCount = 1) {
                // alert(itemCount)
                $('#embargo-list').find('.no-result').css('display', 'flex');
                $('.actions_js').css('display', 'none');
            }
        });
    });

    //TABLE DELETE LANG ROW
    $('.addLanguage_js').on('click', function () {
        $(this).parents('.modal-body').find('.langTable').append('<div class="border-bottom-dashed lang-item py-3 row"><div class="mb-3 col-12 col-md-4"><label>Language</label><div class=select-dropdown><button><p>English</p><span class=material-symbols-outlined>expand_more</span></button><ul class=item-list><div class=form-search><input class=form-control placeholder="find item"></div><li value=1 class=active>English<li value=2>item 2<li value=3>item 3<li value=4>item 4<li value=5>item 5<li value=6>item 6</ul></div></div><div class="mb-3 col-10 col-md-7"><label>Translation</label> <input class=form-control></div><div class="align-items-center col-2 col-md-1 d-flex mt-2"><button class="btn btn-table deleteLang_js px-0"type=button><span class=material-symbols-outlined>delete</span></button></div></div>');
        $('.deleteLang_js').on('click', function () {
            var row = $(this).parents('.lang-item');
            $(row).remove();
        });
    });


    //LINK Dialog
    $('.askSave_js').on('click', function () {
        var link = $(this).attr('href');
        $('.confirm_js').on('click', function () {
            window.location = link;
        });
        $('.cancel_js').on('click', function () {
            window.location = link;
        });
    });

    //TOASTS
    var toastTrigger = $('.saveConfirm');
    toastTrigger.on('click', function () {
        var toastMatch = $('#saveToast');
        var toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastMatch);
        toastBootstrap.show()
        $(this).attr('disabled', 'disabled');
        $(this).siblings('.cancelChanges').attr('disabled', 'disabled');
    });

    var toastTrigger = $('.removeConfirm');
    toastTrigger.on('click', function () {
        var toastMatch = $('#removeToast');
        var toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastMatch);
        toastBootstrap.show()
    });

    var tableEmpty = $('.embargoTable_js tr').length
    if (tableEmpty <= 2) {
        $('.embargoTable_js').hide();
        $('.embargoTable_js').next('.no-results-message').show();
    }
    else {
        $('.embargoTable_js').show();
        $('.embargoTable_js').next('.no-results-message').hide();
    }

    $('.chooseView_js').on('click', function () {
        if ($(this).hasClass('listView_js')) {
            $('.listView_js').toggle();
            $('.gridView_js').toggle();
            $('.a-card').toggleClass('col-12 mb-4').toggleClass('col-md-6 mb-2');
            $('.agreementCard_js').find('.card-head').addClass('d-flex justify-content-between align-items-start');
            $('.card-head').first('div').addClass('text-end');
            $('.agreementCard_js').find('.card-head div').removeClass('mb-3');
            $('.agreementCard_js').addClass('py-2 px-3');
            $('.card-foot').addClass('d-flex justify-content-between');
            $('.card-foot').find('div').removeClass('my-1 border-bottom-dashed');
            $('.airline-data').addClass('text-end');

        }
        else if ($(this).hasClass('gridView_js')) {
            $('.listView_js').toggle();
            $('.gridView_js').toggle();
            $('.a-card').toggleClass('col-md-6 mb-2').toggleClass('col-12 mb-4');
            $('.agreementCard_js').find('.card-head').removeClass('d-flex justify-content-between align-items-start');
            $('.card-head').first('div').removeClass('text-end');
            $('.agreementCard_js').find('.card-head div').addClass('mb-3');
            $('.agreementCard_js').removeClass('py-2 px-3');
            $('.card-foot').removeClass('d-flex justify-content-between');
            $('.card-foot').find('div').addClass('my-1 border-bottom-dashed');
            $('.airline-data').removeClass('text-end');

        }
    });

});

