---
layout: layouts/article
title: Стилизация html форм (checkbox, radio button, selected)
description: 
date: 2020-02-16
tags: notes
---

Сегодня речь пойдет о создание кастомных элементов форм доступных с клавиатуры, говорить мы будем только о чекбоксах, селектах, радиокнопхах, ренджах и форм загрузок, по скольку создать кастомные кнопки и формы ввода не так сложно. Статья расчитана для начинающих, и **не претиндует на экспертность**, это то как я создаю эти элементы.

### Начнем с чекбосов

Cуть стилизации чекбосов и радиокнопок сводиться к скрыванию нативных элементов форм по скольку их мы стилизировать не можем, созданию своих элементов и применением к ним стилей в зависимости от состояния элемента формы с помощью псевдокласа <span class="instr">:checked</span>. Давайте начнем в качестве примера давайте создадим форма выбора бренда кросовок.

**Нативная вариант** 

<form class="native_checbox">
  <label class="item">
    <input type="checkbox" value="nike">
    Nike
  </label>
  <label class="item">
    <input type="checkbox" value="adidas">
    Adidas
  </div>
  <label class="item">
    <input type="checkbox" value="new-balance">
    New Balance
  </label>
</form>

```html
<form class="native_checbox">
  <label class="item">
    <input type="checkbox" value="nike">
    Nike
  </label>
  <label class="item">
    <input type="checkbox" value="adidas">
    Adidas
  </div>
  <label class="item">
    <input type="checkbox" value="new-balance">
    New Balance
  </label>
</form>
```

Так же я добавил немного css чтобы поменять курсор, а так же сделать задизайбленые label прозрачным

```css
.native_checkbox input[type="checkbox"],
.native_checkbox label{
  cursor: pointer;
}

.native_checkbox input[type="checkbox"]:disabled + label{
  opacity: .5;
}
```
Все достато просто и красиво а так же доступно с клавиатуры.

**Вариант с кастомными чекбоксами**


<form class="custom_checkbox">
  <label class="item">
    <input type="checkbox" id="nike" value="nike">
    <span class="pseudo_checkbox"></span>
    <span class="title">Nike</span>
  </label>
  <label class="item">
    <input type="checkbox" id="adidas" value="adidas">
    <span class="pseudo_checkbox"></span>
    <span class="title">Adidas</span>
  </label>
  <label class="item">
    <input type="checkbox" disabled id="asics" value="asics">
    <span class="pseudo_checkbox"></span>
    <span class="title">Asics</span>
  </label>
  <label class="item">
    <input type="checkbox" disabled checked id="new-balance" value="new-balance">
    <span class="pseudo_checkbox"></span>
    <span class="title">New Balance</span>
  </label>
</form>

<svg class="path" width="16" heigth="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
  <polyline stroke-linecap="round" points="2,6 7,10 14,2"
  style="fill:none;stroke:red;stroke-width:2"/>
</svg>

