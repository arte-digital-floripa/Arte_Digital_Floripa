import os
import json
import urllib.request
import urllib.parse

API_URL = "https://openaccess-api.clevelandart.org/api/artworks/"
OUTPUT_DIR = "e"
DB_PATH = "data/db.json"

os.makedirs(OUTPUT_DIR, exist_ok=True)

artists_to_fetch = [
    "Tilman Riemenschneider",
    "Auguste Rodin",
    "William Merritt Chase",
    "Thomas Eakins",
    "Albert Pinkham Ryder",
    "Gustave Courbet",
    "Frederic Edwin Church",
    "Charles Sheeler",
    "Vincent van Gogh",
    "Thomas Cole",
    "Claude Monet",
    "Pieter de Hooch",
    "John Sloan",
    "Edgar Degas",
    "Jacques-Louis David",
    "Lorenzo Lotto",
    "Benjamin West"
]

print("Buscando múltiplas obras do Cleveland Museum of Art por artista...")

try:
    with open(DB_PATH, "r", encoding="utf-8") as f:
        db = json.load(f)
except Exception as e:
    print(f"Erro ao ler {DB_PATH}: {e}")
    exit(1)

# Limpar as obras anteriores desses artistas para não haver duplicidade
ids_artistas_cma = {a["id"] for a in db["artists"] if any(nome in a["name"] for nome in artists_to_fetch)}
obras_mantidas = [o for o in db["artworks"] if o["artistId"] not in ids_artistas_cma]

for artist_name in artists_to_fetch:
    print(f"\nIniciando busca para: {artist_name}")
    # Encontrar o ID correspondente no db.json
    artist_id = None
    for a in db["artists"]:
        if artist_name in a["name"]:
            artist_id = a["id"]
            break
            
    if not artist_id:
        print(f"  [Aviso] Artista '{artist_name}' não encontrado no db.json. Pulando...")
        continue

    PARAMS = {
        "has_image": 1,
        "q": artist_name,
        "limit": 30 # Busca mais resultados para ter certeza que encontra os do artista exato
    }
    
    query_string = urllib.parse.urlencode(PARAMS)
    url = f"{API_URL}?{query_string}"
    req = urllib.request.Request(url, headers={"User-Agent": "ArteDigitalFloripa/1.0"})
    
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            
            count = 0
            for item in data.get("data", []):
                # Verifica se o artista está realmente entre os criadores (evita falsos positivos da busca)
                creators = item.get("creators", [])
                match = False
                for c in creators:
                    if artist_name.lower() in c.get("description", "").lower():
                        match = True
                        break
                        
                if not match:
                    continue

                images = item.get("images", {})
                web_image = images.get("web", {})
                img_url = web_image.get("url")
                
                if not img_url:
                    continue
                    
                item_id = item.get("id")
                filename = f"cma_{item_id}.jpg"
                filepath = os.path.join(OUTPUT_DIR, filename)
                
                # Baixa a imagem
                if not os.path.exists(filepath):
                    print(f"  Baixando imagem da obra ID {item_id}...")
                    img_req = urllib.request.Request(img_url, headers={"User-Agent": "ArteDigitalFloripa/1.0"})
                    try:
                        with urllib.request.urlopen(img_req) as img_resp, open(filepath, "wb") as f:
                            f.write(img_resp.read())
                    except Exception as e:
                        print(f"    [Aviso] Falha ao baixar imagem da obra {item_id}: {e}")
                        continue
                else:
                    print(f"  Imagem {filename} já existe. Aproveitando...")
                
                obras_mantidas.append({
                    "id": f"cma-{item_id}",
                    "artistId": artist_id,
                    "title": item.get("title", "Sem título"),
                    "date": item.get("creation_date", "Data desconhecida"),
                    "category": item.get("type", "Outro"),
                    "medium": item.get("technique", "Desconhecido"),
                    "local_file": f"e/{filename}",
                    "remote_url": img_url,
                    "largura": int(web_image.get("width", 0)),
                    "altura": int(web_image.get("height", 0))
                })
                count += 1
                if count >= 10: # Limite de até 10 obras por artista
                    break
            
            print(f"  Total de obras adicionadas para {artist_name}: {count}")
    except Exception as e:
        print(f"Erro ao buscar obras para {artist_name}: {e}")

db["artworks"] = obras_mantidas

with open(DB_PATH, "w", encoding="utf-8") as f:
    json.dump(db, f, ensure_ascii=False, indent=2)

print(f"\nFinalizado! O banco de dados foi atualizado diretamente.")
print(f"Total de obras agora: {len(db['artworks'])}")
print("Não esqueça de rodar o 'python3 generate_sql.py' para gerar o seed atualizado!")