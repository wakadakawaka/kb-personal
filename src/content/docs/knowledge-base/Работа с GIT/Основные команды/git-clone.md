---
title: Клонирование репозитория
slug: knowledge-base/rabota-s-git/osnovnye-komandy/klonirovanie-repozitoriya
---

`git clone` — команда, с помощью которой можно скопировать удалённый репозиторий (например, с Gitea, GitHub или GitLab) на свой компьютер.

### Примеры:

Клонирование по HTTPS:

```bash
git clone https://git.sinenikolsky.ru/user/repo.git
```

Клонирование по SSH (если добавлен SSH-ключ):

```bash
git clone git@git.sinenikolsky.ru:user/repo.git
```

После клонирования появится папка `repo`, внутри которой будет полный проект.
