---
title: Создание нового проекта с нуля
slug: rabota-s-git-primery-ispolzovaniya/sozdanie-novogo-proekta-s-nulya
---

Пример: вы хотите создать новый проект и загрузить его на GitHub или Gitea.

### Шаги:

1. Создайте папку проекта:

```bash
mkdir my-new-project
cd my-new-project
```

2. Инициализируйте Git-репозиторий:

```bash
git init
```

3. Создайте файл, например `README.md`:

```bash
echo "# My New Project" > README.md
```

4. Добавьте и зафиксируйте изменения:

```bash
git add .
git commit -m "Первый коммит"
```

5. Создайте репозиторий на GitHub или Gitea вручную.

6. Подключите удалённый репозиторий:

```bash
git remote add origin https://git.sinenikolsky.ru/username/my-new-project.git
```

7. Отправьте изменения:

```bash
git push -u origin main
```

Готово! Проект опубликован.
