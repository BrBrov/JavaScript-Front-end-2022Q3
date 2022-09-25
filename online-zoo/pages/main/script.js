class ActiveElem{
    constructor() {
        this.logo = document.querySelector('.logo');
        this.about = document.querySelector('.link-nav');
        this.email = document.querySelector('.footer-input');
        this.emailBtn = document.querySelector('.footer-form-btn');
        this.addListener();
    }
    addListener(){
        this.logo.addEventListener('click', (ev) => {

            window.location.reload();
            ev.stopImmediatePropagation();
         })
        this.about.addEventListener('click', (ev) => {
            window.location.reload();
            ev.stopImmediatePropagation();
        })
        this.email.addEventListener('blur', (ev)=>{
            console.log(ev);
            ev.stopImmediatePropagation();
            if(!this.email.checkValidity() || this.email.value === ''){
                this.email.value = 'Invalid email';
                this.emailBtn.className = 'footer-form-btn mistake';
                setTimeout(()=>{
                    this.email.value = 'Enter email';
                }, 2000)
            }else{
                this.emailBtn.className = 'footer-form-btn valid';
            }
        })
        this.email.addEventListener('focus', (ev)=>{
            ev.stopImmediatePropagation();
            this.email.value = '';
        })
    }
}

window.addEventListener('load', ()=>{
    console.log('page loaded!');
    let active = new ActiveElem();
})



