/* Wounds & Steel — shared behaviour: range ruler + scroll reveal */
(function(){
  // Build range ruler ticks, labelled in inches
  var ticks=document.getElementById('ticks');
  if(ticks){
    var count=40;
    for(var i=0;i<=count;i++){
      var major=(i%5===0);
      var t=document.createElement('div');
      t.className='ruler__tick '+(major?'major':'minor');
      t.style.top=(i/count*100)+'%';
      ticks.appendChild(t);
      if(major){
        var n=document.createElement('div');
        n.className='ruler__num';
        n.style.top='calc('+(i/count*100)+'% + 4px)';
        n.textContent=(i*3)+'″';
        ticks.appendChild(n);
      }
    }
  }
  // Scroll marker tracks page progress
  var marker=document.getElementById('marker');
  function onScroll(){
    var h=document.documentElement;
    var p=h.scrollTop/(h.scrollHeight-h.clientHeight||1);
    if(marker) marker.style.top=(p*100)+'%';
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  // Scroll reveal (respects reduced motion)
  var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
  var els=document.querySelectorAll('.reveal');
  if(reduce || !('IntersectionObserver' in window)){
    els.forEach(function(el){el.classList.add('in')});
  } else {
    var io=new IntersectionObserver(function(es){
      es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}});
    },{threshold:.1});
    els.forEach(function(el){io.observe(el)});
  }
})();
