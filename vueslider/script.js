Vue.component('serie',{
template:`<div>serie</div>`

});

Vue.component('modele',{
template:`<div>modele</div>`

});

Vue.component('klamki',{
template:`<div>klamki</div>`

});


let app = new Vue({
  el:'#app',
  data:{
    slides:['serie','modele','klamki'],
    currentslide:'serie'
  },
  methods:{
    setSlide:function(){
      let index = this.slides.findIndex((el)=>el==this.currentslide);
      this.currentslide=this.slides[index+1];
    }
  }


})
