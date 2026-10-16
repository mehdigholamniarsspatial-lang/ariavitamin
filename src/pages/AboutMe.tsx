import { GraduationCap, Sparkles, BookOpen, Leaf } from 'lucide-react';
import { PageHead } from '../components/ui';
import { useTitle } from '../lib';

const interests = ['تغذیه اساسی', 'تغذیه بالینی', 'رژیم‌درمانی', 'ویتامین‌ها و مواد معدنی', 'هوش مصنوعی در سلامت'];

export default function AboutMe() {
  useTitle('درباره من | آریا غلام‌نیا');

  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <PageHead title="درباره من" crumbs={[{ to: '/about-me', label: 'آریا غلام‌نیا' }]} />
      <div className="wrap about-me">
        <section className="profile-hero" aria-labelledby="profile-name">
          <div className="profile-photo">
            <img src={`${import.meta.env.BASE_URL}images/aria-gholamnia.png`} alt="آریا غلام‌نیا، دانشجوی علوم تغذیه" fetchPriority="high" />
          </div>
          <div className="profile-intro">
            <span className="profile-eyebrow">علم تغذیه، فناوری و آگاهی</span>
            <h1 id="profile-name">آریا غلام‌نیا</h1>
            <p className="profile-education"><GraduationCap size={22} aria-hidden="true" /> دانشجوی علوم تغذیه · دانشگاه علوم پزشکی زنجان</p>
            <p>من <strong>آریا غلام‌نیا</strong>، دانشجوی رشته علوم تغذیه در دانشگاه علوم پزشکی زنجان هستم. علاقه‌مندی من به شناخت عمیق‌تر ارتباط میان تغذیه، سلامت انسان و پیشگیری از بیماری‌ها، مسیر علمی من را به سمت مطالعه، پژوهش و توسعه دانش در حوزه علوم تغذیه هدایت کرده است.</p>
            <ul className="profile-interests" aria-label="حوزه‌های مورد علاقه">
              {interests.map((interest) => <li key={interest}>{interest}</li>)}
            </ul>
          </div>
        </section>

        <div className="profile-sections">
          <section className="profile-section" aria-labelledby="nutrition-heading">
            <Leaf className="profile-icon" size={26} aria-hidden="true" />
            <div>
              <h2 id="nutrition-heading">علاقه‌مندی‌های علمی من</h2>
              <p>از مهم‌ترین حوزه‌های مورد علاقه من می‌توان به <strong>تغذیه اساسی، تغذیه بالینی، رژیم‌درمانی، ویتامین‌ها، مواد معدنی و نقش ریزمغذی‌ها در حفظ سلامت بدن</strong> اشاره کرد. باور دارم که شناخت صحیح نیازهای تغذیه‌ای انسان و درک علمی عملکرد مواد مغذی، از پایه‌های مهم ارتقای سلامت، پیشگیری از کمبودهای تغذیه‌ای و بهبود کیفیت زندگی است. به همین دلیل، تلاش می‌کنم دانش خود را درباره عملکرد مواد مغذی، منابع غذایی، نیازهای روزانه بدن و پیامدهای کمبود یا دریافت بیش از حد آن‌ها به‌صورت مستمر گسترش دهم.</p>
            </div>
          </section>
          <section className="profile-section" aria-labelledby="ai-heading">
            <Sparkles className="profile-icon" size={26} aria-hidden="true" />
            <div>
              <h2 id="ai-heading">پیوند تغذیه و هوش مصنوعی</h2>
              <p>در کنار علاقه‌مندی به علوم تغذیه، به <strong>هوش مصنوعی و کاربردهای آن در پژوهش‌های تغذیه‌ای و سلامت</strong> نیز توجه ویژه‌ای دارم. معتقدم ترکیب دانش تغذیه با فناوری‌های نوین، تحلیل داده‌ها و ابزارهای هوشمند می‌تواند فرصت‌های ارزشمندی برای دسترسی بهتر به اطلاعات علمی، شناخت دقیق‌تر نیازهای تغذیه‌ای و توسعه رویکردهای نوین در آموزش و پژوهش فراهم کند.</p>
            </div>
          </section>
          <section className="profile-section" aria-labelledby="mission-heading">
            <BookOpen className="profile-icon" size={26} aria-hidden="true" />
            <div>
              <h2 id="mission-heading">هدف من از ویتامین‌نامه</h2>
              <p>هدف من از راه‌اندازی این وب‌سایت، ایجاد فضایی علمی، کاربردی و قابل‌اعتماد برای معرفی ویتامین‌ها و مواد مغذی و ارائه اطلاعات دقیق و قابل‌فهم درباره نقش آن‌ها در بدن است. تلاش می‌کنم در این مسیر، مفاهیم تخصصی علوم تغذیه را به زبانی روشن و منظم ارائه کنم تا مخاطبان بتوانند درک بهتری از نیازهای تغذیه‌ای بدن، منابع غذایی و اهمیت انتخاب‌های آگاهانه در سبک زندگی خود به دست آورند.</p>
              <p>من یادگیری مستمر، مطالعه منابع علمی معتبر و پایبندی به شواهد پژوهشی را از اصول اساسی فعالیت علمی می‌دانم. امیدوارم این وب‌سایت در مسیر توسعه دانش تغذیه، ترویج آگاهی عمومی و ایجاد پیوندی مؤثر میان علم، فناوری و سلامت جامعه گامی ارزشمند بردارد.</p>
            </div>
          </section>
        </div>
        <section className="profile-vision" aria-labelledby="vision-heading">
          <span className="profile-eyebrow">نگاه به آینده</span>
          <h2 id="vision-heading">چشم‌انداز من</h2>
          <p>بهره‌گیری از دانش روز علوم تغذیه و ظرفیت‌های هوش مصنوعی برای توسعه آموزش علمی، افزایش آگاهی تغذیه‌ای و کمک به تصمیم‌گیری آگاهانه‌تر در زمینه سلامت.</p>
        </section>
      </div>
    </div>
  );
}
