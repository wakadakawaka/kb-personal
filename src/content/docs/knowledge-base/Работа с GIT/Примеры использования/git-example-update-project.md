---
title: Получение обновлений из оригинального репозитория
slug: rabota-s-git-primery-ispolzovaniya/poluchenie-obnovleniy-iz-originalnogo-repozitoriya
---

Если вы сделали форк и хотите получить последние изменения из оригинала:

### Шаги:

1. Добавьте оригинальный репозиторий как дополнительный remote:

```bash
git remote add upstream https://github.com/originaluser/project-name.git
```

2. Получите обновления:

```bash
git fetch upstream
```

3. Обновите вашу ветку:

```bash
git checkout main
git merge upstream/main
```

Теперь ваша копия содержит последние изменения оригинального проекта.
