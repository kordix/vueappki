Vue.component('field',{
    template:`<div style="position:relative">{{$parent.fields[fieldnumber].name }}
    <div  v-for="player in  $parent.players" v-if="player.field==fieldnumber" class="player" :style="{color:player.color}">{{player.color}}</div>
    <span style="font-size:0.4em;position:absolute;bottom:0px;left:0px;">Owner: <span :style="{color:$parent.fields[fieldnumber].owner}">{{$parent.fields[fieldnumber].owner}}</span></span>
    </div>`,
    props:['fieldnumber'],
    mounted(){
        // console.log($parent.fields[this.fieldNumber])
    },
    data(){
        return {

        }
    },

})

const app = new Vue({
    el:'#app',
    data:{
        fields:[
            {name:'start',price:0,owner:''},
            {name:'gdansk',price:'100',owner:''},
            {name:'gdynia',price:'100',owner:''},
            {name:'stogi',price:'100',owner:''},
            {name:'pipa',price:'100',owner:''},
            {name:'test',price:'100',owner:''},
            {name:'test2',price:'100',owner:''},
            {name:'siedlce',price:'100',owner:''},
            {name:'morena',price:'100',owner:''},
            {name:'gocław',price:'100',owner:''},
            {name:'praga',price:'100',owner:''},
            {name:'test',price:'100',owner:''},
            {name:'test',price:'100',owner:''},
            {name:'test',price:'100',owner:''},
            {name:'test',price:'100',owner:''},
            {name:'test',price:'100',owner:''},
            {name:'test',price:'100',owner:''},
            {name:'test',price:'100',owner:''},
            {name:'test',price:'100',owner:''},
            {name:'test',price:'100',owner:''},
            {name:'test',price:'100',owner:''},
            {name:'test',price:'100',owner:''},
            {name:'test',price:'100',owner:''},
            {name:'test',price:'100',owner:''},
            {name:'test',price:'100',owner:''},
            {name:'test',price:'100',owner:''}
        ],
        dice:0,
        players:[
            {color:'red', field:0, money:1000},
            {color:'blue', field:0,money:1000}
        ],
        currentplayer:'red',
        dicethrown:false,
        showfielddialogue:false


    },
    computed:{
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
        }

    },
    methods:{
        rollDice:function(){
            if(this.dicethrown==true){
                return
            }
            this.dice = Math.floor(Math.random()*6+1);
            this.move(this.currentplayer, this.dice);
            this.dicethrown = true;
            // this.switchPlayer();
        },
        buy:function(){
            if(this.currentplayer == this.currentfieldc2.owner || this.currentfieldc2.owner != '' || this.currentfieldc2.price == 0){
                return
            }
            this.players.find((el)=>el.color==this.currentplayer).money -= this.currentfieldc2.price;
            this.currentfieldc2.owner = this.currentplayer;
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
                    self.buy();
                    self.switchPlayer();

                }
            },200)
        },
        handleField(){
            if(this.currentfieldc2.owner == '' || this.currentfieldc2.price == 0){
                return
            }

            if(this.currentfieldc2.owner == this.currentplayer){
                return
            }

            this.currentplayerc.money -= this.currentfieldc2.price;
            console.log(`gracz ${this.currentplayer} zapłacił ${this.currentfieldc2.price}`);
        },
        getMod(){
            this.players.find((el)=>el.color==this.currentplayer).field = this.players.find((el)=>el.color==this.currentplayer).field % 26;
            console.log('powinno działać modulo')
        },

        switchPlayer(){
            this.dicethrown=false;
            if(this.currentplayer=='red'){
                this.currentplayer='blue'
            }else{
                this.currentplayer='red'
            }
        }
    }


})
