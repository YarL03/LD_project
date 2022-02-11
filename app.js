import Typed from './src/modules/auto typing/typed.js'


//animation of Numbers and intro text

let options = {
    strings: ['Юридическая<br> клиника', 'Бесплатная<br> помощь', 'Работаем<br> с 1998 года'],
    backSpeed: 40,
    typeSpeed: 80,
    showCursor: false,
    loop: true
  };

setTimeout(() => {let abc = new Typed("#autoTypingText" , options)}, 500)  


function animateValue(id, start, end, duration) {
    if (start === end) return;
    let range = end - start;
    let current = start;
    let increment = end > start? 1 : -1;
    let stepTime = Math.abs(Math.floor(duration / range));
    let obj = document.getElementById(id);
    let timer = setInterval(function() {
        current += increment;
        obj.innerHTML = current;
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);
}

animateValue('1', 1, 2000, 0.000000001)
animateValue('2', 1, 300, 8300)
animateValue('3', 1, 800, 8000)

//Carousel

let slides = document.querySelectorAll('.carousel__slide')
let carousel = []

for (let i = 0; i < slides.length; i++) {
    carousel[i] = slides[i].src
    slides[i].remove()
}
 let step = 0
 let offset = -1

 function draw(eventTrarg = null) {
     let img = document.createElement('img')
     img.src = carousel[step]
     img.classList.add('carousel__slide')
     if (window.innerWidth <= 991 && !(window.innerWidth <= 767)) {
        img.style.left = offset*700 + 'px'
     }
     else if (window.innerWidth <= 767 && !(window.innerWidth <= 575)) {
        img.style.left = offset*500 + 'px'
     }
     else if (window.innerWidth <= 575) {
        img.style.left = offset*350 + 'px'
     }
      else img.style.left = offset*900 + 'px'
      eventTrarg ? document.querySelector('.carousel__gallery').prepend(img) :
      document.querySelector('.carousel__gallery').append(img)
      if (step + 1 == carousel.length && eventTrarg) {
        step = 0
        offset = 1
      }
     else if (step + 1 == carousel.length) {
         step = 0
         offset = -1
     }
     else {
        step++
        offset++
     }
    
 }
 
function left() {
    btnCarouselRight.removeEventListener('click', left)
    let slides2 = document.querySelectorAll('.carousel__slide')
    slides2[0].remove()
    draw()
    slides2 = document.querySelectorAll('.carousel__slide')
    let offset2 = -1
    for (let i = 0; i < slides2.length; i++) {
        if (window.innerWidth <= 991 && !(window.innerWidth <= 767)) {
            slides2[i].style.left = offset2*700 + 'px'
        }
        else if (window.innerWidth <= 767 && !(window.innerWidth <= 575)) {
            slides2[i].style.left = offset2*500 + 'px'
        }
        else if (window.innerWidth <= 575) {
            slides2[i].style.left = offset2*350 + 'px'
        }
        else slides2[i].style.left = offset2*900 + 'px'
            offset2++
        }
        
    
    setTimeout(() => {
        
        
        btnCarouselRight.addEventListener('click', left)
    }, 700)
}

function right(eTarg) {
    btnCarouselLeft.removeEventListener('click', right)
    let slides3 = document.querySelectorAll('.carousel__slide')
    slides3[2].remove()
    draw(eTarg)
    slides3 = document.querySelectorAll('.carousel__slide')
    let offset3 = -1
    for (let i = 0; i < slides3.length; i++) {
        if (window.innerWidth <= 991 && !(window.innerWidth <= 767)) {
            slides3[i].style.left = offset3*700 + 'px'
        }
        else if (window.innerWidth <= 767 && !(window.innerWidth <= 575)) {
            slides3[i].style.left = offset3*500 + 'px'
        }
        else if (window.innerWidth <= 575) {
            slides3[i].style.left = offset3*350 + 'px'
        }
        else slides3[i].style.left = offset3*900 + 'px'
             offset3++
        }
        
    
    setTimeout(() => {
        
        
        btnCarouselLeft.addEventListener('click', right)
    }, 700)
}

draw() 
draw()
draw()

const btnCarouselRight = document.querySelector('.carousel__btn.right')
const btnCarouselLeft = document.querySelector('.carousel__btn.left')

btnCarouselRight.addEventListener('click', left)
btnCarouselLeft.addEventListener('click', right)

//Rotate a little bit

function rotate(event) {
    if (window.innerWidth <= 1367) return
    if (event.target.classList[0] != 'border__border') return
        switch(event.target.dataset.rotateDirection) {
            case 'left' : 
            event.target.style.transform = 'rotate(1deg)'
            break
            case 'right' : 
            event.target.style.transform = 'rotate(-1deg)'
        }
}

function reset(event) {
    if (window.innerWidth <= 1367) return
    if (event.target.classList[0] != 'border__border') return
    event.target.style.transform = ''
}

document.addEventListener('mouseover', rotate)
document.addEventListener('mouseout', reset)

//Smooth scrolling

function ease(tE, sP, d, dur) {
    tE /= dur / 2
    if (tE < 1) return d / 2 * tE * tE + sP;
    tE--;
    return -d / 2 * (tE * (tE - 2) - 1) + sP 
}

function smoothScroll(targ, duration) {         // smooth scroll for buttons
    let target = document.querySelector(targ)
    let targetPosition = target.getBoundingClientRect().top
    let startPosition = window.pageYOffset
   
    let startTime = null

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime
        let timeElapsed = currentTime - startTime
        let run = ease(timeElapsed, startPosition, targetPosition, duration)
        window.scrollTo(0, run)
        if (timeElapsed < duration) requestAnimationFrame(animation)
       
    }

    requestAnimationFrame(animation)
}

document.addEventListener('click', (event) => {
    if (!event.target.dataset.target) return
    smoothScroll(`.${event.target.dataset.target}`, 1000)
    document.body.style.overflow = ''
    menuSide.style.display = ''
    blackout.style.display = 'none'
    menuSide.classList.add('hidden')
    blackout.classList.add('hidden')
    blackout.style.zIndex = '' 
})

//YaMap

const center = [51.83518577566895,107.58027636441803]
const mapButton = document.querySelector('.btn--right')
const blackout = document.querySelector('.blackout')

function init() {
    let map = new ymaps.Map('map', {
        center: center,
        zoom: 18
    }, {
        restrictMapArea : [[51.84693617644909,107.56590451532676], [51.81043691774014,107.6906348454852]]
    })

    let placemark = new ymaps.Placemark(center, {
        balloonContent : `
            <div class="balloon">
                <div class="balloon__adress">Юридическая клиника</div>
                <div class="balloon__contacts">
                    <a href="tel:+79503885811">+79503885811 (Валерия)</a>
                </div>
            </div>
        `
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'https://cdn-icons-png.flaticon.com/512/6788/6788922.png',
        iconImageSize: [35, 40],
        iconImageOffset: [-20,-40]
    })

    map.controls.remove('geolocationControl')
    map.controls.remove('zoomControl')
    map.controls.remove('searchControl')

    map.geoObjects.add(placemark)

}

ymaps.ready(init)

document.addEventListener('click', (event) => {
    if (event.target != mapButton) {
        if (event.target == blackout) {
            blackout.classList.add('hidden')
            map.classList.add('hidden')
            document.body.style.overflow = ''
            
                blackout.style.display = ''
                map.style.display = ''
            
        }
        return
    } else {
        event.preventDefault()
        blackout.style.display = 'block'
        map.style.display = 'block'
        document.body.style.overflow = 'hidden'
        
            blackout.classList.remove('hidden')
            map.classList.remove('hidden')
        
    }
})

//Menu-mobile

const menuSide = document.querySelector('.menu-mobile__side')
const menuHeader = document.querySelector('.menu-mobile__header')
const menuHide = document.querySelector('.menu-mobile__hide')

menuHeader.addEventListener('click', (event) => {
    document.body.style.overflow = 'hidden'
    menuSide.style.display = 'block'
    blackout.style.display = 'block'
    blackout.classList.remove('hidden')
    blackout.style.zIndex = '4001'   
    
    setTimeout(() => {
        menuSide.classList.remove('hidden')
    }, 0)
}
)

document.addEventListener('click', (event) => {
    if(event.target == menuHide || event.target == blackout) {
    document.body.style.overflow = ''
    menuSide.style.display = ''
    blackout.style.display = 'none'
    menuSide.classList.add('hidden')
    blackout.classList.add('hidden')
    blackout.style.zIndex = ''   
    }
    else return
})

// Some stuff

alert(`window height = ${window.innerHeight}px`)
