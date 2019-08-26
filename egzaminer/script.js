const app = new Vue({
    el:'#app',
    data:{
        words:[
            {question:'stół', rodzajnik:'la', answer:'mesa',counter:0},
            {question:'krzesło', rodzajnik:'la', answer:'mesa',counter:0},
            {question:'pipa', rodzajnik:'la', answer:'mesa',counter:0},

        ],
        answer:''
    },
    computed:{
     currentQuestion(){return this.words.find((el)=>el.counter <= 1)}
    },
    methods:{
        answerm(){
            if(this.answer == this.currentQuestion.answer){
                this.currentQuestion.counter++
            }else{
                this.currentQuestion.counter++
            }
        }
    }


})
