---
layout: layouts/article
title: Весь JavaScript на одной странице (Статья дополняеться)
description: Весь JavaScript на одной странице
date: 2020-05-31
tags: notes
---

Попытался сделать небольшую шпаргалку по всему JavaScript.\
Содержание:

* [Введение](#1)
* [Переменые, типы данных, примитивные типы](#2)
  * [Oператоры](#2.1)
  * [Числа](#2.2)
  * [BigInt](#2.3)
  * [Строки](#2.4)
  * [Логический тип](#2.5)
  * [undefined, null](#2.6)
  * [Symbol](#2.7 )
  * [Преобразование типов](#2.8)

## <span id="1">Введение</span>

```text
&lt;script&gt;code...&lt;/script&gt;
&lt;script src=&quot;part/to/js/file.js&quot;&gt;&lt;/script&gt;

// Однострочный коментарий
/*
  Многострочный коментарий
*/

Версии языка
|-------------------|----------------------|------------------|
|      Издание      | Официальное название |       Дата       |
|-------------------|----------------------|------------------|
|        ES1        |          ES1         |     Июнь 1997    |
|        ES2        |          ES2         |     Июнь 1998    |
|        ES3        |          ES3         |   Декабрь 1999   |
|        ES4        |          ES4         |         -        |
|        ES5        |          ES5         |   Декабрь 2009   |
|       ES5.1       |         ES5.1        |     Июнь 2011    |
|        ES6        |        ES2015        |     Июнь 2015    |
|        ES7        |        ES2016        |     Июнь 2016    |
|        ES8        |        ES2017        |     Июнь 2017    |
|        ES9        |        ES2018        |     Июнь 2018    |
|       ES10        |        ES2019        |     Июнь 2019    |
|                   |        ES2020        |                  |
|-------------------|----------------------|------------------|
```

## <span id="2">Переменые, типы данных, примитивные типы</span>

<span class="instr">var</span> - ключевое слово для создания переменой, функциональная область видимости, работает хостинг.\
<span class="instr">let</span> блочная область видимости, хостинг не работает.
<span class="instr">const</span> блочна область видимости, хостинг не работает, нельзя переназначить объявленую переменую.

Начало переменой: <span class="instr">( буква $ _ )</span> именна регистро независимы.

```js
let foo = 'Hello world!';
let a = 10, b = 15;
```

В JS существует 8 типов данных из ник 7 это примитивы, для определения типа данных используеться конструкция <span class="instr">typeof [.data]</span>

```js
typeof 2 // - number
typeof 30n // - bigint
typeof "" // - string
typeof true // boolean
typeof Symbol() // symbol
typeof undefined // - undefined
typeof null // - object (баг)
typeof {} // - object
typeof [] // - object (Массивы это вариации объекта)
typeof function () { } // - function
```

### <span id="2.1">Операторы</span>

```js
// Математические
+ - * / % ++ --

x++ // Возвращает x и увеличивает его на 1 
++x // Увеличивает x на 1 и возращает его

// Логические
&& // И останавливаеться на лжи
|| // ИЛИ останавливаеться на правде
! // НЕ

let x;
false || x = 1; // x = 1
true || x = 1; // x = undefined


// Присваивания
= += *= -= /=
%= <<= >>= &= ^= |=

// Побитовые
& // И
| // Или
^ // Или исключающее
<< >> >>>

2 << 8 // 512

// Строковые
+ +=
'A' + 1 // 'A1'

// Сравнение
== === != !== > < >= <=

10 == '10'  // true
10 === '10' // false

// Запятая
// Выполняет каждый из операндов и возращает значение последнего

let x = 1;
x = (x++, x); // x = 2
x = (2, 3); // x =3
```

### <span id="2.2">Числа</span>

Числа - все числа в JS имеют тип <span class="instr">float</span> (число с плавающей точкой).

```js
0Xffac7 // число в 16 системе
0xcab

0345 // число в 8 системе
0192 // число 192 в 10 системе

12.45
0.98
.98
1.34e4
3.5E-10

1 / 0 // Infinity
-1 / 0 // -Infinity
1e500 // Infinity
0 / 0 // NaN (NaN ни равен ничему, даже себе)
```

**Методы для работы с числами.**

<span class="instr">isNaN(n)</span> - проверка на NaN, преобразует к числу, true если NaN, возвращает false когда n <span class="instr">число, null, '_'</span>\
<span class="instr">isFinite(n)</span> - преобразует к числу и возвращает true если это не <span class="instr">NaN, Infinity, -Infinity, undefined</span>\
<span class="instr">toFixed(n)</span> - форматирует число с фиксированой запятой, возвращает строку\
<span class="instr">toPrecision(n)</span> - округляет до n цифр, возвращает строку\
<span class="instr">toExponential(n)</span> - преобразует к экспоненциальной записи, возвращает строку

```js
isNaN(34) // false
isFinite(NaN) // false

parseInt('12px') // 12
parseInt('FF', 16) // 255
parseFloat('12.3.4') // 12.3

let bar = 255;
bar.toString(16); // FF

let foo = 12.35;
foo.toFixed(1); // '12.3'

123..toPrecision(5) // '123.00'
12.345.toPrecision(3) // '12.3'
20.5.toExponential(5) // '2.05000e+1'
```

**Math**

Math - встроеный объект, со свойствами и методами для работы с математическими константами и функциями.

```js
// Методы
Math.pow(2, 5) // 32 2 в степени 5
Math.sqrt(400) // 20 корень из 400
Math.abs(-20) // 20 модуль числа
Math.round(9.2) // 9 Окргление
Math.round(9.6) // 10
Math.floor(9.8) // 9 Округление к меньшему
Math.ceil(9.1) // 10 Округление к большему
Math.min(2,9,1) // 1 Возвращает наименьшее число
Math.max(2,9,1) // 9 Возвращает наибольшее число
Math.exp(2) // e^2 Число эйлера во второй степени
Math.log(5) // loge 5 Натуральный логарифим числа 5
Math.sin() // Тригонометрические методы
Math.cos()
Math.tan()
Math.asin()
Math.acos()
Math.atan()
Math.random() // Возвращает случайное число от 0 до 1

// Свойства
Math.PI
Math.E
Math.LN10
Math.LOG2E
Math.LOG10E
Math.SQRT1_2
Math.SQRT2

// Генератор случайного числа от min до max
function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
```
### <span id="2.3">BigInt</span>

BigInt - целые числа производльной длины, необходимо добавить <span class="instr">n</span> в конец литерала. Все операциии с BigInt возращают BigInt.

```js 
// Создание
let bigNum = 445n;
let bigNum = BigInt(445);
let bigNum = BigInt('445');

// Операции
2n + 2n // 4n
5n / 2n // 2n
2n + 3 // Error
+4n // Error

1n == 1 // true
1n === 1 // false
```

### <span id="2.4">Строки</span>

В JS нельзя изменить строку, синтаксис строк: <span class="instr">'string' "string"</span>\ Можно так же вставить спец. символы <span class="instr">\n</span> - новая строка, <span class="instr">\t</span> - табуляция,<span class="instr">\\ \' \"</span> - экранирование символов

**Методы для работы со строками:**

<span class="instr">.charAt(n)</span> - получает доступ к символу под номером n и возвращает его\
<span class="instr">.toUpperCase()</span> - преобразует строку к верхнему регистру и возвращает ее\
<span class="instr">.toLowerCase()</span> - преобразует строку к нижнему регистру и возвращает ее\
<span class="instr">.indexOf(str, start)</span> - поиск подстроки, возвращает позицию подстроки (считает с 0), если нет совпадений возвращает -1, можно задать начальнyю позицию\
<span class="instr">.lastIndexOf(str, start)</span> - поиск с конца строки\
<span class="instr">.substring(start, end)</span> - возвращает подстроку между двумя <span class="instr">start end</span>, или же от <span class="instr">start</span> до конца строки\
<span class="instr">.substr(start, length)</span> - возвращает указанное количество символов из строки, начиная с указанной позиции\
<span class="instr">.slice(start, end)</span> - извлекает часть строки и возвращает новую строку, end не входит\
<span class="instr">.replace()</span> - замена строки, на шаблон, только первое совпадение\
<span class="instr">.split()</span> - разбивает строку на массив, можно указать разделитель

```js
// Свойства
'string'.length // 6 Возвращает длину строки

// Методы
'string'.charAt(2) // 't'
'string'[2] // 't'
'string'.toUpperCase() // 'STRING'
'StRiNg'.toLowerCase() // 'string'
'string'.indexOf('i') // 3
'string'.lastIndexOf('i') // 3

'hello world!'.substring(6, 11) // 'world'
'Hi, man!'.substr(4, 3) // 'man'

'I love JS'.slice(2, 6) // 'love'
'I love JS'.slice(-2) // 'JS' с конца строки

'I love JS'.replace('JS', "CSS") // 'I love CSS'
'I love JS'.split(' ') // ['I', 'love', 'JS']
```

### <span id="2.5">Логический тип</span>

Логический тип представляет два значения <span class="instr">true</span> и <span class="instr">false</span>.

```js
// Все значение преобразуються к true кроме:
Boolean(undefined) // false
Boolean(null) // false
Boolean(0) // false
Boolean(-0) // false
Boolean(NaN) // false
Boolean('') // false
Boolean("") // false
```

### <span id="2.6">undefined, null</span>

<span class="instr">null</span> - пустота\
<span class="instr">undefined</span> - значение не определено

### <span id="2.7">Symbol</span>

Symbol - тип данных использующийся для создания уникальных индентификаторов. Символы уникальны. Символы автоматически не преобразуються к строке (необходимо явно вызывать <span class="instr">.toString()</span>)

Символы нужны для создание скрытых свойст объекта, так же есть системные символы внутри JS. Cимволы игнорируються циклом <span class="instr">for...in</span> и <span class="instr">Object.keys()</span>

```js
// Создание
let id = Symbol();
let id1 = Symbol('id'); // Символ с описанием
let id2 = Symbol('id');

id1 == id2 // false
console.log(id1.description) // 'id' Получение описания

// Скрытые свойста
let config = {
  showList: false
}
let id = Symbol('id');
config[id] = "#233";
console.log(config[id]) // #233

// Литеральный объект
// Объявление и вызов только через []
let id = Symbol('id');
let config = {
  showList: false,
  [id]: "#444",
  [Symbol.for('password')]: 'sf3Z3d!f'
}

console.log(confgi[id]); // #444
```

**Глобальные символы** - если нам необходимо что бы символы с одинаковыми именами(описанием) были одной сущностью, необходимо записовать символ в Глобальный реестр символов.

```js
// Глобальный реестр
// Создание символа в глобальном реестре
let id = Symbol.for("id");

// Чтение
let id2 = Symbol.for("id");

id === id2 // true

// Используеться для поиска описания только в глобальном реестре
let mySym = Symbol.for("name");
Symbol.keyFor(mySym); // "name"
```

### <span id="2.8">Преобразование типов</span>

```js
// Строковые
String(25) // '25'
'' + 25 // '25'
5 + '10' // '510'
'123' + undefined // '123undefined'
5 + [] // '5'
5 + [10] // '510'
[] + 1 + 2 // 12

// Числовые
Number('10') // 10
+'220' // 220
'5' * '4' // 20
5 * 'string' // NaN
'6' / '3' // 2
'12' - '9' // 3
'12' - 9 //3
+'' // 0
+false // 0
+true // 1
true + false // 1

// Логические
Boolean('string') // true
Boolean('23') // true
!!('string') // true
!!0 // false
```
<!--
## Массивы

Массивы - объекты, с числовыми ключами.

```js
// Объявление
var arr = Array()
var arr = new Array()
var arr = new Array(1, 2, 3)
var arr = new Array(5) // Задать длину массива

var arr = []
var arr = [1, '2', true, {a:2, b:'JS'}]
[,,,, 4, 5] // можно пропускать элементы

arr[0] // получение элемента массива
arr[arr.length] = 5 // добавить элемент массива в конец
arr['age'] = 21 // можно добавить свойство

arr.length = 2 // оставить в массиве только 2 элемента
delete arr[2] // удаляет элемент вместо элемента undefined
```

Объекты и массивы передаются по ссылке.

```js
var arr = [1, 2]
var foo = arr // foo ссылаеться на arr
foo[0] // 1
foo[0] = 55
arr[0] // 55

foo = [3, 4] // создаем новый массив
foo // [3, 4]
arr // [55, 2]
```

**Методы массивов:**

<span class="instr">.join()</span> - объединяет все элементы массива в строку, можно указать разделитель\
<span class="instr">.reverse()</span> - изменяет порядок массива с конца\
<span class="instr">.sort()</span> - по умолчанию сортировка в алафавитном порядке, можно задать колбек\
<span class="instr">.concat()</span> - конкатенирует массив и элементы\
<span class="instr">.slice(start, end)</span> - копирует массив от start до end\
<span class="instr">.splice()</span> - удалять, вставлять, заменять элементы массива\
<span class="instr">.indexOf()</span> - возвращает номер искомого элемента\
<span class="instr">.lastIndexOf()</span> - поиск с конца\ \
<span class="instr">.pop()</span> - удаляет последний элемент и возвращает его\
<span class="instr">.push()</span> - добавить элемент в конец\
<span class="instr">.shift()</span> - удаляет первый элемент и возращает его\
<span class="instr">.unshift()</span> - добавить элемент в начало массиваclass="instr"class="instr"
<span class="instr">.forEach(callback)</span> - для каждого элемента массива вызываеться функция, ничего не возвращает только перебор\
<span class="instr">.map(callback)</span> - возвращает массив для каждого элемента вызываеться функция\
<span class="instr">.filter(callback)</span> - возвращает массив, для каждого элемента вызываеться функция если она возвращает true элемент попадает в массив\
<span class="instr">.every(callback)</span> - возвращает true если функция для каждого элемента возваращает true\
<span class="instr">.some(callback)</span> - возвращает true eсли функция хотя бы для одного элемента возвращает true\
<span class="instr">.reduce(function(acc, next, i, arr), value)</span> - используеться для последовательной обработки каждого элемента массива с сохранением промежуточного результата, возвращает 1 значение, если value не задан acc равен первому элементу, next второму\
<span class="instr">.reduceRight(function(acc, next, i, arr), value)</span> - идет справа на лево

```js
/ Свойства
arr.length // получение длины массива

// Методы
[1, 2, 3].join('-') // '1-2-3'
[1, 2, 3].reverse() // [3, 2, 1]

['Z', 'A'].sort() // ['A', 'Z']
.sort(function(a, b) { return a - b } // сортировка чисел 

[1, 2].concat(3, 4) // [1, 2, 3 ,4]
[1].concat('2' [3, 4]) // [1, '2', 3 ,4]

[1, 2, 3].slice(1) // [2, 3]
[1, 2, 3].slice(1, 1) // [2]
[1, 2, 3].slice(-2) // [2, 3] от второго до конца
[1, 2, 3].slice() // копирует весь массив

[1, 2, 3, 4].splice(1, 2) // удаляет и возвращает с 1-го, 2 элемента
[1, 2, 3, 4].splice(0, 2, 0, 0) // заменяет первые 2 элемента
[1, 2, 3, 4].splice(0, 0 ,3 ,3) // вставить 3,3 вначало без удаления

// forEach
var str = ['html', 'css', 'js'];
str.forEach(function(element, index, array) {
  array[index] = element.toUpperCase();
})
str; // ['HTML', 'CSS', 'JS']

// reduce
var arr = [10, 20, 30 ,40, 50];
var sum = arr.reduce(function(acc, next, i, arr) {
  return acc + next;
}, 0); // acc задан в 0
sum; // 150
```

## Условные операторы

Условный оператор <span class="instr">if()</span> принимает любое значение и преобразует его к булевому типу, если <span class="instr">true</span> будет выполнен код в блоке <span class="instr">{...}</span> сразу после оператора, если <span class="instr">false</span> переходим в следующий <span class="instr">if else()</span>, если ни одно условие не выполнилось, будет выполнен код из блока <span class="instr">else {...}</span>

Оператор <span class="instr">switch</span> проверяет на строгое равенство <span class="instr">value</span> и значение заданое в <span class="instr">case</span>, если соответствует выполняеться код из этого кейса, если ни один кейс не подошел выполняеться код из <span class="instr">default</span>, оператор <span class="instr">break</span> останавливает выполнение кейса.

```js
// switch
switch(value) {
  case 1: code.. break;
  case 2: code.. break;
  case 3: code.. break;
  default: code..
}

// групировка case
case 1:
case 2:
  code.. break;
```

Тернарный оператор принимает 3 операнда, он приводит выражение <span class="instr">expression_1</span> к логическому типу, и если оно <span class="instr">true</span> выполняеться <span class="instr">expression_2</span>, если <span class="instr">false</span> выполняеться <span class="instr">expression_3</span>

```js
// Тернарный оператор
expression_1 ? expression_2 : expresion_3

var age = 16;
age < 18 ? console.log('no access') : console.log('welcome');

// групировка
var age = 18;
var access = age > 18 ? 'welcome' : age < 18 ? 'no access' : 'welcome';
```

## Циклы

<span class="instr">expression</span> приводиться к булевому типу, если <span class="instr">true</span> выполняеться код в теле цикла <span class="instr">{...}</span>, иначе код не выполняеться.\
<span class="instr">do while</span> - цикл с постусловием, выполниться хотя бы 1 раз\
<span class="instr">while</span> - цикл с предусловием

```js
// while
while (expression) { code.. }

// do
do { code.. } while (expression)

break // выход из цикла
continue // прекратить выполнение текущей итерации
```

Цикл <span class="instr">for</span> состоит из 
трех не обязательных частей, инициализации, проверки условия, шага <br>
цикл <span class="instr">for in</span> - предназначен для перебора ключей объекта<br>
Метки для <span class="instr">break/continue</span> предназначены для выхода из нескольких уровней цикла одновременно

```js
// for(init, condition, step) { }

for(var i = 0; i < 10; i++) {
  console.log(i);
}

// метки break continue
out:
  for() {
    for() { code...; break out;}
}

// вывод простых чисел
nextPrime:
  for(var i = 2; i < 100; i++) {
    for(var j = 2; j < i; j++) {
      if(i % j == 0) {
        continue nextPrime;
      }
    }
    console.log(i);
}

// for in
var object = {a: 1, b: 2, c: 3};
for (var key in object) {
  console.log('key ' + key, 'value ' + object[key]);
}
```

## Функции

Функции - самостоятельный блок кода который можно повторно использовать в программе, можно вызывать передавать аргументы, и возвращать новое значение. Вернуть значение можно с помощьют ключевого слово <span class="instr">return</span> Переменые объявленые внутри функции считаються локальными и не доступны вне фунции. Функции имеют псевдо-массив (объект с числовыми ключами) из аргументов функции <span class="instr">arguments</span>.

### Лексическая область видимости

Лексическая область видимости — это область видимости, которая определена во время разбора на лексемы, основана на том, где переменные и блоки области видимости были созданы вами во время написания и таким образом (в основном) навечно зафиксированы на момент, когда лексический анализатор обрабатывал ваш код.

<figure style="max-width: 400px">
<img src="assets/lexical-js.png" alt="lexical environment javascript">
<figcaption>три вложенных области видимости</figcaption>
</figure>

**Лексическая область видимости** определяется временем написания кода, тогда как динамическая область видимости (и this!) определяется во время выполнения.


**Function Declaration:**

```js
// Function Declaration работает хостинг
function hello(name){
  return 'Hello' + name;
}

// функции можно присваивать
function test() {}
var bar = test; // присваевание фунции
var foo = test(); // присваевание возвращеного значения

// Передача функции callback в аргументе
function nameLog(callback) {
  var name = 'Props';
  callback(name);
}
nameLog(console.log('Hello' + n));

// Функцию можно возвращать
function funRtrn () {
  return function() {
    console.log('Hello');
  }
}
var foo = funRtrn(); // Вернули функцию в foo
foo() // Вызвали возвращеную функцию
funRtrn()(); // Или так

// Функции можно задать свойства
function f() {}
f.test = 5;
```

**Function Expresion** - функции присвоеные переменым

```js
// Function Expression не хостяться
var sum = function(a, b) {
  return a + b;
}
sum(3, 9); // 12

// Named Function Expression
// можно вызвать только через myFunc, по name можно обратиться внутри 
var myFunc = function name(n) {}

// Immediately Invoked Function Expression
// фукнкции вызываються после объявления, FD нельзя так вызвать.

(function(item){console.log('Hi' + item)})()
```

### Замыкание

**Замыкание** - функция объявленая внутри другой функции. Дочерняя функции имеет доступ к переменым родительской функции. Хоть и ее контекст был уничтожен, переменная береться из замыкания.\
Контекст выполнения функции - это актуальное на данный момент окружение кода. Вложеный контент имеет доступ к переменным родительской фукнци.

**Замыкание** — это когда функция умеет запоминать и имеет доступ к лексической области видимости даже тогда, когда эта функция выполняется вне своей лексической области видимости.

```js
function createCounter() {
  let counter = 0;
  return function() {
    counter++;
    return counter;
  }
}
```

**Модуль через замыкания** - Скрывает внутринюю реализацию скрипта.


```js
// По скольку функции идет в составе выражения 
// считаетья Function Expression
(function(){}())
+function(){}()

// Не работает
function(){}() // Ошибка
function test(){}() // Ошибка
```
### Рекурсия

**Рекурсия** - вызов функции внутри функции.

```js
// функция возводящая в степень через рекурсию
var powNum = function pow(a, b){
  if(b == 1)
    return a;
  else
    return a * pow(a, b - 1);
}
```
-->