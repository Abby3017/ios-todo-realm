## To-Do Ios App Using Realm & React-Native

A simple todo app to have hand-on experience with react-native and realm database.
This app does what an user expect it to do with general To-do app (and yes with limited feature).

### Setup the project

Prerequisites 

- xcode 
- node 8

You have to run following commands:

- yarn install or yarn
- react-native run-ios

### Future Tasks

- [ ] add tags on each todo
- [ ] add feature for collaboration on each todo

### Learning opportunity

When we start developing a mobile app, a requirements would come that you want to sync *user data* to device and on server. Mapping these data with server db is challenging if you are not using any local db on client side. On web indexdb comes for rescue. But on phone, choices are limited. Either they are slow or expensive for hobbyist. [Realm](https://realm.io/docs) is the first choice after going through other solution. It's easy and feature provided are quite cool.

For react-native, when you know javascript why look for other. It have it's own limitation but still it does great job on app development.