(function getData() {
    fetch('./db.json', { mode: 'no-cors' })
        .then((res) => res.json())
        .then((data) => {

            var str = `<option value = "">Select City</option>`
            for (const [key, value] of Object.entries(data)) {
                str += `<option value="${key}">${value}</option>`
            }
            myDropdown.innerHTML = str;
        })
})();

var carousel = document.getElementById('carousel');
var slides = 3;
var speed = 5000; // 5 seconds

function carouselHide(num) {
    indicators[num].setAttribute('data-state', '');
    slides[num].setAttribute('data-state', '');

    slides[num].style.opacity = 0;
}

function carouselShow(num) {
    indicators[num].checked = true;
    indicators[num].setAttribute('data-state', 'active');
    slides[num].setAttribute('data-state', 'active');

    slides[num].style.opacity = 1;
}

function setSlide(slide) {
    return function () {
        for (var i = 0; i < indicators.length; i++) {
            indicators[i].setAttribute('data-state', '');
            slides[i].setAttribute('data-state', '');

            carouselHide(i);
        }

        indicators[slide].setAttribute('data-state', 'active');
        slides[slide].setAttribute('data-state', 'active');
        carouselShow(slide);

        clearInterval(switcher);
    };
}

function switchSlide() {
    var nextSlide = 0;

    for (var i = 0; i < indicators.length; i++) {
        if ((indicators[i].getAttribute('data-state') == 'active') && (i !== (indicators.length - 1))) {
            nextSlide = i + 1;
        }

        carouselHide(i);
    }

    carouselShow(nextSlide);
}

if (carousel) {
    var slides = carousel.querySelectorAll('.slide');
    var indicators = carousel.querySelectorAll('.indicator');

    var switcher = setInterval(function () {
        switchSlide();
    }, speed);

    for (var i = 0; i < indicators.length; i++) {
        indicators[i].addEventListener("click", setSlide(i));
    }
}
const myDropdown = document.getElementById("slct-city");


function selectCar(evt, model) {
    evt.preventDefault()
    let i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("links");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(model).style.display = "block";
    evt.currentTarget.className += " active";
}

function validate() {
    var select = document.getElementById("slct-city");
    var tenureSelect = document.getElementById("slct-tenure");
    var mileageSelect = document.getElementById("slct-mileage");
    if (select.value == "") {
        //If the "Please Select" option is selected display error.
        select.style.borderBottom = "2px solid red";
        tenureSelect.style.borderBottom = "2px solid red";
        mileageSelect.style.borderBottom = "2px solid red";
        return false;
    }
    return true;
}

