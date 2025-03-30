import React from 'react';

const ContactSection: React.FC = () => {
    return (
        <div className="hidden lg:block text-white text-sm text-center lg:text-start mb-10">
            <h4 className="text-lg font-bold mb-4">Organic Ltd,</h4>
            <div className="mb-4">
                <h5 className="font-semibold">Address:</h5>
                <p>Linh Đông, Ho Chi Minh City, Vietnam</p>
            </div>

            <div className="mb-4">
                <h5 className="font-semibold">Phone:</h5>
                <p>+1-555-123-4567</p>
            </div>

            <div className="mb-4">
                <h5 className="font-semibold">Email:</h5>
                <p>info@example.com</p>
            </div>
        </div>
    );
};

export default ContactSection;
