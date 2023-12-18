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
![HomePage](https://i.hizliresim.com/hwtbp4k.jpg)

### HomePage (Alt Kısım)
![HomePage Alt Kısım](https://i.hizliresim.com/23uo01f.jpg)

### FavoriPage
![FavoriPage](https://i.hizliresim.com/tlhc3ta.jpg)

### DetailPage
![DetailPage](https://i.hizliresim.com/lfqc0nw.jpg)

#### DetailPage - Watch Trailer Button
![Watch Trailer Button](https://i.hizliresim.com/8vp0dpi.jpg)

#### DetailPage - Lead Actor
![Lead Actor](https://i.hizliresim.com/8i7k1zd.jpg)

#### DetailPage - Videos
![Videos](https://i.hizliresim.com/2temm6i.jpg)

##### DetailPage - Videos - Watch Video Button
![Watch Video Button](https://i.hizliresim.com/oru7iba.jpg)

#### DetailPage - Posters
![Posters](https://i.hizliresim.com/6dojsdo.jpg)

##### DetailPage - Posters - Poster Card onClick
![Poster Card onClick](https://i.hizliresim.com/q5buc5d.jpg)

#### DetailPage - Comments
![Comments](https://i.hizliresim.com/q0bzrts.jpg)

##### DetailPage - Comments - Comment Card onClick
![Comment Card onClick](https://i.hizliresim.com/r51lbeo.jpg)



