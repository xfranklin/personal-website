---
layout: layouts/article
locale: ru
title: "Spaceship ZSH: обзор и настройка prompt-темы"
description: "Обзор темы Spaceship ZSH: установка, настройка prompt и полезные возможности для командной строки."
date: 2019-07-07
post:
  url: assets/zsh-spaceship.png
  alt: Spaceship screenshot
tags: archive
---

[Spaceship](https://github.com/denysdovhan/spaceship-prompt) позиционирует себя как минималистичная, мощная и кастомизируемая командная оболочка zsh (так оно и есть). Далее перечислены основные возможности:

- Умное отображение приветствия (хост и имя пользователя)
- Большое количество плагинов отображающих текущую версию языка или текущего проекта (node.js, ruby, swift, go, php, rust, python, docker, package version и другие)
- Если прошлая команда выполнилась с ошибкой, цвет приглашения меняется на красный.
- Git плагин отображающий текущее состояние репозитория:
  - <span class="instr">?</span> не отслеживаемые файлы (новые файлы)
  - <span class="instr">+</span> не закомиченые изменение (после добавления)
  - <span class="instr">!</span>не добавленный файл (после изменений)
  - <span class="instr">»</span> файл был переименован
  - <span class="instr">✘</span> файл был удален
  - <span class="instr">$</span> изменения в стеше
  - <span class="instr">=</span> несливаемые ветки (конфликт)
  - <span class="instr">⇡</span>впереди удаленного репозитория (в локальном репозитории изменения не совпадают с удаленным)
  - <span class="instr">⇣</span> сзади удаленного репозитория (в удаленном репозитории изменения)
  - <span class="instr">⇕</span> и в локальном и в глобальном репозитории не совпадающее изменения (конфликт)
- Mercurial плагин
- Индикатор фоновых процессов [<span class="instr">✦</span>]
- Индикатор аккумулятора батареи:
  - <span class="instr">⇡</span> заряжается
  - <span class="instr">⇣</span> разряжается
  - <span class="instr">•</span> полностью заряжен
- Отображение времени выполнения прошлой команды (при превышении установленного порога)
- Отображение текущего времени
- Отображение режима в случае Vi-mode

## Зависимости

Для корректной работы необходимо иметь <span class="instr">zsh</span> версии 5.2 или старше (но все хорошо работает и на zsh 5.1.1), а так же шрифт с powerline, spaceship предлагает использовать [Fira Code](https://github.com/tonsky/FiraCode).

## Установка

Spaceship можно установить множеством способов, мы рассмотрим только два, установку с помощью npm и установку в oh-my-zsh.

**npm**

```bash
$ npm install -g spaceship-prompt
```

**oh-my-zsh**

```bash
$ git clone https://github.com/denysdovhan/spaceship-prompt.git "$ZSH_CUSTOM/themes/spaceship-prompt"
$ ln -s "$ZSH_CUSTOM/themes/spaceship-prompt/spaceship.zsh-theme" "$ZSH_CUSTOM/themes/spaceship.zsh-theme"
```

При установке в oh-my-zsh необходимо изменить тему в файле <span class="instr">.zshrc</span> на <span class="instr">spaceship</span>

## Кастомизация

Хоть и spaceship отлично работает из коробки, у вас есть возможность настроить его под себя. Все изменения вносятся в файл <span class="instr">.zshrc</span>. Spaceship состоит из секций которые мы можем включать и настраивать.

### Очередь приглашения

Вы можете создать подходящее вам приглашения используя массив <span class="instr">SPACESHIP_PROMPT_ORDER</span> в него добавляются необходимые секции, приветствие по умолчанию:

```bash
SPACESHIP_PROMPT_ORDER=(
time          # Секция времени
user          # Секция пользователя
dir           # Секция текущей директории
host          # Секция хоста
git           # git
hg            # Mercurial
package       # Package version
node          # Node.js
ruby          # Ruby
elixir        # Elixir
xcode         # Xcode
swift         # Swift
golang        # Go
php           # PHP
rust          # Rust
haskell       # Haskell Stack
julia         # Julia
docker        # Docker
aws           # Amazon Web Services
venv          # virtualenv
conda         # conda virtualenv
pyenv         # Pyenv
dotnet        # .NET
ember         # Ember.js
kubecontext   # Kubectl context
terraform     # Terraform workspace
exec_time     # Время работы последней команды
line_sep      # Перенос строки
battery       # Уровень заряда батареи
vi_mode       # Vi-mode индикатор
jobs          # Индикатор фоновых задач
exit_code     # Секция ошибки
char          # Символ приглашения
)
```

### Приглашение

Группа этих параметров определяет поведение всей строки приветствия (то есть массива <span class="instr">SPACESHIP_PROMPT_ORDER</span>), параметры установленные по умолчанию:

```bash
# Добавление  новой пустой строки перед приглашением
SPACESHIP_PROMPT_ADD_NEWLINE="true"

# Разделение приглашение на 2 строки
SPACESHIP_PROMPT_SEPARATE_LINE="true"

# Отображение префикса первой секции в приглашении
SPACESHIP_PROMPT_FIRST_PREFIX_SHOW="false"

# Отображать ли префикс перед секциями
SPACESHIP_PROMPT_PREFIXES_SHOW="true"

# Отображать ли суффикс перед секциями
SPACESHIP_PROMPT_SUFFIXES_SHOW="true"

# Префикс по умолчанию
SPACESHIP_PROMPT_DEFAULT_PREFIX="via "

# Суффикс по умолчанию
SPACESHIP_PROMPT_DEFAULT_SUFFIX=" "
```

### Символ

Символ это секция которая отображается перед вводом команд, по умолчанию используется стрелочка <span class="instr">➜</span>, параметры по умолчанию:

```bash
# Префикс перед символом приглашения
SPACESHIP_CHAR_PREFIX=" "

# Суффикс после символа приглашения
SPACESHIP_CHAR_SUFFIX=" "

# Символ приглашения отображается перед каждой командой
SPACESHIP_CHAR_SYMBOL="➜"

# Cимвол приглашения для root пользователя
SPACESHIP_CHAR_SYMBOL_ROOT=$SPACESHIP_CHAR_SYMBOL

# Вторичный символ приглашения
SPACESHIP_CHAR_SYMBOL_SECONDARY=$SPACESHIP_CHAR_SYMBOL

# Цвет секции при успехе прошлой команды
SPACESHIP_CHAR_COLOR_SUCCESS="green"

# Цвет секции при ошибке в прошлой команде
SPACESHIP_CHAR_COLOR_FAILURE="red"

# Цвет вторичного символа приглашения
SPACESHIP_CHAR_COLOR_SECONDARY="yellow"
```

### Время

Отображает текущее время. По умолчанию выключено, что бы включить необходимо параметр <span class="instr">SPACESHIP_TIME_SHOW</span> установить в <span class="instr">true</span>. Настройки времени по умолчанию:

```bash
# Отображать ли часы
SPACESHIP_TIME_SHOW="false"

# Префикс перед секцией время
SPACESHIP_TIME_PREFIX="at·"

# Суффикс после секции со временем
SPACESHIP_TIME_SUFFIX=$SPACESHIP_PROMPT_DEFAULT_SUFFIX

# Цвет секции с часами
SPACESHIP_TIME_COLOR="yellow"

# Можно задать свой формат времени
SPACESHIP_TIME_FORMAT="false"

# 12-часовой формат времени
SPACESHIP_TIME_12HR="false"
```

### Имя пользователя

Имя пользователя отображается только когда оно не совпадает с переменой <span class="instr">$LOGNAME</span>, параметры по умолчанию:

```bash
# Отображать ли секцию пользователя, (true, false, always, needed)
SPACESHIP_USER_SHOW="true"

# Префикс перед секцией
SPACESHIP_USER_PREFIX="with "

# Суффикс после секции
SPACESHIP_USER_SUFFIX=$SPACESHIP_PROMPT_DEFAULT_SUFFIX

# Цвет секции имени пользователя
SPACESHIP_USER_COLOR="yellow"

# Цвет пользователя root
SPACESHIP_USER_COLOR_ROOT="red"
```

### Hostname

Hostname отображается только в случае если пользователь подключен с помощью SSH, или в случае если параметр <span class="instr">SPACESHIP_HOST_SHOW</span> был изменен на <span class="instr">always</span>, параметры по умолчанию:

```bash
# Отображать ли hostname, (true, false, always)
SPACESHIP_HOST_SHOW="true"

# Отображать ли hostname полностью
SPACESHIP_HOST_SHOW_FULL="false"

# Префикс перед секцией
SPACESHIP_HOST_PREFIX="at "

# Суффикс после секции
SPACESHIP_HOST_SUFFIX=$SPACESHIP_PROMPT_DEFAULT_SUFFIX

# Цвет секции hostname
SPACESHIP_HOST_COLOR="blue"

# Цвет секции при активном SSH-соединении
SPACESHIP_HOST_COLOR_SSH="green"
```

### Текущая директория

Текущая директория всегда отображается, если же вы переходите в git репозиторий, отображает только папку в которой находиться репозиторий, если текущий каталог защищен от записи или у вас не достаточно прав, в качестве суффикса показывается замок <span class="instr">🔒</span>, параметры установленные по умолчанию:

```bash
# Отображать ли секцию
SPACESHIP_DIR_SHOW="true"

# Префикс перед текущей директорией
SPACESHIP_DIR_PREFIX="in "

# Суффикс после текущей директорией
SPACESHIP_DIR_SUFFIX=$SPACESHIP_PROMPT_DEFAULT_SUFFIX

# Количество отображаемых директорий (0 отображает все)
SPACESHIP_DIR_TRUNC=3

# Префикс отображаемый при усечении (пример .../) пустой для отключения
SPACESHIP_DIR_TRUNC_PREFIX=" "

# Если в git репозитории отображать только главую папку
SPACESHIP_DIR_TRUNC_REPO="true"

# Цвет секции
SPACESHIP_DIR_COLOR="cyan"

# Символ если директория не доступна
SPACESHIP_DIR_LOCK_SYMBOL="🔒"

# Цвет символа 🔒
SPACESHIP_DIR_LOCK_COLOR="red"
```

### Git

Секции git состоит из подразделов <span class="instr">git_branch</span> и <span class="instr">git_status</span>. Секция git отображается только если вы находитесь в репозитории. Параметры по умолчанию:

```bash
# Отображать ли git секцию
SPACESHIP_GIT_SHOW="true"

# Префикс перед секцией
SPACESHIP_GIT_PREFIX="on "

# Суффикс после секции
SPACESHIP_GIT_SUFFIX=$SPACESHIP_PROMPT_DEFAULT_SUFFIX

# Символ отображающий перед секцией, но после префикса
SPACESHIP_GIT_SYMBOL="⭠"

# Git branch
# Отображать ли подсекцию с ветками
SPACESHIP_GIT_BRANCH_SHOW="true"

# Префикс перед подсекцией
SPACESHIP_GIT_BRANCH_PREFIX=$SPACESHIP_GIT_SYMBOL

# Суффикс после подсекцией
SPACESHIP_GIT_BRANCH_SUFFIX=" "

# Цвет подсекции
SPACESHIP_GIT_BRANCH_COLOR="magenta"

# Git status (подсекция которая отображается статус репозитория)
# Отображать ли подсекцию
SPACESHIP_GIT_STATUS_SHOW="true"

# Префикс перед подсекцией
SPACESHIP_GIT_STATUS_PREFIX=" ["

# Суффикс после подсекции
SPACESHIP_GIT_STATUS_SUFFIX="]"

# Цвет подсекции
SPACESHIP_GIT_STATUS_COLOR="red"

# Индикаторы (Расшифровка описана в возможностях)
SPACESHIP_GIT_STATUS_UNTRACKED="?"
SPACESHIP_GIT_STATUS_ADDED="!"
SPACESHIP_GIT_STATUS_RENAMED="»"
SPACESHIP_GIT_STATUS_DELETED="✘"
SPACESHIP_GIT_STATUS_STASHED="$"
SPACESHIP_GIT_STATUS_UNMERGED="="
SPACESHIP_GIT_STATUS_AHEAD="⇡"
SPACESHIP_GIT_STATUS_BEHIND="⇣"
SPACESHIP_GIT_STATUS_DIVERGED="⇕"
```

### Время выполнения

Секция показывает время выполнения последней команды (если команда превысила установленный порог времени) параметры по умолчанию:

```bash
# Отображать ли секцию
SPACESHIP_EXEC_TIME_SHOW="true"

# Префикс перед секцией
SPACESHIP_EXEC_TIME_PREFIX="took "

# Суффикс после секции
SPACESHIP_EXEC_TIME_SUFFIX=$SPACESHIP_PROMPT_DEFAULT_SUFFIX

# Цвет секции
SPACESHIP_EXEC_TIME_COLOR="yellow"

# Порог выполнения после которого секция отображается
SPACESHIP_EXEC_TIME_ELAPSED=2
```

### Индикатор батареи

По умолчанию индикатор батареи отображается только если уровень заряда ниже <span class="instr">SPACESHIP_BATTERY_THRESHOLD</span> (По умолчанию 10%). Параметры по умолчанию:

```bash
# Отображать ли индикатор (true, false, alwasy, charged)
SPACESHIP_BATTERY_SHOW="true"

# Префикс перед секцией
SPACESHIP_BATTERY_PREFIX=" "

# Суффикс после секции
SPACESHIP_BATTERY_SUFFIX=$SPACESHIP_PROMPT_DEFAULT_SUFFIX

# Символы зарядки
SPACESHIP_BATTERY_SYMBOL_CHARGING="⇡"
SPACESHIP_BATTERY_SYMBOL_DISCHARGING="⇣"
SPACESHIP_BATTERY_SYMBOL_FULL="•"

# Уровень заряда при котором индикатор отображается
SPACESHIP_BATTERY_THRESHOLD="10"
```

### Vi-mode

Секция отображается только при включённом vi-режимe.

```bash
# Отображать ли секцию
SPACESHIP_VI_MODE_SHOW="true"

# Префикс перед секцией
SPACESHIP_VI_MODE_PREFIX=" "

# Суффикс после секции
SPACESHIP_VI_MODE_SUFFIX=$SPACESHIP_PROMPT_DEFAULT_SUFFIX

# Символ режима вставки
SPACESHIP_VI_MODE_INSERT="[I]"

# Символ нормального режима
SPACESHIP_VI_MODE_NORMAL="[N]"

# Цвет секции
SPACESHIP_VI_MODE_COLOR="white"
```

### Фоновые процессы

Раздел отображается только при наличии активных процессов в фоне. Параметры по умолчанию:

```bash
# Отображать ли индикатор
SPACESHIP_JOBS_SHOW='true'

# Префикс перед индикатором
SPACESHIP_JOBS_PREFIX=" "

# Cуффикс после индикатора
SPACESHIP_JOBS_SUFFIX=" "

# Символ индикатора
SPACESHIP_JOBS_SYMBOL="✦"

# Цвет секции
SPACESHIP_JOBS_COLOR="blue"

# Префикс перед числом количества процессов
SPACESHIP_JOBS_AMOUNT_PREFIX=" "

# Суффикс после числа количества процессов
SPACESHIP_JOBS_AMOUNT_SUFFIX=" "

# Число процессов после которых отображается число
SPACESHIP_JOBS_AMOUNT_THRESHOLD=1
```

### Код завершения

Показывается в случае завершении команды ошибкой, по умолчанию отключено. Что бы включить следует установить SPACESHIP_EXIT_CODE_SHOW в true, параметры по умолчанию:

```bash
# Отображается ли секция
SPACESHIP_EXIT_CODE_SHOW

# Префикс перед разделом
SPACESHIP_EXIT_CODE_PREFIX=" "

# Суффикс после раздела
SPACESHIP_EXIT_CODE_SUFFIX=" "

# Символ показывающийся во время ошибки
SPACESHIP_EXIT_CODE_SYMBOL="✘"

# Цвет символа
SPACESHIP_EXIT_CODE_COLOR="red"
```

Я привел только параметры для основных секций (секции для работы с разными языками и программами не добавлены), для более детального ознакомления почитайте [официальную документацию](https://denysdovhan.com/spaceship-prompt/docs/Options.html#exit-code-exit_code).

## Видео

Вы так же можете посмотреть моё видео по spaceship-prompt на youtube [ссылка](https://www.youtube.com/watch?v=PB5Ai4fwCrE)
