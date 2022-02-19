import Typed from './src/modules/auto typing/typed.js'

//animation of intro text

let options = {
    strings: ['Юридическая<br> клиника', 'Бесплатная<br> помощь', 'Работаем<br> с 1998 года'],
    backSpeed: 40,
    typeSpeed: 80,
    showCursor: false,
    loop: true
  };

setTimeout(() => {let abc = new Typed("#autoTypingText" , options)}, 0)