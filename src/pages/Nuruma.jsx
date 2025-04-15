import React, { useState, useRef } from 'react';
import './Nuruma.css';
import config from '../assets/config.js';
import albumData from '../assets/Data.db'

const Nuruma = () => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [password, setPassword] = useState('');
    const albumSectionRef = useRef(null);

    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        if (password === config.PASSWORD) {
            setIsAuthorized(true);
        } else {
            alert('Unutmuş olamazsın...');
        }
    };

    const scrollAlbumSection = (direction) => {
        const scrollAmount = 250;
        if (direction === 'left') {
            albumSectionRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else if (direction === 'right') {
            albumSectionRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    }

    if (!isAuthorized) {
        return (
            <div className="n-container">
                <h1>Hoş Geldin</h1>
                <p>Bu sayfa çok özel biri için hazırlandı. 🌸</p>
                <form onSubmit={handlePasswordSubmit} className="password-form">
                    <label>
                        Her şeyin başladığı o tarih (GGAA):
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder=":)"
                        />
                    </label>
                    <button type="submit">Devam Et</button>
                </form>
            </div>
        );
    }

    return (
        <div className="n-container">
            <h1>Hayatımın anlamına, bitaneme, gelecekteki eşime... Benim Güzel Nuruma</h1>

            <section className="message-section">
                <h2>Çünkü sen benim mucizemsin</h2>
                <p>
                    Bazı insanlar hayatımıza öyle bir girer ki, hiçbir şey eskisi gibi olmaz. İşte sen, 21 Ekim 2024 sabahı saat tam 11:21'de, farkında bile olmadan hayatımın yönünü değiştiren o sessiz mucize oldun. Belki ilk gün anlamadın, belki ilk bakışta sadece anlık bir düşünceydi o yazdığın... ama şimdi dönüp baktığımda, o an her şey başlamıştı. "Bu kış ellerinizi kim ısıtacak?" sorusuna "Montum" diye cevap vermiştin. Ne kadar sade, ne kadar masum... Ve o sade cümlenin ardından gelen her şey, hayatımın en değerli hikayesine dönüştü. <br/>
                    <br/>O notu gördüğümde içimde bir şey kıpırdadı. Birkaç kelimeyle bile içimi ısıtan, gülümseten biriyle tanışmıştım. Ama daha fazlası vardı... O gün hissettiğim şey, şimdi bildiğim bir şeye dönüştü: Sen benim kalbimin misafiri değil, sahibi olmaya gelmişsin. Belki o an sadece bir mesaj attım, belki çok basit bir adım gibi görünüyordu ama, o adım bizi bu günlere getirdi. <br/>
                    <br/>16 Şubat 2025, gece 01:30... O mesajın hala hafızamda ilk günkü tazeliğiyle duruyor. O kadar gerçek, o kadar içtendi ki... "Zeki ve naif birisin... saf bi su gibi berraksın... aynı kulvarda yüzüyoruz..." demiştin. O cümleyle içimde hem bir huzur, hem de derin bir hayranlık doğdu. Çünkü seni tanıdıkça gördüm ki, sen gerçekten berrak bir nehirsin. içinden geçen ne varsa gözlerine, sözlerine yansıyor. Seni sevmek, sana bağlanmak... hepsi bir "karar" değil, içimden gelen en doğal şeydi <br/>
                    <br/>O günden sonra her şey daha da anlam kazandı. Mesafeler uzun olabilir ama sana olan sevgim her an içimde bir adım daha atıyor. Göz göze gelmesek de yüreğim hep gözlerinin içinde. Ellerine dokunmasam da her mesajında tenin kadar sıcak bir sevgi hissediyorum. Her sabah seninle uyanmak istiyorum, her gece seninle huzur içinde uyumak...Gözlerimi kapattığımda ilk sen geliyorsun aklıma, ve her gece sana iyi geceler demeden tam anlamıyla uyuyamıyorum artık. <br/>
                    <br/>Evet, zaman zaman eksik kaldım, açıklayamadım... Bazen seni düşündüğüm kadar anlatamadım da. Belki hala söyleyemediğim şeyler var ama bilmeni isterim: Eğer bir an olsun kalbinin ucuna bir üzüntü düşüyorsa, onu ben üşüttüysem... özür dilerim. Amacım sana yük olmak değil, omzun olmak. Sana gölge olmak değil, güneşin olmak. Sözüm söz, varsa eksiklerimi birlikte tamamlayalım. Sıkıntı varsa beraber çözelim. Çünkü seninle olmak, sadece "mutluluğu paylaşmak" değil, aynı zamanda zorluğu bölüşmek benim için. <br/>
                    <br/>Sen hasta olunca içim acıyor. İyi ol diye dua ediyorum. Seni yoranlar olduğunda keşke yanında olup "senin için buradayım" diyebilmeyi diliyorum. Ve şunu bil: Senin yanında olamadığım her an, kalbim senin yanında olmaya çalışıyor. Bu satırlar sadece harflerden ibaret değil; her bir kelime, senin için atan kalbimin sesi. <br/>
                    <br/>Şu an bu satırları gizli bir sayfaya yazıyorum belki ama hissettiklerim o kadar açık, o kadar net ki... Sözle, yazıyla ifade edebileceğimden çok daha fazlası var içimde sana dair. Biliyorum, zamanla yüz yüze de geleceğiz. Ellerimiz birbirine dokunacak, gözlerimiz aynı sabaha uyanacak. Ama o güne kadar sana her gece bu satırlarda sarılmak istiyorum. Sana her gün bu cümlelerle "yanındayım" demek istiyorum. <br/><br/>Sen benim mucizemsin Nur. <br/><br/>En başında bizi başlatan o soruyu ben de sorup cevaplayayım: <br/><br/>"Bu kış ellerini kim ısıtacak?" <br/><br/>Hiç bu kadar net bir cevap vermemiştim: <br/><br/>Sonsuza kadar ben.
                </p>
            </section>

            <section className="p-section">
                <h2>Ve uzun süredir sana söylemek istediklerim...</h2>
                <p>
                    Aynı gökyüzüne bakıyoruz her gece, <br/>Sen İstanbul'da, ben senli düşlerde... <br/>Mesafe dedikleri şey ne ki aslında,<br/>Kalbin bende attıkça, mesafe anlamsız bana.<br/>
                    <br/>Seni düşünmekle başlıyor sabahım,<br/>Adını anmakla bitiyor gecem...<br/>Dokunamasam da ellerine henüz,<br/>İçimde hep seninle yürüyorum sessizce.<br/>
                    <br/>Bir gülüşün geliyor gözümün önüne,<br/>Yorgunluğum siliniyor içten içe.<br/>Seninle geçmeyen bir gün,<br/>Eksik bir sayfa gibi hayat defterimde.<br/>
                    <br/>Adını her andığımda,<br/>Bir dua süzülüyor dilimdem...<br/>Her "Aşkım" deyişinde,<br/>Biraz daha bağlanıyorum derinden.<br/>
                    <br/>Henüz yan yana değiliz, biliyorum...<br/>Ama sana çıkan her yol, en doğru olan.<br/>Ve söz veriyorum;<br/>O gün geldiğinde, hasret bile gülümser aramızda.<br/>
                </p>
            </section>

            <section className="s-section">
                <h2>Aklıma Seni Getiren O Şarkı</h2>
                <iframe
                    src="https://open.spotify.com/embed/track/7AqMiI1qaqn8Pixiqf0tvr?utm_source=generator"
                    width="100%"
                    height="80"
                    allow="encrypted-media"
                    frameBorder="0"
                    title="Nur'un Sarkisi"
                    ></iframe>
            </section>

            <section className="album-container">
                <h2>Hayatımın aşkından gelen en güzel cümlelere tepkilerim :)</h2>
                <div className="album-controls">
                    <button className="scroll-button" onClick={() => scrollAlbumSection('left')}>
                        ‹
                    </button>
                    <div className="album-section" ref={albumSectionRef}>
                        {albumData.map((album, index) => (
                            <div className="album-card" key={index}>
                                <h3>{album.title}</h3>
                                <p className="album-date">{album.date}</p>
                                <p>{album.description}</p>
                            </div>
                        ))}
                    </div>
                    <button className="scroll-button" onClick={() => scrollAlbumSection('right')}>
                        ›
                    </button>
                </div>
            </section>

            <section className="question-section">
                <h3>Ne dersin Ayşe Nur Yılmaz?</h3>
                <div className="question-box">
                    <p>Bu kış ellerini ben ısıtayım mı ;)</p>
                </div>
            </section>
        </div>
    );
};
export default Nuruma;