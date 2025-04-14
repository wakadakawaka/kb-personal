---
title: Форк и вклад в чужой проект
---

Пример: вы хотите внести изменения в чужой репозиторий на GitHub.

### Шаги:

1. Сделайте форк проекта на GitHub (кнопка "Fork").

2. Клонируйте себе:

```bash
git clone https://github.com/yourusername/project-name.git
cd project-name
```

3. Создайте новую ветку:

```bash
git checkout -b fix-typos
```

4. Внесите изменения, затем:

```bash
git add .
git commit -m "Исправлены опечатки в README"
```

5. Отправьте ветку на GitHub:

```bash
git push origin fix-typos
```

6. Перейдите на сайт GitHub и создайте Pull Request в оригинальный репозиторий.

Теперь автор проекта может принять ваши изменения.
