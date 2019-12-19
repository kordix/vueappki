const app = new Vue({
    el:'#app',
    data:{
        words:[
            {question:'stół', rodzajnik:'la', answer:'mesa',id:1,counter:0},
            {question:'krzesło', rodzajnik:'la', answer:'mesa',id:2,counter:0},
            {question:'pipa', rodzajnik:'la', answer:'mesa',id:3,counter:0},

        ],
        answer:'',
        errors:[],
        currentQuestion:{},
        disabledInput:false
    },
    computed:{
     // currentQuestion(){return this.words.find((el)=>el.counter <= 1)}
    },
    methods:{
        answerm(){
            if(this.answer == this.currentQuestion.answer){
                this.currentQuestion.counter++;
                this.disabledInput=true;
                this.errors.push('Udało się. Można przejść do następnego pytania');
                setTimeout(function(){
                    document.getElementById('nextbutton').focus();


                },0);

            }else{
                this.disabledInput=true;
                this.errors.push('Nie udało się. Prawidłowa odpowiedź: '+this.currentQuestion.answer);
                // this.currentQuestion.counter++
            }
        },
        test(e){
            e.preventDefault();
        },
        start(){
            let self = this;
            console.log('start');
            this.currentQuestion = this.words.find((el)=>el.counter <= 5);
            setTimeout(function(){
                self.focusanswer();
            },200)
        },
        previous(){
            let currentindex = this.currentQuestion.id;

        },
        blockInput(){
            document.getElementById('answerinput').disabled = true;
        },
        next(){
            this.errors =[];
            let self = this;
            this.disabledInput=false;
            this.answer='';

            let elem = this.words.find((el)=>el.id > this.currentQuestion.id);

            if(typeof(elem)=='undefined'){
                this.start();
                return
            }


            this.currentQuestion = elem;
            setTimeout(function(){
                self.focusanswer();
            },200)
            // document.getElementById('answerinput').focus();

            // this.getCurrent();
        },
        focusanswer(){
            document.getElementById('answerinput').focus()
        }
    },
    mounted(){
        this.start();
        document.getElementById('answerinput').focus();
    }


})
