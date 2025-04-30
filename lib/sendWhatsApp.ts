type JobFormData = {
    name: string;
    jobId: string;
    createdAt: string;
    mobile: string;
    device: string;
    issue: string;
    remarks: string;
    cost: number;
}

async function sendWhatsApp(data: JobFormData, template: string) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authkey", process.env.MSG91_AUTH_KEY as string);

    const raw = JSON.stringify({
        "integrated_number": process.env.MSG91_WHATSAPP_NUMBER as string,
        "content_type": "template",
        "payload": {
            "messaging_product": "whatsapp",
            "type": "template",
            "template": {
                "name": template,
                "language": {
                    "code": "en_US",
                    "policy": "deterministic"
                },
                "namespace": "43f3e011_9380_42ea_a531_d33faa76a40f",
                "to_and_components": [
                    {
                        "to": [data.mobile],
                        "components": {
                            "body_1": {
                                "type": "text",
                                "value": data.name
                            },
                            "body_2": {
                                "type": "text",
                                "value": data.jobId
                            },
                            "body_3": {
                                "type": "text",
                                "value": data.createdAt
                            },
                            "body_4": {
                                "type": "text",
                                "value": data.device
                            },
                            "body_5": {
                                "type": "text",
                                "value": data.issue
                            },
                            "body_6": {
                                "type": "text",
                                "value": data.remarks
                            },
                            "body_7": {
                                "type": "text",
                                "value": data.cost.toString()
                            },
                        }
                    }
                ]
            }
        }
    });

    const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow' as RequestRedirect
    };

    try {
        const response = await fetch(process.env.MSG91_URL as string, requestOptions);

        if (!response.ok) {
            const errorData = await response.text();
            console.error("Error response:", errorData);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.text();
        console.log("Success:", result);
    } catch (error) {
        console.error("Error sending WhatsApp message:", error);
    }

}

export default sendWhatsApp;