# VGranite Web

WEB-Интерфейс для проекта [VGranite](https://gitlab.com/ponik_rf/vgranite).
Вам может понадобится этот проект только в случае если вы хотите внести изменения в интрефейс проекта [VGranite](https://gitlab.com/ponik_rf/vgranite). 

По умолчанию хост для запросов к API не указан, это значит что он будет обращаться туда, откуда будет запущен. 
В случае использования dev сервера необходимо указать к какому хосту нужно обращаться, это можно сделать в файле `/src/App.vue` - см. `host`.

Рекомендуется для более быстрого тестирования указать `username` и `password` в форме логина. 
Сделать это можно в файле `/src/views/LoginView.vue` - см. `loginForm`.

## Установка

```bash
git clone https://gitlab.com/ponik_rf/vgranite-web.git
```

```bash
cd vgranite-web
```

```bash
npm install
```

## Сборка

После запуска 

```bash
npm run build 
```

Будет создана папка `build` в корне проекта. Ее необходимо с заменой переместить в папку `/device/vgranite/web`. 
В конечной сборке используйте пустое поле `host` (см. выше)
