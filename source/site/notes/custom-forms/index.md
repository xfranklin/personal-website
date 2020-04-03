---
layout: layouts/article
title: Стилизация html форм (checkbox, radio button, selected)
description: 
date: 2020-02-16
tags: notes
---

Сегодня речь пойдет о создание кастомных элементов форм доступных с клавиатуры, говорить мы будем только о чекбоксах, селектах, радиокнопхах, ренджах и форм загрузок, по скольку создать кастомные кнопки и формы ввода не так сложно. Статья расчитана для начинающих, и **не претиндует на экспертность**, это то как я создаю эти элементы.

### Стилизация чекбосов 

Cуть стилизации чекбосов и радиокнопок сводиться к скрыванию нативных элементов форм по скольку их мы стилизировать не можем, созданию своих элементов и применением к ним стилей в зависимости от состояния элемента формы с помощью псевдокласа <span class="instr">:checked</span>. Давайте начнем в качестве примера давайте создадим форма выбора бренда кросовок.

**Нативный вариант** 

<form class="native_checkbox">
  <label class="item">
    <input type="checkbox" value="nike">
    <span>Nike</span>
  </label>
  <label class="item">
    <input type="checkbox" value="adidas">
    <span>Adidas</span>
  </label>
  <label class="item">
    <input disabled type="checkbox" value="new-balance">
    <span>New Balance</span>
  </label>
  <label class="item">
    <input disabled checked type="checkbox" value="asics">
    <span>Asics</span>
  </label>
</form>

```html
<form class="native_checkbox">
  <label class="item">
    <input type="checkbox" value="nike">
    <span>Nike</span>
  </label>
  <label class="item">
    <input type="checkbox" value="adidas">
    <span>Adidas</span>
  </label>
  <label class="item">
    <input disabled type="checkbox" value="new-balance">
    <span>New Balance</span>
  </label>
  <label class="item">
    <input disabled checked type="checkbox" value="asics">
    <span>Asics</span>
  </label>
</form>
```

Так же я добавил немного css чтобы поменять курсор, расположить элементы в колонку, а так же сделать задизайбленые label наполовину прозрачным.

```css
.native_checkbox {
  display: inline-flex;
  flex-direction: column;
  margin: .889em 0;
}

.native_checkbox .item{
  cursor: pointer;
}

.native_checkbox input[type="checkbox"]:disabled,
.native_checkbox input[type="checkbox"]:disabled + span {
  cursor: default;  
  opacity: .5;
}
```
Все достато просто и красиво а так же доступно с клавиатуры.

**Вариант с кастомными чекбоксами**

<form class="custom_checkbox">
  <label class="item">
    <input type="checkbox" value="nike">
    <span class="pseudo_checkbox"></span>
    <span class="title">Nike</span>
  </label>
  <label class="item">
    <input type="checkbox" value="adidas">
    <span class="pseudo_checkbox"></span>
    <span class="title">Adidas</span>
  </label>
  <label class="item">
    <input type="checkbox" disabled value="asics">
    <span class="pseudo_checkbox"></span>
    <span class="title">Asics</span>
  </label>
  <label class="item">
    <input type="checkbox" disabled checked value="new-balance">
    <span class="pseudo_checkbox"></span>
    <span class="title">New Balance</span>
  </label>
</form>

Создадим размету с дополнительный пустым спаном <span class="instr">.pseudo_checkbox</span> который будет выступарь в роле разметки (вы так же можете создать чекбокс с помощью псевдоэлементов <span class="instr">:before</span> или <span class="instr">:after</span>)

```html
<form class="custom_checkbox">
  <label class="item">
    <input type="checkbox" value="nike">
    <span class="pseudo_checkbox"></span>
    <span class="title">Nike</span>
  </label>
  <label class="item">
    <input type="checkbox" value="adidas">
    <span class="pseudo_checkbox"></span>
    <span class="title">Adidas</span>
  </label>
  <label class="item">
    <input type="checkbox" disabled value="asics">
    <span class="pseudo_checkbox"></span>
    <span class="title">Asics</span>
  </label>
  <label class="item">
    <input type="checkbox" disabled checked value="new-balance">
    <span class="pseudo_checkbox"></span>
    <span class="title">New Balance</span>
  </label>
</form>
```

Так же нам необходима сама галочка, я нашел просутю svg-картинку:

<svg width="120" height="120" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <path fill="#d31b33" d="M202.624 478.016L0 291.36l70.512-76.56 121.456 111.856L431.44 33.984 512 99.904z"/>
</svg>

Теперь напишем css-стили, в коментариях добавлено описание.

```css

/* Позиционируем наши элементы*/
.custom_checkbox {
  display: inline-flex;
  flex-direction: column;
  margin-bottom: .889em;
}

/* Горизонтально выроним чекбокс и лейбл */
.custom_checkbox .item {
  display: flex;
  align-items: center;
}

/* Отступ для лебла слева */
.custom_checkbox .title {
  padding-left: 6px;
}

.custom_checkbox .item:hover {
  cursor: pointer;
}

.custom_checkbox .item:hover .pseudo_checkbox{
  border-color: #919191;
}
  
.custom_checkbox input[type="checkbox"]{
  width: 1px;
  height: 1px;
  opacity: 0;
}

.pseudo_checkbox:before {
  opacity: 0;
  content: '';
  top: 1px;
  left: 1px;
  width: 14px;
  height: 14px;
  position: absolute;
  background-image: url("data:image/svg+xml,%3Csvg width='14' height='14' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23d31b33' d='M202.624 478.016L0 291.36l70.512-76.56 121.456 111.856L431.44 33.984 512 99.904z'/%3E%3C/svg%3E%0A");
}

.custom_checkbox input[type="checkbox"]:checked + .pseudo_checkbox:before {
  opacity: 1;
  transition: opacity 150ms ease-in;
}

.custom_checkbox input[type="checkbox"]:focus + .pseudo_checkbox {
  border-color: #e95265;
}

.custom_checkbox input[type="checkbox"]:disabled + .pseudo_checkbox, 
.custom_checkbox input[type="checkbox"]:disabled + .pseudo_checkbox + .title {
  opacity: .5;
}

.custom_checkbox input[type="checkbox"]:disabled:checked + .pseudo_checkbox:before {
  opacity: 0.8;
  background-image: url("data:image/svg+xml,%3Csvg width='14' height='14' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23acacad' d='M202.624 478.016L0 291.36l70.512-76.56 121.456 111.856L431.44 33.984 512 99.904z'/%3E%3C/svg%3E%0A");
}

.custom_checkbox input[type="checkbox"]:disabled + label {
  opacity: .5;
}

.pseudo_checkbox {
  position: relative;
  display: inline-block;
  width: 1.125rem;
  height: 1.125rem;
  background: #fcfcfc;
  border-radius: 2px;
  border: 1px solid #acacad;
  transition: border, 150ms ease-in-out;
}
```

