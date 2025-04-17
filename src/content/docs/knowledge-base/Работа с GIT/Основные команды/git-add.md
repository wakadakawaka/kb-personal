---
title: Добавление файлов в индекс
slug: rabota-s-git-osnovnye-komandy/dobavlenie-faylov-v-indeks
---

`git add` — подготавливает файлы для коммита. Без этой команды Git не будет учитывать изменения.

### Примеры:

Добавить конкретный файл:

```bash
git add index.html
```

Добавить все изменённые файлы:

```bash
git add .
```

После этого файлы попадают в "staging area" — область подготовки.
