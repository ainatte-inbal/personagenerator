import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { feedback } = await request.json();

    if (!feedback || typeof feedback !== "string") {
      return NextResponse.json(
        { error: "Feedback is required" },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const { error } = await resend.emails.send({
      from: "Persona Generator <onboarding@resend.dev>",
      to: "ainatte_inbal@intuit.com",
      subject: "📬 New Persona Generator Feedback",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0077C5; border-bottom: 2px solid #0077C5; padding-bottom: 10px;">
            New Feedback Received
          </h2>
          <div style="background: #f4f5f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6;">${feedback.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
          </div>
          <p style="color: #666; font-size: 14px;">
            Submitted at ${new Date().toLocaleString()}
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error sending feedback:", error);
    return NextResponse.json(
      { error: "Failed to send feedback" },
      { status: 500 }
    );
  }
}
