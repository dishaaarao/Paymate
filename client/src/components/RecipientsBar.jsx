// Simple fake data for now; integrate real user data later
const recipients = [
  { name: 'Sam', email: 'sam@example.com', color: '#38bdf8' },
  { name: 'Alex', email: 'alex@example.com', color: '#a78bfa' },
  { name: 'Priya', email: 'priya@example.com', color: '#f472b6' },
  { name: 'Liu', email: 'liu@example.com', color: '#22d3ee' },
  { name: 'Alia', email: 'alia@example.com', color: '#fbbf24' },
];

const RecipientsBar = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', margin: '2rem 0 1rem' }}>
    <span style={{ fontWeight: 600, color: '#334155', marginRight: '1rem', minWidth: 85 }}>Recipients</span>
    <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto' }}>
      {recipients.map((r) => (
        <div key={r.email} style={{ textAlign: 'center', width: 52 }}>
          <div style={{
            background: r.color,
            width: 44,
            height: 44,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            color: 'white',
            fontSize: 22,
            margin: '0 auto 2px',
          }}>
            {r.name[0]}
          </div>
          <div style={{ fontSize: 12, color: '#64748b', whiteSpace: 'nowrap' }}>{r.name}</div>
        </div>
      ))}
    </div>
    <a href="#" style={{ color: '#6366f1', fontWeight: 500, marginLeft: 'auto', fontSize: 13 }}>View all</a>
  </div>
);

export default RecipientsBar;

