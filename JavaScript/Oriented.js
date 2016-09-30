// js 本身并没有类的概念，但是我们可以用 function 去实现类的思想
// 通常类的表现就是 function People(){}  构造器的首字母大写。


// 为了避免我们的私有方法被其他的方法调用，所以用闭包的方式将其 包裹 起来。

(function() {
	function People(name) {
		this._name = name;
	}

	People.prototype.say = function() {
		alert("我是父类的 say 方法" + "," + this._name);
	}

	window.People = People;

}());

(function() {
	function Student() {

	}

	// 继承
	// 直接赋值给 prototype ，就代表了继承
	Student.prototype = new People("李");

	// 调用父类的方法
	var superSay = Student.prototype.say;

	// 重写
	Student.prototype.say = function() {
		superSay.call(this);
		alert("我是子类的 say 方法");
	}

	window.Student = Student;

}());

var stu = new Student();
stu.say();