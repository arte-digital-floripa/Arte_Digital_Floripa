import re
import os

with open("generate_sql.py", "r", encoding="utf-8") as f:
    content = f.read()

replacement = """        # Gera uma URL de placeholder usando UI Avatars baseada no nome do artista
        safe_name = urllib.parse.quote_plus(artist['name'])
        photo_url = f"https://ui-avatars.com/api/?name={safe_name}&background=random&size=512"
        
        # Se a foto local existir no diretório, utilizar a URL do Supabase
        clean_name = artist['name'].split(' (')[0].replace(' ', '_')
        possivel_foto = f"storage/fotos_artistas/{clean_name}.jpg"
        if os.path.exists(possivel_foto) or 'local_photo' in artist:
            filename = artist.get('local_photo', possivel_foto).split('/')[-1]
            photo_url = f"https://[SEU_PROJETO].supabase.co/storage/v1/object/public/obras/fotos_artistas/{filename}"
"""

# Replace the block
content = re.sub(r"        # Gera uma URL de placeholder.*?photo_url = f\"https://ui-avatars.*?size=512\"", replacement, content, flags=re.DOTALL)

# Add import os at the top if not exists
if "import os" not in content:
    content = "import os\n" + content

with open("generate_sql.py", "w", encoding="utf-8") as f:
    f.write(content)
