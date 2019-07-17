let skala = 0.20;

new Vue({
  el:'#app',
  data:{
    configKonva:{
      width:400,
      height:600
    },
    configCircle:{
      radius:30,
      fill:'red',
      x:50,
      y:50
    },
    okleinaConf2:{
      image:null,
      x:0,
      height:2056*skala,
      width:1025*skala
    },
    okleinaConf:{
      image:null,
      x:0,
      height:1186,
      width:600
    },
    tloczenieConf2:{
      image:null,
      x:(1025*skala)/2,
      y:271*skala,
      height:1465*skala,
      width:610*skala,
      offsetX:(610*skala)/2
    },
    tloczenieConf:{
      image:null,
      x:-20,
      y:0,
      height:1186, //1186
      width:600,
      offsetX:0
    },
    tlo:'01',
    gco:''

  },
  created:function(){
    this.drawokleina(),
    this.drawtloczenie()
  },
  methods:{
    drawokleina:function(){
      const okleinaObj = new window.Image();
      //http://konfigurator.kordi.com.pl/images/podglad/tla/${this.tlo}.png
      okleinaObj.src = `okleiny/${this.tlo}.jpg`;
      okleinaObj.onload = () => {
        this.okleinaConf.image = okleinaObj;
      };
    },
    drawtloczenie:function(){
      const tloczenieObj = new window.Image();
      tloczenieObj.src = 'tloczenia/test-8.png';
      tloczenieObj.onload = () => {
        this.tloczenieConf.image = tloczenieObj;
      }
    }
  }
})
