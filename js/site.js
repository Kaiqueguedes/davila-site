(function(){
  var b=document.querySelector('.burger'), n=document.querySelector('.nav');
  if(b&&n){b.addEventListener('click',function(){
    var open=n.classList.toggle('open');
    b.setAttribute('aria-expanded',open?'true':'false');
    b.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');
  });}
  document.querySelectorAll('.nav a').forEach(function(a){
    a.addEventListener('click',function(){n&&n.classList.remove('open');
      b&&b.setAttribute('aria-expanded','false');});
  });

  var chips=document.querySelectorAll('.fchip');
  if(chips.length){
    var st={cat:'todos',loc:'todos'};
    function apply(){
      var vis=0;
      document.querySelectorAll('#lista .proj').forEach(function(c){
        var ok=(st.cat==='todos'||c.dataset.cat===st.cat)&&
               (st.loc==='todos'||c.dataset.loc===st.loc);
        c.style.display=ok?'':'none'; if(ok)vis++;
      });
      var ct=document.getElementById('contador');
      if(ct)ct.textContent=vis+(vis===1?' projeto':' projetos');
      var v=document.getElementById('vazio');
      if(v)v.hidden=vis>0;
    }
    function marcar(f,v){
      chips.forEach(function(o){
        if(o.dataset.f===f){
          var on=(o.dataset.v===v);
          o.classList.toggle('on',on);
          o.setAttribute('aria-pressed',on?'true':'false');
        }
      });
    }
    function contar(f,v){
      var n=0;
      document.querySelectorAll('#lista .proj').forEach(function(c){
        if(f==='cat'?(c.dataset.cat===v):(c.dataset.loc===v))n++;
      });
      return n;
    }
    chips.forEach(function(ch){
      ch.setAttribute('aria-pressed',ch.classList.contains('on')?'true':'false');
      ch.addEventListener('click',function(){
        var f=ch.dataset.f,v=ch.dataset.v;
        if(v!=='todos'&&st[f]!==v&&contar(f,v)===0)return;
        st[f]=v; marcar(f,v);
        var outro=(f==='cat')?'loc':'cat';
        if(st[outro]!=='todos'&&contar(outro,st[outro])===0){st[outro]='todos';marcar(outro,'todos');}
        apply();
      });
    });
  }
})();
