// AOS animate JS

AOS.init({
    // Global settings:
    disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
    startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
    initClassName: 'aos-init', // class applied after initialization
    animatedClassName: 'aos-animate', // class applied on animation
    useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
    disableMutationObserver: false, // disables automatic mutations' detections (advanced)
    debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
    throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)
    
  
    // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
    offset: 120, // offset (in px) from the original trigger point
    delay: 0, // values from 0 to 3000, with step 50ms
    duration: 800, // values from 0 to 3000, with step 50ms
    easing: 'ease-out-cubic', // default easing for AOS animations
    once: false, // whether animation should happen only once - while scrolling down
    mirror: false, // whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation

  });

// Custom JS 

/* Loader Start */

var loader = document.getElementById('preloader');

window.addEventListener("load", function(){
    loader.style.display = "none";
}); 

/* Loader Start */

/* Typewrite JS Start */ 

var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 1) || 200;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

    window.onload = function() {
        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);
    };

/* Typewrite JS End  */ 

/* Highlight nav link onscroll Start */ 

var header = document.querySelector("nav");
var links = document.querySelectorAll(".nav-link");
var sections = document.querySelectorAll(".sections");
window.onscroll = function() {
    
    var current = "home";
    sections.forEach((section)=> {
        const sectionTop = section.offsetTop;
        if(pageYOffset >= sectionTop-320) {
            current = section.getAttribute("id");
        }
    })
    links.forEach((item)=>{
        item.classList.remove("active");
        if(item.href.includes(current)){
            item.classList.add("active");
        }
        else {
            item.classList.remove("active");
        }
    })
}

/* Highlight nav link onscroll End */ 


/* Start animation when the section is viewed */
/* Found the code on how this can be achieved here: https://stackoverflow.com/questions/68559022/start-animation-when-scrolled-into-view */

function animateOnScroll (className) {
    const observerFunc = new IntersectionObserver(intersections => {
    intersections.forEach(({
      target,
      isIntersecting
    }) => {
      target.classList.toggle(`${className}`, isIntersecting);
    });
    }, {
    threshold: 0
    });

    document.querySelectorAll(`.${className}`).forEach(div => {
      observerFunc.observe(div);
    });
}

animateOnScroll('html');
animateOnScroll('css');
animateOnScroll('javascript');
animateOnScroll('nodejs');
animateOnScroll('expressjs');

