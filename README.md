
![tlhc3ta](https://github.com/adnanyagmur/movieapp-react-vite/assets/80180114/1633f843-9522-4fbc-856e-47df8b270db2)


# RAIN Movie

RAIN Movie, React, TypeScript, Vite, Material-UI ve Redux Toolkit kullanılarak geliştirilen bir film uygulamasıdır. Bu proje, TMDB API'lerini entegre ederek kullanıcılara film arama, detayları görüntüleme ve favorilere ekleme gibi özellikler sunar.

## Proje Bağlantısı

Netlify üzerindeki production a alınmış projeyi [buradan](https://rainmovieapp.netlify.app/) inceleyebilirsiniz.

**Not: Proje Commitleri ve API Anahtarları**

Proje commitlerinde kullanılan API anahtarları geçersizdir ve güvenlik nedenleriyle regenerete edilmiştir. Lütfen TMDB üzerinden kendi API anahtarınızı alın ve projenin gerekli yerlerine ekleyin.

API anahtarınızı almak için [TMDB Developer Portal](https://www.themoviedb.org/settings/api) adresini ziyaret edebilirsiniz. Anahtarınızı aldıktan sonra, proje klasörü içindeki belirli dosyalara (örneğin `.env` dosyası) eklemeniz gerekebilir. Daha fazla bilgi için projenin belgelerine başvurun.

## Bağımlılıkların Kurulumu

Proje bağımlılıklarını yüklemek için aşağıdaki adımları takip edebilirsiniz:

npm install

//çalıştırmak için 

npm run dev

## Ortam Değişkenleri

Projenin düzgün çalışabilmesi için çeşitli ortam değişkenlerini ayarlamak önemlidir. Aşağıda, projenin gerektirebileceği ortam değişkenlerini bulabilirsiniz:

## **TMDB API Anahtarı:**
   - Proje, TMDB API'lerini kullanarak film verilerini çeker. Bu nedenle, [TMDB Developer Portal](https://www.themoviedb.org/settings/api) adresinden kendi API anahtarınızı almalısınız.
   - API anahtarınızı aldıktan sonra, proje klasörü içindeki belirli bir dosyaya (örneğin, `.env` dosyası) eklemelisiniz.

Not: .env dosyası, projenizin root dizininde bulunmalıdır ve API anahtarınızın güvenliği için .gitignore dosyasına eklenmelidir.
Örnek `.env` dosyası:

```env
VITE_APP_TMDB_API_KEY="buraya_api_anahtarınız"

## Proje Yapısı

Projenin dosya ve klasör yapısı aşağıdaki gibi düzenlenmiştir:

📦 src
┣ 📂 components # Componentlerin bulunduğu kısım
┣ 📂 pages # Temel olarak 3 sayfadan oluşan uygulamanın sayfalarının bulunduğu kısım
┣ 📂 redux # State management için store, slice, selector dosyalarının bulunduğu kısım
┣ 📂 services # TMDB API isteklerini toplanan kısım
┣ 📂 utils # Yardımcı fonksiyonların bulunduğu kısım
┣ 📜 App.tsx # Router yapısının bulunduğu ana uygulama dosyası
┣ 📜 index.css
┗ 📜 main.tsx

## Teknolojiler

Bu proje, çeşitli modern teknolojileri ve kütüphaneleri kullanmaktadır. İşte projede kullanılan başlıca teknoloji ve kütüphaneler:

- **React:** Güçlü bir kullanıcı arayüzü oluşturma kütüphanesi. Bileşen tabanlı yapısıyla projeyi modüler hale getirir.

- **TypeScript:** JavaScript'e güç ve tip güvenliği ekleyen bir programlama dilidir. Projeyi daha güvenli ve sürdürülebilir hale getirir.

- **Vite:** Hızlı ve modern bir JavaScript geliştirme ortamı. Hızlı başlangıç ve gelişmiş performans sağlar.

- **Material-UI:** Google'ın tasarım yönergelerine uygun, önceden oluşturulmuş ve özelleştirilebilir React bileşenleri sağlar. Hızlı ve şık bir kullanıcı arayüzü geliştirmek için kullanılır.

- **Redux Toolkit:** React uygulamalarında state yönetimi için kullanılan bir kütüphanedir. Redux'un karmaşıklığını azaltır ve hızlı bir şekilde uygulama geliştirmeyi sağlar.

Bu teknolojilerin kullanılması, projenin performansını artırır, kodun daha sürdürülebilir olmasını sağlar ve geliştirici deneyimini iyileştirir. Ayrıca, bu popüler kütüphaneler, topluluk destekleri ve dokümantasyonlarıyla geliştiricilere geniş bir ekosistem sunar, sorunları daha hızlı çözme ve yeni özellikleri daha kolay ekleyebilme avantajı sağlar.

## Özellikler

Proje, aşağıdaki özellikleri içermektedir:

- **Hızlı ve Detaylı Arama:**
  - **HomePage** üzerinde, hem hızlı (keyword ile) hem de detaylı (sıralama, derecelendirme, yıl, dil, tür, yetişkin içerik) arama filtrelemeleri yapılabilmektedir.

- **Pagination Yapısı:**
  - Veriler, kullanıcı dostu bir sayfa düzeni olan pagination yapısı ile sunulmaktadır.

- **Favori Ekleme ve Kaldırma:**
  - Filmler, favorilere eklenebilir ve FavoritePage üzerinden favorilerden kaldırılabilir.

- **FavoritePage:**
  - **FavoritePage** sayfasına gidildiğinde, tüm favori filmler görüntülenebilir.

- **Film Detayları:**
  - **HomePage** veya **FavoritePage** üzerindeki bir film kartına tıklandığında, ilgili film detayları görüntülenir.
    - Yayın yılı, başlık, tagline, türler, başrol oyuncuları, trailer linki gibi temel bilgiler yanı sıra, filmin YouTube videoları, tüm posterleri ve tüm yorumları da gösterilmektedir.

- **Dark Mode ve Light Mode:**
  - Uygulama, kullanıcılara Dark Mode ve Light Mode olmak üzere iki tema seçeneği sunmaktadır. Kullanıcılar tercih ettikleri temayı seçebilirler.

## Ekran Görüntüleri

### HomePage
![hwtbp4k](https://github.com/adnanyagmur/movieapp-react-vite/assets/80180114/0d8e704b-2e53-41ad-a396-d9d74ec1dde7)

### HomePage (Alt Kısım)
![23uo01f](https://github.com/adnanyagmur/movieapp-react-vite/assets/80180114/26173c0d-41ca-48e4-8b47-71b2f8355994)

### FavoriPage
![tlhc3ta](https://github.com/adnanyagmur/movieapp-react-vite/assets/80180114/0194266b-d774-49dc-a069-10629585aa2a)

### DetailPage
![lfqc0nw](https://github.com/adnanyagmur/movieapp-react-vite/assets/80180114/bdb20d64-2245-4b1c-baf8-fb9503e3dfc3)
imagetest
![lfqc0nw](https://github.com/adnanyagmur/movieapp-react-vite/blob/main/assets/lfqc0nw.jpg)

#### DetailPage - Watch Trailer Button
![8vp0dpi](https://github.com/adnanyagmur/movieapp-react-vite/assets/80180114/3487a18d-d97d-4a67-8684-bfab3b98a5f7)

#### DetailPage - Lead Actor
![8i7k1zd](https://github.com/adnanyagmur/movieapp-react-vite/assets/80180114/a63c60ec-820f-4385-b243-d1a8b9bc7e46)

#### DetailPage - Videos
![2temm6i](https://github.com/adnanyagmur/movieapp-react-vite/assets/80180114/74b86f7e-c189-45e0-9c2b-2f739953071b)

##### DetailPage - Videos - Watch Video Button
![oru7iba](https://github.com/adnanyagmur/movieapp-react-vite/assets/80180114/e88eccf1-8532-4183-841c-00cb22dcb9b8)

#### DetailPage - Posters
![6dojsdo](https://github.com/adnanyagmur/movieapp-react-vite/assets/80180114/cf70ec5a-9337-48e3-be06-8390d8d7e44e)

##### DetailPage - Posters - Poster Card onClick
![q5buc5d](https://github.com/adnanyagmur/movieapp-react-vite/assets/80180114/c6950982-361a-4d21-923b-ac57a2a59ce2)

#### DetailPage - Comments

![q0bzrts](https://github.com/adnanyagmur/movieapp-react-vite/assets/80180114/5caf1b46-5370-466e-975a-8a1711dbf4e2)

![hwtbp4k](https://github.com/adnanyagmur/movieapp-react-vite/assets/80180114/97a8b2db-9035-4090-ae5a-5192f7b9c7d9)


##### DetailPage - Comments - Comment Card onClick
![r51lbeo](https://github.com/adnanyagmur/movieapp-react-vite/assets/80180114/9639a2c7-94da-4231-ab96-793b2d0c0f5d)



