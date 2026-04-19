export const formatCurrency = (amount) => {
  if (!amount) return 'N/A';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const getStatusStats = (applications) => {
  return {
    total: applications.length,
    applied: applications.filter(a => a.status?.toLowerCase() === 'applied').length,
    interviewing: applications.filter(a => a.status?.toLowerCase() === 'interviewing').length,
    offers: applications.filter(a => a.status?.toLowerCase() === 'offer').length,
    rejected: applications.filter(a => a.status?.toLowerCase() === 'rejected').length,
  };
};
