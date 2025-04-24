import { NextRequest, NextResponse } from 'next/server';
import { Twilio } from 'twilio';

const twilioClient = new Twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
);

export async function POST(req: NextRequest) {
    try {
        const { to, templateName, templateParams } = await req.json();

        if (!to || !templateName) {
            return NextResponse.json(
                { error: 'Missing "to" or "templateName"' },
                { status: 400 }
            );
        }

        const message = await twilioClient.messages.create({
            to: `whatsapp:${to}`,
            from: process.env.TWILIO_WHATSAPP_FROM!,
            contentSid: templateName,
            contentVariables: JSON.stringify(templateParams),
        });

        return NextResponse.json({ success: true, sid: message.sid });
    } catch (error) {
        if (error instanceof Error) {
            console.error('Twilio error:', error.message);
        }
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
