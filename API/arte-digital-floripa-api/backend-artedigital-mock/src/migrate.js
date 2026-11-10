import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import prisma from "./libs/prisma.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sqlPath = path.resolve(__dirname, "../../../supabase_migration_fix.sql");

async function main() {
  const sqlContent = fs.readFileSync(sqlPath, "utf-8");

  // Remove linhas de comentário e separa por ';'
  const statements = sqlContent
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n")
    .split(";")
    .map((stmt) => stmt.trim())
    .filter(Boolean);

  console.log(`Executando ${statements.length} instruções SQL no Supabase...`);

  for (const statement of statements) {
    await prisma.$executeRawUnsafe(statement);
  }

  const artistsCount = await prisma.artists.count();
  const mockBioCount = await prisma.artists.count({
    where: { bio: "Mock bio" },
  });
  const missingCategoryArtists = await prisma.artists.count({
    where: { category: null },
  });
  const artworksCount = await prisma.artworks.count();
  const missingDescArtworks = await prisma.artworks.count({
    where: { description: null },
  });

  console.log("Migração concluída com sucesso!");
  console.log({
    artistsCount,
    mockBioCount,
    missingCategoryArtists,
    artworksCount,
    missingDescArtworks,
  });
}

main()
  .catch((err) => {
    console.error("Erro na migração:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

