class ActiveElem{
    constructor() {
        this.logo = document.querySelector('.logo');
        this.about = document.querySelector('.link-nav');
        this.email = document.querySelector('.footer-input');
        this.emailBtn = document.querySelector('.footer-form-btn');
        this.btnVolunteers = document.querySelector('.footer-btn');
        this.btnFeed = document.querySelector('.friend-btn');
        this.logoFooter = document.querySelector('.footer-logo');
        this.addListener();
    }
    addListener(){
        this.logo.addEventListener('click', (ev) => {
            window.location.reload();
            ev.stopImmediatePropagation();
         })
        this.logoFooter.addEventListener('click', (ev) => {
            window.location.reload();
            ev.stopImmediatePropagation();
        })
        this.about.addEventListener('click', (ev) => {
            window.location.reload();
            ev.stopImmediatePropagation();
        })
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
        this.btnVolunteers.addEventListener('click',(ev)=>{
            ev.stopPropagation();
            document.location.href = '../donate/index.html';
        })
        this.btnFeed.addEventListener('click',(ev)=>{
            ev.stopPropagation();
            document.location.href = '../donate/index.html';
        })
    }
}

window.addEventListener('load', ()=>{
    let active = new ActiveElem();
})



