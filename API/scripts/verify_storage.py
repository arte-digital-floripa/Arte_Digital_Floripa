import json
import os

with open("data/db.json", "r", encoding="utf-8") as f:
    db = json.load(f)

missing_artworks = []
artworks_expected = len(db["artworks"])

print(f"Verificando {artworks_expected} obras...")
for o in db["artworks"]:
    filepath = o.get("local_file")
    if not filepath or not os.path.exists(filepath):
        missing_artworks.append((o["id"], filepath))

missing_photos = []
for a in db["artists"]:
    photo_path = a.get("local_photo")
    if photo_path and not os.path.exists(photo_path):
        missing_photos.append((a["name"], photo_path))

# Check extra files in storage that aren't in db.json?
# The user wants to know if the storage folder reflects the numbers.
# The artwork images are in `storage/` (e.g., storage/cma_12345.jpg)
# The artist photos are in `storage/fotos_artistas/` (e.g., storage/fotos_artistas/Auguste_Rodin.jpg)
# Franklin Cascaes artworks are where? Probably `storage/` or `midias/`. Let's see what their path is.

print("Obras com arquivos ausentes:", len(missing_artworks))
for m in missing_artworks:
    print(f"  - ID {m[0]}: {m[1]} não encontrado")

print("Fotos de artistas ausentes:", len(missing_photos))
for m in missing_photos:
    print(f"  - Artista {m[0]}: {m[1]} não encontrado")

