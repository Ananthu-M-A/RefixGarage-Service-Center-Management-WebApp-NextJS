export const sendWhatsApp = async () => {
    const response = await fetch('/api/whatsapp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            to: '+91XXXXXXXXXX',
            templateName: 'repair_status_update',
            templateParams: {
                '1': 'Ananthu',
                '2': 'Your repair is complete',
                '3': 'Your device is ready for pickup',
                '4': 'Please visit our store to collect your device',
                '5': 'Thank you for choosing us!',
            },
        }),
    });

    const result = await response.json();
    console.log(result);
};
