var myAry = ['a','b','c'] ;
myAry.forEach(function(index,value){
	console.log(index); // 0,1,2--索引
	console.log(value); //a,b,c -- 值
});


var myAry2 = ['aaa','bbb','ccc'] ;
for(var value of myAry2){
	console.log(value); // aaa,bbb,ccc
}

for(var chr of ""){
	console.log(chr);
}

var uniqueWords = new Set("hello"); 
console.log(uniqueWords) // Set {"h", "e", "l", "o"}
for(var value of uniqueWords){
	console.log(value); // h、e、l、o -- 注意去除了
}

var newMap = new Map();
newMap.set('name','zhangsan');
newMap.set('sex','man');
console.log(newMap); //Map {"name" => "zhangsan", "sex" => "man"}
for(var [key,value] of newMap){
	console.log('key=='+key); //key==name，key==sex
	console.log('value=='+value); //value==zhangsan，value==man
	console.log('the value of '+key+' is '+value);
}

/*ES6生成器*/
function* quips(name){
	yield "你好"+name+"!";
	yield "希望你能喜欢这篇接受ES6的译文";

	if(name.toLowerCase().startsWith('x')){
		yield "你的名字" + name +"首字母是x，这很酷！" ;	
	}

	yield "下次见"
}

var person = new quips("Xinxin") ;

person.next(); //输出 你好Xinxin -- Object {value: "你好Xinxin!", done: false}

person.next(); //输出 希望你能喜欢这篇接受ES6的译文 -- Object {value: "希望你能喜欢这篇接受ES6的译文", done: false}

person.next(); //输出 你的名字Xinxin首字母是x，这很酷！ -- Object {value: "你的名字Xinxin首字母是x，这很酷！", done: false}

person.next(); //输出 下次见 -- Object {value: "下次见", done: false}

person.next(); //调用最后一次 -- Object {value: undefined, done: true}


//引入RangIterator类进行后续处理
class RangIterator{
	constructor(start, stop){
		this.value = start ;
		this.stop = stop ;
	}

	[Symbol.iterator](){ return this ;}

	next(){
		var value = this.value ;
		if(value < this.stop){
			this.value ++ ;
			return {done:false, value:value} ;
		}else{
			return {done:true, value:undefined} ;
		}
	}
}
//返回一个新的迭代器，可以从start到stop计数。
function range(start, stop){
	return new RangIterator(start, stop);
}

for(var value of range(0,3)){
	console.log("Ding! at floor #" + value);
}

//生成器是迭代器
function* range(start, stop){
	for(var i=start; i<stop; i++){
		yield i;
	}
}

function go(){
	for(var value of range(0,3)){
		console.log("Ding! at floor #" + value);
	}
}
go();

//有一个函数，每次调用的时候返回一个数组 -- 传统方法
//拆分一维数组icons
//跟进长度rowLength--返回数组结果
function splitIntoRows(icons, rowLength){
	var rows = [] ;
	for(var i=0; i<icons.length; i += rowLength){
		rows.push(icons.slice(i, i+rowLength));
	}
	return rows;
}
var newIcons = [1,2,3,4,5,6,7,8,9] ;
splitIntoRows(newIcons,3); // 输出 [Array[3], Array[3], Array[3]] -- 1,2,3 -- 4,5,6 -- 7,8,9

//使用生成器实现
function* splitIntoRows(icons, rowLength){
	for(var i=0; i<icons.length; i+= rowLength){
		yield icons.slice(i, i+rowLength);
	}
}
var newIcons = [1,2,3,4,5,6,7,8,9] ;
var go = splitIntoRows(newIcons,3);
go.next() // 输出 Object {value: Array[3], done: false} -- 数组值为1,2,3
go.next() // 输出 Object {value: Array[3], done: false} -- 数组值为4,5,6
go.next() // 输出 Object {value: Array[3], done: false} -- 数组值为7,8,9
go.next() // 输出 Object {value: undefined, done: true} -- 遍历到最后

function* filter(test, iterable){
	for(var item of iterable){
		if(test(item)){
			yield item;
		}
	}
}
var test = function(item){
	return item % 2 ==  0; //过滤出2的整数倍
}
var iterable = [1,2,3,4,5,6] ;
var go = filter(test,iterable);
go.next(); // 输出Object {value: 2, done: false} -- 2
go.next(); // 输出Object {value: 4, done: false} -- 4
go.next(); // 输出Object {value: 6, done: false} -- 6
go.next(); // 输出 {value: undefined, done: true}-- 结束

//制造一些噪音的同步代码
function makeNoise(){
	shake();
	rattle();
	roll();
}

//制造一些噪音的异步代码。
//返回一个Promise对象
//当我们制造完噪音的时候会变成resolved
function makeNoise_async(){
	return Q.async(function* (){
		yield shake_async();
		yield rattle_async();
		yield roll_async();
	});
}


//模板字符串
context.fillText(`Ceci nest pas une chaine.`,x, y);

function testTpl(name, length){
	console.log(`模板字符串的名字是${name},长度是${length}`);
}
testTpl('testName', 5); //拷贝到控制台输出 -- 模板字符串的名字是testName,长度是5
function authorize(user, action){
	if(!user.hasPrivivege(action)){
		throw new Error(
			`用户{$user.name}未被授权执行${action}操作。`;
		);
	}
}

function SaferHTML(templateData){
	var s = templateData[0];
	for(var i=0; i<arguments.length; i++){
		console.log(i+'=='+arguments[i]);
		var arg = String(arguments[i]);
		s += arg.replace(/&/g,"&")
				.replace(/</g,"<")
				.replace(/>/g,">");
		//不转义模板中的特殊字符。
		s += templateData[i]
	}
	return s ;
}
var name = "zhangsan";
var message = SaferHTML `<p>${name},向你示好。</p>`;
console.log(message);

//xss
console.log('黑客Steve<script>alert("xss");</script>');


//不定参数和默认参数
function containsAll(haystack){
	for(var i=0; i<arguments.length; i++){ //需要从1开始迭代，而不是从0开始，因为arguments[0]相当于haystack,如果我们想要在haystack前后添加另一个参数，我们一定要记得更新循环体。
		var needle = arguments[i];
		if(haystack.indexOf(needle) === -1){
			return false ;
		}
	}
	return true ;
}

containsAll("banana","b","nan"); //true
containsAll("banana","c","nan"); //false -- 检测needle为banana时，indexof不为-1，检测到第二个参数c时发现haystack.indexOf('c') === -1 返回false。结果输出false

//ES66不定参数特性实现containsAllES
function containsAllES(haystack,...needles){ // ...needles前的省略号表明它是一个不定参数，所有传递尽量的其他参数都被放到一个数组中，复制给变量needles
	for(var needle of needles){
		console.log("needle==="+needle);
		console.log("needles[]==="+needles);
		if(haystack.indexOf(needle) === -1){
			return false ;
		}
	}
	return true ;
}
containsAllES("banana","b","nan") //true
containsAllES("banana","b","nan") //false

//默认参数
function animalSentence(animals2="tigers", animals3="bears"){
	return `Lions and ${animals2} and ${animals3} ! oh my god!`
}
animalSentence(); //output Lions and tigers and bears ! oh my god!
animalSentence('cat'); //output Lions and cat and bears ! oh my god!
animalSentence('','dog'); //output Lions and  and bears ! oh my god!
animalSentence('cat','dog'); //output Lions and cat and dog ! oh my god!
animalSentence(undefined,'dog');//output Lions and tigers and bears ! oh my god!

//解构附值
//数组--普通附值
var someArray = [1,2,3,4,5,6,7,8,9];
var first = someArray[0];
var second = someArray[1];
var third = someArray[2];
console.log('first:'+first+'; second:'+second+'; third:'+third); //output first:1; second:2; third:3
//数组--数组解构附值
var someArray = ['a','b','c','d','e','f','g'];
var [first, second, third] = someArray ;
console.log('first:'+first+'; second:'+second+'; third:'+third); //output first:a; second:b; third:c

//可以对任意深度的嵌套数组进行解构。
var [foo, [[bar, [baz]]]] = [1, [[2, [3]]]];
console.log('foo:'+foo+'; bar:'+bar+'; baz:'+baz); //output foo:1; bar:2; baz:3 --注意中括号的嵌套匹配

//可以在对应位留空来跳过被解构数组中的某些元素
var someArray = ['a','b','c','d','e','f','g'];
var [first, second, third,,,sixth] = someArray ;
console.log('first:'+first+'; second:'+second+'; third:'+third+'; sixth:'+sixth); //output first:a; second:b; third:c; sixth:f

//可以通过不定参数模式捕获数组中的所有尾随元素
var [head, ...tail] = [1,2,3,4] ;
console.log(tail); //output 2,3,4

//当访问空数组或越界访问数组时，对其解构与对其索引的行为一致，最终得到的结果都是:undefined
console.log([][0]); // output undefined
var [missing] = [] ; console.log(missing); // output undefined

//数组解构附值的模式适用于任意迭代器
function* fibs(){
	var a = 0 ;
	var b = 1 ;
	while(true){
		yield a ; //output a的值0,1,1,2,3,5;b的值1,1,2,3,5,8
		[a,b] = [b, a+b];
	}
}
var [first, second, third, fourth, fifth, sixth] = fibs();
console.log(sixth); // output 5


//对象的解构
var robotA = {name : "Bender"} ;
var robotB = {name : "Flexo"} ;
var {name : nameA} = robotA ;
var {name : nameB} = robotB ;
console.log(nameA); //output Bender ;
console.log(nameB); //output Flexo ;


var robotA = {name : "Bender"} ;
var robotB = {name : "Flexo"} ;
var [{name : nameA},{name : nameB} ] = [robotA,robotB] ;
console.log(nameA); //output Bender ;
console.log(nameB); //output Flexo ;

//当属性名与变量名一致时，可以通过一种使用的句法简写
var {foo, bar} = {foo:"lorem", bar:"ipsum"}
console.log("foo:"+foo+"; bar:"+bar); //output foo:lorem; bar:ipsum 

//与数组解构一样，你可以随意嵌套并进一步组合对象解构。
var complicatedobj = {
	arrayProp:[
		"Zapp",
		{second:"Brannigan"}
	]
};
var {arrayProp: [first, {second}]} = complicatedobj;
console.log(first); //output Zapp ;
console.log(second); //output Brannigan

//当解构一个未定义的属性时，得到的值为undefined
var {missing} = {} ; console.log(missing); //output undefined


//默认值
var [missing = true] = [] ; console.log(missing); // output true

var {x = 3} = {} ; console.log(x); // output 3
var {x = 3} = {x:6} ; console.log(x); // output 6

var {message : msg = "hello"} = {} ; console.log(msg); //output hello
var {message : msg = "hello"} = {message : msg = "world"} ; console.log(msg); //output world

//与ES6迭代器协同使用
var map = new Map();
map.set("name", "zhangsan");
map.set("age", 28);
for(var [key, value] of map){
	console.log(key + " is " + value); //output name is zhangsan -- age is 28
}

//多重返回值
function returnMultipleValues(){
	return [1, 2] ;
}
var [foo, bar] = returnMultipleValues();
console.log('foo:' + foo + '; bar:' + bar); //output foo:1; bar:2

function returnMultipleValues(){
	return {
		foo : 1,
		bar : 2
	}
}
var {foo, bar} = returnMultipleValues();
console.log('foo:' + foo + '; bar:' + bar); //output foo:1; bar:2


//箭头函数 Arrow Functions
//ES5
var joinName = function(name,age){
	console.log("name is " + name + ", age is " + age); // output name is zhangsan, age is 28
}
var test = function(name){
	return joinName(name, 28)
}
test("zhangsan");

//ES6
var joinName = ((name, age) => console.log("name is " + name + ", age is " + age)) ; //output name is zhangsan, age is 28
//joinName('hello', 'world') ;
var test = (name => joinName(name,28));

test('zhangsan');

var test = (a => console.log('test a is ' + a ))
test('person')

//Symbols
//借助于密码学，生成一个唯一的属性名称
var isMoving = SecureRandom.generateName();
if(element[isMoving]){ //通过object[name]语法允许使用几乎任何字符串作为属性名称。
	//TODO
}
element[isMoving] = true ;


//symbol解决重名问题。
var mySymbol = Symbol(); //调用Symbol创建一个新的Symbol的对象，它的值与其他人和镇皆相等。

var isMoving = Symbol(isMoving);
console.log(isMoving);

if(window[isMoving]){ //第二次执行进入这里 output has isMoving
	console.log("has isMoving");
}
window[isMoving] = true ;


let fruits = [
	{id: 100, name: '草莓'},
	{id: 101, name: '苹果'},
	{id: 102, name: '李子'}
];

for(let fruit of fruits){
	let message = `ID:${fruit.id} Name:${fruit.name}` ; 
	console.log(message); //output ID:100 Name:草莓 -- ID:101 Name:苹果 -- ID:102 Name:李子
}

console.log(`List total:${fruits.length}`); // output List total:3


//Set
var person = new Set("zhangsan");
console.log(person); //output Set {"z", "h", "a", "n", "g", "s"}
console.log(person.size) ; //output 6 -- 因为a和n是重复的所以不计数
person.add('a'); //zhangsan中有a。所以不能重复添加
console.log(person); //output Set {"z", "h", "a", "n", "g", "s"}
console.log(person.size); //output 6 -- 因为a和n是重复的所以不计数
person.add('w'); //zhangsan中没有w。所以添加
console.log(person); //output Set {"z", "h", "a", "n", "g", "s", "w"}
console.log(person.size); //output 7 -- 因为a和n是重复的所以不计数

var arrayOfWords = ['zhangsan','wangwu','lisi'];
var time1 = new Date().getTime() ;
console.log(arrayOfWords.indexOf('wangwu') !== -1); //output true
console.log(new Date().getTime() - time1); //output 2s


var arrayOfWords = new Set('zhangsan','wangwu','lisi');
var time1 = new Date().getTime() ;
console.log(arrayOfWords.has('wangwu')); //output true
console.log(new Date().getTime() - time1); //output 1s

var ary = ['a', 'b', 'c'] ;
console.log(ary[0]); //output a
var arySet = new Set('a', 'b', 'c');
console.log(arySet[0]); //output undefined

var urls = new Set ;
urls.add(new URL(location.href)) ;
console.log(urls); // 具体见截图
console.log(urls.size); //output 1
urls.add(new URL(location.href));
console.log(urls); //具体见截图
console.log(urls.size); //output 2


//生成器
function* somewords(){
	yield 'hello' ;
	yield 'world' ;
}
for(var word of somewords()){
	console.log(word); //output hello 、world
}


//简单的生成器函数联结两个可迭代对象
function* concat(iter1, iter2){
	for(var value of iter1){
		yield value ;
	}

	for(var value of iter2){
		yield value ;
	}
}
//调用
var gener = concat('a', 'b');
gener.next(); // output Object {value: "a", done: false}
gener.next(); // output Object {value: "b", done: false}
gener.next(); // output Object {value: undefined, done: true}


//ES6
function* concat(iter1, iter2){
	yield* iter1 ;
	yield* iter2 ;
}
//调用
var gener = concat('a', 'b');
gener.next(); // output Object {value: "a", done: false}
gener.next(); // output Object {value: "b", done: false}
gener.next(); // output Object {value: undefined, done: true}


//代理Proxy
var obj = new Object();
obj.count = 1 ;
++obj.count ;
console.log(obj.count); //output 2
console.log(obj['count']); // output 2

var target = {}, handler = {} ;
var proxy = new Proxy(target, handler);
proxy.color = "pink" ; //proxy.[[Set]]()应该调用target.[[Set]]()方法，然后在目标上创建一个新的属性。
console.log(target.color); //output pink

//代理句柄
var target = {} ;
var handler = {
	set : function(target, key, value, receiver){
		throw new Error("请不要为这个对象设置属性。");
	}
};
var proxy = new Proxy(target, handler) ;
proxy.name = "Lily" ; // output VM2544:5 Uncaught Error: 请不要为这个对象设置属性。

//代理运用 -- 自动填充对象
function Tree(){
	return new Proxy({}, handler) ;
}
var handler = {
	get : function(target, key, receiver){
		if(!(key in target)){
			target[key] = Tree() ; //自动创建一个子树
		}
		return Reflect.get(target, key, receiver) ;
	}
}
var tree = Tree();
tree.branch1.branch2.twig = "green" ;
console.log(tree) ; //output {branch1:{branch2:{twig:green}}}
tree.branch1.branch3.twig = "yellow" ;
console.log(tree) ; //output {branch1:{branch2:{twig:green},branch3:{twig:yellow}}}

//代理运用 -- 只读视图
function NOPE(){ //第一步拦截可能修改目标对象的五种内部方法
	throw new Error("can't modify read-only view") ;
}
var handler = {
	//覆写所有五种可变方法
	set:NOPE,
	defineProperty:NOPE,
	deleteProperty:NOPE,
	preventExtensions:NOPE,
	setPrototypeOf:NOPE,
	//在只读视图中包裹其他结果
	get:function(target, key, receiver){
		//执行默认行为开始
		var result = Reflect.get(target, key, receiver) ;
		//确保返回一个不可变对象！
		if(Object(result) === result){
			// result 是一个对象。
			return readOnlyView(result)
		}
		//result 是一个原始类型，所以已经具备不可变的性质。
		return result;
	}
};
function readOnlyView(target){
	return new Proxy(target, handler);
}

var newMath = readOnlyView(Math);
newMath.min(54, 40); // output 40
newMath.max = newMath.min ; // output VM2798:3 Uncaught Error: can't modify read-only view(…)
newMath.max = 80 ; // output VM2798:3 Uncaught Error: can't modify read-only view(…)
delete newMath.sin ; // output VM2798:3 Uncaught Error: can't modify read-only view(…)

//类Class -- 普通方法
function Circle(radius){
	this.radius = radius ;
	Circle.circlesMade ++ ;
}
Circle.draw = function draw(Circle, canvas){

}
Object.defineProperty(Circle, "circlesMade",{
	get : function(){
		return !this._count ? 0 : this._count ;
	},
	set : function(val){
		this._count = val ;
	}
});
Circle.prototype = {
	area : function(){
		return Math.pow(this.radius, 2) * Math.PI ;
	}
};
Object.defineProperty(Circle.prototype, "radius", {
	get : function(){
		return this._radius ;
	},
	set : function(radius){
		if(!Number.isInteger(radius)){
			throw new Error("圆的半径必须是整数。");
		}
		this._radius = radius ;
	}
})
var _circle = new Circle(2) ;
_circle.area() ; //output 12.566370614359172
var _circle2 = new Circle(1.3) // output VM3463:28 Uncaught Error: 圆的半径必须是整数。(…)

//类Class -- ES6
function Circle(radius){
	this.radius = radius ;
	Circle.circlesMade ++ ;
}
Circle.draw = function draw(Circle, canvas){

}
Object.defineProperty(Circle, "circlesMade",{
	get : function(){
		return !this._count ? 0 : this._count ;
	},
	set : function(val){
		this._count = val ;
	}
});
Circle.prototype = {
	area() {
		return Math.pow(this.radius, 2) * Math.PI ;
	},
	get radius(){
		return this._radius ;
	},
	set radius(radius){
		if(!Number.isInteger(radius)){
			throw new Error("圆的半径必须是整数。");
		}
		this._radius = radius ;
	}
};
var _circle = new Circle(2) ;
_circle.area() ; //output 12.566370614359172
var _circle2 = new Circle(1.3) // output VM3463:28 Uncaught Error: 圆的半径必须是整数。(…)


//ES6 -- 类改进
class Circle{
	constructor(radius){
		this.radius = radius ;
		Circle.circlesMade ++ ;
	};
	static draw(circle, canvas){
		//TODO Canvas绘制代码
	};
	static get circlesMade(){
		return !this._count ? 0 : this._count ;
	};
	static set circlesMade(val){
		this._count = val ;
	};
	area(){
		return Math.pow(this.radius, 2) * Math.PI ;
	};
	get radius(){
		return this._radius ;
	};
	set radius(radius){
		if(!Number.isInteger(radius)){
			throw new Error("圆的半径必须是整数。");
		}
		this._radius = radius ;
	}
}
var _circle = new Circle(2) ;
_circle.area() ; //output 12.566370614359172
var _circle2 = new Circle(1.1) ; //VM3837:2 Uncaught ReferenceError: Circle is not defined(…) -- 可调用方法.area()使用

//let和const
var a = 3 ;
function test(){
	console.log(a); //output undefined
	var a = 5 ;
}
test();

var msg = ['aa', 'bbb', 'ccccc'] ;
for(var i=0; i<msg.length; i++){
	setTimeout(function(){
		console.log(msg[i]);  //output 3次 undefined 而不是aa/bbb/ccccc -- 原因是循环本身及三次timeout均共享了唯一的变量i。当循环结束执行时。i的值为3（msg.length为3）所以msg[3] 是undefined
	},200);
}

//let
var a = 3 ;
function test(){
	console.log(a); //output VM874:4 Uncaught ReferenceError: a is not defined(…)
	let a = 5 ;
}
test();

var msg = ['aa', 'bbb', 'ccccc'] ;
for(let i=0; i<msg.length; i++){
	setTimeout(function(){
		console.log(msg[i]);  //output 3次 aa/bbb/ccccc 
	},200);
}

//const
const MAX_NUM = 30 ;
console.log(MAX_NUM) ; //output 30
MAX_NUM = 50 ; // output 语法错误

const HELLO; // output 语法错误

