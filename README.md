# HYPNOS WEBSITE

## Description
Dans le cadre de l'ECF, une évaluation lors de ma formation de dev Full stack, j'ai réalisé cette application qui permet de réserver des suites à partir des hôtels du groupe hypnos. 
Les données peuvent être ajoutées, modifiées et supprimées à partir de la partie backOffice de l'application.
Il s'agit ici de la partie front end de cette application

## Instalation en local

Il faut dans un premier temps récupérer le projet. Pour cela dans votre terminal, placez vous dans votre dossier de travail et réaliser les commandes suivantes: 

```
git init
git clone https://github.com/DavidAnds/hypnos-front-end.git

```

Ensuite, installer toutes les dépendances nécessaires au bon fonctionnement de react :

```
npm install

```
Ce site utilise les données d'une API.
Vous devez alors, deploiyer localement cette API (voir (https://github.com/DavidAnds/hypnos-backend).)
Puis une fois déployer, vous rendre dans package.json et donner à proxy comme valeur URL de votre API déployer localement :

```
"proxy" : "votre URL"

```