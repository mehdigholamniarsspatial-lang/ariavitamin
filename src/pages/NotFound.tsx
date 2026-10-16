import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="wrap page" style={{ textAlign: 'center' }}>
      <h1 style={{ fontSize: 'var(--fs-2xl)' }}>این صفحه وجود ندارد</h1>
      <p className="muted">نشانی را بررسی کنید یا از جست‌وجو (Ctrl K) استفاده کنید.</p>
      <Link to="/" className="btn">بازگشت به صفحه اصلی</Link>
    </div>
  );
}
