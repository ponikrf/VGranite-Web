# VGranite Web

WEB-interface for the project [VGranite](https://github.com/ponikrf/VGranite).
You may only need this project if you want to make changes to the project's interface [VGranite](https://github.com/ponikrf/VGranite). 


By default, the host for API requests is not specified, which means that it will be accessed wherever it is launched from. 
In case of using dev server you need to specify which host to access, this can be done in the `/src/App.vue` file - see `host`. `host`.


It is recommended to specify `username` and `password` in the login form for faster testing. 

You can do this in the `/src/views/LoginView.vue` file - see `loginForm`.

## INSTALL & BUILD

```bash
git clone https://github.com/ponikrf/VGranite-Web
```

```bash
cd vgranite-web
```

```bash
npm install
```

```bash
npm run build 
```

A `build` folder will be created in the root of the project. It should be moved with replacement to the `/device/vgranite/web` folder. 
In the final build use the empty `host` field (see above)