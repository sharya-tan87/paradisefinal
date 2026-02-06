import React from 'react';
import { useTranslation } from 'react-i18next';

const StatusBadge = ({ status }) => {
    const { t } = useTranslation();
    // Brand-compliant status styles using only #CEE0F3, #2D7C9C, #214491
    const statusStyles = {
        pending: 'bg-brand-light text-brand-dark border border-brand-dark/20',
        contacted: 'bg-brand-light text-brand border border-brand/30',
        confirmed: 'bg-brand text-white',
        cancelled: 'bg-brand-dark text-white',
        completed: 'bg-brand-light/50 text-brand-dark border border-brand-light',
    };

    const statusKey = status?.toLowerCase();
    const style = statusStyles[statusKey] || 'bg-brand-light text-brand-dark';

    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${style}`}>
            {t(`queueDashboard.filter.${statusKey}`, status)}
        </span>
    );
};

export default StatusBadge;
