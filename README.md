# GUARD X 2.0

## Kurulum
1. Mevcut projenin yedeğini al.
2. ZIP içeriğini mevcut `guard-x/guard-x/` klasörüne çıkar ve dosyaları değiştir.
3. `.env` dosyanı koru; ZIP içinde `.env` bulunmaz.
4. Termux:
   ```bash
   cd ~/guard-x/guard-x
   npm install
   npm run komutlari-yukle
   npm start
   ```

## Gerekli `.env` değerleri
- `DISCORD_TOKEN`: Bot tokeni
- `CLIENT_ID`: Discord uygulama ID'si
- `OWNER_IDS`: Bot sahiplerinin Discord kullanıcı ID'leri (virgülle ayır)
- `MONGODB_URI`: MongoDB bağlantı adresi
- `TEST_GUILD_ID`: Test sunucusu ID'si (boşsa global komut yüklenir)
- `PORT`: Render Web Service portu (varsayılan 3000)

## Discord Developer Portal
Bot için Server Members Intent, Message Content Intent aç. Botun rolü/kanal işlemlerini yapabilmesi için gerekli izinleri ver. Yönetici izni vermek yerine ihtiyaç duyulan izinleri ayrı ayrı tanımla.

## Komutlar
- `/ping`, `/botbilgi`
- `/guard-durum`
- `/log-kanali`
- `/koruma-kanali`
- `/whitelist-ekle`, `/whitelist-sil`, `/whitelist-liste`
- `/lockdown`, `/unlockdown`
- `/sunucular`, `/sunucudan-ayril` (yalnızca bot sahibi)

Koruma ve normal log kanalları ayrı tutulur. Ayarlar sunucu bazında MongoDB'de saklanır.

## Sınırlar
Discord audit log kayıtları gecikmeli gelebilir ve her eylemde faili kesin olarak belirlemek mümkün olmayabilir. Botun yetkisi olmayan işlemleri geri alamaz. Silinen mesajların içeriği, bot mesaj silinmeden önce içeriği önbelleğe almamışsa elde edilemeyebilir. Bu nedenle sistem tespit edemediği faili kesinmiş gibi göstermez.