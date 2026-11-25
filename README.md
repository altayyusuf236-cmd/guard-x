# GUARD X

Türkçe Discord güvenlik ve kayıt sistemi.

## Gereksinimler
- Node.js 20 veya üzeri
- MongoDB bağlantısı
- Discord Developer Portal üzerinden oluşturulmuş bot

## Kurulum
1. `npm install`
2. `.env.example` dosyasını `.env` olarak kopyala.
3. `.env` içindeki Discord ve MongoDB bilgilerini doldur.
4. `npm run komutlari-yukle`
5. `npm start`

## İlk sürüm
Bu başlangıç sürümü; bot bağlantısı, MongoDB bağlantısı, Türkçe temel komutlar,
bot sahibi komutları, sunucu katılım/ayrılma kayıtları ve temel hata takibini içerir.

Guard modülleri, ayrıntılı log kategorileri ve web paneli sonraki geliştirme
aşamalarında ayrı modüller olarak eklenecektir. Henüz etkin olmayan korumalar
varmış gibi gösterilmez.

## Güvenlik
- `.env` dosyasını kimseyle paylaşma.
- Bot tokenini kod dosyalarına yazma.
- Bot sahibinin ID'sini `OWNER_IDS` alanına gir.
- Botu yalnızca gerekli izinlerle davet et.
- Gerçek sunucuda kullanmadan önce test sunucusunda dene.
