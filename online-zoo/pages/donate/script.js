class ActionElement{
    constructor() {
        this.input = document.querySelector('.input-money');
        this.inputImg = document.querySelector('.input-money-img');
        this.period = document.querySelectorAll('.period-donation');
        this.periodContainer = document.querySelector('.check-period');
        this.checkboxArray = document.querySelector('.checkbox-scale-container')
        this.scale = document.querySelectorAll('.check-scale');
        this.email = document.querySelector('.footer-input');
        this.emailBtn = document.querySelector('.footer-form-btn');
        this.logo = document.querySelector('.logo');
        this.footerLogo = document.querySelector('.footer-logo');
    }
    inputListener(){
        this.input.addEventListener('input',(ev)=>{
            ev.stopPropagation();
            if(ev.target.value.length > 4){
                ev.target.value = ev.target.value.slice(0,4);
            }
            if(this.input.validity.valid == false){
                if(ev.data === null){
                    this.inputImg.src = '../../assets/icons/dollar-gray.svg';
                    this.input.className = 'input-money';
                }else{
                    this.inputImg.src = '../../assets/icons/dollar-red.svg';
                    this.input.className = ' input-money invalid';
                }
            }else{
                    this.inputImg.src = '../../assets/icons/dollar-green.svg';
                    this.input.className = 'input-money';
            }
        })
    }
    scaleListener(){
        this.checkboxArray.addEventListener('click',(ev)=>{
            ev.stopPropagation();
            this.scale.forEach(e=>{
                if(e.value !== ev.target.value){
                    e.checked = false;
                }
            })
            this.input.value = ev.target.value;
            this.inputImg.src = '../../assets/icons/dollar-green.svg';
        })
    }
    periodListener(){
        this.periodContainer.addEventListener('click', (ev)=>{
            ev.stopPropagation();
            console.log(ev.target.value);
            this.period.forEach(e=>{
                console.log(e.value);
                if(e.value !== ev.target.value){
                    e.checked = false;
                }else{
                    e.checked = true;
                }
            })
        })
    }
    emailListener(){
        this.email.addEventListener('blur', (ev)=>{
            ev.stopImmediatePropagation();
            if(!this.email.checkValidity() || this.email.value === ''){
                this.email.value = 'Invalid email';
                this.emailBtn.className = 'footer-form-btn mistake';
                setTimeout(()=>{
                    this.email.value = 'Enter email';
                }, 2000)
            }else{
                this.emailBtn.className = 'footer-form-btn valid';
                this.emailBtn.addEventListener('click',(evClk)=>{
                    evClk.stopPropagation();
                    evClk.target.className = 'footer-form-btn btn-push';
                    setTimeout(()=>{
                        evClk.target.className = 'footer-form-btn valid';
                    },250);
                    this.emailBtn.removeEventListener('click', ()=>{});
                })
            }
        })
        this.email.addEventListener('focus', (ev)=>{
            ev.stopImmediatePropagation();
            this.email.value = '';
        })
    }
    logoListener(){
        this.logo.addEventListener('click',(ev)=>{
            ev.stopPropagation();
            document.location.href = '../main/index.html';
        })
    }
    footerLogoListener(){
        this.footerLogo.addEventListener('click',(ev)=>{
            ev.stopPropagation();
            document.location.href = '../main/index.html';
        })
    }
}

window.addEventListener('load', ()=>{
    let action = new ActionElement();
    action.inputListener();
    action.scaleListener();
    action.periodListener();
    action.emailListener();
    action.logoListener();
    action.footerLogoListener();
})