---
layout: layouts/article
title: Основы работы в Tmux, конфигурация, кастомизация
description: Обзор Zsh Oh my zsh настройка, основы работы, установка тем и плагинов.
date: 2019-02-08
tags: notes
---

Tmux - мультиплексор, позволяющий запускать несколько терминалов в одном окне, доступен для всех unix-подобный систем (Linux, macOS, BSD).

## Установка

```bash
# Ubuntu, Debian
$ sudo apt-get install tmux

# CentOS, Fedore
$ yum install tmux

# macOS
$ brew install tmux
```

## Интерфейс

После запуска tmux, снизу появляется статус бар, а так же при разделении окон появляется рамки вокруг панели. В этом и все особености при работе в tmux.

<figure>
<img src="assets/tmux.png" alt="интерфейс tmux">
<figcaption>tmux</figcaption>
</figure>

Из статус бара можно узнать можно узнать имя текущей сесси в квадратных скобках <span class="instr">[0]</span>, так же мы видим что сейчас открыты два окна под номерами <span class="instr">0</span> и <span class="instr">1</span>, звездочка показывает текущее окно. Так же видно имя компьютера и время с датой. Так же стоит упомянуть что перед всеми командами в tmux необходимо ставить префикс, для этого просто необходимо использовать сочетание клавиш <span class="key">Ctrl</span> + <span class="key">b</span>, префикс можно изменить.

## Сессии

При каждом запуске tmux запускается новая сессия, или же мы подключимся к ранее созданным сессиям. После выхода из сессии мы можем обратно к ней подключиться и продолжить работу.

```bash
# Запуск tmux, по умолчанию создастся сессия с именем 0
$ tmux

# Создать новую сессию с именем 'test'
$ tmux new-session -s test
$ tmux new -s test

# Подключиться к последней розданной сессии
$ tmux attach
$ tmux at
$ tmux a

# Подключиться к сессии с именем 'test'
$ tmux attach -t test
$ tmux at -t test
$ tmux a -t test

# Отключиться от текущей сессии
$ tmux detach

# Просмотреть все сессии
$ tmux ls

# Закрыть сессию с именем 'test'
$ tmux kill-session -t test

# Закрыть все сессии
$ tmux kill-server

# Закрыть окно, панель или сессию
$ exit
```

Так же существуют команды сессий:

<span class="key">d</span> - отключиться от текущей сессии\
<span class="key">s</span> - список всех сессий, можно подключиться к нужной\
<span class="key">(</span> - перейти к предыдущей сессии\
<span class="key">)</span> - перейти к следующей сессии\
<span class="key">$</span> - переименовать сессию

## Окна (табы)

В tmux возможно создание новых окон и переключение между ними, окна отображаются в статус баре. Каждое окно нумеруется от 0.

<span class="key">c</span> - создать новое окно\
<span class="key">w</span> - список окон, можно переключаться\
<span class="key">n</span> - переключиться на следующее окно\
<span class="key">p</span> - переключиться на предыдущее окно\
<span class="key">[num]</span> - переключиться на нужный номер окна\
<span class="key">x</span> - закрыть окно (только если одна панель, иначе закроется панель)\
<span class="key">f</span> - поиск окна\
<span class="key">,</span> - переименовать окно\
<span class="key">&amp;</span> - закрыть окно

## Панели

Главная фишка tmux это работа с панелями мы можем разбивать окно на несколько панелей. Основные команды для работы с панелями:

<span class="key">"</span> - разбить окно по горизонтали\
<span class="key">%</span> - разбить окно по вертикали\
<span class="key">↑ → ↓ ←</span> - перемещение между панелями\
<span class="key">Ctrl</span> + <span class="key">b</span> + <span class="key">↑ → ↓ ←</span> - изменение размеров панели\
<span class="key">x</span> - закрыть панель\
<span class="key">o</span> - переключение между всеми панелями по очереди\
<span class="key">;</span> - перейти к последней используемой панели\
<span class="key">q</span> - показать номера панелей\
<span class="key">Space</span> - переключение режимов отображения\
<span class="key">}</span> - переместить текущую панель вправо\
<span class="key">{</span> - переместить текущую панель влево\
<span class="key">z</span> - развернуть текущую панель на весь экран

Дополнительные команды:

<span class="key">:</span> - открыть командную строку в статус баре\
<span class="key">?</span> - список всех комбинаций клавиш\
<span class="key">t</span> - вывод часов на всю панель\

## Режим копирования

Вы можете переключиться в режим копирования для этого необходимо выполнить команду: <span class="key">Ctrl</span> + <span class="key">b</span> <span class="key">[</span>, что бы вставить нужно выполнить команду <span class="key">Ctrl</span> + <span class="key">b</span> <span class="key">]</span> По умолчанию терминал работает в режиме emacs, можно работать в режиме vi.

Основные команды для vi:

<span class="key">Space</span> - начать выделение текста\
<span class="key">Esc</span> - очистить выделение текста\
<span class="key">Enter</span> - скопировать выделенную область\
<span class="key">h j k l</span> - перемещение курсора\
<span class="key">^</span> - переместиться в начало строки\
<span class="key">$</span> - переместиться в конец строки

Основные команды для emacs:

<span class="key">Ctrl</span> + <span class="key">Space</span> - начать выделение текста\
<span class="key">Ctrl</span> + <span class="key">g</span> - очистить выделение текста\
<span class="key">Alt</span> + <span class="key">w</span> - скопировать выделенную область\
<span class="key">↑ → ↓ ←</span> - перемещение курсора<br>
<span class="key">Alt</span> + <span class="key">m</span> - переместиться в начало строки\
<span class="key">Ctrl</span> + <span class="key">e</span> - переместиться в конец строки

## Конфигурация

Tmux имеет глобальный <span class="instr">/etc/tmux.conf</span> и пользовательский файл конфигурации <span class="instr">~/.tmux.conf</span> Работать мы будем с пользовательским файлом конфигурации.

```bash
# Изменение префикса на Ctrl + a
unbind C-b
set -g prefix C-a
bind C-a send-prefix

# Нумерация окон с единицы
set -g base-index 1

# Переключение режима копирования в vi
setw -g mode-keys vi

# Включение режима мыши (скроллинг, перемещение, размеры)
set -g mouse on

# Увеличить историю скролла до 5000 строк
set -g history-limit 5000

# Центрировать список окон в статус баре
set -g status-justify centre

# Перебиндиваем стандартные команды на vi-подобные
# Разделение окон
bind-key v split-window -h
bind-key s split-window -v

# Перемещение между окнами
bind-key h select-pane -L
bind-key j select-pane -D
bind-key k select-pane -U
bind-key l select-pane -R
```

## Кастомизация

Tmux можно кастомизировать, изменения в основном применяются к статус бару, и цветовой палитре. Вот несколько репозиториев с разными темами: [.tmux](https://github.com/gpakosz/.tmux), [nord-tmux](https://github.com/arcticicestudio/nord-tmux), [tmux-themepack](https://github.com/jimeh/tmux-themepack).

## Видео

Вы так же можете посмотреть моё видео по tmux на youtube [ссылка](https://www.youtube.com/watch?v=jNxjN4P_-xc)
