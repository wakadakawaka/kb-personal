# 📋 Полная инструкция настройки SMTP-сервера на Debian/Ubuntu для начинающих

✅ Выполняй всё пошагово — и твой сервер заработает правильно!

---

## 📏 Шаг 1. Создание отдельного SMTP-пользователя

Чтобы безопасно отправлять письма через сервер, создадим отдельного пользователя.

### Команды:

Создать пользователя без доступа к SSH:
```bash
adduser smtpuser --shell /usr/sbin/nologin
```
(задай пароль)

Проверить пользователя:
```bash
id smtpuser
```

Если нужно поменять пароль позже:
```bash
passwd smtpuser
```

✅ Теперь пользователь `smtpuser` будет использоваться для аутентификации в SMTP.

---

## 📏 Шаг 2. Установка и настройка Postfix

### Установка Postfix:
```bash
apt update
apt install postfix mailutils libsasl2-modules sasl2-bin
```

При установке выбери:
- Тип: **Internet Site**
- Имя системы почты: `mail.yourdomain.com`

### Базовая настройка Postfix (`/etc/postfix/main.cf`):

Добавить или проверить:
```ini
myhostname = mail.yourdomain.com
mydestination = localhost
inet_interfaces = all
inet_protocols = ipv4
smtpd_tls_cert_file = /etc/letsencrypt/live/mail.yourdomain.com/fullchain.pem
smtpd_tls_key_file = /etc/letsencrypt/live/mail.yourdomain.com/privkey.pem
smtpd_use_tls = yes
smtpd_tls_security_level = may
smtp_tls_security_level = may

# Аутентификация
smtpd_sasl_auth_enable = yes
smtpd_sasl_security_options = noanonymous
smtpd_sasl_local_domain = $myhostname
broken_sasl_auth_clients = yes
smtpd_recipient_restrictions = permit_sasl_authenticated, permit_mynetworks, reject_unauth_destination
```

### Настроить SASL:
Создай файл `/etc/postfix/sasl/smtpd.conf`:
```bash
mkdir -p /etc/postfix/sasl
nano /etc/postfix/sasl/smtpd.conf
```
Вставить в файл:
```
pwcheck_method: saslauthd
mech_list: plain login
```

### Включить и запустить saslauthd:
```bash
systemctl enable saslauthd
systemctl start saslauthd
```

Перезапустить Postfix:
```bash
systemctl restart postfix
```

✅ Теперь сервер готов принимать письма по SMTP с авторизацией!

---

## 📏 Шаг 3. Получение SSL-сертификата Let's Encrypt (если ещё нет)

### Установка certbot:
```bash
apt install certbot
```

Остановить Postfix на время получения:
```bash
systemctl stop postfix
```

Получить сертификат:
```bash
certbot certonly --standalone -d mail.yourdomain.com
```

Запустить обратно Postfix:
```bash
systemctl start postfix
```

✅ Теперь сервер использует безопасное шифрование TLS.

---

## 📏 Шаг 4. Подключение к SMTP-серверу в других сервисах

Когда сервер готов, можно использовать его для отправки писем с сайтов, CRM и скриптов.

### Данные для подключения к SMTP:

| Параметр | Значение |
|:---------|:---------|
| SMTP сервер (host) | mail.yourdomain.com |
| Порт | 587 |
| Шифрование | STARTTLS |
| Логин | smtpuser |
| Пароль | пароль от smtpuser |

✅ Теперь можно настроить любой сервис на отправку через ваш сервер.

---

## 📏 Пример: настройка отправки писем через SMTP в Gitea

В `app.ini` Gitea нужно прописать:

```ini
[mailer]
ENABLED = true
PROTOCOL = smtp
SMTP_ADDR = mail.yourdomain.com
SMTP_PORT = 587
USER = smtpuser
PASSWD = пароль
FROM = Gitea <noreply@yourdomain.com>
SKIP_VERIFY = false
USE_TLS = true
```

После перезапуска Gitea сервер будет отправлять уведомления через ваш SMTP!

Перезапуск Gitea:
```bash
systemctl restart gitea
```

---

# ✅ ИТОГО

| Шаг | Статус |
|:----|:-------|
| Создан пользователь SMTP | ✅ |
| Установлен и настроен Postfix | ✅ |
| Настроена аутентификация SASL | ✅ |
| Получен SSL сертификат | ✅ |
| Подключение сервисов через SMTP | ✅ |

🚀 Теперь ваш собственный SMTP-сервер полностью готов к работе!

