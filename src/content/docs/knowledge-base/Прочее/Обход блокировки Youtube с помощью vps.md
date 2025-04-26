---
title: Обход блокировки Youtube с помощью vps
slug: прочее/обход-блокировки-youtube-с-помощью-vps
---


+ Арендуйте vds, посмотрите список хостеров на vps.today. Нужно одно ядро и вот 512 мб оперативки, ну и локация конечно же не в РФ.

+ После того как нашли понравившийся, откройте правила хостера или раздел FAQ, поищите там, можно ли поднимать на минимальных тарифах свой vpn. Если ничего не сказано - то заказывайте. После разворачивания ОС, подключитесь по ssh с пользователем root.

+ Выполните 4 команды из [Openvpn Install by angristan](https://github.com/angristan/openvpn-install)
```bash
    apt install curl

    curl -O https://raw.githubusercontent.com/angristan/openvpn-install/master/openvpn-install.sh

    chmod +x openvpn-install.sh

    bash openvpn-install.sh
```

+ Если ошибок нет никаких, то в конце Вас будет ждать сообщение, что .ovpn файл сформирован и его можно забрать по такому-то адресу.

+ Качаете файл, устанавливаете [клиенты](https://openvpn.net/client/) (есть под все ОС, в том числе и под android) или под linux используете NetworkManager в настройках сетевых соединений (добавить новое соединение -> импортировать vpn соединение).
