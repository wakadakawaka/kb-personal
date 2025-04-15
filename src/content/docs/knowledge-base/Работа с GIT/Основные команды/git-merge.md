---
title: Слияние веток
slug: knowledge-base/rabota-s-git/osnovnye-komandy/sliyanie-vetok
---

`git merge` — объединяет одну ветку с другой. Обычно используется, чтобы влить изменения из feature-ветки в основную (main или master).

### Пример:

```bash
git checkout main
git merge feature-x
```

После слияния история двух веток объединяется. Если есть конфликты — Git попросит их вручную разрешить.
