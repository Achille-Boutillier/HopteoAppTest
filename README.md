# HopteoApp


## ---------------- Schlagerie temporaire ---------------------------
### Cloner en local le repo distant

Dans le dosier de son choix :
``` Bash
git clone https//github.com/Path
```

### Copier/coller les fichiers node_modules et .expo à partir d'un autre projet possédant les bonnes dépendances

(ou initialiser un projet expo, y ajouter les dépendances, puis copier/coller ces fichiers dans le dossier du clonage github)  
(très très schlag et alors ?)


## ------------------ fin temporaire -------------------------------

## Expo - Installation & Initialisation

Installer expo (globalement) 
``` Bash
npm install -g expo-cli
```

Initialiser un projet expo du nom de votre choix (_NameProject_ ici)
(Commande à taper à la racine du dossier où l'on veut créer _NameProject_)
```bash
expo init NameProject
```

Choisir le type de projet (_blank_ par exemple) 

( <ins>Rappel :</ins> Commande pour lancer le projet sur Expo Go : `npm start` )

## Dépendances react native

```bash
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
```
```bash
npm install @react-native-async-storage/async-storage
```
```bash
expo install react-native-screens react-native-safe-area-context
```

### Installer react-native-deck-swiper
```bash
npm install react-native-deck-swiper react-native-view-overflow react-native-reanimated @expo/vector-icons 
```
attention : react-native-deck-swiper n'est plus mis à jour  
Il y a donc des conflits entre les diférentes versions de react-native   
`npm audit fix` ou `npm audit fix --force` permettent de résoudre les conflits majoritaires

