import React from "react";
import { formatDateTime } from "~/utils/formatDateTime";
import { useTranslation } from "react-i18next";

interface PublishedDateProps {
    date?: string | null;
}

const PublishedDate: React.FC<PublishedDateProps> = ({ date }) => {
    const { i18n } = useTranslation();

    if (!date) return <time className="text-xs text-gray-400">N/A</time>;

    return (
        <time className="text-xs text-gray-400">
            {formatDateTime(date, true, "24-hour", i18n.language || "vi")}
        </time>
    );
};

export default PublishedDate;
