let skala = 0.20;

new Vue({
  el:'#app',
  data:{
    configKonva:{
      width:300,
      height:500
    },
    configCircle:{
      radius:30,
      fill:'red',
      x:50,
      y:50
    },
    okleinaConf:{
      image:null,
      x:0,
      height:2056*skala,
      width:1025*skala
    },
    tloczenieConf:{
      image:null,
      x:(1025*skala)/2,
      y:271*skala,
      height:1465*skala,
      width:610*skala,
      offsetX:(610*skala)/2

    },
    tlo:'01',
  },
  methods:{
    drawokleina:function(){
      const okleinaObj = new window.Image();
      //http://konfigurator.kordi.com.pl/images/podglad/tla/${this.tlo}.png
      okleinaObj.src = `${this.tlo}.png`;
      okleinaObj.onload = () => {
        this.okleinaConf.image = okleinaObj;
      };
    },
    drawtloczenie:function(){
      const tloczenieObj = new window.Image();
      tloczenieObj.src = '13.png';
      tloczenieObj.onload = () => {
        this.tloczenieConf.image = tloczenieObj;
      }
    }
  }
})
