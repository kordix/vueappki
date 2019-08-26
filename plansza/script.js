Vue.component('boarditem',{
    template:
    `<div style="border:1px black solid;padding:30px" class="myhover" :class="{active:isActive}" @click="test"></div>`,
    data(){
        return {
            isActive:false
        }
    },
    methods:{
        test(){
            this.isActive = !this.isActive
        }
    }


})



const app = new Vue({
    el:'#app',
    data:{

    },
    methods:{
        test(arg){
            console.log('siemano');
            console.log(arg);
        }
    }


})
