---
title: Утилита ibcmd.exe
slug: администрирование/утилита-ibcmd-exe
---

# Утилита `ibcmd.exe`

Утилита **`ibcmd.exe`** входит в состав поставки сервера **1С:Предприятие**.

С её помощью можно выгрузить информационную базу в формате `.dt` **без получения монопольного режима**. Для этого нужно:

1. Создать текстовый файл.
2. Задать ему расширение `.bat`.
3. В теле файла прописать следующую строку:

```bat
"C:\Program Files\1cv8\{ВЕРСИЯ ПЛАТФОРМЫ}\bin\ibcmd.exe" infobase dump ^
  --db-server={ИМЯ СЕРВЕРА} ^
  --dbms=MSSQLServer ^
  --db-name={ИМЯ БАЗЫ НА СЕРВЕРЕ} ^
  --db-user={ИМЯ ПОЛЬЗОВАТЕЛЯ SQL} ^
  --db-pwd={ПАРОЛЬ ПОЛЬЗОВАТЕЛЯ SQL} ^
  "C:\backup\SQL_DB_NAME_date.dt"
```

## Пояснение параметров

- `--dbms` — тип SQL-сервера, например: `MSSQLServer`.
- `--db-server` — адрес или доменное имя SQL-сервера.
- `--db-name` — имя базы данных на SQL-сервере.
- `--db-user` — имя пользователя SQL, которому доступны нужные базы.
- `--db-pwd` — пароль пользователя SQL.
- `--user` — имя пользователя 1С (опционально).
- `--password` — пароль пользователя 1С (опционально).

> Ранее утилита могла работать без указания пользователя 1С.

Файл `C:\backup\SQL_DB_NAME_date.dt` — путь, по которому будет сохранена выгруженная база данных.


# Как исправить ошибку подключения к SQL Server через OLE DB (ошибка 53 или 1326)

Если при подключении к SQL Server возникает ошибка:

```
Microsoft OLE DB Driver for SQL Server: Named Pipes Provider: Could not open a connection to SQL Server [53] или [1326]
```

Это значит, что клиентская машина не может установить сетевое соединение с сервером SQL Server. Вот план действий для устранения проблемы.

---

## Проверка доступности сервера и порта

### Проверка наличия telnet

Для проверки порта необходимо наличие утилиты `telnet`. Чтобы установить её:

1. Откройте **Панель управления** → **Программы** → **Программы и компоненты** → **Включение или отключение компонентов Windows**.
2. Найдите и включите компонент **Клиент Telnet**.

Или с помощью команды (от имени администратора):

```cmd
dism /online /Enable-Feature /FeatureName:TelnetClient
```

### Проверка сетевой доступности

1. Проверьте доступность сервера по сети:

```bash
ping 192.168.1.151
```

2. Проверьте доступность порта 1433:

```bash
telnet 192.168.1.151 1433
```

- Если соединение устанавливается (чёрный экран) — порт доступен.
- Если ошибка подключения — порт закрыт или сервер его не слушает.

---

## Настройка SQL Server

### Включение TCP/IP протокола

1. Откройте **SQL Server Configuration Manager**.
2. Перейдите в **SQL Server Network Configuration** → **Protocols for MSSQLSERVER**.
3. Убедитесь, что протокол **TCP/IP** включён (Enabled).

### Настройка порта TCP/IP

1. В том же окне откройте свойства TCP/IP.
2. Перейдите на вкладку **IP Addresses**.
3. Для всех IP-адресов установите `Enabled = Yes`.
4. В секции **IPAll** укажите:
   - **TCP Dynamic Ports** = (пусто)
   - **TCP Port** = **1433**

### Перезапуск SQL Server

После изменений перезапустите службу SQL Server:

```bash
services.msc → SQL Server (MSSQLSERVER) → Перезапустить
```

---

## Проверка фаервола

1. Убедитесь, что фаервол на сервере разрешает входящие подключения на порт **1433/TCP**.
2. Если не настроено правило, создайте новое правило в **Брандмауэре Windows**:
   - Разрешить входящие подключения на **TCP порт 1433**.
3. Для тестирования можно временно отключить фаервол (если это безопасно).

---

## Дополнительно

- Если используется **Named Instance** (например, `SERVER\INSTANCE`), проверьте, что запущена служба **SQL Server Browser**.
- Проверьте, что на сервере SQL Server действительно слушает порт 1433:

```bash
netstat -ano | findstr :1433
```

Если ничего не найдено — сервер не слушает порт, значит настройки протоколов неправильные или сервер не перезапущен.

---

## Итого

- Убедитесь, что сервер доступен по сети.
- Убедитесь, что порт 1433 открыт и сервер его слушает.
- Проверьте настройки протоколов в SQL Server Configuration Manager.
- Проверьте настройки фаервола.
- Проверьте, установлен ли Telnet для диагностики портов.

После выполнения этих шагов ошибка подключения должна исчезнуть.


