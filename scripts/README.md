# Isaac Save Converter

Script de conversion pour transformer les fichiers de sauvegarde The Binding of Isaac (.dat) en JSON.

## Installation

Aucune installation supplémentaire requise, le projet utilise bun qui peut exécuter TypeScript directement.

## Utilisation

### Méthode 1: Avec npm script

```bash
bun run convert <fichier.dat> [sortie.json]
```

**Exemples:**
```bash
# Convertir un fichier (sortie: 20251215.rep_persistentgamedata1.json)
bun run convert 20251215.rep_persistentgamedata1.dat

# Convertir avec un nom de sortie personnalisé
bun run convert 20251215.rep_persistentgamedata1.dat ma-sauvegarde.json
```

### Méthode 2: Directement avec bun

```bash
bun run scripts/convert-to-json.ts <fichier.dat> [sortie.json]
```

**Exemples:**
```bash
bun run scripts/convert-to-json.ts 20251215.rep_persistentgamedata1.dat
bun run scripts/convert-to-json.ts saves/save1.dat output/save1.json
```

## Format de sortie JSON

Le fichier JSON exporté contient toutes les données de la sauvegarde:

```json
{
  "metadata": {
    "filename": "20251215.rep_persistentgamedata1.dat",
    "version": "Repentance+",
    "exportDate": "2025-12-16T10:30:00.000Z"
  },
  "characters": [
    {
      "id": 0,
      "name": "Isaac",
      "marks": {
        "solo": {
          "mark_0": 3,
          "mark_1": 2,
          ...
        },
        "online": {
          "mark_0": 1,
          ...
        }
      }
    },
    ...
  ],
  "achievements": [
    {
      "id": 1,
      "name": "Achievement Name",
      "unlocked": true
    },
    ...
  ],
  "items": [
    {
      "id": 1,
      "seen": true
    },
    ...
  ],
  "challenges": [
    {
      "id": 0,
      "done": true
    },
    ...
  ],
  "bestiary": [
    {
      "id": 10,
      "name": "Gaper",
      "variant": 0,
      "isBoss": false,
      "isSpecial": false,
      "kills": 150,
      "deaths": 5,
      "hits": 200,
      "encounters": 50
    },
    ...
  ],
  "stats": {
    "stat_name": 12345,
    ...
  }
}
```

## Données extraites

Le script extrait et convertit:

- **Métadonnées**: Nom du fichier, version du jeu, date d'export
- **Personnages** (34): Toutes les marques de complétion (solo et online)
- **Succès** (641): État de déblocage de chaque succès
- **Items** (732): Items vus dans le jeu
- **Défis** (45): État de complétion de chaque défi
- **Bestiaire**: Statistiques complètes pour chaque ennemi (kills, deaths, hits, encounters)
- **Statistiques**: Toutes les statistiques du jeu

## Notes

- Le script supporte les versions **Repentance** et **Repentance+** (Online)
- Les fichiers .dat doivent avoir un header valide
- Le checksum est automatiquement vérifié et mis à jour si nécessaire
- Les données sont exportées exactement comme elles sont stockées dans le fichier de sauvegarde

## Dépannage

**Erreur "Invalid save file header"**
- Vérifiez que le fichier est bien un fichier de sauvegarde Isaac valide
- Assurez-vous que le fichier n'est pas corrompu

**Le fichier JSON est trop volumineux**
- C'est normal, le JSON contient toutes les données détaillées de la sauvegarde
- Vous pouvez compresser le fichier avec gzip pour réduire sa taille

## Exemple complet

```bash
# Télécharger une sauvegarde
# Supposons que vous avez un fichier: 20251215.rep_persistentgamedata1.dat

# Convertir en JSON
bun run convert 20251215.rep_persistentgamedata1.dat

# Le fichier 20251215.rep_persistentgamedata1.json est créé
# Vous pouvez maintenant l'analyser avec n'importe quel outil JSON
```