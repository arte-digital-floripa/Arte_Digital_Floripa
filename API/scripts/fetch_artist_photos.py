import json
import os
import re
import urllib.request
import urllib.parse
import time

def clean_artist_name(raw_name):
    name = re.sub(r'\(.*?\)', '', raw_name)
    return name.strip()

def get_wikipedia_image(artist_name):
    safe_name = urllib.parse.quote(artist_name)
    url = f"https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original|thumbnail&pithumbsize=800&titles={safe_name}&redirects=1"
    
    req = urllib.request.Request(
        url,
        data=None,
        headers={
            'User-Agent': 'ArteDigitalFloripaBot/1.0 (mateus@example.com)'
        }
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            pages = data.get("query", {}).get("pages", {})
            for page_id, page_data in pages.items():
                if "thumbnail" in page_data:
                    return page_data["thumbnail"]["source"]
                elif "original" in page_data:
                    return page_data["original"]["source"]
    except Exception as e:
        print(f"Erro ao buscar na Wikipedia para {artist_name}: {e}")
    
    return None

def main():
    db_path = "../data/db.json"
    output_dir = "../storage/fotos_artistas"
    
    os.makedirs(output_dir, exist_ok=True)
    
    try:
        with open(db_path, "r", encoding="utf-8") as f:
            db = json.load(f)
    except Exception as e:
        print(f"Erro ao ler {db_path}: {e}")
        return

    artists = db.get("artists", [])
    print(f"Iniciando busca para {len(artists)} artistas...\n")
    
    sucesso = 0
    falha = []

    for artist in artists:
        raw_name = artist["name"]
        
        if raw_name.lower() in ["desconhecido", "tempo editorial"]:
            continue
            
        clean_name = clean_artist_name(raw_name)
        print(f"Buscando: {clean_name}...")
        
        img_url = get_wikipedia_image(clean_name)
        
        if img_url:
            ext = img_url.split('.')[-1].split('?')[0].lower()
            if ext not in ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg']:
                ext = 'jpg'
                
            filename = f"{clean_name.replace(' ', '_')}.{ext}"
            filepath = os.path.join(output_dir, filename)
            
            try:
                req = urllib.request.Request(img_url, headers={'User-Agent': 'ArteDigitalFloripaBot/1.0'})
                with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
                    out_file.write(response.read())
                print(f"  [OK] Imagem salva: {filename}")
                time.sleep(2)
                
                artist["local_photo"] = f"storage/fotos_artistas/{filename}"
                sucesso += 1
            except Exception as e:
                print(f"  [ERRO] Falha ao fazer download da imagem: {e}")
                falha.append(clean_name)
                time.sleep(2)
        else:
            print(f"  [AVISO] Nenhuma imagem encontrada na Wikipedia.")
            falha.append(clean_name)
            time.sleep(2)
            
    if sucesso > 0:
        with open(db_path, "w", encoding="utf-8") as f:
            json.dump(db, f, indent=2, ensure_ascii=False)
        print(f"\nArquivo {db_path} atualizado com as referências locais ('local_photo').")

    print("\n--- RESUMO ---")
    print(f"Imagens baixadas com sucesso: {sucesso}")
    print(f"Imagens não encontradas (necessário busca manual): {len(falha)}")
    for f in falha:
        print(f" - {f}")

if __name__ == "__main__":
    main()
