$(document).ready(function () {
  console.log('footer js initilized.');

  // Navigation
  $('.nav-switch').on('click', function (event) {
    $('.main-menu').slideToggle(400);
    event.preventDefault();
  });

  // Accordions
  $('.panel-link').on('click', function (e) {
    $('.panel-link').removeClass('active');
    var $this = $(this);
    if (!$this.hasClass('active')) {
      $this.addClass('active');
    }
    e.preventDefault();
  });

  //back to top
  backToTop();
  function backToTop() {
    $(".back-to-top").css("display", "none");
    $(window).scroll(function () {
      if ($(window).scrollTop() > 0) {
        $(".back-to-top").fadeIn(300);
      } else {
        $(".back-to-top").fadeOut(300);
      }
    });
    $(".back-to-top").click(function () {
      console.log('boom');
      $("html, body").animate({
        scrollTop: 0
      }, 500);
    });
  };

  //Smooth scrolling with links
  $('.main-menu a[href*=\\#]').on('click', function (event) {
    event.preventDefault();
    $('html,body').animate({ scrollTop: ($(this.hash).offset().top) - 90 }, 800);

    if ($(window).width() < 768) {
      $('.nav-switch').trigger('click'); // to close navbar
    }
  });

  // send mail via ajax
  $("#contactFormSubmit").click(function (e) {
    e.preventDefault();
    var data = {
      name: $("#contactform input[name='name']").val(),
      email: $("#contactform input[name='email']").val(),
      msg: $("#contactform textarea[name='msg']").val(),
    };
    $.ajax({
      type: "POST",
      url: "https://galzor.com/contact-zoty.php",
      data: data,
      success: function (data) {
        console.log(data);
        $("#contactFormResponse").html(data);
        $('.success').fadeIn(1000);
      },
      error: function (err) {
        console.log(err);
      }
    });
    console.log('all done');
  });

  $('.gallery-slide').hide(); // Hide all slides
  $('.gallery-slide:first-child').show();

  var slideIndex = 0;

  // Function to show a specific slide
  function showSlide(n) {
    var slides = $('.gallery-slide');
    if (n >= slides.length) { slideIndex = 0 }
    if (n < 0) { slideIndex = slides.length - 1 }
    slides.hide().eq(slideIndex).show();
  }

  // Function to show the next slide
  function showNextSlide() {
    showSlide(slideIndex += 1);
  }

  // Set the interval for the automatic gallery scroll
  setInterval(showNextSlide, 2000); // Change image every 2 seconds

  // Click event to open the modal
  $('#imageTrigger').on('click', function () {
    $('#imageModal').fadeIn();
    showSlide(slideIndex); // Start from the first image
  });

  // Click event to close the modal
  $('.close-modal').on('click', function () {
    $('#imageModal').fadeOut();
  });

  // Click outside of the modal content to close the modal
  $(window).on('click', function (event) {
    if ($(event.target).is('#imageModal')) {
      $('#imageModal').fadeOut();
    }
  });

  // Show the first slide initially
  showSlide(slideIndex);


});

