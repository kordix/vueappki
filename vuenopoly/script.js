Vue.component('field',{
    template:'#field-template',
    // template:`<div style="position:relative"><div style="position:absolute;width:100%;height:20px;background:#999;z-index:-1000"></div> <span style="font-size:9px"> {{$parent.fields[fieldnumber].name  }} </span>
    // <div  v-for="player in  $parent.players" v-if="player.field==fieldnumber" class="player" :style="{color:player.color}">{{player.color}}</div>
    // <span style="font-size:0.4em;position:absolute;bottom:0px;left:0px;">Owner: <span :style="{color:$parent.fields[fieldnumber].owner}">{{$parent.fields[fieldnumber].owner}}</span></span>
    // </div>`,
    props:['fieldnumber','fieldobject'],
    mounted(){
        // console.log($parent.fields[this.fieldNumber])
    },
    data(){
        return {

        }
    },
    computed:{
        fieldObjectColor(){
            if (typeof(this.fieldobject.color) == 'undefined'){
                return '#999'
            }else {
                return this.fieldobject.color
            }
        }
    }

})

const app = new Vue({
    el:'#app',
    data:{
        fields:[
            {name:'start',price:0,owner:''},
            {name:'kam. potok',price:'100',owner:'',group:'sopot',color:'#AA5577',fontcolor:'white'},
            {name:'wyścigi',price:'100',owner:'',group:'sopot',color:'#AA5577',fontcolor:'white'},
            {name:'rębiechowo',price:'100',owner:'',group:'lotniska',color:'#AACCEE',fontcolor:'black'},
            {name:'witomino',price:'100',owner:'',group:'gdynia',color:'blue',fontcolor:'white' },
            {name:'karwiny',price:'100',owner:'',group:'gdynia',color:'blue',fontcolor:'white'},
            {name:'mały kack',price:'100',owner:'',group:'gdynia',color:'blue',fontcolor:'white'},
            {name:'parking1',price:'100',owner:'',group:'inne',fontcolor:'black'},
            {name:'gdańsk',price:'100',owner:'',group:'gdańsk',color:'green',fontcolor:'white'},
            {name:'siedlce',price:'100',owner:'',group:'gdańsk',color:'green',fontcolor:'white'},
            {name:'stogi',price:'100',owner:'',group:'gdańsk',color:'green',fontcolor:'white'},
            {name:'chopina',price:'100',owner:'',group:'lotniska',color:'#AACCEE',fontcolor:'black'},
            {name:'PEWIK',price:'100',owner:'',group:'instalacje',color:'#A9DFBF',fontcolor:'black'},
            {name:'parking2',price:'100',owner:'',fontcolor:'black'},
            {name:'grochów',price:'100',owner:'',group:'warszawa',color:'#27AE60 ',fontcolor:'black'},
            {name:'praga',price:'100',owner:'',group:'warszawa',color:'#27AE60 ',fontcolor:'black'},
            {name:'włochy',price:'100',owner:'',group:'warszawa',color:'#27AE60 ',fontcolor:'black'},
            {name:'okęcie',price:'100',owner:'',group:'lotniska',color:'#AACCEE',fontcolor:'black'},
            {name:'sczecin',price:'100',owner:'',group:'szczecin',color:'#FFD300',fontcolor:'black'},
            {name:'gocław',price:'100',owner:'',group:'szczecin',color:'#FFD300',fontcolor:'black'},
            {name:'parking',price:'100',owner:'',fontcolor:'black'},
            {name:'wejherowo',price:'100',owner:'',group:'3miasto kaszubskie',color:'#F50003',fontcolor:'black'},
            {name:'rumia',price:'100',owner:'',group:'3miasto kaszubskie',color:'#F50003',fontcolor:'black'},
            {name:'reda',price:'100',owner:'',group:'3miasto kaszubskie',color:'#F50003',fontcolor:'black'},
            {name:'OPEC',price:'100',owner:'',group:'instalacje',color:'#A9DFBF',fontcolor:'black'},
            {name:'radom ',price:'100',owner:'',group:'lotnika',color:'#AACCEE',fontcolor:'black'}
        ],
        dice:0,
        betprice:0,
        players:[
            {color:'red', field:0, name:'red', money:1000,current:false },
            {color:'blue', field:0,name:'blue', money:1000,current:false},
            {color:'gray',field:0,name:'agent', money:0,current:true}
        ],
        betPlayers:[
        {color:'red',active:true,name:'red', current:true},
        {color:'blue',active:true,name:'blue',current:false}
        ],
        currentplayer:'red',
        dicethrown:false,
        showfielddialogue:false,
        showBetDialogue:false,
        buybool:true,
        showMainDialogue:true,
        infos:[]


    },
    computed:{
        buyboolc(){
            if(this.currentplayerc.name == this.currentfieldc2.owner ){
                return false
            }
            else if (this.currentplayerc.name=='agent'){
                return false
            }
            else if (this.currentfieldc2.owner != ""){
                return false
            }
            else {
                return this.buybool;
            }
        },
        currentfieldc(){
            if(typeof(this.players.find((el)=>el.color==this.currentplayer).field)=='undefined' ){
                return 1
            }else {
            return (this.players.find((el)=>el.color==this.currentplayer).field) % 26 ;
            }
        },
        currentfieldc2(){
            return this.fields[this.currentfieldc];
        },
        currentplayerc(){
            return this.players.find((el)=>el.color==this.currentplayer)
        },
        betPlayerC(){
            return this.betPlayers.find((el)=>el.current==true);
        }
    },
    methods:{
            // if(this.betPlayerC.color == 'red'){
            //     this.betPlayerC.color = 'blue'
            // }

        rollDice:function(){
            if(this.dicethrown==true){
                return
            }
            // this.dice = Math.floor(Math.random()*6+1);
            this.currentplayerc.name=='agent' ? this.dice=2 : this.dice=1;
            // this.dice=1;
            this.move(this.currentplayer, this.dice);
            this.dicethrown = true;
            // this.switchPlayer();
        },
            buy:function(playername){
            if(this.currentplayer == this.currentfieldc2.owner || this.currentfieldc2.owner != '' || this.currentfieldc2.price == 0){
                return
            }
            this.players.find((el)=>el.name==playername).money -= this.currentfieldc2.price;
            this.currentfieldc2.owner = playername;
        },
        startbet:function(){
            if(this.currentfieldc2.owner !==''){
                return
            }
            this.buybool=false;
            this.currentfieldc2.price = 0;
            this.showBetDialogue=true;
            this.showMainDialogue=false;
        },
        setBet:function(val){
            this.currentfieldc2.price = val;
        },
        switchplayerbet:function(arg){
            if(this.betPlayers.find((el)=>el.current==true)){
                this.betPlayers.find((el)=>el.current==true).current = false;
            }

            this.betPlayers.find((el)=>el.name==arg).current = true;

        },
        nextPlayerBet(){
            this.fields[this.currentfieldc].price = this.betprice;
            switch(this.betPlayerC.color){
                case 'red' : this.switchplayerbet('blue');break;
                case 'blue' : this.switchplayerbet('red');break;
                case 'gray' :  this.switchplayerbet('blue');break;
            }
        },
        betPass(){
            this.nextPlayerBet();
            this.buy(this.betPlayerC.name);
            this.showBetDialogue=false;
            this.showMainDialogue=true;

        },

        move:function(player,count){
            this.showfielddialogue = false;
            let self = this;
            let selfcount = 0;
            console.log(this.showfielddialogue);
           let timerId = setInterval(function(){
                self.players.find((el)=>el.color==player).field += 1;
                selfcount++;
                self.getMod();

                if (selfcount >=count){
                    clearInterval(timerId);


                    self.showfielddialogue = true;
                    self.handleField();
                    self.getMod();

                    if(self.currentfieldc2.owner.length > 2){
                        console.log('buy bool false');
                        self.buybool=false;
                    }else{
                        console.log('buybool true');
                        self.buybool=true;
                    }
                    // self.buy();
                    // self.switchPlayer();

                }
            },200)
        },
        handleField(){
            if(this.currentfieldc2.owner == '' || this.currentfieldc2.price == 0){
                return
            }

            if(this.currentfieldc2.owner == this.currentplayer && this.currentplayerc.name=='agent' ){
                return
            }

            this.currentplayerc.money -= this.currentfieldc2.price;
            this.infos.push(`gracz ${this.currentplayer} zapłacił ${this.currentfieldc2.price}`);
        },
        getMod(){
            this.players.find((el)=>el.color==this.currentplayer).field = this.players.find((el)=>el.color==this.currentplayer).field % 26;
        },
        agentAuto(){
            let self = this;
            if(this.currentplayer !='gray'){
                return
            }
            setTimeout(function(){
                if(self.currentplayer == 'gray'){
                    self.rollDice();
                    if(self.currentfieldc2.owner.length != 0){
                        console.log('nie betuj bo działka ma właściciela');
                        return
                    }

                    if(self.currentfieldc2.price ==="0"){
                        console.log("nie betuj bo działka nie ma ceny");
                        return
                    }

                    // if(this.buyboolc == false){
                    //     console.log('nie betuj');
                    //     return
                    // }
                        self .startbet();

                }


            },2000)


        },

        switchPlayer(){
            this.dicethrown=false;
            if(this.currentplayer=='red'){
                this.currentplayer='blue'
            }else if(this.currentplayer=='blue'){
                this.currentplayer='gray'
            }else if(this.currentplayer=='gray'){
                this.currentplayer='red';
            }

            this.agentAuto();
        }
    }


})
