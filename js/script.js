// Mobile menu
(function(){
  var hamburger=document.querySelector('.hamburger');
  var navMenu=document.querySelector('.nav-menu');
  if(hamburger&&navMenu){
    hamburger.addEventListener('click',function(){
      hamburger.classList.toggle('open');
      navMenu.classList.toggle('open');
    });
    document.addEventListener('click',function(e){
      if(!hamburger.contains(e.target)&&!navMenu.contains(e.target)){
        hamburger.classList.remove('open');
        navMenu.classList.remove('open');
      }
    });
  }
})();

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(function(btn){
  btn.addEventListener('click',function(){
    var answer=this.nextElementSibling;
    var isActive=this.classList.contains('active');
    document.querySelectorAll('.faq-question').forEach(function(q){
      q.classList.remove('active');
      if(q.nextElementSibling) q.nextElementSibling.classList.remove('open');
    });
    if(!isActive){
      this.classList.add('active');
      if(answer) answer.classList.add('open');
    }
  });
});

// Active nav link
(function(){
  var links=document.querySelectorAll('.nav-menu a');
  var current=window.location.pathname.split('/').pop()||'index.html';
  links.forEach(function(link){
    var href=link.getAttribute('href');
    if(href===current||(current===''&&href==='index.html')){
      link.classList.add('active');
    }
  });
})();

// Intersection Observer for animations
(function(){
  if(!window.IntersectionObserver) return;
  var observer=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        entry.target.style.opacity='1';
        entry.target.style.transform='translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  },{threshold:0.1,rootMargin:'0px 0px -50px 0px'});
  document.querySelectorAll('.master-card,.card,.feature,.service-item,.area-item').forEach(function(el){
    el.style.opacity='0';
    el.style.transform='translateY(20px)';
    el.style.transition='opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function(a){
  a.addEventListener('click',function(e){
    var target=document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

// Contact form submit
var contactForm=document.querySelector('.contact-form');
if(contactForm){
  contactForm.addEventListener('submit',function(e){
    e.preventDefault();
    var btn=this.querySelector('[type="submit"]');
    if(btn){
      btn.textContent='Poruka poslata! ✓';
      btn.style.background='#27ae60';
      setTimeout(function(){
        btn.textContent='Pošaljite poruku';
        btn.style.background='';
      },4000);
    }
    this.reset();
  });
}

// Lazy load images
if('loading' in HTMLImageElement.prototype){
  document.querySelectorAll('img[loading="lazy"]').forEach(function(img){
    if(img.dataset.src) img.src=img.dataset.src;
  });
} else {
  var lazyImages=document.querySelectorAll('img[loading="lazy"]');
  var lazyObs=new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if(entry.isIntersecting){
        var img=entry.target;
        if(img.dataset.src) img.src=img.dataset.src;
        lazyObs.unobserve(img);
      }
    });
  });
  lazyImages.forEach(function(img){ lazyObs.observe(img); });
}
