import googlePlay from '../../assets/figma/google-play.png';
import appStore from '../../assets/figma/app-store.png';
import playScreen from '../../assets/figma/raw-02.jpg';
import appScreen from '../../assets/figma/raw-11.jpg';

function Hero() {
  return (
    <section className="home-hero" id="home">
      <div className="hero-shade" />
      <div className="container-xl hero-inner">
        <div className="hero-copy">
          <span className="orange-pill">Heavy Equipment Marketplace</span>
          <h1>Pakistan’s # 1 Marketplace of Building Construction, Equipment &amp; Material</h1>
          <p>A Marketplace in Pakistan for heavy equipment rental businesses, jobsite teams, and service buyers, Construction Material who need fast availability, categories, trust, and location logic.</p>
          <div className="store-actions">
            <a className="store-btn google" href="#marketplace"><img src={googlePlay} alt="Google Play" /><span><small>Get it On!</small><b>Google Play</b></span></a>
            <a className="store-btn apple" href="#marketplace"><img src={appStore} alt="App Store" /><span><small>Download it from</small><b>App Store</b></span></a>
          </div>
        </div>
        <div className="phones" aria-label="SBC Marketplace mobile applications">
          <div className="phone phone-left"><img src={playScreen} alt="SBC Marketplace on Google Play" /></div>
          <div className="phone phone-right"><img src={appScreen} alt="SBC Marketplace on the App Store" /></div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
