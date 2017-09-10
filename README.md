# Insulin

[![Release](https://img.shields.io/github/release/bastienmoulia/insulin.svg)](https://github.com/bastienmoulia/insulin/releases) ![Dependencies](https://img.shields.io/david/bastienmoulia/insulin.svg)

## Presentation

Développeur web et diabètique, j'ai développé cette application pour mieux maitriser mon diabète.
J'espère qu'elle pourra également vous servir.

Les données de l'application sont à caractère informatif. Si elles sont trop différentes de vos données habituelles, n'en prenez pas compte. Il est possible que des paramètres soient mal renseignés.

## Comment aider à améliorer l'application

Pour aider à améliorer cette applications vous pouvez [proposer des améliorations ou signaler des bugs](https://github.com/bastienmoulia/insulin/issues).

### Pour les traducteurs

Si vous souhaitez améliorer des traductions ou en faire de nouvelles ce serais avec plaisir que je les intégrerais à l'application.

Pour cela vous pouvez récupérer les fichiers de traductions JSON existants dans le dossier [src/assets/i18n](https://github.com/bastienmoulia/insulin/tree/master/src/assets/i18n). En ouvrant le fichier vous trouverez à gauche en majuscule les clés de traduction qu'il ne faut pas modifier et à droite la traduction correspondante. Une fois modifié vous pouvez m'envoyer le nouveau fichier dans une [issue](https://github.com/bastienmoulia/insulin/issues) ou par [mail](mailto:bmoulia@gmail.com).

### Pour les développeurs

L'application est basée sur [Ionic](https://ionicframework.com/).

*TODO*

## Formules utilisés

### Unités des glycémies

`100 mg/dL = 1g/L = 5.56 mmol/L`

Dans les formules suivantes et dans le code de l'application l'unité choisie est `mg/dL`.

### Glycémie cible et seuils

`glycemieCible = 100 mg/dL`\
`glycemieMin = 70 mg/dL`\
`glycemieMax = 120 mg/dL`

### Calcul du coefficient de sensibilité à l'insuline (K)

#### Méthode simple

- Soit `totalInsuline` la somme des unités d'insulines injectés dans la journée (lente et rapide)
- Soit `poids` le poids en kg
- Soit `K` le coefficient de sensibilité à l'insuline

> Si le diabète est mal équilibré (HbA1c >= 8) on rajoute 10% à `totalInsuline` :\
`totalInsuline = totalInsuline * 1.1`

<!--K = totalInsuline / (0.7 * poids)-->
![Calcul](https://latex.codecogs.com/png.latex?%5Cbg_white%20K%20%3D%20%5Cfrac%7BtotalInsuline%7D%7B0.7%5Ctimes%20poids%7D)

#### Méthode complexe

*TODO*

#### Méthode inverse

*TODO*

### Coefficients glucidiques

*TODO*

### Calcul des besoins en insuline

*TODO*

#### Besoin pour soigner

*TODO*

#### Besoin pour manger

*TODO*

#### Besoin total

*TODO*
