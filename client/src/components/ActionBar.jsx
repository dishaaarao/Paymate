import { FaArrowUp, FaArrowsAltH, FaArrowDown, FaFileInvoiceDollar } from 'react-icons/fa';

const actions = [
  { icon: <FaArrowUp />, label: 'Send' },
  { icon: <FaArrowsAltH />, label: 'Transfer' },
  { icon: <FaArrowDown />, label: 'Request' },
  { icon: <FaFileInvoiceDollar />, label: 'Pay bill' },
];

const ActionBar = ({ onAction }) => (
  <div style={{
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1.25rem',
    margin: '1.5rem 0 1rem',
  }}>
    {actions.map((action) => (
      <button
        key={action.label}
        className="action-btn"
        onClick={() => onAction && onAction(action.label)}
        style={{
          flex: 1,
          background: '#f1f5f9',
          border: 0,
          borderRadius: '999px',
          padding: '1rem 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          fontWeight: 500,
          boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
          color: '#334155',
          fontSize: '1rem',
          gap: '0.5rem',
        }}
      >
        <span style={{ fontSize: '1.6rem' }}>{action.icon}</span>
        <span>{action.label}</span>
      </button>
    ))}
  </div>
);

export default ActionBar;

