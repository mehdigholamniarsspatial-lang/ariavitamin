import { Link, useParams } from 'react-router-dom';
import { ARTICLES, ARTICLE_BY_SLUG } from '../data/articles';
import { Blocks, PageHead } from '../components/ui';
import { fa, useTitle } from '../lib';
import NotFound from './NotFound';

export function LearnIndex() {
  useTitle('آموزش');
  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <PageHead title="آموزش" crumbs={[{ to: '/learn', label: 'آموزش' }]} lede="مفاهیم پایه برای خواندن درست اعداد، برچسب‌ها و ادعاهای مربوط به ویتامین‌ها." />
      <div className="wrap">
        <div className="panel" style={{ padding: 0 }}>
          {ARTICLES.map((a, i) => (
            <Link key={a.slug} to={`/learn/${a.slug}`} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 16, padding: '18px 22px', textDecoration: 'none', borderTop: i ? '1px solid var(--line)' : 0 }}>
              <div>
                <strong style={{ fontSize: 'var(--fs-lg)' }}>{a.title}</strong>
                <p className="small muted" style={{ margin: '4px 0 0' }}>{a.summary}</p>
              </div>
              <div className="xs muted" style={{ textAlign: 'left', whiteSpace: 'nowrap' }}>{fa(a.minutes)} دقیقه<br />{a.audience}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function LearnArticle() {
  const { slug = '' } = useParams();
  const a = ARTICLE_BY_SLUG[slug];
  useTitle(a?.title ?? 'یافت نشد');
  if (!a) return <NotFound />;
  return (
    <div className="page" style={{ paddingTop: 0 }}>
      <PageHead title={a.title} crumbs={[{ to: '/learn', label: 'آموزش' }]} lede={a.summary} />
      <div className="wrap">
        <p className="xs muted">زمان مطالعه: {fa(a.minutes)} دقیقه — مخاطب: {a.audience}</p>
        <Blocks blocks={a.body} />
        <hr className="divider" />
        <Link to="/learn" className="btn ghost small">همه مطالب آموزشی</Link>
      </div>
    </div>
  );
}
