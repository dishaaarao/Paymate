import { FaHome, FaWifi, FaMobileAlt, FaTint } from 'react-icons/fa';

const services = [
  { icon: <FaHome />, label: 'House' },
  { icon: <FaWifi />, label: 'Internet' },
  { icon: <FaMobileAlt />, label: 'Mobile' },
  { icon: <FaTint />, label: 'Water' },
];

const ServicesBar = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', justifyContent: 'space-between', margin: '2.5rem 0 0.5rem' }}>
    {services.map((service) => (
      <button
        key={service.label}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          border: 'none',
          background: '#f8fafc',
          borderRadius: 18,
          padding: '0.7rem 0',
          fontSize: 15,
          color: '#334155',
          fontWeight: 500,
          boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
          cursor: 'pointer',
          minWidth: 74
        }}
      >
        <span style={{ fontSize: 22, marginBottom: 5 }}>{service.icon}</span>
        <span>{service.label}</span>
      </button>
    ))}
  </div>
);

export default ServicesBar;

