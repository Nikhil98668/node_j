//console.log("Hello World")

/*let obj={
    name:'nikhil',
    age:25
}

ls=localStorage.setItem('obj',obj)
console.log(ls)*/
/*printName("YAVTECH");

console.log(a);


var a = 3;


function printName(name){

console.log(name)

}*/
/*console.log(printName);

console.log(a);


var a = 3;


var printName = (name) => {

console.log(name)

}*/
/*console.log(printName);

console.log(a);


var a = 3;


var printName = function (name) {

console.log(name)

}*/
/*var a = 2;

var c = 2;


function b(){

var x = 2;

var c = 4

console.log(c)

}


console.log(a);

console.log(this.a);

console.log(this.c)

console.log(this.x)

console.log(window.a)

console.log(window.x)

console.log(b());*/

/*var a = 50;


function fun(){

var a =30;

let b = 20;

let c = 30;

}

fun();

console.log(a)*/
/*let a = 50;


function fun(){

var a =30;

let b = 20;

let c = 30;

}

fun();

console.log(a)*/
/*const a = 10;

{

var a = 100;

}

console.log(a)*/

/*const a = 10;

{

const a = 20;

{

console.log(a);

}

console.log(a)

}

console.log(a)*/
/*let a = 50;


{

var a =30;

let b = 20;

let c = 30;

}


console.log(a)*/

/*const a = 50;


{

var a =30;

let b = 20;

let c = 30;

}


console.log(a)*/
/*function x(){

    let a = 10;
    
    function y(){
    
    console.log(a);
    
    }
    
    return y;
    
    }
    console.log( x());*/

   /* function x(){

        let a = 10;
        
        function y(){
        
        console.log(a);
        
        }
        
        return y;
        
        }
        
        
        const z = x()
        
        console.log(z());*/
        /*var obj = {

            val: 100
            
            }
            
            function fun(){
            
            console.log(this.val)
            
            }
            
            //obj.fun()
            fun.call(obj)*/
           /* var obj = {

                val: 100
                
                }
                
                function fun(a){
                
                console.log(this.val + a)
                
                }
                
                fun.call(obj)*/
                /*var obj = {

                    val: 100
                    
                    }
                    
                    function fun(a, b , c){
                    
                    console.log(a)
                    
                    console.log(b)
                    
                    console.log(c)
                    
                    }
                    
                    fun.call(obj, [3, 4, 5])*/
                    /*a()

b()


function a(){

console.log('inside a');

}


var b = function (){

console.log('inside b');

}*/
/*function fun1(){

    console.log('a')
    
    return () => {
    
    console.log('b')
    
    }}
    
    
    fun1()*/
    /*function fun1(a){

        return () => {
        
        a = a + 20;
        
        console.log(a)
        
        }}
        
        
        fun1(10)(20)*/
       /* function fun1(a){

            const fun2 = (b) => {
            
            a = a + b;
            
            console.log(a)
            
            }}
            
            
            fun1(10)(30)*/
            setTimeout(() => console.log('timer expired'), 1000)


/*function x(y) {

console.log('inside x');

y();

}


x(function y(){

console.log('inside y')

})*/
/*setTimeout(() => console.log('timer1 expired'), 1000)


setTimeout(() => console.log('timer2 expired'), 0)


function x(y) {

console.log('inside x');

y();

}


x(function y(){

console.log('inside y')

})*/
/*setTimeout(() => console.log('timer1 expired'), 1000)


setTimeout(() => console.log('timer2 expired'), 0)


function x(y) {

console.log('inside x');

y();

}


x(function y(){

setTimeout(() => console.log('inside y'), 0)

})*/
/*var student = function(name){

    this.name = name;
  
    function printName() {
  
      console.log(this.name)
  
    }
  
     printName()
  
  }
  
  var yash = new student("yash")*/
  var student = function(name){

    this.name = name;
  
    var printName = () => {
  
      console.log(this.name)
  
    }
  
     printName()
  
  }
  
  var yash = new student("yash")



                    
                    
                    








