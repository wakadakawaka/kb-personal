---
title: Отправка изменений в удалённый репозиторий
slug: knowledge-base/rabota-s-git/osnovnye-komandy/otpravka-izmeneniy-v-udalyonnyy-repozitoriy
---

`git push` — отправляет локальные коммиты в удалённый репозиторий.

### Пример:

```bash
git push origin main
```

Если ветка новая и ещё не существует на сервере:

```bash
git push -u origin my-branch
```

Флаг `-u` устанавливает ветку по умолчанию для будущих push/pull.
