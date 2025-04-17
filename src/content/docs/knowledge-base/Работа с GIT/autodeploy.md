---
title: Автоматический деплой сайта из Gitea через Webhook
slug: rabota-s-git/avtomaticheskiy-deploy-sayta-iz-gitea-cherez-webhook
---

## 📋 Описание
Эта инструкция описывает, как настроить автоматическое обновление (деплой) сайта на Windows-сервере после `git push` в репозиторий Gitea, используя webhook и скрипт на стороне сервера.

---

## 🧱 Что используется
- **Gitea** — self-hosted Git-сервер
- **Windows Server** — где расположен сайт и работает Apache
- **Apache** — размещает сайт, слушает Webhook
- **Git** — установлен и настроен на сервере
- **PHP** — обрабатывает Webhook
- **Планировщик задач Windows** — запускает bat-скрипт

---

## ✅ Структура проекта

- Исходники сайта: `C:\mykb`
- Папка публикации: `C:\Apache24\htdocs\1c-knowledge`
- Gitea-репозиторий: `https://git.sinenikolsky.ru/artem/docusaurus-kb.git`

---

## 🔧 Шаг 1: Подготовка репозитория на сервере

```bash
cd C:\mykb
git init
git remote add origin https://git.sinenikolsky.ru/artem/docusaurus-kb.git
git pull origin main
```

Настрой имя пользователя и email:
```bash
git config --global user.name "Artem"
git config --global user.email "you@example.com"
```

---

## 🔧 Шаг 2: Настройка webhook в Gitea

1. Перейди в репозиторий → **Settings** → **Webhooks**
2. Добавь URL:
   ```
   http://<your-server-address>/webhook/index.php
   ```
3. Тип: `application/json`
4. Включи только `push` события

---

## 🔧 Шаг 3: Создание webhook-обработчика

📁 Путь: `C:\Apache24\htdocs\webhook\index.php`

```php
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$logMessage = "Gitea Webhook triggered update";
file_put_contents('C:\\Apache24\\htdocs\\webhook\\webhook.log', date('Y-m-d H:i:s') . " Webhook received\n", FILE_APPEND);

// Записать событие в журнал
exec('eventcreate /T INFORMATION /ID 1000 /L APPLICATION /SO DocusaurusWebhook /D "' . $logMessage . '"');

echo "OK";
```

Проверь, что Apache обрабатывает `.php` файлы.

---

## 🔧 Шаг 4: Создание скрипта обновления

📁 Файл: `C:\mykb\update-site.bat`

```bat
@echo off
cd /d C:\mykb
echo Updating project...
git pull origin main

call npm install --legacy-peer-deps
call npm run build

robocopy build C:\Apache24\htdocs\1c-knowledge /MIR /NP /NFL /NDL
exit /b 0
```

> ⚠️ Убедись, что `robocopy` установлен (входит в состав Windows).

---

## 🔧 Шаг 5: Создание задачи в планировщике

1. Открой "Планировщик заданий Windows"
2. Создай задачу **"Docusaurus Auto Deploy"**
3. Установи:
   - Триггеры: При событии (Простое, Журнал: Приложение, Источник: DocusaurusWebhook, Код события: 1000)
   - Действие: `cmd.exe`
     - Аргументы: `/c C:\mykb\update-site.bat`
   - Параметры безопасности: Выполнять вне зависимости от регистрации пользователя; Выполнять с наивысшими правами;

Проверь запуск вручную:  
`schtasks /Run /TN "Docusaurus Auto Deploy"`

---

## 🧪 Шаг 6: Проверка

1. Сделай `git push` в Gitea
2. Перейди в Gitea → репозиторий → Webhooks → Recent Deliveries
3. Убедись, что webhook сработал и вернул `OK`
4. Проверь, что сайт обновился в `http://<your-server>/1c-knowledge/`

---

## 💡 Советы

- Включи логирование в `update-site.bat`, если нужно отладить:
  ```bat
  npm run build >> log.txt 2>&1
  ```
- Используй `git reset --hard` перед `pull`, если бывают конфликты
- Проверь, что `git` работает из `cmd` без ошибок

---

## ✅ Готово
Теперь сайт будет автоматически обновляться после каждого push в Gitea! 🎉
