Vue.component('tab1',{

});


Vue.component('tab2',{


});

Vue.component('scroller',{
props:['scrollerdata'],
data(){
  return{
    dupa:false
  }
},
methods:{
  handleitemclick:function(elem,all){
    // console.log(elem.current);
    if(all.find((el)=>el.current==true)){
    all.find((el)=>el.current==true).current = false;
    }
    elem.current=true;
  }
},
template:`<div class="row">
<p v-for="item in scrollerdata" class="col-md-3" @click="handleitemclick(item,scrollerdata)" :class="{active:item.current}">{{item.artnr}}</p>
</div>`

});

Vue.component('dupa',{
  props:['test'],
  template:`<div><p :class={active:test}>afsd</p> </div>`
})




let app = new Vue({
  el:'#app',
  data:{
    dupatest:false,
    serie:{nazwa:'serie',tab:'tab1',dane:[{artnr:'a',current:false},{artnr:'b',current:false}]},
    modele: {nazwa:'modele',tab:'tab2',dane:[{artnr:'c',current:false},{artnr:'a',current:false}]},
    klamki:{nazwa:'klamki',tab:'tab2',dane:[{artnr:'d',current:false},{artnr:'g',current:false}]},
    currenttab:'1'
  },
  methods:{
    setSlide:function(){
      let index = this.datas.findIndex((el)=>el.tab==this.currenttab);
      this.currenttab=this.datas[index+1].tab;
      console.log(index);
      console.log(this.slides[2]);
    }
  }


})
