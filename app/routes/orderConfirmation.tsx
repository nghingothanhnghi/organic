import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAppSelector } from "~/hooks";
import Breadcrumb from "~/components/breadcrumb";
import { useTranslation } from "react-i18next";

const OrderConfirmation = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const order = useAppSelector(state => state.checkout.order); // ✅ Use `order` instead of `lastOrder`

    useEffect(() => {
        if (!order) {
            navigate('/'); // Redirect if no order exists
        }
    }, [order, navigate]);

    if (!order) return null; // Prevent rendering if order is null

    return (
        <div className="OrderConfirmation-container max-w-screen-lg mx-auto py-8 px-4">
            <Breadcrumb items={[{ label: t("page_title.home"), path: "/" }, { label: t("page_title.order_confirmation"), path: "/order-confirmation" }]} />
            <h1 className="text-2xl font-bold text-center my-4">{t("order.confirmation_title")}</h1>
            <p className="text-center text-gray-600">{t("order.confirmation_message")}</p>
            <div className="mt-6 p-6 border rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold mb-2">{t("order.order_details")}</h2>
                <p><strong>{t("order.order_id")}:</strong> {order.id}</p>
                <p><strong>{t("order.shipping_address")}:</strong> {order.shippingDetails.address}</p>
                <p><strong>{t("order.payment_method")}:</strong> {order.paymentDetails.method}</p>
                <h3 className="text-lg font-semibold mt-4">{t("order.items_purchased")}</h3>
                <ul className="list-disc pl-6">
                    {order.items.map((item) => (
                        <li key={item.id} className="mt-2">
                            {item.name} - {item.quantity} x {item.price}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="text-center mt-6">
                <button
                    onClick={() => navigate("/")}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    {t("order.back_to_home")}
                </button>
            </div>
        </div>
    );
};

export default OrderConfirmation;
